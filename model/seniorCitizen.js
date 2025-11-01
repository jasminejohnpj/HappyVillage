import mongoose from "mongoose";

const seniorCitizenSchema = new mongoose.Schema(
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
    BloodGroup: {
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
 
    EducationalQualification: {
      type: String,
      trim: true,
    },
     EducationMainSubject:{
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
    PreviouslyEmployed: {
      type: Boolean,
      default: false,
    },
    PreviousJobDetails: {
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
    GettingPension: {
      type: Boolean,
      default: false,
    },
    PensionDetails: {
    type: [String],
    default: [],
    validate: {
      validator: function (arr) {
        // Ensure it's an array and contains no duplicates
        return Array.isArray(arr) && new Set(arr).size === arr.length;
      },
      message: "Duplicate pension types are not allowed",
    },
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
    FinancialLiabilityDetails: {
      type: String,
      trim: true,
    },
    Bedridden: {
      type: Boolean,
      default: false,
    },
    PalliativeTreatmentAvailable: {
      type: Boolean,
      default: false,
    },
    PalliativeTreatmentDetails: {
      type: String,
      trim: true,
    },
    DepressionandStress: {
      type: Boolean,
      default: false,
    },
    RegularMedicine: {
      type: Boolean,
      default: false,
    },
    MedicineDetails: {
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
    },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const SeniorCitizen = mongoose.model("SeniorCitizen", seniorCitizenSchema);

export default SeniorCitizen;
