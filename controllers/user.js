// import bcrypt from "bcrypt";
// import Admin from "../model/admin.js";
// import SurveyForm from "../model/surveyForm.js";
// import Family from "../model/familyMembers.js";
// import Newborn from "../model/newborn.js";
// import Childrens from "../model/children.js";
// import Youth from "../model/youth.js";
// import Middleage from "../model/middleAge.js";
// import SeniorCitizen from "../model/seniorCitizen.js";
// import Supercitizen from "../model/superCitizen.js";
// import jwt from "jsonwebtoken";

// // ✅ Helper function to generate tokens
// const generateAccessAndRefreshToken = async (userId) => {
//   const user = await Admin.findById(userId);
//   if (!user) throw new Error("User not found");

//   const accessToken = user.generateAccessToken();
//   const refreshToken = user.generateRefreshToken();

//   user.refreshToken = refreshToken;
//   await user.save({ validateBeforeSave: false });

//   return { accessToken, refreshToken };
// };

// export const registerUser = async (req, res) => {
//   try {
//     const { userName, mobile, password } = req.body;

//     if (!userName || !mobile || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     const existingUser = await Admin.findOne({ mobile });
//     if (existingUser) {
//       return res.status(409).json({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     const newUser = await Admin.create({ userName, mobile, password });
//     const { accessToken, refreshToken } = await generateAccessAndRefreshToken(newUser._id);

//     const userData = {
//       id: newUser._id,
//       userName: newUser.userName,
//       mobile: newUser.mobile,
//     };

//     return res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       user: userData,
//       accessToken,
//       refreshToken,
//     });
//   } catch (error) {
//     console.error("❌ Error in registerUser:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// export const loginUser = async (req, res) => {
//   try {
//     const { mobile, password } = req.body;

//     if (!mobile || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Mobile number and password are required",
//       });
//     }

//     const user = await Admin.findOne({ mobile });
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const validPassword = await user.isPasswordCorrect(password);
//     if (!validPassword) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid password",
//       });
//     }

//     const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

//     const userData = {
//       id: user._id,
//       userName: user.userName,
//       mobile: user.mobile,
//     };

//     return res.status(200).json({
//       success: true,
//       message: "Login successful",
//       user: userData,
//       accessToken,
//       refreshToken,
//     });
//   } catch (error) {
//     console.error("❌ Error in loginUser:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };


// export const refreshAccessToken = async (req, res) => {
//   try {
//     const { refreshToken } = req.body;

//     if (!refreshToken) {
//       return res.status(400).json({
//         success: false,
//         message: "Refresh token required",
//       });
//     }

//     // ✅ Verify token first
//     let decoded;
//     try {
//       decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
//     } catch (err) {
//       return res.status(403).json({
//         success: false,
//         message: "Expired or invalid refresh token",
//       });
//     }

//     // ✅ Check if user exists and token matches
//     const user = await Admin.findById(decoded._id);
//     if (!user || user.refreshToken !== refreshToken) {
//       return res.status(403).json({
//         success: false,
//         message: "Invalid refresh token or user not found",
//       });
//     }

//     // ✅ Generate new tokens
//     const newAccessToken = user.generateAccessToken();
//     const newRefreshToken = user.generateRefreshToken();

//     user.refreshToken = newRefreshToken;
//     await user.save({ validateBeforeSave: false });

//     return res.status(200).json({
//       success: true,
//       message: "Access token refreshed successfully",
//       accessToken: newAccessToken,
//       refreshToken: newRefreshToken,
//     });
//   } catch (error) {
//     console.error("❌ Error in refreshAccessToken:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };


// export const submitSurveyForm = async (req, res) => {
//   try {
//     const {
//       Village,
//       Panchayath,
//       WardNo,
//       PostOffice,
//       Pincode,
//       HouseholdHead,
//       HouseName,
//       HouseNo,
//       FamilymembersNO,
//       RationCardType,
//       GasConnection,
//       WoodStove,
//       TypeofWoodStove,
//       Electricity,
//       Solar,
//       ResidentialHouse,
//       HabitableHouse,
//       TypeofHouse,
//       AreaofHouse,
//       Noofpeopleworkings,
//       RegularIncomePeople,
//       MonthlyHouseholdIncome,
//       NoofVehicles,
//       TwoWheeler,
//       ThreeWheeler,
//       FourWheeler,
//       Other,
//       Area_Paddyland,
//       Area_Dryland,
//       Area_Wetland,
//       CurrentCultivationDetails,
//       ToiletFacilities,
//       ToiletTankType,
//       AvailabilityofCleanWater,
//       KWAConnection,
//       OrganicWasteManagementMethod,
//       InorganicWasteManagementMethod,
//       OtherMethodInorganicWasteManagement,
//       SnehajalakamService,
//       SnehajalakamServiceDetails,
//       location,
//     } = req.body;

