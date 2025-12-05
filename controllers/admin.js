import bcrypt from "bcrypt";
import superAdmin from "../model/superAdmin.js";
import surveydata from "../model/surveydata.js";
import SurveyForm from "../model/surveyForm.js";
import Family from "../model/familyMembers.js";
import Newborn from "../model/newborn.js";
import Childrens from "../model/children.js";
import Youth from "../model/youth.js";
import Middleage from "../model/middleAge.js";
import SeniorCitizen from "../model/seniorCitizen.js";
import Supercitizen from "../model/superCitizen.js";
import mongoose from "mongoose";



export const registerSuperAdmin = async (req, res, next) => {
  try {
    const { userName, mobile, password } = req.body;

    const admin = await superAdmin.findOne({ mobile });
    if (admin) {
      return res.status(409).json({ message: "Super Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new superAdmin({
      name: userName,
      mobile,
      password: hashedPassword,
    });

    await newUser.save();

    return res
      .status(200)
      .json({ message: "Super Admin registered successfully", newUser });
  } catch (error) {
    next(error);
  }
};

export const loginSuperAdmin = async (req, res, next) => {
  try {
    const { mobile, password } = req.body;

    const admin = await superAdmin.findOne({ mobile });
    if (!admin) {
      return res.status(404).json({ message: "admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // example: create token and send response
    // const token = createToken(admin._id);
    return res.status(200).json({
      success: true,
      message: "Login successful",
      admin,
      // token,
    });
  } catch (error) {
    next(error);
  }
};

// export const allCounts = async (req, res, next) => {
//   try {
//     const counts = await SurveyForm.aggregate([
//       {
//         $match: {
//           Panchayath: { $nin: ["0", null, ""] }
//         }
//       },
//       {
//         $group: {
//           _id: "$Panchayath",
//           houseCount: { $sum: 1 },
//           population: { $sum: { $toInt: "$FamilymembersNO" } }
//         }
//       },
//       { $sort: { _id: 1 } }
//     ]);

//     const result = counts.map(item => {
//       const name = item._id.trim().toLowerCase();
//       let wardCount = 0;

//       if (name === "aryad") {
//         wardCount = 2;
//       } else if (name === "maarikulam south") {
//         wardCount = 10;
//       }

//       return {
//         Panchayath: item._id,
//         wardCount,
//         houseCount: item.houseCount,
//         population: item.population
//       };
//     });

//     return res.status(200).json(result);

//   } catch (error) {
//     next(error.message);
//   }
// };


export const allCounts = async (req, res, next) => {
  try {
    const panchayaths = await SurveyForm.distinct("Panchayath", {
      Panchayath: { $nin: ["0", null, ""] }
    });

    const result = await Promise.all(
      panchayaths.map(async (panchayath) => {
        const records = await SurveyForm.find({ Panchayath: panchayath });

        const houseCount = records.length;
        const population = records.reduce(
          (sum, item) => sum + (item.FamilymembersNO || 0),
          0
        );

        let wardCount = 0;
        const name = panchayath.trim().toLowerCase();

        if (name === "aryad") {
          wardCount = 2;
        } else if (name === "mararikulam south") {
          wardCount = 10;
        }

        return {
          Panchayath: panchayath,
          wardCount,
          houseCount,
          population
        };
      })
    );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getWardNumbers = async (req, res) => {
  try {
    let { Panchayath } = req.query;

    if (!Panchayath) {
      return res.status(400).json({ WardNo: [], message: "Panchayath is required" });
    }

    Panchayath = Panchayath.trim().toLowerCase();

    let wardNumbers = [];

    if (Panchayath === "aryad") {
      wardNumbers = [16, 17];
    } else if (Panchayath === "mararikulam south") {
      wardNumbers = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    }

    return res.status(200).json({ WardNo: wardNumbers });
  } catch (err) {
    next(err.message);
  }
};

// export const wardDetails = async (req, res, next) => {
//   try {
//     const { Panchayath } = req.query;

//     if (!Panchayath) {
//       return res.status(400).json({ message: "Panchayath is required" });
//     }

//     const wardStats = await SurveyForm.aggregate([
//       {
//         $match: {
//           Panchayath: { $regex: new RegExp(`^${Panchayath}$`, "i") },
//           WardNo: { $nin: [null, "", "0"] }
//         }
//       },
//       {
//         $group: {
//           _id: "$WardNo",
//           houseCount: { $sum: 1 },
//           population: { $sum: { $toInt: "$FamilymembersNO" } },
//           surveyIds: { $addToSet: "$_id" }
//         }
//       },
//       { $sort: { _id: 1 } }
//     ]);

//     if (wardStats.length === 0) {
//       return res.status(404).json({ message: "No data found for this Panchayath" });
//     }

//     const allSurveyIds = wardStats.flatMap(item => item.surveyIds);

//     const genderStats = await Family.aggregate([
//       { $match: { Userid: { $in: allSurveyIds } } },
//       {
//         $lookup: {
//           from: "surveyforms",
//           localField: "Userid",
//           foreignField: "_id",
//           as: "survey"
//         }
//       },
//       { $unwind: "$survey" },
//       {
//         $group: {
//           _id: "$survey.WardNo",
//           maleCount: {
//             $sum: { $cond: [{ $eq: ["$Gender", "Male"] }, 1, 0] }
//           },
//           femaleCount: {
//             $sum: { $cond: [{ $eq: ["$Gender", "Female"] }, 1, 0] }
//           }
//         }
//       },
//       { $sort: { _id: 1 } }
//     ]);

//     const result = wardStats.map(ward => {
//       const genderData = genderStats.find(g => g._id === ward._id) || {
//         maleCount: 0,
//         femaleCount: 0
//       };

//       return {
//         Panchayath,
//         WardNo: ward._id,
//         houseCount: ward.houseCount,
//         population: ward.population,
//         maleCount: genderData.maleCount,
//         femaleCount: genderData.femaleCount
//       };
//     });

//     return res.status(200).json(result);

//   } catch (error) {
//     next(error.message);
//   }
// };




export const wardDetails = async (req, res, next) => {
  try {
    const { Panchayath } = req.query;

    if (!Panchayath) {
      return res.status(400).json({ message: "Panchayath is required" });
    }

    const surveyData = await SurveyForm.find({
      Panchayath: { $regex: new RegExp(`^${Panchayath}$`, "i") },
      WardNo: { $nin: [null, "", "0"] }
    });

    if (!surveyData.length) {
      return res.status(404).json({ message: "No data found for this Panchayath" });
    }

    const wardMap = {};

    surveyData.forEach((form) => {
      const ward = form.WardNo;

      if (!wardMap[ward]) {
        wardMap[ward] = {
          Panchayath,
          WardNo: ward,
          houseCount: 0,
          population: 0,
          surveyIds: []
        };
      }

      wardMap[ward].houseCount += 1;
      wardMap[ward].population += form.FamilymembersNO || 0;
      wardMap[ward].surveyIds.push(form._id);
    });

    const allSurveyIds = surveyData.map((f) => f._id);
    const familyData = await Family.find({ Userid: { $in: allSurveyIds } });

    familyData.forEach((fam) => {
      const survey = surveyData.find((s) => String(s._id) === String(fam.Userid));
      if (!survey) return;

      const ward = survey.WardNo;
      if (!wardMap[ward]) return;

      if (fam.Gender === "Male") wardMap[ward].maleCount = (wardMap[ward].maleCount || 0) + 1;
      if (fam.Gender === "Female") wardMap[ward].femaleCount = (wardMap[ward].femaleCount || 0) + 1;
    });

    const result = Object.values(wardMap).map((ward) => ({
      Panchayath: ward.Panchayath,
      WardNo: ward.WardNo,
      houseCount: ward.houseCount,
      population: ward.population,
      maleCount: ward.maleCount || 0,
      femaleCount: ward.femaleCount || 0
    })).sort((a, b) => Number(a.WardNo) - Number(b.WardNo));

    return res.status(200).json(result);

  } catch (error) {
    next(error.message);
  }
};

export const familyDetailsinWardwise = async (req, res, next) => {
  try {
    const { Panchayath, WardNo, page = 1, limit = 10 } = req.query;

    if (!Panchayath || !WardNo) {
      return res.status(400).json({ message: "Panchayath and WardNo are required" });
    }

    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const limitNumber = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNumber - 1) * limitNumber;

    const filter = {
      Panchayath: { $regex: `^${Panchayath.trim()}$`, $options: "i" },
      $or: [
        { WardNo: WardNo.trim() },           
        { WardNo: Number(WardNo.trim()) }    
      ]
    };


    const totalHouses = await SurveyForm.countDocuments(filter);
    const houses = await SurveyForm.find(filter)
      .select("_id Panchayath WardNo HouseName HouseNo HouseholdHead FamilymembersNO RationCardType")
      .sort({ HouseNo: 1 })
      .skip(skip)
      .limit(limitNumber)
      .lean();


    if (!houses.length) {
      return res.status(404).json({ message: "No survey data found for this Panchayath and WardNo" });
    }

    const formattedHouses = houses.map(({ _id, ...rest }) => ({
      id: String(_id),
      ...rest
    }));

    return res.status(200).json({
      Panchayath,
      WardNo,
      totalHouses,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalHouses / limitNumber),
      housesPerPage: limitNumber,
      houses: formattedHouses
    });

  } catch (error) {
    next(error.message);
  }
};



export const houseDetails = async (req, res, next) => {
  try {
    const { _id } = req.query;

    if (!_id) {
      return res.status(400).json({ message: "id is required" });
    }

    const house = await SurveyForm.findById(_id).lean();
    if (!house) {
      return res.status(404).json({ message: "No house found with this id" });
    }

    const family = await Family.find({ Userid: _id }).lean();

    return res.status(200).json({
      house,
      family: family || null
    });

  } catch (error) {
    next(error.message);
  }
};

export const personalDetails = async (req, res, next) => {
  try {
    const { Userid, Name, Age } = req.query;

    if (!Userid || !Name || !Age) {
      return res.status(400).json({ message: "Userid, Name, and Age are required" });
    }

    const userId = new mongoose.Types.ObjectId(Userid);
    const age = Number(Age);

    let info = null;

    if (age >= 0 && age <= 3) {
      info = await Newborn.findOne({ Userid: userId, Name: Name.trim() }).lean();
    } else if (age >= 4 && age <= 18) {
      info = await Childrens.findOne({ Userid: userId, Name: Name.trim() }).lean();
    } else if (age >= 19 && age <= 40) {
      info = await Youth.findOne({ Userid: userId, Name: Name.trim() }).lean();
    } else if (age >= 41 && age <= 60) {
      info = await Middleage.findOne({ Userid: userId, Name: Name.trim() }).lean();
    } else if (age >= 61 && age <= 75) {
      info = await SeniorCitizen.findOne({ Userid: userId, Name: Name.trim() }).lean();
    } else if (age >= 76) {
      info = await Supercitizen.findOne({ Userid: userId, Name: Name.trim() }).lean();
    }

    if (!info) {
      return res.status(404).json({
        message: "No personal details found for the given Userid, Name, and Age range",
      });
    }

    return res.status(200).json(info);

  } catch (error) {
    next(error.message);
  }
};

export const searchHouse = async (req, res, next) => {
  try {
    const { Panchayath, WardNo, keyvalue } = req.query;

    if (!Panchayath || !WardNo || !keyvalue || keyvalue.trim() === "") {
      return res.status(400).json({ message: "Panchayath, WardNo, and Search data are required" });
    }

    const filter = {
      Panchayath: { $regex: `^${Panchayath.trim()}$`, $options: "i" },
      WardNo: { $regex: `^${WardNo.trim()}$`, $options: "i" },
      $or: [
        { HouseholdHead: { $regex: keyvalue.trim(), $options: "i" } },
        { HouseName: { $regex: keyvalue.trim(), $options: "i" } },
        { HouseNo: { $regex: keyvalue.trim(), $options: "i" } }
      ]
    };


    const result = await SurveyForm.find(filter)
      .select("_id Panchayath WardNo HouseName HouseNo HouseholdHead FamilymembersNO RationCardType")
      .sort({ HouseNo: 1 })
      .lean();

    if (!result.length) {
      return res.status(204).json({ message: "No data found for given Panchayath, WardNo, and keyvalue" });
    }

    const formatted = result.map(({ _id, ...rest }) => ({
      id: String(_id),
      ...rest
    }));

    return res.status(200).json({
      Panchayath,
      WardNo,
      count: formatted.length,
      results: formatted
    });

  } catch (error) {
    next(error.message);
  }
};

export const filterValues = async(req, res, next)=>{
  try{
    const list = await surveydata.find(
       {
          FilterValues: { $exists: true, $ne: "", $nin: ["0", null] }
        },
        { FilterValues: 1, _id: 0 }
      )
      .lean();
    const filterList = list
      .map(item => item.FilterValues?.trim())
      .filter(value => value && value.length > 0);

    const uniquefilterList = [...new Set(filterList)].sort();

    return res.status(200).json(uniquefilterList);
  } catch (error) {
    next(error.message);
  }
};




