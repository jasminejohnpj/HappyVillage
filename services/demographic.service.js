import SurveyForm from "../model/surveyForm.js";
import Family from "../model/familyMembers.js";
import Newborn from "../model/newborn.js";
import Childrens from "../model/children.js";
import Youth from "../model/youth.js";
import Middleage from "../model/middleAge.js";
import SeniorCitizen from "../model/seniorCitizen.js";
import Supercitizen from "../model/superCitizen.js";

const calculateAge = (dob) => {
  const d = new Date(dob);
  if (isNaN(d)) return null;
  let age = new Date().getFullYear() - d.getFullYear();
  return age;
};

const getAgeCategory = (age) => {
  if (age <= 3) return "0-3";
  if (age <= 18) return "4-18";
  if (age <= 40) return "19-40";
  if (age <= 60) return "41-60";
  if (age <= 75) return "61-75";
  return "76+";
};

export const buildDemographicReport = async ({ panchayath, wardNo }) => {
  const filter = {};
  if (panchayath) filter.Panchayath = panchayath;
  if (wardNo) filter.WardNo = wardNo;

  const households = await SurveyForm.find(filter).select("_id Panchayath WardNo");
  if (!households.length) {
    return { rows: [], totals: {}, summary: {} };
  }

  const householdIds = households.map(h => h._id);
  const members = await Family.find({ Userid: { $in: householdIds } });

  const categoryData = await Promise.all([
    Newborn.find({ Userid: { $in: householdIds } }),
    Childrens.find({ Userid: { $in: householdIds } }),
    Youth.find({ Userid: { $in: householdIds } }),
    Middleage.find({ Userid: { $in: householdIds } }),
    SeniorCitizen.find({ Userid: { $in: householdIds } }),
    Supercitizen.find({ Userid: { $in: householdIds } })
  ]);

  const dobMap = new Map();
  categoryData.flat().forEach(r => {
    if (r.Familymemberid && r.Dob) {
      dobMap.set(r.Familymemberid.toString(), r.Dob);
    }
  });

  const wardData = {};

  households.forEach(h => {
    const key = `${h.Panchayath} ${h.WardNo}`;
    if (!wardData[key]) {
      wardData[key] = {
        families: new Set(),
        demographics: {
          "0-3": { male: 0, female: 0 },
          "4-18": { male: 0, female: 0 },
          "19-40": { male: 0, female: 0 },
          "41-60": { male: 0, female: 0 },
          "61-75": { male: 0, female: 0 },
          "76+": { male: 0, female: 0 }
        }
      };
    }
    wardData[key].families.add(h._id.toString());
  });

  members.forEach(m => {
    const h = households.find(x => x._id.equals(m.Userid));
    if (!h) return;

    const key = `${h.Panchayath} ${h.WardNo}`;
    const dob = dobMap.get(m._id.toString());
    const age = dob ? calculateAge(dob) : parseInt(m.Age);
    const ageGroup = getAgeCategory(age);

    if (!ageGroup) return;
    if (m.Gender?.toLowerCase() === "male") wardData[key].demographics[ageGroup].male++;
    if (m.Gender?.toLowerCase() === "female") wardData[key].demographics[ageGroup].female++;
  });

  const rows = Object.entries(wardData).map(([key, v]) => {
    const d = v.demographics;
    const row = { panchayatWard: key, noOfFamilies: v.families.size };
    let tm = 0, tf = 0;

    Object.keys(d).forEach(k => {
      row[`${k}Male`] = d[k].male;
      row[`${k}Female`] = d[k].female;
      row[`${k}Total`] = d[k].male + d[k].female;
      tm += d[k].male;
      tf += d[k].female;
    });

    row.totalMale = tm;
    row.totalFemale = tf;
    row.totalPopulation = tm + tf;
    return row;
  });

  const totals = rows.reduce((a, r) => {
    Object.keys(r).forEach(k => {
      if (typeof r[k] === "number") a[k] = (a[k] || 0) + r[k];
    });
    return a;
  }, { panchayatWard: "TOTAL" });

  return {
    rows,
    totals,
    summary: {
      totalWards: rows.length,
      totalFamilies: totals.noOfFamilies,
      totalPopulation: totals.totalPopulation,
      totalMale: totals.totalMale,
      totalFemale: totals.totalFemale
    }
  };
};
