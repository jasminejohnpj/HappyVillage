import SurveyForm from "../model/surveyForm.js";
import Family from "../model/familyMembers.js";
import Newborn from "../model/newborn.js";
import Childrens from "../model/children.js";
import Youth from "../model/youth.js";
import Middleage from "../model/middleAge.js";
import SeniorCitizen from "../model/seniorCitizen.js";
import Supercitizen from "../model/superCitizen.js";
import ExcelJS from "exceljs";
import mongoose from "mongoose";

/**
 * Calculate age from DOB
 */
const calculateAge = (dob) => {
  if (!dob) return null;

  const birthDate = new Date(dob);
  if (isNaN(birthDate.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

/**
 * Age groups
 */
const getAgeCategory = (age) => {
  if (age == null) return null;

  if (age <= 3) return "0-3";
  if (age <= 18) return "4-18";
  if (age <= 40) return "19-40";
  if (age <= 60) return "41-60";
  if (age <= 75) return "61-75";
  return "76+";
};

/**
 * Get demographic report (same as your code, unchanged)
 */
export const getDemographicReport = async (req, res) => {
  try {
    const { panchayath, wardNo } = req.query;

    const surveyFilter = {};
    if (panchayath) surveyFilter.Panchayath = panchayath;
    if (wardNo) surveyFilter.WardNo = wardNo;

    const households = await SurveyForm.find(surveyFilter).select(
      "_id Panchayath WardNo"
    );

    if (households.length === 0) {
      return res.json({
        success: true,
        data: [],
        summary: {
          totalFamilies: 0,
          totalPopulation: 0,
          totalMale: 0,
          totalFemale: 0,
        },
      });
    }

    const householdIds = households.map((h) => h._id);
    const familyMembers = await Family.find({ Userid: { $in: householdIds } });

    const [newborns, childrens, youths, middleages, seniors, supers] =
      await Promise.all([
        Newborn.find({ Userid: { $in: householdIds } }).select(
          "Familymemberid Dob"
        ),
        Childrens.find({ Userid: { $in: householdIds } }).select(
          "Familymemberid Dob"
        ),
        Youth.find({ Userid: { $in: householdIds } }).select(
          "Familymemberid Dob"
        ),
        Middleage.find({ Userid: { $in: householdIds } }).select(
          "Familymemberid Dob"
        ),
        SeniorCitizen.find({ Userid: { $in: householdIds } }).select(
          "Familymemberid Dob"
        ),
        Supercitizen.find({ Userid: { $in: householdIds } }).select(
          "Familymemberid"
        ),
      ]);

    const dobMap = new Map();

    [...newborns, ...childrens, ...youths, ...middleages, ...seniors].forEach(
      (r) => {
        if (r.Familymemberid && r.Dob) {
          dobMap.set(r.Familymemberid.toString(), r.Dob);
        }
      }
    );

    supers.forEach((r) => {
      if (r.Familymemberid && !dobMap.has(r.Familymemberid.toString())) {
        dobMap.set(r.Familymemberid.toString(), "76+");
      }
    });

    const wardData = {};

    households.forEach((h) => {
      const key = `${h.Panchayath} ${h.WardNo}`;

      if (!wardData[key]) {
        wardData[key] = {
          panchayath: h.Panchayath,
          wardNo: h.WardNo,
          families: new Set(),
          demographics: {
            "0-3": { male: 0, female: 0 },
            "4-18": { male: 0, female: 0 },
            "19-40": { male: 0, female: 0 },
            "41-60": { male: 0, female: 0 },
            "61-75": { male: 0, female: 0 },
            "76+": { male: 0, female: 0 },
          },
        };
      }

      wardData[key].families.add(h._id.toString());
    });

    familyMembers.forEach((member) => {
      const household = households.find((h) => h._id.equals(member.Userid));
      if (!household) return;

      const key = `${household.Panchayath} ${household.WardNo}`;
      const dob = dobMap.get(member._id.toString());

      let ageGroup;
      if (dob === "76+") {
        ageGroup = "76+";
      } else if (dob) {
        ageGroup = getAgeCategory(calculateAge(dob));
      } else {
        ageGroup = getAgeCategory(parseInt(member.Age));
      }

      if (!ageGroup) return;

      const gender = member.Gender?.toLowerCase();
      if (gender === "male") wardData[key].demographics[ageGroup].male++;
      if (gender === "female") wardData[key].demographics[ageGroup].female++;
    });

    const rows = Object.values(wardData).map((w) => {
      const d = w.demographics;

      const row = {
        panchayatWard: `${w.panchayath} ${w.wardNo}`,
        noOfFamilies: w.families.size,

        "0-3Male": d["0-3"].male,
        "0-3Female": d["0-3"].female,
        "0-3Total": d["0-3"].male + d["0-3"].female,

        "4-18Male": d["4-18"].male,
        "4-18Female": d["4-18"].female,
        "4-18Total": d["4-18"].male + d["4-18"].female,

        "19-40Male": d["19-40"].male,
        "19-40Female": d["19-40"].female,
        "19-40Total": d["19-40"].male + d["19-40"].female,

        "41-60Male": d["41-60"].male,
        "41-60Female": d["41-60"].female,
        "41-60Total": d["41-60"].male + d["41-60"].female,

        "61-75Male": d["61-75"].male,
        "61-75Female": d["61-75"].female,
        "61-75Total": d["61-75"].male + d["61-75"].female,

        "76+Male": d["76+"].male,
        "76+Female": d["76+"].female,
        "76+Total": d["76+"].male + d["76+"].female,
      };

      row.totalMale =
        row["0-3Male"] +
        row["4-18Male"] +
        row["19-40Male"] +
        row["41-60Male"] +
        row["61-75Male"] +
        row["76+Male"];

      row.totalFemale =
        row["0-3Female"] +
        row["4-18Female"] +
        row["19-40Female"] +
        row["41-60Female"] +
        row["61-75Female"] +
        row["76+Female"];

      row.totalPopulation = row.totalMale + row.totalFemale;

      return row;
    });

    rows.sort((a, b) => a.panchayatWard.localeCompare(b.panchayatWard));

    const totals = {
      panchayatWard: "TOTAL",
      noOfFamilies: rows.reduce((a, r) => a + r.noOfFamilies, 0),
      "0-3Male": rows.reduce((a, r) => a + r["0-3Male"], 0),
      "0-3Female": rows.reduce((a, r) => a + r["0-3Female"], 0),
      "0-3Total": rows.reduce((a, r) => a + r["0-3Total"], 0),

      "4-18Male": rows.reduce((a, r) => a + r["4-18Male"], 0),
      "4-18Female": rows.reduce((a, r) => a + r["4-18Female"], 0),
      "4-18Total": rows.reduce((a, r) => a + r["4-18Total"], 0),

      "19-40Male": rows.reduce((a, r) => a + r["19-40Male"], 0),
      "19-40Female": rows.reduce((a, r) => a + r["19-40Female"], 0),
      "19-40Total": rows.reduce((a, r) => a + r["19-40Total"], 0),

      "41-60Male": rows.reduce((a, r) => a + r["41-60Male"], 0),
      "41-60Female": rows.reduce((a, r) => a + r["41-60Female"], 0),
      "41-60Total": rows.reduce((a, r) => a + r["41-60Total"], 0),

      "61-75Male": rows.reduce((a, r) => a + r["61-75Male"], 0),
      "61-75Female": rows.reduce((a, r) => a + r["61-75Female"], 0),
      "61-75Total": rows.reduce((a, r) => a + r["61-75Total"], 0),

      "76+Male": rows.reduce((a, r) => a + r["76+Male"], 0),
      "76+Female": rows.reduce((a, r) => a + r["76+Female"], 0),
      "76+Total": rows.reduce((a, r) => a + r["76+Total"], 0),
    };

    totals.totalMale = rows.reduce((a, r) => a + r.totalMale, 0);
    totals.totalFemale = rows.reduce((a, r) => a + r.totalFemale, 0);
    totals.totalPopulation = rows.reduce((a, r) => a + r.totalPopulation, 0);

    res.json({
      success: true,
      data: [...rows, totals],
      summary: {
        totalWards: rows.length,
        totalFamilies: totals.noOfFamilies,
        totalPopulation: totals.totalPopulation,
        totalMale: totals.totalMale,
        totalFemale: totals.totalFemale,
      },
    });
  } catch (err) {
    console.error("Demographic report error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to generate report",
      error: err.message,
    });
  }
};


export const getWardHouseholdDetails = async (req, res) => {
  try {
    const { panchayath, wardNo } = req.query;

    if (!panchayath || !wardNo)
      return res.status(400).json({
        success: false,
        message: "panchayath & wardNo are required",
      });

    // 1. Get all households in ward
    const households = await SurveyForm.find({
      Panchayath: panchayath,
      WardNo: wardNo,
    });

    if (!households.length)
      return res.status(200).json({
        success: true,
        ward: { panchayath, wardNo },
        data: [],
        summary: {
          totalHouseholds: 0,
          totalMale: 0,
          totalFemale: 0,
          totalTrans: 0,
          totalPopulation: 0,
        },
      });

    let finalData = [];
    let totalMale = 0,
      totalFemale = 0,
      totalTrans = 0,
      totalPopulation = 0;
    let slNo = 1;

    for (const house of households) {
      const houseId = house._id;

      // 2. Fetch Family list
      const familyMembers = await Family.find({ Userid: houseId });

      // 3. Fetch category records for this household
      const newborn = await Newborn.find({ Userid: houseId });
      const children = await Childrens.find({ Userid: houseId });
      const youth = await Youth.find({ Userid: houseId });
      const middle = await Middleage.find({ Userid: houseId });
      const senior = await SeniorCitizen.find({ Userid: houseId });
      const superOld = await Supercitizen.find({ Userid: houseId });

      const categoryMembers = [
        ...newborn,
        ...children,
        ...youth,
        ...middle,
        ...senior,
        ...superOld,
      ];

      // Map Family → match category entry OR fallback
      let male = 0,
        female = 0,
        trans = 0;

      for (const fam of familyMembers) {
        const exact = categoryMembers.find(
          (c) => c.Familymemberid?.toString() === fam._id.toString()
        );

        const gender = (exact?.Gender || fam.Gender || "").toLowerCase();

        if (gender === "male") male++;
        else if (gender === "female") female++;
        else if (gender === "transgender") trans++;
      }

      const total = male + female + trans;

      totalMale += male;
      totalFemale += female;
      totalTrans += trans;
      totalPopulation += total;

      finalData.push({
        id: houseId,
        slNo: slNo++,
        houseNo: house.HouseNo,
        houseName: house.HouseName,
        familyHead: house.HouseholdHead,
        mobile: familyMembers[0]?.Phone || "",
        male,
        female,
        trans,
        total,
      });
    }

    return res.status(200).json({
      success: true,
      ward: { panchayath, wardNo },
      data: finalData,
      summary: {
        totalHouseholds: households.length,
        totalMale,
        totalFemale,
        totalTrans,
        totalPopulation,
      },
    });
  } catch (error) {
    console.error("❌ Ward household error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal error fetching ward households",
      error: error.message,
    });
  }
};

/**
 * ⭐ New: Get full details of a single household
 */

export const getHouseholdDetails = async (req, res) => {
  try {
    const { houseId } = req.query;

    if (!houseId || !mongoose.Types.ObjectId.isValid(houseId)) {
      return res.status(400).json({
        success: false,
        message: "Valid houseId is required"
      });
    }

    // 🔥 Fetch FULL Survey Form + who submitted it
    const house = await SurveyForm.findById(houseId)
      .populate("createdBy", "userName")
      .lean();

    if (!house) {
      return res.status(404).json({
        success: false,
        message: "House not found"
      });
    }

    // Fetch family members
    const members = await Family.find({ Userid: houseId }).select(
      "_id Name Gender Age Dob Phone Relation"
    );

    if (!members.length) {
      return res.json({
        success: true,
        house,
        submittedBy: house.createdBy, // 👈 explicit
        members: []
      });
    }

    const familyIds = members.map((m) => m._id.toString());

    // Fetch DOB from category collections
    const [newborns, childrens, youths, middles, seniors, supers] =
      await Promise.all([
        Newborn.find({ Familymemberid: { $in: familyIds } }).select("Familymemberid Dob"),
        Childrens.find({ Familymemberid: { $in: familyIds } }).select("Familymemberid Dob"),
        Youth.find({ Familymemberid: { $in: familyIds } }).select("Familymemberid Dob"),
        Middleage.find({ Familymemberid: { $in: familyIds } }).select("Familymemberid Dob"),
        SeniorCitizen.find({ Familymemberid: { $in: familyIds } }).select("Familymemberid Dob"),
        Supercitizen.find({ Familymemberid: { $in: familyIds } }).select("Familymemberid Dob")
      ]);

    const dobMap = new Map();
    [...newborns, ...childrens, ...youths, ...middles, ...seniors, ...supers].forEach((rec) => {
      if (rec.Familymemberid && rec.Dob?.trim()) {
        dobMap.set(rec.Familymemberid.toString(), rec.Dob);
      }
    });

    const formatted = members.map((m, i) => {
      const fid = m._id.toString();
      return {
        slNo: i + 1,
        id: fid,
        name: m.Name,
        gender: m.Gender,
        age: m.Age || null,
        dob: m.Dob?.trim() || dobMap.get(fid) || null,
        phone: m.Phone || "",
        relation: m.Relation || ""
      };
    });

    return res.json({
      success: true,
      house,                 // FULL survey form
      submittedBy: house.createdBy, // 👈 who submitted
      members: formatted
    });

  } catch (err) {
    console.error("House details error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch details",
      error: err.message
    });
  }
};

