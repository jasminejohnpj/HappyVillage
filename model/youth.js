import mongoose from "mongoose";

const youthSchema = new mongoose.Schema(
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
      default: null,
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
    MarritalStatus: {
      type: String,
      trim: true,
      enum: ["Married", "UnMarried", "Widow", "Widower"],
    },
    EducationalQualification: {
      type: String,
      trim: true,
    },
    OtherQualification: {
      type: String,
      trim: true,
    },

    CurrentlyStudying: {
      type: String,
      trim: true,
    },
    OtherCourse: {
      type: String,
      trim: true,
    },
    EducationMainSubject: {
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

    ExamTensionsorStress: {
      type: Boolean,
      default: false,
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
    GettingPension: {
      type: Boolean,
      default: false,
    },
    NRI: {
      type: Boolean,
      default: false,
    },
    LifeSatisfaction: {
      type: String,
      enum: ["Poor", "Fair", "Good", "Very Good", "Excellent"],
      default: "Good",
      trim: true,
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
  },
  { timestamps: true }
);

const Youth = mongoose.model("Youth", youthSchema);

export default Youth;
