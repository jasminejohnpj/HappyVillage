import SurveyForm from "../model/surveyForm.js";
import Family from "../model/familyMembers.js";
import XLSX from "xlsx";
import SurveyData from "../model/surveydata.js";
import ExcelJS from "exceljs";



export const downloadExcel = async (req, res, next) => {
  try {
    const { data, filename = "report.xlsx", heading = "Report Data" } = req.body;

    // Validation
    if (!data || !Array.isArray(data) || data.length === 0) {
      return res.status(400).json({ message: "No data provided to generate Excel" });
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Add heading row
    worksheet.mergeCells("A1", String.fromCharCode(64 + Object.keys(data[0]).length) + "1");
    const titleCell = worksheet.getCell("A1");
    titleCell.value = heading;
    titleCell.font = { size: 16, bold: true };
    titleCell.alignment = { horizontal: "center" };

    // Add header row
    worksheet.addRow(Object.keys(data[0]));

    // Add data rows
    data.forEach(item => {
      // Flatten nested objects like HeadDetails if needed
      const row = Object.values(item).map(value => {
        if (Array.isArray(value)) {
          return JSON.stringify(value); // Convert arrays to string
        } else if (typeof value === "object" && value !== null) {
          return JSON.stringify(value);
        } else {
          return value;
        }
      });
      worksheet.addRow(row);
    });

    // Auto width for columns
    worksheet.columns.forEach(column => {
      let maxLength = 10;
      column.eachCell({ includeEmpty: true }, cell => {
        const cellLength = cell.value ? cell.value.toString().length : 0;
        if (cellLength > maxLength) maxLength = cellLength;
      });
      column.width = maxLength + 2;
    });

    // Write workbook to buffer
    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename}"`
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


export const rationCardReport = async (req, res, next) => {
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
 const flattenedResult = result.map(item => {
      const head = item.HeadDetails[0] || {};
      return {
        _id: item._id,
        Panchayath: item.Panchayath,
        WardNo: item.WardNo,
        HouseName: item.HouseName,
        HouseNo: item.HouseNo,
        HouseholdHead: item.HouseholdHead,
        Phone: head.Phone || "",
        Age: head.Age || "",
      };
    });
    return res.status(200).json(flattenedResult);
  } catch (error) {
    next(error);
  }
};

export const gasTypes = async(req,res, next)=>{
  try{
    
   const values = await SurveyForm.distinct("GasConnection");
    return res.status(200).json(values );

  } catch(error){
    next(error.message);
  }
}

export const gasConnectionReport = async (req, res, next) => {
  try {
    const { Panchayath, WardNo, GasConnection } = req.body;

    if (GasConnection === undefined || GasConnection === null) {
      return res.status(400).json({ message: "GasConnection value is required" });
    }

    const filter = { GasConnection: GasConnection }; //  direct boolean match

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
          HeadDetails: 1,
        },
      },
      { $sort: { HouseNo: 1 } },
    ]);
 const flattenedResult = result.map(item => {
      const head = item.HeadDetails[0] || {};
      return {
        _id: item._id,
        Panchayath: item.Panchayath,
        WardNo: item.WardNo,
        HouseName: item.HouseName,
        HouseNo: item.HouseNo,
        HouseholdHead: item.HouseholdHead,
        Phone: head.Phone || "",
        Age: head.Age || "",
      };
    });
    return res.status(200).json(flattenedResult);
  } catch (error) {
    next(error.message);
  }
};

export const WoodStoveReport = async(req,res, next)=>{
  try{
    const { Panchayath, WardNo, TypeofWoodStove } = req.query;

    if (!TypeofWoodStove || TypeofWoodStove.trim() === "") {
      return res.status(400).json({ message: "TypeofWoodStove must be required" });
    }
     const filter = {
      TypeofWoodStove: { $regex: `^${TypeofWoodStove.trim()}$`, $options: "i" },
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
  const flattenedResult = result.map(item => {
      const head = item.HeadDetails[0] || {};
      return {
        _id: item._id,
        Panchayath: item.Panchayath,
        WardNo: item.WardNo,
        HouseName: item.HouseName,
        HouseNo: item.HouseNo,
        HouseholdHead: item.HouseholdHead,
        Phone: head.Phone || "",
        Age: head.Age || "",
      };
    });

    return res.status(200).json(flattenedResult);
  } catch (error) {
    next(error);
  }
};

export const electricityTypes = async(req,res, next)=>{
  try{
    const values = await SurveyForm.distinct("Electricity");
    return res.status(200).json(values);
  } catch(error){
    next(error.message);
  }
}

export const electricityReport = async(req, res,next)=>{
  try{
     const { Panchayath, WardNo, Electricity } = req.body;

    if (Electricity === undefined || Electricity === null) {
      return res.status(400).json({ message: "Electricity value is required" });
    }
const filter = { Electricity: Electricity }; //  direct boolean match

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
          HeadDetails: 1,
        },
      },
      { $sort: { HouseNo: 1 } },
    ]);
 const flattenedResult = result.map(item => {
      const head = item.HeadDetails[0] || {};
      return {
        _id: item._id,
        Panchayath: item.Panchayath,
        WardNo: item.WardNo,
        HouseName: item.HouseName,
        HouseNo: item.HouseNo,
        HouseholdHead: item.HouseholdHead,
        Phone: head.Phone || "",
        Age: head.Age || "",
      };
    });
    return res.status(200).json(flattenedResult);
  } catch (error) {
    next(error.message);
  }
};

