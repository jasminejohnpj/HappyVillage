import mongoose from "mongoose";

const surveyFormSchema = new mongoose.Schema(
  {
    Village: {
      type: String,
      required: [true, "Village name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    Panchayath: {
      type: String,
      required: [true, "Panchayath name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    WardNo: {
      type: String,
      required: [true, "Ward number is required"],
      trim: true,
      maxLength: 10,
    },
    HouseholdHead: {
      type: String,
      required: [true, "Household head name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    HouseName: { type: String, trim: true, maxLength: 100 },
    HouseNo: { type: String, trim: true, maxLength: 20 },
    PostOffice: { type: String, trim: true, maxLength: 100 },
    Pincode: {
      type: String,
      trim: true,
      match: [/^\d{6}$/, "Invalid pincode format (should be 6 digits)"],
    },
    FamilymembersNO: {
      type: String,
      trim: true,
      match: [/^\d+$/, "Family member count must be a number"],
    },
    RationCardType: { type: String, trim: true, maxLength: 50 },
    RationCardTypeNO: { type: String, trim: true, maxLength: 20 },

    GasConnection: { type: Boolean, default: false },
    WoodStove: { type: Boolean, default: false },
    TypeofWoodStove: { type: String, trim: true, maxLength: 50 },
    Electricity: { type: Boolean, default: false },
    Solar: { type: Boolean, default: false },
    TypeofHouse: { type: String, trim: true, maxLength: 50 },
    AreaofHouse: { type: String, trim: true, maxLength: 50 },
    NoofVehicles: {
      type: String,
      trim: true,
      match: [/^\d+$/, "Number of vehicles must be a number"],
    },
    Noofpeopleworkings: {
      type: String,
      trim: true,
      match: [/^\d+$/, "Working people count must be a number"],
    },
    AreaofLand_Paddyland: { type: String, trim: true, maxLength: 50 },
    AreaofLand_Dryland: { type: String, trim: true, maxLength: 50 },
    AreaofLand_Wetland: { type: String, trim: true, maxLength: 50 },
    AreaofLand_Pond: { type: String, trim: true, maxLength: 50 },
    AreaofLand_Chaalu: { type: String, trim: true, maxLength: 50 },
    CurrentCultivationDetails: { type: String, trim: true, maxLength: 200 },

    ToiletFacilities: { type: Boolean, default: false },
    AvailabilityofCleanWater: { type: String, trim: true, maxLength: 100 },
    OrganicWasteManagementMethod: { type: String, trim: true, maxLength: 100 },
    InorganicWasteManagementMethod: {
      type: String,
      trim: true,
      maxLength: 100,
    },
    NoofpeoplewithPermanentjob: {
      type: String,
      trim: true,
      match: [/^\d+$/, "Permanent job count must be a number"],
    },
    familyMonthlyIncome: {
      type: String,
      trim: true,
      match: [/^\d+$/, "Monthly income must be a number"],
    },
    OtherMethodInorganicWasteManagement: {
      type: String,
      trim: true,
      maxLength: 100,
    },
  },
  { timestamps: true }
);

const SurveyForm = mongoose.model("SurveyForm", surveyFormSchema);

export default SurveyForm;