//     // ✅ Basic validation
//     if (!Village || !Panchayath || !WardNo || !HouseholdHead) {
//       return res.status(400).json({
//         success: false,
//         message: "Village, Panchayath, WardNo, and HouseholdHead are required",
//       });
//     }

//     // ✅ Ensure user is logged in
//     const userId = req.user?._id;
//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     // ✅ Safe location
//     const safeLocation =
//       location && location.type === "Point" && Array.isArray(location.coordinates)
//         ? location
//         : { type: "Point", coordinates: [0, 0] };

//     // ✅ Create new survey entry
//     const newSurvey = new SurveyForm({
//       Village,
//       Panchayath,
//       WardNo,
//       PostOffice,
//       Pincode,
//       HouseholdHead,
//       HouseName,
//       HouseNo,
//       FamilymembersNO,
//       RationCardType,
//       GasConnection,
//       WoodStove,
//       TypeofWoodStove,
//       Electricity,
//       Solar,
//       ResidentialHouse,
//       HabitableHouse,
//       TypeofHouse,
//       AreaofHouse,
//       Noofpeopleworkings,
//       RegularIncomePeople,
//       MonthlyHouseholdIncome,
//       NoofVehicles,
//       TwoWheeler,
//       ThreeWheeler,
//       FourWheeler,
//       Other,
//       Area_Paddyland,
//       Area_Dryland,
//       Area_Wetland,
//       CurrentCultivationDetails,
//       ToiletFacilities,
//       ToiletTankType,
//       AvailabilityofCleanWater,
//       KWAConnection,
//       OrganicWasteManagementMethod,
//       InorganicWasteManagementMethod,
//       OtherMethodInorganicWasteManagement,
//       SnehajalakamService,
//       SnehajalakamServiceDetails,
//       location: safeLocation,
//       createdBy: userId, // ✅ record who created this
//     });

//     await newSurvey.save();

//     return res.status(201).json({
//       success: true,
//       message: "Survey form submitted successfully",
//       data: newSurvey,
//     });
//   } catch (error) {
//     console.error("❌ Error in submitSurveyForm:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to save survey data",
//     });
//   }
// };

// // export const SurveyDetails = async (req, res, next) => {
// //   try {
// //     const survey = await SurveyForm.find({}, "HouseholdHead HouseName HouseNo");

// //     return res.status(200).json({
// //       message: "List of survey details",
// //       survey,
// //     });
// //   } catch (error) {
// //     next(error);
// //   }
// // };
// export const SurveyDetails = async (req, res) => {
//   try {
//     const userId = req.user?._id;

//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     const surveys = await SurveyForm.find({ createdBy: userId })
//       .select("Village Panchayath WardNo HouseholdHead HouseName HouseNo createdAt");

//     return res.status(200).json({
//       success: true,
//       count: surveys.length,
//       surveys,
//     });
//   } catch (error) {
//     console.error("❌ Error fetching user surveys:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to fetch surveys",
//     });
//   }
// };


// export const updateSurvey = async (req, res, next) => {
//   try {
//     const { id, ...data } = req.body;

//     if (!id) {
//       return res.status(400).json({ message: "ID is required" });
//     }

//     const existingSurvey = await SurveyForm.findById(id);
//     if (!existingSurvey) {
//       return res.status(404).json({ message: "Survey not found" });
//     }

//     const updatedSurvey = await SurveyForm.findByIdAndUpdate(
//       id,
//       { $set: data },
//       { new: true }
//     );

//     return res.status(200).json({
//       message: "Survey updated successfully",
//       updatedSurvey,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const houseDetails = async (req, res, next) => {
//   try {
//     const { id } = req.query;

//     if (!id) {
//       return res.status(400).json({ message: "Survey ID is required" });
//     }

//     const survey = await SurveyForm.findById(id);

//     if (!survey) {
//       return res.status(404).json({ message: "Survey not found" });
//     }

//     return res.status(200).json({
//       message: "Survey details fetched successfully",
//       survey,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const addFamilyMembers = async (req, res, next) => {
//   try {
//     const { Userid, FamilyMembers } = req.body;

//     // ✅ Validate Userid
//     if (!Userid) {
//       return res.status(400).json({
//         success: false,
//         message: "Userid is required",
//       });
//     }

//     // ✅ Validate FamilyMembers array
//     if (
//       !FamilyMembers ||
//       !Array.isArray(FamilyMembers) ||
//       FamilyMembers.length === 0
//     ) {
//       return res.status(400).json({
//         success: false,
//         message: "FamilyMembers must be a non-empty array",
//       });
//     }

//     // ✅ Prepare data
//     const newFamilyMembers = FamilyMembers.map((member) => ({
//       Userid,
//       Name: member.Name?.trim(),
//       Age: member.Age?.toString(),
//       Gender: member.Gender?.trim(),
//       Relation: member.Relation?.trim(),
//       Phone: member.Phone || "",
//       otherRelationship: member.otherRelationship || "",
//     }));

