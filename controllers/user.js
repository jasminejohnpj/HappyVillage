import bcrypt from "bcrypt";
import Admin from "../model/admin.js";
import SurveyForm from "../model/surveyForm.js";
import Family from "../model/familyMembers.js";
import Newborn from "../model/newborn.js";
import Childrens from "../model/children.js";
import Youth from "../model/youth.js";
import Middleage from "../model/middleAge.js";
import SeniorCitizen from "../model/seniorCitizen.js";
import Supercitizen from "../model/superCitizen.js";

export const registerUser = async (req, res, next) => {
  try {
    const { userName, mobile, password } = req.body;
    console.log(userName, mobile, password);

    const user = await Admin.findOne({ mobile });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Admin({
      userName,
      mobile,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({
      message: "User registered successfully",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    const user = await Admin.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    return res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    next(error.message);
  }
};

export const submitSurveyForm = async (req, res, next) => {
  try {
    const {
      Village,
      Panchayath,
      WardNo,
      PostOffice,
      Pincode,
      HouseholdHead,
      HouseName,
      HouseNo,
      FamilymembersNO,
      RationCardType,
      GasConnection,
      WoodStove,
      TypeofWoodStove,
      Electricity,
      Solar,
      ResidentialHouse,
      TypeofHouse,
      AreaofHouse,
      NoofVehicles,
      TwoWheeler,
      ThreeWheeler,
      FourWheeler,
      Other,
      Noofpeopleworkings,
      RegularIncomePeople,
      MonthlyHouseholdIncome,
      Area_Paddyland,
      Area_Dryland,
      CurrentCultivationDetails,
      ToiletFacilities,
      ToiletTankType,
      AvailabilityofCleanWater,
      KWAConnection,
      OrganicWasteManagementMethod,
      InorganicWasteManagementMethod,
      OtherMethodInorganicWasteManagement,
      SnehajalakamService,
      SnehajalakamServiceDetails,
      location, // allow location field if provided
    } = req.body;

    // ✅ Basic validation
    if (!Village || !Panchayath || !WardNo || !HouseholdHead) {
      return res.status(400).json({
        success: false,
        message: "Village, Panchayath, WardNo, and HouseholdHead are required.",
      });
    }

    // ✅ Check for duplicate HouseNo
    const existingHouse = await SurveyForm.findOne({ HouseNo });
    if (existingHouse) {
      return res.status(409).json({
        success: false,
        message: `House number '${HouseNo}' already exists.`,
      });
    }

    // ✅ Ensure location has valid structure or set default
    const safeLocation =
      location &&
      location.type === "Point" &&
      Array.isArray(location.coordinates) &&
      location.coordinates.length === 2
        ? location
        : { type: "Point", coordinates: [0, 0] };

    // ✅ Create new document
    const newSurvey = new SurveyForm({
      Village,
      Panchayath,
      WardNo,
      PostOffice,
      Pincode,
      HouseholdHead,
      HouseName,
      HouseNo,
      FamilymembersNO,
      RationCardType,
      GasConnection,
      WoodStove,
      TypeofWoodStove,
      Electricity,
      Solar,
      ResidentialHouse,
      TypeofHouse,
      AreaofHouse,
      NoofVehicles,
      TwoWheeler,
      ThreeWheeler,
      FourWheeler,
      Other,
      Noofpeopleworkings,
      RegularIncomePeople,
      MonthlyHouseholdIncome,
      Area_Paddyland,
      Area_Dryland,
      CurrentCultivationDetails,
      ToiletFacilities,
      ToiletTankType,
      AvailabilityofCleanWater,
      KWAConnection,
      OrganicWasteManagementMethod,
      InorganicWasteManagementMethod,
      OtherMethodInorganicWasteManagement,
      SnehajalakamService,
      SnehajalakamServiceDetails,
      location: safeLocation, // ✅ Prevents “Point must be an array” error
    });

    // ✅ Save document
    await newSurvey.save();

    return res.status(201).json({
      success: true,
      message: "Survey data saved successfully",
      id: newSurvey._id,
    });
  } catch (error) {
    console.error("Error in submitSurveyForm:", error);

    // ✅ Structured error response
    return res.status(500).json({
      success: false,
      message: "Failed to save survey data",
      error: error.message || "Internal server error",
    });
  }
};

export const SurveyDetails = async (req, res, next) => {
  try {
    const survey = await SurveyForm.find({}, "HouseholdHead HouseName HouseNo");

    return res.status(200).json({
      message: "List of survey details",
      survey,
    });
  } catch (error) {
    next(error.message);
  }
};

export const updateSurvey = async (req, res, next) => {
  try {
    const { id, ...data } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const existingSurvey = await SurveyForm.findById(id);
    if (!existingSurvey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    const updatedSurvey = await SurveyForm.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );

    return res.status(200).json({
      message: "Survey updated successfully",
      updatedSurvey,
    });
  } catch (error) {
    next(error.message);
  }
};

export const houseDetails = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Survey ID is required" });
    }

    const survey = await SurveyForm.findById(id);

    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }

    return res.status(200).json({
      message: "Survey details fetched successfully",
      survey,
    });
  } catch (error) {
    next(error.message);
  }
};

