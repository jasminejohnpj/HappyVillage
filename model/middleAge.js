import mongoose from "mongoose";

const middleageSchema = new mongoose.Schema(
  {
    Userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SurveyForm",
    },
    Name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minLength: 2,
      maxLength: 100,
    },
    Dob: {
      type: String,
      trim: true,
    },
    Phone: {
      type: String,
      trim: true,
      minLength: 10,
      maxLength: 15,
      default: null
    },
    BloodGroup: {
      type: String,
      trim: true,
    },
    Father: {
      type: String,
      trim: true,
    },
    Mother: {
      type: String,
      trim: true,
    },
  
    EducationalQualification: {
      type: String,
      trim: true,
    },
     EducationMainSubject:{
      type: String,
      trim: true,
    },
    TerminateWithoutCompletion: {
      type: Boolean,
      default: false,
    },
    Course: {
      type: String,
      trim: true,
    },
    Reason: {
      type: String,
      trim: true,
    },
    CurrentlyWorking: {
      type: Boolean,
      default: false,
    },
    CurrentOccupation: {
      type: String,
      trim: true,
    },
    InstitutionName: {
      type: String,
      trim: true,
    },
    SelfEmployement: {
      type: Boolean,
      default: false,
    },
    EmployementDetails: {
      type: String,
      trim: true,
    },
    Unemployed: {
      type: Boolean,
      default: false,
    },
    UnemployementReson: {
      type: String,
      trim: true,
    },
    FixedIncome: {
      type: Boolean,
      default: false,
    },
     AvgPersonalIncomeperMonth: {
      type: String,
      trim: true,
    },
    SocialWorkOrganaisations: {
      type: String,
      trim: true,
    },
    HonorsorAchivementsinanyfield: {
      type: String,
      trim: true,
    },
    ArtisticorAthleticAptitude: {
      type: String,
      trim: true,
    },
    RewardsorPrizes: {
      type: String,
      trim: true,
    },
    PhysicalChallenges: {
      type: Boolean,
      default: false,
    },
    MentalChallenges: {
      type: Boolean,
      default: false,
    },
    FinancialLiability: {
      type: Boolean,
      default: false,
    },
    FinancialLiabilityReason: {
      type: String,
      trim: true,
    },
    LifestyleDisease:{
       type: Boolean,
      default: false,
    },
     LifestyleDiseaseType:{
      type: String,
      trim: true,
    },
    GettingPension:{
       type: Boolean,
      default: false,
    }
  },
  { timestamps: true } // Enables createdAt and updatedAt
);

const Middleage = mongoose.model("Middleage", middleageSchema);

export default Middleage;
