import SurveyForm from "../model/surveyForm.js";
import Family from "../model/familyMembers.js";
import XLSX from "xlsx";



export const rationCardType = async (req, res, next) => {
  try {
    const { Panchayath, WardNo, RationCardType } = req.query;

    if (!RationCardType || RationCardType.trim() === "") {
      return res.status(400).json({ message: "Card type must be required" });
    }

    const filter = {
      RationCardType: { $regex: `^${RationCardType.trim()}$`, $options: "i" },
    };

    if (Panchayath && Panchayath.trim() !== "") {
      filter.Panchayath = { $regex: `^${Panchayath.trim()}$`, $options: "i" };
    }

    if (WardNo && WardNo.trim() !== "") {
      filter.WardNo = { $regex: `^${WardNo.trim()}$`, $options: "i" };
    }

    const result = await SurveyForm.aggregate([
      { $match: filter },

      {
        $lookup: {
          from: "families", 
          let: { householdId: "$_id", headName: "$HouseholdHead" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$Userid", "$$householdId"] },
                    {
                      $regexMatch: {
                        input: "$Name",
                        regex: "$$headName",
                        options: "i",
                      },
                    },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 0,
                Phone: 1,
                Age: 1,
              },
            },
          ],
          as: "HeadDetails",
        },
      },

      {
        $project: {
          _id: 1,
          Panchayath: 1,
          WardNo: 1,
          HouseName: 1,
          HouseNo: 1,
          HouseholdHead: 1,
          HeadDetails: 1,
        },
      },

      { $sort: { HouseNo: 1 } },
    ]);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};



export const rationCardTypeExcel = async (req, res, next) => {
  try {
    const { Panchayath, WardNo, RationCardType } = req.query;

    if (!RationCardType || RationCardType.trim() === "") {
      return res.status(400).json({ message: "Card type must be required" });
    }

    const filter = {
      RationCardType: { $regex: `^${RationCardType.trim()}$`, $options: "i" },
    };
    if (Panchayath && Panchayath.trim() !== "")
      filter.Panchayath = { $regex: `^${Panchayath.trim()}$`, $options: "i" };
    if (WardNo && WardNo.trim() !== "")
      filter.WardNo = { $regex: `^${WardNo.trim()}$`, $options: "i" };

    const data = await SurveyForm.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: "families",
          let: { householdId: "$_id", headName: "$HouseholdHead" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$Userid", "$$householdId"] },
                    {
                      $regexMatch: {
                        input: "$Name",
                        regex: "$$headName",
                        options: "i",
                      },
                    },
                  ],
                },
              },
            },
            { $project: { _id: 0, Phone: 1, Age: 1 } },
          ],
          as: "HeadDetails",
        },
      },
      {
        $project: {
          _id: 1,
          Panchayath: 1,
          WardNo: 1,
          HouseName: 1,
          HouseNo: 1,
          HouseholdHead: 1,
          "HeadDetails.Phone": 1,
          "HeadDetails.Age": 1,
        },
      },
      { $sort: { HouseNo: 1 } },
    ]);

    if (!data.length) {
      return res.status(404).json({ message: "No data found" });
    }

    const formatted = data.map((item) => ({
      Panchayath: item.Panchayath || "",
      WardNo: item.WardNo || "",
      HouseName: item.HouseName || "",
      HouseNo: item.HouseNo || "",
      HouseholdHead: item.HouseholdHead || "",
      Phone: item.HeadDetails?.[0]?.Phone || "",
      Age: item.HeadDetails?.[0]?.Age || "",
    }));

    const date = new Date().toLocaleDateString("en-IN");
    const heading = [
      [
        `Ration Card Report - Generated on ${date}${
          Panchayath ? ` | Panchayath: ${Panchayath}` : ""
        }${WardNo ? ` | Ward: ${WardNo}` : ""}`,
      ],
    ];

    const wsData = [
      ...heading, 
      [], 
      [
        "Panchayath",
        "WardNo",
        "HouseName",
        "HouseNo",
        "HouseholdHead",
        "Phone",
        "Age",
      ],
      ...formatted.map((item) => [
        item.Panchayath,
        item.WardNo,
        item.HouseName,
        item.HouseNo,
        item.HouseholdHead,
        item.Phone,
        item.Age,
      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    if (!ws["!merges"]) ws["!merges"] = [];
    ws["!merges"].push({ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }); 

    const colWidths = [
      { wch: 15 }, // Panchayath
      { wch: 10 }, // WardNo
      { wch: 20 }, // HouseName
      { wch: 10 }, // HouseNo
      { wch: 20 }, // HouseholdHead
      { wch: 15 }, // Phone
      { wch: 8 }, // Age
    ];
    ws["!cols"] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "RationCardData");

    const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=rationCardData_${Date.now()}.xlsx`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    return res.send(buffer);
  } catch (error) {
    next(error);
  }
};