export const addFamilyMembers = async (req, res, next) => {
  try {
    const { Userid, FamilyMembers } = req.body;

    if (!Array.isArray(FamilyMembers)) {
      return res
        .status(400)
        .json({ message: "FamilyMembers must be an array" });
    }

    const newFamilyMembers = FamilyMembers.map((member) => ({
      Userid,
      Name: member.Name,
      Age: member.Age,
      Gender: member.Gender,
      Relation: member.Relation,
      Phone: member.Phone,
    }));

    const savedMembers = await Family.insertMany(newFamilyMembers);

    return res.status(200).json({
      message: "Family details updated successfully",
      members: savedMembers,
    });
  } catch (error) {
    next(error.message);
  }
};

export const familyDetails = async (req, res, next) => {
  try {
    const { Userid } = req.query;
    const family = await Family.find({ Userid: Userid });
    if (!Userid) {
      return res.status(404).json({ message: "id not found" });
    }
    return res.status(200).json({ message: "family members", family });
  } catch (error) {
    next(error.message);
  }
};

export const addNewborn = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const newborn = new Newborn(data);
    await newborn.save();

    return res.status(201).json({
      message: "Newborn created successfully",
      id: newborn._id,
    });
  } catch (error) {
    next(error.message);
  }
};

export const updateNewborn = async (req, res, next) => {
  try {
    const { id, ...data } = req.body;

    if (!id || !data) {
      return res.status(400).json({ message: "ID and data are required" });
    }
    const user = await Newborn.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Member not found" });
    }
    const updateNewborn = await Newborn.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    return res.status(200).json({
      message: "data updated successfully",
      updateNewborn,
    });
  } catch (error) {
    next(error.message);
  }
};

export const newbornDetails = async (req, res, next) => {
  try {
    const { Userid } = req.query;

    if (!Userid) {
      return res.status(400).json({ message: " ID is required" });
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
    next(error.message);
  }
};

export const addChild = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ message: "Data is required" });
    }

    const newChild = new Childrens(data);
    await newChild.save();

    return res.status(200).json({
      message: "Data added successfully",
      id: newChild._id,
    });
  } catch (error) {
    next(error.message);
  }
};

export const updateChild = async (req, res, next) => {
  try {
    const { id } = req.query;
    const data = req.body;
    if (!id || !data) {
      return res.status(400).json({ message: "Id and data are required" });
    }
    const child = await Childrens.findById(id);
    if (!child) {
      return res.status(404).json({ message: " child data not found" });
    }
    const updateChild = await Childrens.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    return res.status(200).json({
      message: "data updated successfully",
      updateChild,
    });
  } catch (error) {
    next(error.message);
  }
};

export const childDetails = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ message: "Id reuired" });
    }
    const user = await Childrens.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    return res.status(200).json({ message: "data fetched successfully", user });
  } catch (error) {
    next(error.message);
  }
};

export const addYouth = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ message: "Data is required" });
    }

    const newYouth = new Youth(data);
    await newYouth.save();

    return res.status(200).json({
      message: "Data added successfully",
      id: newYouth._id,
    });
  } catch (error) {
    next(error.message);
  }
};

export const youthDetails = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(404).json({ message: "id is required" });
    }
    const youth = await Youth.findById(id);
    if (!youth) {
      return res.status(404).json({ message: "data not found" });
    }
    return res
      .status(200)
      .json({ message: "data fetched successfully", youth });
  } catch (error) {
    next(error.message);
  }
};

export const updateYouth = async (req, res, next) => {
  try {
    const { id } = req.query;
    const data = req.body;
    if (!id || !data) {
      return res.status(400).json({ message: "Id and data are required" });
    }

    const youth = await Youth.findById(id);
    if (!youth) {
      return res.status(404).json({ message: " data not found" });
    }
    const updateYouth = await Youth.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    return res.status(200).json({
      message: "data updated successfully",
      updateYouth,
    });
  } catch (error) {
    next(error.message);
  }
};