export const solarTypes = async(req,res, next)=>{
  try{
    const values = await SurveyForm.distinct("Solar");
    return res.status(200).json(values);
  } catch(error){
    next(error.message);
  }
}

export const solarReport = async (req, res, next) => {
  try {
    const { Panchayath, WardNo, Solar } = req.body;

    if (Solar === undefined || Solar === null) {
      return res.status(400).json({ message: "Solar value is required" });
    }

    const filter = { Solar: Solar }; // direct boolean match

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
          HeadDetails: 1,
        },
      },
      { $sort: { HouseNo: 1 } },
    ]);

    // Flatten HeadDetails to make it Excel-friendly
    const flattenedResult = result.map(item => {
      const head = item.HeadDetails[0] || {};
      return {
        _id: item._id,
        Panchayath: item.Panchayath,
        WardNo: item.WardNo,
        HouseName: item.HouseName,
        HouseNo: item.HouseNo,
        HouseholdHead: item.HouseholdHead,
        Phone: head.Phone || "",
        Age: head.Age || "",
      };
    });

    return res.status(200).json(flattenedResult);
  } catch (error) {
    next(error);
  }
};

export const areawiseHouseReport = async(req,res,next)=>{
  try{
     const { Panchayath, WardNo, AreaofHouse } = req.query;

    if (!AreaofHouse || AreaofHouse.trim() === "") {
      return res.status(400).json({ message: "AreaofHouse must be required" });
    }
     const filter = {
      AreaofHouse: { $regex: `^${AreaofHouse.trim()}$`, $options: "i" },
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
  const flattenedResult = result.map(item => {
      const head = item.HeadDetails[0] || {};
      return {
        _id: item._id,
        Panchayath: item.Panchayath,
        WardNo: item.WardNo,
        HouseName: item.HouseName,
        HouseNo: item.HouseNo,
        HouseholdHead: item.HouseholdHead,
        Phone: head.Phone || "",
        Age: head.Age || "",
      };
    });

    return res.status(200).json(flattenedResult);
  } catch (error) {
    next(error);
  }
};

export const houseReport = async(req,res, next) =>{
  try{
     const { Panchayath, WardNo, TypeofHouse } = req.query;

    if (!TypeofHouse || TypeofHouse.trim() === "") {
      return res.status(400).json({ message: "TypeofHouse must be required" });
    }
     const filter = {
      TypeofHouse: { $regex: `^${TypeofHouse.trim()}$`, $options: "i" },
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
  const flattenedResult = result.map(item => {
      const head = item.HeadDetails[0] || {};
      return {
        _id: item._id,
        Panchayath: item.Panchayath,
        WardNo: item.WardNo,
        HouseName: item.HouseName,
        HouseNo: item.HouseNo,
        HouseholdHead: item.HouseholdHead,
        Phone: head.Phone || "",
        Age: head.Age || "",
      };
    });

    return res.status(200).json(flattenedResult);
  } catch (error) {
    next(error);
  }
};

export const paddyLandReport = async (req, res, next) => {
  try {
    const { Panchayath, WardNo, AreaofLand_Paddyland } = req.query;

    if (!AreaofLand_Paddyland || AreaofLand_Paddyland.trim() === "") {
      return res.status(400).json({ message: "AreaofLand_Paddyland is required" });
    }

    const filter = {
      AreaofLand_Paddyland: { $ne: "" }, //  Only non-empty records
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
        $addFields: {
          AreaofLand_Paddyland_Num: {
            $toDouble: {
              $cond: [
                { $regexMatch: { input: "$AreaofLand_Paddyland", regex: "^[0-9.]+$" } },
                "$AreaofLand_Paddyland",
                0,
              ],
            },
          },
        },
      },

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
          AreaofLand_Paddyland: 1,
          AreaofLand_Paddyland_Num: 1,
          HeadDetails: 1,
        },
      },

      { $sort: { HouseNo: 1 } },
    ]);

    // Flatten and compute sum
    let totalPaddyLand = 0;
    const flattenedResult = result.map((item) => {
      const head = item.HeadDetails[0] || {};
      const numericValue = Number(item.AreaofLand_Paddyland_Num) || 0;
      totalPaddyLand += numericValue;
      return {
        _id: item._id,
        Panchayath: item.Panchayath,
        WardNo: item.WardNo,
        HouseName: item.HouseName,
        HouseNo: item.HouseNo,
        HouseholdHead: item.HouseholdHead,
        AreaofLand_Paddyland: item.AreaofLand_Paddyland || "",
        Phone: head.Phone || "",
        Age: head.Age || "",
      };
    });

    return res.status(200).json({
      totalPaddyLand: totalPaddyLand, //  total sum
      records: flattenedResult, // filtered data
    });
  } catch (error) {
    next(error);
  }
};