//     // ✅ Save all members
//     const savedMembers = await Family.insertMany(newFamilyMembers);

//     return res.status(201).json({
//       success: true,
//       message: "Family members added successfully",
//       count: savedMembers.length,
//       members: savedMembers.map((m) => ({
//         id: m._id,
//         Name: m.Name,
//         Age: m.Age,
//         Gender: m.Gender,
//         Relation: m.Relation,
//         Phone: m.Phone,
//         otherRelationship: m.otherRelationship,
//       })),
//     });
//   } catch (error) {
//     console.error("❌ Error adding family members:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to add family members",
//       error: error || "Internal server error",
//     });
//   }
// };

// export const familyDetails = async (req, res, next) => {
//   try {
//     const { Userid } = req.query;
//     const family = await Family.find({ Userid: Userid });
//     if (!Userid) {
//       return res.status(404).json({ message: "id not found" });
//     }
//     return res.status(200).json({ message: "family members", family });
//   } catch (error) {
//     next(error);
//   }
// };

// export const addNewborn = async (req, res, next) => {
//   try {
//     const data = req.body;

//     if (!data || Object.keys(data).length === 0) {
//       return res.status(400).json({ message: "Invalid request body" });
//     }

//     const newborn = new Newborn(data);
//     await newborn.save();

//     return res.status(201).json({
//       message: "Newborn created successfully",
//       id: newborn._id,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateNewborn = async (req, res, next) => {
//   try {
//     const { id, ...data } = req.body;

//     if (!id || !data) {
//       return res.status(400).json({ message: "ID and data are required" });
//     }
//     const user = await Newborn.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: "Member not found" });
//     }
//     const updateNewborn = await Newborn.findByIdAndUpdate(
//       id,
//       { $set: data },
//       { new: true }
//     );
//     return res.status(200).json({
//       message: "data updated successfully",
//       updateNewborn,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const newbornDetails = async (req, res, next) => {
//   try {
//     const { Userid } = req.query;

//     if (!Userid) {
//       return res.status(400).json({ message: " ID is required" });
//     }
//     const newborn = await Newborn.findOne({ Userid });

//     if (!newborn) {
//       return res.status(404).json({ message: "data not found" });
//     }
//     return res.status(200).json({
//       message: "newborn details fetched successfully",
//       newborn,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const addChild = async (req, res, next) => {
//   try {
//     const data = req.body;

//     if (!data || Object.keys(data).length === 0) {
//       return res.status(400).json({ message: "Data is required" });
//     }

//     const newChild = new Childrens(data);
//     await newChild.save();

//     return res.status(200).json({
//       message: "Data added successfully",
//       id: newChild._id,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateChild = async (req, res, next) => {
//   try {
//     const { id } = req.query;
//     const data = req.body;
//     if (!id || !data) {
//       return res.status(400).json({ message: "Id and data are required" });
//     }
//     const child = await Childrens.findById(id);
//     if (!child) {
//       return res.status(404).json({ message: " child data not found" });
//     }
//     const updateChild = await Childrens.findByIdAndUpdate(
//       id,
//       { $set: data },
//       { new: true }
//     );
//     return res.status(200).json({
//       message: "data updated successfully",
//       updateChild,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const childDetails = async (req, res, next) => {
//   try {
//     const { id } = req.query;
//     if (!id) {
//       return res.status(400).json({ message: "Id reuired" });
//     }
//     const user = await Childrens.findOne({ _id: id });
//     if (!user) {
//       return res.status(404).json({ message: "user not found" });
//     }
//     return res.status(200).json({ message: "data fetched successfully", user });
//   } catch (error) {
//     next(error);
//   }
// };

// export const addYouth = async (req, res, next) => {
//   try {
//     const data = req.body;

//     if (!data || Object.keys(data).length === 0) {
//       return res.status(400).json({ message: "Data is required" });
//     }

//     const newYouth = new Youth(data);
//     await newYouth.save();

//     return res.status(200).json({
//       message: "Data added successfully",
//       id: newYouth._id,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const youthDetails = async (req, res, next) => {
//   try {
//     const { id } = req.query;
//     if (!id) {
//       return res.status(404).json({ message: "id is required" });
//     }
//     const youth = await Youth.findById(id);
//     if (!youth) {
//       return res.status(404).json({ message: "data not found" });
//     }
//     return res
//       .status(200)
//       .json({ message: "data fetched successfully", youth });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateYouth = async (req, res, next) => {
//   try {
//     const { id } = req.query;
//     const data = req.body;
//     if (!id || !data) {
//       return res.status(400).json({ message: "Id and data are required" });
//     }

//     const youth = await Youth.findById(id);
//     if (!youth) {
//       return res.status(404).json({ message: " data not found" });
//     }
//     const updateYouth = await Youth.findByIdAndUpdate(
//       id,
//       { $set: data },
//       { new: true }
//     );
//     return res.status(200).json({
//       message: "data updated successfully",
//       updateYouth,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const addMiddleage = async (req, res, next) => {
//   try {
//     const data = req.body;