export const exportWardHouseholdsCSV = async (req, res) => {
  try {
    const { panchayath, wardNo } = req.query;

    if (!panchayath || !wardNo) {
      return res.status(400).json({
        success: false,
        message: "Both panchayath and wardNo are required",
      });
    }

    // Reuse main logic
    const mockRes = {
      json: (data) => data,
      status: () => mockRes,
    };

    const mockReq = { query: { panchayath, wardNo } };
    const reportData = await getWardHouseholdDetails(mockReq, mockRes);

    if (!reportData.success) {
      return res.status(500).json(reportData);
    }

    const headers = [
      "Sl.No",
      "House No.",
      "House Name",
      "Family Head",
      "Mobile",
      "Male",
      "Female",
      "Trans",
      "Total",
    ];

    const csvRows = [headers.join(",")];

    reportData.data.forEach((row) => {
      csvRows.push(
        [
          row.slNo,
          `"${row.houseNo}"`,
          `"${row.houseName}"`,
          `"${row.familyHead}"`,
          row.mobile,
          row.male,
          row.female,
          row.trans,
          row.total,
        ].join(",")
      );
    });

    // Totals row
    csvRows.push(
      [
        "",
        "",
        "",
        "TOTAL",
        "",
        reportData.summary.totalMale,
        reportData.summary.totalFemale,
        reportData.summary.totalTrans,
        reportData.summary.totalPopulation,
      ].join(",")
    );

    const csv = csvRows.join("\n");
    const filename = `${panchayath}_Ward${wardNo}_HouseholdReport.csv`;

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(csv);
  } catch (err) {
    console.error("CSV export error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to export ward households CSV",
      error: err.message,
    });
  }
};