export const dryLandReport = async (req, res, next) => {
  try {
    const { Panchayath, WardNo, AreaofLand_Dryland } = req.query;

    if (!AreaofLand_Dryland || AreaofLand_Dryland.trim() === "") {
      return res.status(400).json({ message: "AreaofLand_Dryland is required" });
    }

    const filter = {
      AreaofLand_Dryland: { $ne: "" }, //  Only non-empty records
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
        $addFields: {
         AreaofLand_Dryland_Num: {
            $toDouble: {
              $cond: [
                { $regexMatch: { input: "$AreaofLand_Dryland", regex: "^[0-9.]+$" } },
                "$AreaofLand_Dryland",
                0,
              ],
            },
          },
        },
      },

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
          AreaofLand_Dryland: 1,
         AreaofLand_Dryland_Num: 1,
          HeadDetails: 1,
        },
      },

      { $sort: { HouseNo: 1 } },
    ]);

    let totalDryLand = 0;
    const flattenedResult = result.map((item) => {
      const head = item.HeadDetails[0] || {};
      const numericValue = Number(item.AreaofLand_Dryland) || 0;
      totalDryLand += numericValue;
      return {
        _id: item._id,
        Panchayath: item.Panchayath,
        WardNo: item.WardNo,
        HouseName: item.HouseName,
        HouseNo: item.HouseNo,
        HouseholdHead: item.HouseholdHead,
        AreaofLand_Dryland: item.AreaofLand_Dryland || "",
        Phone: head.Phone || "",
        Age: head.Age || "",
      };
    });

    return res.status(200).json({
      totalDryLand: totalDryLand, //  total sum
      records: flattenedResult,
    });
  } catch (error) {
    next(error);
  }
};

export const wetLandReport = async (req, res, next) => {
  try {
    const { Panchayath, WardNo, AreaofLand_Wetland } = req.query;

    if (!AreaofLand_Wetland || AreaofLand_Wetland.trim() === "") {
      return res.status(400).json({ message: "AreaofLand_Wetland is required" });
    }

    const filter = {
      AreaofLand_Wetland: { $ne: "" }, //  Only non-empty records
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
        $addFields: {
         AreaofLand_Wetland_Num: {
            $toDouble: {
              $cond: [
                { $regexMatch: { input: "$AreaofLand_Wetland", regex: "^[0-9.]+$" } },
                "$AreaofLand_Wetland",
                0,
              ],
            },
          },
        },
      },

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
          AreaofLand_Wetland: 1,
         AreaofLand_Wetland_Num: 1,
          HeadDetails: 1,
        },
      },

      { $sort: { HouseNo: 1 } },
    ]);

    let totalWetLand = 0;
    const flattenedResult = result.map((item) => {
      const head = item.HeadDetails[0] || {};
      const numericValue = Number(item.AreaofLand_Wetland) || 0;
      totalWetLand += numericValue;
      return {
        _id: item._id,
        Panchayath: item.Panchayath,
        WardNo: item.WardNo,
        HouseName: item.HouseName,
        HouseNo: item.HouseNo,
        HouseholdHead: item.HouseholdHead,
        AreaofLand_Wetland: item.AreaofLand_Wetland || "",
        Phone: head.Phone || "",
        Age: head.Age || "",
      };
    });

    return res.status(200).json({
      totalWetLand: totalWetLand, //  total sum
      records: flattenedResult,
    });
  } catch (error) {
    next(error);
  }
};