//     if (!data || Object.keys(data).length === 0) {
//       return res.status(400).json({ message: "Data is required" });
//     }

//     const newMiddleage = new Middleage(data);
//     await newMiddleage.save();

//     return res.status(200).json({
//       message: "Data added successfully",
//       id: newMiddleage._id,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const middleageDetails = async (req, res, next) => {
//   try {
//     const { id } = req.query;
//     if (!id) {
//       return res.status(404).json({ message: "id is required" });
//     }
//     const user = await Middleage.findById(id);
//     if (!user) {
//       return res.status(401).json({ message: "data not found" });
//     }
//     return res.status(200).json({ message: "data fetched successfully", user });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateMiddleage = async (req, res, next) => {
//   try {
//     const { id } = req.query;
//     const data = req.body;
//     if (!id) {
//       return res.status(404).json({ message: "id required" });
//     }
//     const user = await Middleage.findById(id);
//     if (!user) {
//       return res.status(401).json({ message: "user not found" });
//     }
//     await Middleage.findByIdAndUpdate(id, data);
//     return res.status(200).json({ message: "data updated successfully", user });
//   } catch (error) {
//     next(error);
//   }
// };

// export const addSeniorCitizen = async (req, res, next) => {
//   try {
//     const data = req.body;

//     if (!data || Object.keys(data).length === 0) {
//       return res.status(400).json({ message: "No data available" });
//     }

//     const newSeniorCitizen = new SeniorCitizen(data);
//     await newSeniorCitizen.save();

//     return res.status(200).json({
//       message: "Data added successfully",
//       id: newSeniorCitizen._id,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
// export const seniorCitizenDetails = async (req, res, next) => {
//   try {
//     const { id } = req.query;

//     if (!id) {
//       return res.status(400).json({ message: "id is required" });
//     }

//     const user = await SeniorCitizen.findById(id);

//     if (!user) {
//       return res.status(404).json({ message: "user not found" });
//     }

//     return res.status(200).json({
//       message: "data fetched successfully",
//       user,
//     });
//   } catch (error) {
//     next(error); // pass the actual error object
//   }
// };
// export const updateSeniors = async (req, res, next) => {
//   try {
//     const { id } = req.query;
//     const data = req.body;

//     if (!id) {
//       return res.status(404).json({ message: "id required" });
//     }
//     const user = await SeniorCitizen.findById(id);
//     if (!user) {
//       return res.status(401).json({ message: "user not found" });
//     }
//     const updatedUser = await SeniorCitizen.findByIdAndUpdate(id, data, {
//       new: true,
//     });
//     return res
//       .status(200)
//       .json({ message: "data updated successfully", updatedUser });
//   } catch (error) {
//     next(error);
//   }
// };

// export const addSuperCitizen = async (req, res, next) => {
//   try {
//     const data = req.body;

//     if (!data || Object.keys(data).length === 0) {
//       return res.status(400).json({ message: "No data available" });
//     }

//     const newSuperCitizen = new Supercitizen(data);
//     await newSuperCitizen.save();

//     return res.status(200).json({
//       message: "Data added successfully",
//       id: newSuperCitizen._id,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const superCitizenDetails = async (req, res, next) => {
//   try {
//     const { id } = req.query;
//     if (!id) {
//       return res.status(404).json({ message: "id is required" });
//     }
//     const user = await Supercitizen.findOne({ _id: id });
//     if (!user) {
//       return res.status(401).json({ message: "user not found" });
//     }
//     return res.status(200).json({ message: "data fetched successfully", user });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateSuperCitizen = async (req, res, next) => {
//   try {
//     const { id } = req.query;
//     const data = req.body;
//     if (!id) {
//       return res.status(404).json({ message: "id required" });
//     }
//     const user = await Supercitizen.findById(id);
//     if (!user) {
//       return res.status(401).json({ message: "user not found" });
//     }
//     await Supercitizen.findByIdAndUpdate(id, data);
//     return res.status(200).json({ message: "data updated successfully" });
//   } catch (error) {
//     next(error);
//   }
// };

// export const PanchayathDetails = async (req, res, next) => {
//   try {
//     let { Panchayath, WardNo } = req.body;

//     if (!Panchayath || !WardNo) {
//       return res
//         .status(400)
//         .json({ message: "Panchayath and WardNo are required" });
//     }

//     Panchayath = Panchayath.trim().toLowerCase();
//     WardNo = Number(WardNo);

//     let PostOffice = "";
//     let Village = "";
//     let Pincode = "";

