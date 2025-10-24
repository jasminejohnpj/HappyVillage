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
    PostOffice:{
      type: String,
      required: [true, "Post Office is required"],
      trim: true,
      maxLength: 10,
    },
    Pincode:{
      type: String,
      required: [true, "Pin Code is required"],
      trim: true,
      match: [/^\d{6}$/, "Invalid pincode format (should be 6 digits)"],
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
    FamilymembersNO: {
      type: String,
      trim: true,
      match: [/^\d+$/, "Family member count must be a number"],
    },
    RationCardType: { type: String, trim: true, maxLength: 50 },
    GasConnection: { type: Boolean, default: false },
    WoodStove: { type: Boolean, default: false },
    TypeofWoodStove: { type: String, trim: true, maxLength: 50 },
    Electricity: { type: Boolean, default: false },
    Solar: { type: Boolean, default: false },
    ResidentialHouse:{type: String, trim: true, maxLength: 50},
    HabitableHouse:{type: Boolean, default: false},
    TypeofHouse: { type: String, trim: true, maxLength: 50 },
    AreaofHouse: { type: String, trim: true, maxLength: 50 },
     TwoWheeler:{
      type: String,
      trim: true,
      match: [/^\d+$/, "Number of vehicles must be a number"]
    },
     ThreeWheeler:{
      type: String,
      trim: true,
      match: [/^\d+$/, "Number of vehicles must be a number"]
     },
     FourWheeler:{
      type: String,
      trim: true,
      match: [/^\d+$/, "Number of vehicles must be a number"]
     },
     Other:{
      type: String,
      trim: true,
      match: [/^\d+$/, "Number of vehicles must be a number"]
     },
    Noofpeopleworkings: {
      type: String,
      trim: true,
      match: [/^\d+$/, "Working people count must be a number"],
    },
    RegularIncomePeople:{
      type:String, 
      trim:true,
       match: [/^\d+$/, "Number of vehicles must be a number"]
    },
    MonthlyHouseholdIncome:{ type: String,
      trim: true,
      match: [/^\d+$/, "Working people count must be a number"]
    },
   
    AreaofLand_Paddyland: { type: String, trim: true, maxLength: 50 , allowNull: true},
    AreaofLand_Dryland: { type: String, trim: true, maxLength: 50,allowNull: true },
    CurrentCultivationDetails: { type: String, trim: true, maxLength: 200,allowNull: true },
    ToiletFacilities: { type: Boolean, default: false },
    ToiletTankType:{ type: String, trim: true, maxLength: 100 },
    AvailabilityofCleanWater: { type: String, trim: true, maxLength: 100 },
    KWAConnection:{ type: Boolean, default: false },
    OrganicWasteManagementMethod: { type: String, trim: true, maxLength: 100 },
    InorganicWasteManagementMethod: {
      type: String,
      trim: true,
      maxLength: 100,
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
