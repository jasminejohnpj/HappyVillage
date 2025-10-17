import mongoose from "mongoose";

const surveyDataSchema = new mongoose.Schema(
  {
    Village: {
      type: String,
      trim: true,
      default: "",
    },
    Panchayath: {
      type: String,
      trim: true,
      default: "",
    },
    WardNo: {
      type: String,
      trim: true,
      default: "",
    },
    RationCardType: {
      type: String,
      trim: true,
      default: "",
    },
    MarritalStatus: {
      type: String,
      trim: true,
      default: "",
    },
    TypeofHouse: {
      type: String,
      trim: true,
      default: "",
    },
    AreaofHouse: {
      type: String,
      trim: true,
      default: "",
    },
    AvailabilityofCleanWater: {
      type: String,
      trim: true,
      default: "",
    },
    OrganicWasteManagementMethod: {
      type: String,
      trim: true,
      default: "",
    },
    InorganicWasteManagementMethod: {
      type: String,
      trim: true,
      default: "",
    },
    EducationalQualification: {
      type: String,
      trim: true,
      default: "",
    },
    BloodGroup: {
      type: String,
      trim: true,
      default: "",
    },
    PensionDetails: {
      type: String,
      trim: true,
      default: "",
    },
    MedicineDetails: {
      type: String,
      trim: true,
      default: "",
    },
    TypeofWoodStove:{
       type: String,
      trim: true,
      default: "",
    },
    FilterValues:{
       type: String,
      trim: true,
      default: "",
    }
  },
  { timestamps: true }
);

const SurveyData = mongoose.model("SurveyData", surveyDataSchema);

export default SurveyData;