//     if (Panchayath === "aryad" && [16, 17].includes(WardNo)) {
//       PostOffice = "Thumpoly";
//       Village = "Pathirappally";
//       Pincode = "688008";
//     } else if (
//       Panchayath === "mararikulam south" &&
//       [16, 17].includes(WardNo)
//     ) {
//       PostOffice = "Katoor";
//       Village = "Kalavoor";
//       Pincode = "688522";
//     } else if (
//       Panchayath === "mararikulam south" &&
//       [8, 9, 10, 11, 12, 13, 14, 15].includes(WardNo)
//     ) {
//       PostOffice = "Pathirappally";
//       Village = "Pathirappally";
//       Pincode = "688521";
//     } else {
//       return res
//         .status(404)
//         .json({ message: "No matching Panchayath and WardNo found" });
//     }

//     return res.status(200).json({
//       Panchayath,
//       WardNo,
//       PostOffice,
//       Village,
//       Pincode,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Admin from "../model/admin.js";
import SurveyForm from "../model/surveyForm.js";
import Family from "../model/familyMembers.js";
import Newborn from "../model/newborn.js";
import Childrens from "../model/children.js";
import Youth from "../model/youth.js";
import Middleage from "../model/middleAge.js";
import SeniorCitizen from "../model/seniorCitizen.js";
import Supercitizen from "../model/superCitizen.js";

// ✅ Helper function to generate tokens
const generateAccessAndRefreshToken = async (userId) => {
  const user = await Admin.findById(userId);
  if (!user) throw new Error("User not found");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

// ✅ Utility functions
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
const toNumber = (val) =>
  val === "" || val === null || val === undefined ? 0 : Number(val);

// --------------------- AUTH CONTROLLERS ---------------------

export const registerUser = async (req, res) => {
  try {
    const { userName, mobile, password } = req.body;

    if (!userName || !mobile || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await Admin.findOne({ mobile });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const newUser = await Admin.create({ userName, mobile, password });
    const { accessToken, refreshToken } =
      await generateAccessAndRefreshToken(newUser._id);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        userName: newUser.userName,
        mobile: newUser.mobile,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("❌ Error in registerUser:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      return res.status(400).json({
        success: false,
        message: "Mobile number and password are required",
      });
    }

    const user = await Admin.findOne({ mobile });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const validPassword = await user.isPasswordCorrect(password);
    if (!validPassword)
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });

    const { accessToken, refreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        userName: user.userName,
        mobile: user.mobile,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("❌ Error in loginUser:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res
        .status(400)
        .json({ success: false, message: "Refresh token required" });

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      return res
        .status(403)
        .json({ success: false, message: "Expired or invalid refresh token" });
    }

    const user = await Admin.findById(decoded._id);
    if (!user || user.refreshToken !== refreshToken) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid refresh token or user not found" });
    }

    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error("❌ Error in refreshAccessToken:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// --------------------- SURVEY FORM CONTROLLERS ---------------------

export const submitSurveyForm = async (req, res) => {
  try {
    const required = ["Village", "Panchayath", "WardNo", "HouseholdHead"];
    for (const field of required) {
      if (!req.body[field]) {
        return res.status(400).json({
          success: false,
          message: `${field} is required`,
        });
      }
    }

    const userId = req.user?._id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const safeLocation =
      req.body.location &&
      req.body.location.type === "Point" &&
      Array.isArray(req.body.location.coordinates)
        ? req.body.location
        : { type: "Point", coordinates: [0, 0] };

    const newSurvey = new SurveyForm({
      ...req.body,
      Noofpeopleworkings: toNumber(req.body.Noofpeopleworkings),
      RegularIncomePeople: toNumber(req.body.RegularIncomePeople),
      MonthlyHouseholdIncome: toNumber(req.body.MonthlyHouseholdIncome),
      createdBy: userId,
      location: safeLocation,
    });

    await newSurvey.save();
    return res.status(201).json({
      success: true,
      message: "Survey form submitted successfully",
      data: newSurvey,
    });
  } catch (error) {
    console.error("❌ Error in submitSurveyForm:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to save survey data" });
  }
};

export const SurveyDetails = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const surveys = await SurveyForm.find({ createdBy: userId }).select(
      "Village Panchayath WardNo HouseholdHead HouseName HouseNo createdAt"
    );

    return res.status(200).json({
      success: true,
      count: surveys.length,
      surveys,
    });
  } catch (error) {
    console.error("❌ Error fetching user surveys:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch surveys" });
  }
};

export const updateSurvey = async (req, res, next) => {
  try {
    const { id, ...data } = req.body;
    if (!id || !isValidObjectId(id))
      return res.status(400).json({ message: "Valid ID is required" });

    const existing = await SurveyForm.findById(id);
    if (!existing)
      return res.status(404).json({ message: "Survey not found" });

    const updated = await SurveyForm.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );

    return res.status(200).json({
      message: "Survey updated successfully",
      updatedSurvey: updated,
    });
  } catch (error) {
    console.error("❌ Error in updateSurvey:", error);
    next(error);
  }
};