export const getIndividualReportDetails = async (req, res) => {
  try {
    const { familyId } = req.query;

    // Validation
    if (!familyId || !mongoose.Types.ObjectId.isValid(familyId)) {
      return res.status(400).json({
        success: false,
        message: "Valid familyId is required",
      });
    }

    // Fetch family base record
    const family = await Family.findById(familyId).lean();
    if (!family) {
      return res.status(404).json({
        success: false,
        message: "Family member not found",
      });
    }

    // Fetch category-specific record
    const [newborn, child, youth, middleage, senior, supercitizen] =
      await Promise.all([
        Newborn.findOne({ Familymemberid: familyId }).lean(),
        Childrens.findOne({ Familymemberid: familyId }).lean(),
        Youth.findOne({ Familymemberid: familyId }).lean(),
        Middleage.findOne({ Familymemberid: familyId }).lean(),
        SeniorCitizen.findOne({ Familymemberid: familyId }).lean(),
        Supercitizen.findOne({ Familymemberid: familyId }).lean(),
      ]);

    let category = null;
    let formData = null;

    if (newborn) {
      category = "Newborn";
      formData = newborn;
    } else if (child) {
      category = "Children";
      formData = child;
    } else if (youth) {
      category = "Youth";
      formData = youth;
    } else if (middleage) {
      category = "MiddleAge";
      formData = middleage;
    } else if (senior) {
      category = "SeniorCitizen";
      formData = senior;
    } else if (supercitizen) {
      category = "SuperCitizen";
      formData = supercitizen;
    }

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "No individual form record found for this member",
      });
    }

    // Remove unnecessary fields
    delete formData.__v;
    delete formData.createdAt;
    delete formData.updatedAt;

    // Response
    return res.json({
      success: true,
      member: {
        id: family._id,
        name: family.Name,
        age: family.Age,
        gender: family.Gender,
        relation: family.Relation,
        phone: family.Phone,
        category,
      },
      formData,
    });
  } catch (error) {
    console.error("Individual details error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch individual details",
      error: error.message,
    });
  }
};