export const addMiddleage = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ message: "Data is required" });
    }

    const newMiddleage = new Middleage(data);
    await newMiddleage.save();

    return res.status(200).json({
      message: "Data added successfully",
      id: newMiddleage._id,
    });
  } catch (error) {
    next(error.message);
  }
};

export const middleageDetails = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(404).json({ message: "id is required" });
    }
    const user = await Middleage.findById(id);
    if (!user) {
      return res.status(401).json({ message: "data not found" });
    }
    return res.status(200).json({ message: "data fetched successfully", user });
  } catch (error) {
    next(error.message);
  }
};

export const updateMiddleage = async (req, res, next) => {
  try {
    const { id } = req.query;
    const data = req.body;
    if (!id) {
      return res.status(404).json({ message: "id required" });
    }
    const user = await Middleage.findById(id);
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    await Middleage.findByIdAndUpdate(id, data);
    return res.status(200).json({ message: "data updated successfully", user });
  } catch (error) {
    next(error.message);
  }
};

export const addSeniorCitizen = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ message: "No data available" });
    }

    const newSeniorCitizen = new SeniorCitizen(data);
    await newSeniorCitizen.save();

    return res.status(200).json({
      message: "Data added successfully",
      id: newSeniorCitizen._id,
    });
  } catch (error) {
    next(error.message);
  }
};
export const seniorCitizenDetails = async (req, res, next) => {
  try {
    const { id } = req.query;

    if (!id) {
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
    next(error); // pass the actual error object
  }
};
export const updateSeniors = async (req, res, next) => {
  try {
    const { id } = req.query;
    const data = req.body;

    if (!id) {
      return res.status(404).json({ message: "id required" });
    }
    const user = await SeniorCitizen.findById(id);
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    const updatedUser = await SeniorCitizen.findByIdAndUpdate(id, data, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "data updated successfully", updatedUser });
  } catch (error) {
    next(error.message);
  }
};

export const addSuperCitizen = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ message: "No data available" });
    }

    const newSuperCitizen = new Supercitizen(data);
    await newSuperCitizen.save();

    return res.status(200).json({
      message: "Data added successfully",
      id: newSuperCitizen._id,
    });
  } catch (error) {
    next(error.message);
  }
};

export const superCitizenDetails = async (req, res, next) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(404).json({ message: "id is required" });
    }
    const user = await Supercitizen.findOne({ _id: id });
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    return res.status(200).json({ message: "data fetched successfully", user });
  } catch (error) {
    next(error.message);
  }
};

export const updateSuperCitizen = async (req, res, next) => {
  try {
    const { id } = req.query;
    const data = req.body;
    if (!id) {
      return res.status(404).json({ message: "id required" });
    }
    const user = await Supercitizen.findById(id);
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }
    await Supercitizen.findByIdAndUpdate(id, data);
    return res.status(200).json({ message: "data updated successfully" });
  } catch (error) {
    next(error.message);
  }
};

export const PanchayathDetails = async (req, res, next) => {
  try {
    let { Panchayath, WardNo } = req.body;

    if (!Panchayath || !WardNo) {
      return res
        .status(400)
        .json({ message: "Panchayath and WardNo are required" });
    }

    Panchayath = Panchayath.trim().toLowerCase();
    WardNo = Number(WardNo);

    let PostOffice = "";
    let Village = "";
    let Pincode = "";

    if (Panchayath === "aryad" && [16, 17].includes(WardNo)) {
      PostOffice = "Thumpoly";
      Village = "Pathirappally";
      Pincode = "688008";
    } else if (
      Panchayath === "mararikulam south" &&
      [16, 17].includes(WardNo)
    ) {
      PostOffice = "Katoor";
      Village = "Kalavoor";
      Pincode = "688522";
    } else if (
      Panchayath === "mararikulam south" &&
      [8, 9, 10, 11, 12, 13, 14, 15].includes(WardNo)
    ) {
      PostOffice = "Pathirappally";
      Village = "Pathirappally";
      Pincode = "688521";
    } else {
      return res
        .status(404)
        .json({ message: "No matching Panchayath and WardNo found" });
    }

    return res.status(200).json({
      Panchayath,
      WardNo,
      PostOffice,
      Village,
      Pincode,
    });
  } catch (error) {
    next(error);
  }
};