export const houseDetails = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id || !isValidObjectId(id))
      return res.status(400).json({ message: "Valid Survey ID is required" });

    const survey = await SurveyForm.findById(id);
    if (!survey)
      return res.status(404).json({ message: "Survey not found" });

    return res
      .status(200)
      .json({ message: "Survey details fetched successfully", survey });
  } catch (error) {
    console.error("❌ Error in houseDetails:", error);
    next(error);
  }
};

// --------------------- FAMILY CONTROLLERS ---------------------

export const addFamilyMembers = async (req, res) => {
  try {
    const { Userid, FamilyMembers } = req.body;

    if (!Userid || !isValidObjectId(Userid)) {
      return res
        .status(400)
        .json({ success: false, message: "Valid Userid is required" });
    }

    if (!Array.isArray(FamilyMembers) || FamilyMembers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "FamilyMembers must be a non-empty array",
      });
    }

    const formattedMembers = FamilyMembers.map((member) => ({
      Userid,
      Name: member.Name?.trim(),
      Age: member.Age?.toString(),
      Gender: member.Gender?.trim(),
      Relation: member.Relation?.trim(),
      Phone: member.Phone?.trim() || "",
      otherRelationship: member.otherRelationship?.trim() || "",
    }));

    const savedMembers = await Family.insertMany(formattedMembers);

    return res.status(201).json({
      success: true,
      message: "Family members added successfully",
      count: savedMembers.length,
      members: savedMembers.map((m) => ({
        id: m._id,
        Name: m.Name,
        Age: m.Age,
        Gender: m.Gender,
        Relation: m.Relation,
        Phone: m.Phone,
        otherRelationship: m.otherRelationship,
      })),
    });
  } catch (error) {
    console.error("❌ Error adding family members:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add family members",
      error: error.message,
    });
  }
};

export const familyDetails = async (req, res, next) => {
  try {
    const { Userid } = req.query;
    if (!Userid || !isValidObjectId(Userid))
      return res.status(400).json({ message: "Valid Userid required" });

    const family = await Family.find({ Userid });
    if (!family || family.length === 0)
      return res.status(404).json({ message: "No family members found" });

    return res
      .status(200)
      .json({ message: "family members fetched successfully", family });
  } catch (error) {
    console.error("❌ Error fetching family details:", error);
    next(error);
  }
};


// --------------------- PART 2: AGE-GROUP CONTROLLERS + PANCHAYATH ---------------------

// --------------------- NEWBORN ---------------------
export const addNewborn = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    // Validate required fields for newborn (Userid, Name, Dob)
    if (!data.Userid || !isValidObjectId(data.Userid)) {
      return res.status(400).json({ message: "Valid Userid is required" });
    }
    if (!data.Name) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!data.Dob) {
      return res.status(400).json({ message: "Dob is required" });
    }

    // ensure parent survey exists
    const surveyExists = await SurveyForm.findById(data.Userid);
    if (!surveyExists) {
      return res.status(404).json({ message: "Parent survey (Userid) not found" });
    }

    const newborn = new Newborn({
      ...data,
      Userid: data.Userid,
      Name: data.Name?.trim(),
      Dob: data.Dob?.trim(),
      Father: data.Father?.trim(),
      Mother: data.Mother?.trim(),
      Phone: data.Phone?.trim() || undefined,
      Guardian: data.Guardian?.trim(),
      IllnessOrDisabilityDetails: data.IllnessOrDisabilityDetails?.trim(),
      PhysicalDisabilityDetails: data.PhysicalDisabilityDetails?.trim(),
      MentalDisabilityDetails: data.MentalDisabilityDetails?.trim(),
    });

    await newborn.save();

    return res.status(201).json({
      message: "Newborn created successfully",
      id: newborn._id,
    });
  } catch (error) {
    console.error("❌ Error in addNewborn:", error);
    next(error);
  }
};

export const updateNewborn = async (req, res, next) => {
  try {
    const { id, ...data } = req.body;

    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({ message: "Valid ID is required" });
    }
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ message: "Update data is required" });
    }

    const user = await Newborn.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Member not found" });
    }

    const updatedNewborn = await Newborn.findByIdAndUpdate(id, { $set: data }, { new: true });
    return res.status(200).json({
      message: "data updated successfully",
      updateNewborn: updatedNewborn,
    });
  } catch (error) {
    console.error("❌ Error in updateNewborn:", error);
    next(error);
  }
};

export const newbornDetails = async (req, res, next) => {
  try {
    const { Userid } = req.query;

    if (!Userid || !isValidObjectId(Userid)) {
      return res.status(400).json({ message: "Valid ID is required" });
    }

    const newborn = await Newborn.findOne({ Userid });

    if (!newborn) {
      return res.status(404).json({ message: "data not found" });
    }
    return res.status(200).json({
      message: "newborn details fetched successfully",
      newborn,
    });
  } catch (error) {
    console.error("❌ Error in newbornDetails:", error);
    next(error);
  }
};