export const checkDatabaseHealth = async (req, res) => {
  try {
    const households = await SurveyForm.find();
    const families = await Family.find();

    const householdMap = new Map(households.map((h) => [h._id.toString(), h]));

    // 1️⃣ Members Missing Gender
    const missingGender = families.filter(
      (f) => !f.Gender || f.Gender.trim() === ""
    );

    // 2️⃣ Members Missing DOB
    const missingDOB = families.filter((f) => !f.Dob || f.Dob.trim() === "");

    // 3️⃣ Members Missing Age (and no valid DOB)
    const missingAge = families.filter((f) => {
      const noAge = !f.Age || f.Age.toString().trim() === "";
      const noDob = !f.Dob || f.Dob.toString().trim() === "";
      return noAge && noDob;
    });

    // 4️⃣ Orphaned Family Members (Userid doesn't exist in SurveyForm)
    const orphanedMembers = families.filter(
      (f) => !householdMap.has(f.Userid?.toString())
    );

    // 5️⃣ Duplicate house numbers inside same ward
    const duplicates = [];
    let houseKeyMap = {};

    households.forEach((h) => {
      const key = `${h.Panchayath}-${h.WardNo}-${h.HouseNo}`.toLowerCase();
      if (!houseKeyMap[key]) houseKeyMap[key] = [];
      houseKeyMap[key].push(h);
    });

    Object.values(houseKeyMap).forEach((list) => {
      if (list.length > 1) duplicates.push(list);
    });

    // 6️⃣ Households with 0 family members
    const householdsWithZeroMembers = households.filter(
      (h) => !families.some((f) => f.Userid.toString() === h._id.toString())
    );

    res.json({
      success: true,
      summary: {
        totalHouseholds: households.length,
        totalFamilyMembers: families.length,
      },
      issues: {
        missingGender: missingGender.length,
        missingDOB: missingDOB.length,
        missingBothAgeAndDOB: missingAge.length,
        orphanedMembers: orphanedMembers.length,
        duplicateHouses: duplicates.length,
        householdsWithZeroMembers: householdsWithZeroMembers.length,
      },
      details: {
        missingGender,
        missingDOB,
        missingAge,
        orphanedMembers,
        duplicates,
        householdsWithZeroMembers,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "DB Health Check Failed",
      error: error.message,
    });
  }
};


export const exportDemographicReportExcel = async (req, res) => {
  try {
    const mockRes = {
      json: (data) => data,
      status: () => mockRes
    };

    const report = await getDemographicReport(req, mockRes);

    if (!report.success) {
      return res.status(500).json(report);
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Demographic Report");

    sheet.columns = [
      { header: "Panchayat / Ward", key: "panchayatWard", width: 30 },
      { header: "Families", key: "noOfFamilies", width: 12 },

      { header: "0-3 Male", key: "0-3Male", width: 10 },
      { header: "0-3 Female", key: "0-3Female", width: 12 },
      { header: "0-3 Total", key: "0-3Total", width: 12 },

      { header: "4-18 Male", key: "4-18Male", width: 12 },
      { header: "4-18 Female", key: "4-18Female", width: 14 },
      { header: "4-18 Total", key: "4-18Total", width: 14 },

      { header: "19-40 Male", key: "19-40Male", width: 14 },
      { header: "19-40 Female", key: "19-40Female", width: 16 },
      { header: "19-40 Total", key: "19-40Total", width: 16 },

      { header: "41-60 Male", key: "41-60Male", width: 14 },
      { header: "41-60 Female", key: "41-60Female", width: 16 },
      { header: "41-60 Total", key: "41-60Total", width: 16 },

      { header: "61-75 Male", key: "61-75Male", width: 14 },
      { header: "61-75 Female", key: "61-75Female", width: 16 },
      { header: "61-75 Total", key: "61-75Total", width: 16 },

      { header: "76+ Male", key: "76+Male", width: 12 },
      { header: "76+ Female", key: "76+Female", width: 14 },
      { header: "76+ Total", key: "76+Total", width: 14 },

      { header: "Total Male", key: "totalMale", width: 14 },
      { header: "Total Female", key: "totalFemale", width: 16 },
      { header: "Population", key: "totalPopulation", width: 16 }
    ];

    report.data.forEach(row => sheet.addRow(row));

    sheet.getRow(1).font = { bold: true };

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Demographic_Report.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (err) {
    console.error("Demographic Excel error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to export demographic Excel",
      error: err.message
    });
  }
};


export const exportWardHouseholdsExcel = async (req, res) => {
  try {
    const mockRes = {
      json: (data) => data,
      status: () => mockRes
    };

    const report = await getWardHouseholdDetails(req, mockRes);

    if (!report.success) {
      return res.status(500).json(report);
    }

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Ward Households");

    sheet.columns = [
      { header: "Sl No", key: "slNo", width: 8 },
      { header: "House No", key: "houseNo", width: 25 },
      { header: "House Name", key: "houseName", width: 25 },
      { header: "Family Head", key: "familyHead", width: 25 },
      { header: "Mobile", key: "mobile", width: 15 },
      { header: "Male", key: "male", width: 10 },
      { header: "Female", key: "female", width: 10 },
      { header: "Trans", key: "trans", width: 10 },
      { header: "Total", key: "total", width: 10 }
    ];

    report.data.forEach(row => sheet.addRow(row));

    sheet.getRow(1).font = { bold: true };

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${req.query.panchayath}_Ward_${req.query.wardNo}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Ward household Excel failed",
      error: err.message
    });
  }
};


