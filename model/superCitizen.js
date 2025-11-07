import mongoose from "mongoose";

const superCitizenSchema = new mongoose.Schema(
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
    BloodGroup: {
      type: String,
      trim: true,
    },
    Phone: {
      type: String,
      trim: true,
      minLength: 10,
      maxLength: 15,
      default: null,
    },
    MarritalStatus: {
      type: String,
      trim: true,
      enum: ["Married", "UnMarried", "Widow", "Widower"],
    },
    EducationalQualification: {
      type: String,
      trim: true,
    },
    EducationMainSubject: {
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
    OtherKnownJobs: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && new Set(arr).size === arr.length;
        },
        message: "Duplicate job names are not allowed",
      },
    },
    Unemployed: {
      type: Boolean,
      default: false,
    },
    PreviouslyEmployed: {
      type: Boolean,
      default: false,
    },
    Occupation: {
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
    RewardsorPrizes: {
      type: String,
      trim: true,
    },

    FinancialLiability: {
      type: Boolean,
      default: false,
    },
    FileinancialLiabilityDetails: {
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
    LifeSatisfaction: {
      type: String,
      enum: ["Poor", "Fair", "Good", "Very Good", "Excellent"],
      default: "Good",
      trim: true,
    },
    MedicineDetails: {
      type: String,
      trim: true,
    },
    HasIllnessOrDisability: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    IllnessOrDisabilityDetails: { type: String, trim: true, maxLength: 200 },
    HasPhysicalDisability: { type: String, enum: ["Yes", "No"], default: "No" },
    PhysicalDisabilityDetails: { type: String, trim: true, maxLength: 200 },
    HasMentalDisability: { type: String, enum: ["Yes", "No"], default: "No" },
    MentalDisabilityDetails: { type: String, trim: true, maxLength: 200 },
    LifestyleDisease: {
      type: Boolean,
      default: false,
    },
    LifestyleDiseaseType: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && new Set(arr).size === arr.length;
        },
        message: "Duplicate disease types are not allowed",
      },
    },
    NRI: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // enables createdAt and updatedAt
);

const Supercitizen = mongoose.model("Supercitizen", superCitizenSchema);

export default Supercitizen;