// --------------------- CHILD ---------------------
export const addChild = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ message: "Data is required" });
    }

    if (!data.Userid || !isValidObjectId(data.Userid)) {
      return res.status(400).json({ message: "Valid Userid is required" });
    }
    if (!data.Name) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!data.Dob) {
      return res.status(400).json({ message: "Dob is required" });
    }

    const surveyExists = await SurveyForm.findById(data.Userid);
    if (!surveyExists) {
      return res.status(404).json({ message: "Parent survey (Userid) not found" });
    }

    const newChild = new Childrens({
      ...data,
      Name: data.Name?.trim(),
      Dob: data.Dob?.trim(),
      Father: data.Father?.trim(),
      Mother: data.Mother?.trim(),
      Guardian: data.Guardian?.trim(),
      Phone: data.Phone?.trim() || undefined,
    });

    await newChild.save();

    return res.status(200).json({
      message: "Data added successfully",
      id: newChild._id,
    });
  } catch (error) {
    console.error("❌ Error in addChild:", error);
    next(error);
  }
};

export const updateChild = async (req, res, next) => {
  try {
    const { id } = req.query;
    const data = req.body;
    if (!id || !isValidObjectId(id) || !data || Object.keys(data).length === 0) {
      return res.status(400).json({ message: "Id and data are required" });
    }

    const child = await Childrens.findById(id);
    if (!child) {
      return res.status(404).json({ message: " child data not found" });
    }
    const updateChild = await Childrens.findByIdAndUpdate(id, { $set: data }, { new: true });
    return res.status(200).json({
      message: "data updated successfully",
      updateChild,
    });
  } catch (error) {
    console.error("❌ Error in updateChild:", error);
    next(error);
  }
};

export const childDetails = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({ message: "Valid Id required" });
    }
    const user = await Childrens.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json({ message: "data fetched successfully", user });
  } catch (error) {
    console.error("❌ Error in childDetails:", error);
    next(error);
  }
};

// --------------------- YOUTH ---------------------
export const addYouth = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ message: "Data is required" });
    }
    if (data.Userid && !isValidObjectId(data.Userid)) {
      return res.status(400).json({ message: "Invalid Userid" });
    }

    const newYouth = new Youth({
      ...data,
      Name: data.Name?.trim(),
      Phone: data.Phone?.trim() || undefined,
    });

    await newYouth.save();

    return res.status(200).json({
      message: "Data added successfully",
      id: newYouth._id,
    });
  } catch (error) {
    console.error("❌ Error in addYouth:", error);
    next(error);
  }
};

export const youthDetails = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id || !isValidObjectId(id)) {
      return res.status(404).json({ message: "id is required" });
    }
    const youth = await Youth.findById(id);
    if (!youth) {
      return res.status(404).json({ message: "data not found" });
    }
    return res.status(200).json({ message: "data fetched successfully", youth });
  } catch (error) {
    console.error("❌ Error in youthDetails:", error);
    next(error);
  }
};

export const updateYouth = async (req, res, next) => {
  try {
    const { id } = req.query;
    const data = req.body;
    if (!id || !isValidObjectId(id) || !data || Object.keys(data).length === 0) {
      return res.status(400).json({ message: "Id and data are required" });
    }

    const youth = await Youth.findById(id);
    if (!youth) {
      return res.status(404).json({ message: " data not found" });
    }
    const updateYouth = await Youth.findByIdAndUpdate(id, { $set: data }, { new: true });
    return res.status(200).json({
      message: "data updated successfully",
      updateYouth,
    });
  } catch (error) {
    console.error("❌ Error in updateYouth:", error);
    next(error);
  }
};

// --------------------- MIDDLEAGE ---------------------
export const addMiddleage = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ message: "Data is required" });
    }
    if (data.Userid && !isValidObjectId(data.Userid)) {
      return res.status(400).json({ message: "Invalid Userid" });
    }

    const newMiddleage = new Middleage({
      ...data,
      Name: data.Name?.trim(),
      Phone: data.Phone?.trim() || undefined,
    });

    await newMiddleage.save();

    return res.status(200).json({
      message: "Data added successfully",
      id: newMiddleage._id,
    });
  } catch (error) {
    console.error("❌ Error in addMiddleage:", error);
    next(error);
  }
};

export const middleageDetails = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id || !isValidObjectId(id)) {
      return res.status(404).json({ message: "id is required" });
    }
    const user = await Middleage.findById(id);
    if (!user) {
      return res.status(401).json({ message: "data not found" });
    }
    return res.status(200).json({ message: "data fetched successfully", user });
  } catch (error) {
    console.error("❌ Error in middleageDetails:", error);
    next(error);
  }
};

export const updateMiddleage = async (req, res, next) => {
  try {
    const { id } = req.query;
    const data = req.body;
    if (!id || !isValidObjectId(id)) {
      return res.status(404).json({ message: "id required" });
    }
    const user = await Middleage.findById(id);
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    const updated = await Middleage.findByIdAndUpdate(id, data, { new: true });
    return res.status(200).json({ message: "data updated successfully", user: updated });
  } catch (error) {
    console.error("❌ Error in updateMiddleage:", error);
    next(error);
  }
};