export const PondReport = async(req,res, next)=>{
  try{
     const { Panchayath, WardNo, AreaofLand_Pond } = req.query;

    if (!AreaofLand_Pond || AreaofLand_Pond.trim() === "") {
      return res.status(400).json({ message: "AreaofLand_Pond is required" });
    }

    const filter = {
      AreaofLand_Pond: { $ne: "" }, //  Only non-empty records
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
        $addFields: {
         AreaofLand_Pond_Num: {
            $toDouble: {
              $cond: [
                { $regexMatch: { input: "$AreaofLand_Pond", regex: "^[0-9.]+$" } },
                "$AreaofLand_Pond",
                0,
              ],
            },
          },
        },
      },

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
          AreaofLand_Pond: 1,
         AreaofLand_Pond_Num: 1,
          HeadDetails: 1,
        },
      },

      { $sort: { HouseNo: 1 } },
    ]);

    let totalPondArea = 0;
    const flattenedResult = result.map((item) => {
      const head = item.HeadDetails[0] || {};
      const numericValue = Number(item.AreaofLand_Pond) || 0;
      totalPondArea += numericValue;
      return {
        _id: item._id,
        Panchayath: item.Panchayath,
        WardNo: item.WardNo,
        HouseName: item.HouseName,
        HouseNo: item.HouseNo,
        HouseholdHead: item.HouseholdHead,
        AreaofLand_Pond: item.AreaofLand_Pond || "",
        Phone: head.Phone || "",
        Age: head.Age || "",
      };
    });

    return res.status(200).json({
      totalPondArea: totalPondArea, //  total sum
      records: flattenedResult,
    });
  } catch (error) {
    next(error);
  }
}

export const ChaaluAreaReport = async(req,res, next)=>{
  try{
     const { Panchayath, WardNo, AreaofLand_Chaalu } = req.query;

    if (!AreaofLand_Chaalu || AreaofLand_Chaalu.trim() === "") {
      return res.status(400).json({ message: "AreaofLand_Chaalu is required" });
    }

    const filter = {
      AreaofLand_Chaalu: { $ne: "" }, //  Only non-empty records
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
        $addFields: {
         AreaofLand_Chaalu_Num: {
            $toDouble: {
              $cond: [
                { $regexMatch: { input: "$AreaofLand_Chaalu", regex: "^[0-9.]+$" } },
                "$AreaofLand_Chaalu",
                0,
              ],
            },
          },
        },
      },

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
          AreaofLand_Chaalu: 1,
         AreaofLand_Chaalu_Num: 1,
          HeadDetails: 1,
        },
      },

      { $sort: { HouseNo: 1 } },
    ]);

    let totalChaaluArea = 0;
    const flattenedResult = result.map((item) => {
      const head = item.HeadDetails[0] || {};
      const numericValue = Number(item.AreaofLand_Chaalu) || 0;
      totalChaaluArea += numericValue;
      return {
        _id: item._id,
        Panchayath: item.Panchayath,
        WardNo: item.WardNo,
        HouseName: item.HouseName,
        HouseNo: item.HouseNo,
        HouseholdHead: item.HouseholdHead,
        AreaofLand_Chaalu: item.AreaofLand_Chaalu || "",
        Phone: head.Phone || "",
        Age: head.Age || "",
      };
    });

    return res.status(200).json({
      totalChaaluArea: totalChaaluArea, //  total sum
      records: flattenedResult,
    });
  } catch (error) {
    next(error);
  }
}

export const CurrentCultivationReport = async(req,res, next)=>{
  try{
     const { Panchayath, WardNo, CurrentCultivationDetails } = req.query;

    if (!CurrentCultivationDetails || CurrentCultivationDetails.trim() === "") {
      return res.status(400).json({ message: "CurrentCultivationDetails is required" });
    }

    const filter = {
      CurrentCultivationDetails: { $ne: "" }, //  Only non-empty records
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
        $addFields: {
        CurrentCultivationDetails_Num: {
            $toDouble: {
              $cond: [
                { $regexMatch: { input: "$CurrentCultivationDetails", regex: "^[0-9.]+$" } },
                "$CurrentCultivationDetails",
                0,
              ],
            },
          },
        },
      },

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
          CurrentCultivationDetails: 1,
         CurrentCultivationDetails_Num: 1,
          HeadDetails: 1,
        },
      },

      { $sort: { HouseNo: 1 } },
    ]);

    let totalChaaluArea = 0;
    const flattenedResult = result.map((item) => {
      const head = item.HeadDetails[0] || {};
      const numericValue = Number(item.CurrentCultivationDetails) || 0;
      totalCultivationArea += numericValue;
      return {
        _id: item._id,
        Panchayath: item.Panchayath,
        WardNo: item.WardNo,
        HouseName: item.HouseName,
        HouseNo: item.HouseNo,
        HouseholdHead: item.HouseholdHead,
        CurrentCultivationDetails: item.CurrentCultivationDetails || "",
        Phone: head.Phone || "",
        Age: head.Age || "",
      };
    });

    return res.status(200).json({
      totalCultivationArea: totalCultivationArea, //  total sum
      records: flattenedResult,
    });
  } catch (error) {
    next(error);
  }
}