// --------------------- SENIOR CITIZEN ---------------------
export const addSeniorCitizen = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ message: "No data available" });
    }
    if (data.Userid && !isValidObjectId(data.Userid)) {
      return res.status(400).json({ message: "Invalid Userid" });
    }

    const newSeniorCitizen = new SeniorCitizen({
      ...data,
      Name: data.Name?.trim(),
      Phone: data.Phone?.trim() || undefined,
    });
    await newSeniorCitizen.save();

    return res.status(200).json({
      message: "Data added successfully",
      id: newSeniorCitizen._id,
    });
  } catch (error) {
    console.error("❌ Error in addSeniorCitizen:", error);
    next(error);
  }
};

export const seniorCitizenDetails = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({ message: "id is required" });
    }
    const user = await SeniorCitizen.findById(id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json({
      message: "data fetched successfully",
      user,
    });
  } catch (error) {
    console.error("❌ Error in seniorCitizenDetails:", error);
    next(error);
  }
};

export const updateSeniors = async (req, res, next) => {
  try {
    const { id } = req.query;
    const data = req.body;
    if (!id || !isValidObjectId(id)) {
      return res.status(404).json({ message: "id required" });
    }
    const user = await SeniorCitizen.findById(id);
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    const updatedUser = await SeniorCitizen.findByIdAndUpdate(id, data, { new: true });
    return res.status(200).json({ message: "data updated successfully", updatedUser });
  } catch (error) {
    console.error("❌ Error in updateSeniors:", error);
    next(error);
  }
};

// --------------------- SUPER CITIZEN ---------------------
export const addSuperCitizen = async (req, res, next) => {
  try {
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ message: "No data available" });
    }
    if (data.Userid && !isValidObjectId(data.Userid)) {
      return res.status(400).json({ message: "Invalid Userid" });
    }

    const newSuperCitizen = new Supercitizen({
      ...data,
      Name: data.Name?.trim(),
      Phone: data.Phone?.trim() || undefined,
    });
    await newSuperCitizen.save();

    return res.status(200).json({
      message: "Data added successfully",
      id: newSuperCitizen._id,
    });
  } catch (error) {
    console.error("❌ Error in addSuperCitizen:", error);
    next(error);
  }
};

export const superCitizenDetails = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id || !isValidObjectId(id)) {
      return res.status(404).json({ message: "id is required" });
    }
    const user = await Supercitizen.findOne({ _id: id });
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    return res.status(200).json({ message: "data fetched successfully", user });
  } catch (error) {
    console.error("❌ Error in superCitizenDetails:", error);
    next(error);
  }
};

export const updateSuperCitizen = async (req, res, next) => {
  try {
    const { id } = req.query;
    const data = req.body;
    if (!id || !isValidObjectId(id)) {
      return res.status(404).json({ message: "id required" });
    }
    const user = await Supercitizen.findById(id);
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    const updated = await Supercitizen.findByIdAndUpdate(id, data, { new: true });
    return res.status(200).json({ message: "data updated successfully", updated });
  } catch (error) {
    console.error("❌ Error in updateSuperCitizen:", error);
    next(error);
  }
};

// --------------------- PANCHAYATH DETAILS ---------------------
export const PanchayathDetails = async (req, res, next) => {
  try {
    let { Panchayath, WardNo } = req.body;

    if (!Panchayath || WardNo === undefined || WardNo === null) {
      return res.status(400).json({ message: "Panchayath and WardNo are required" });
    }

    Panchayath = String(Panchayath).trim().toLowerCase();

    // WardNo might come as string — convert safely
    const wardNumber = Number(WardNo);
    if (Number.isNaN(wardNumber)) {
      return res.status(400).json({ message: "WardNo must be a number" });
    }

    let PostOffice = "";
    let Village = "";
    let Pincode = "";

    if (Panchayath === "aryad" && [16, 17].includes(wardNumber)) {
      PostOffice = "Thumpoly";
      Village = "Pathirappally";
      Pincode = "688008";
    } else if (Panchayath === "mararikulam south" && [16, 17].includes(wardNumber)) {
      PostOffice = "Katoor";
      Village = "Kalavoor";
      Pincode = "688522";
    } else if (
      Panchayath === "mararikulam south" &&
      [8, 9, 10, 11, 12, 13, 14, 15].includes(wardNumber)
    ) {
      PostOffice = "Pathirappally";
      Village = "Pathirappally";
      Pincode = "688521";
    } else {
      return res.status(404).json({ message: "No matching Panchayath and WardNo found" });
    }

    return res.status(200).json({
      Panchayath,
      WardNo: wardNumber,
      PostOffice,
      Village,
      Pincode,
    });
  } catch (error) {
    console.error("❌ Error in PanchayathDetails:", error);
    next(error);
  }
};
