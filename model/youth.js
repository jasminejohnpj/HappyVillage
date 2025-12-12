import mongoose from "mongoose";

const youthSchema = new mongoose.Schema(
  {
    Userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SurveyForm",
      required: [true, "User ID is required"],
      validate: {
        validator: (v) => mongoose.Types.ObjectId.isValid(v),
        message: (props) => `Invalid Userid: ${props.value}`,
      },
    },
    Familymemberid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Family",
      required: [true, "Family ID is required"],
      validate: {
        validator: (v) => mongoose.Types.ObjectId.isValid(v),
        message: (props) => `Invalid Family: ${props.value}`,
      },
    },
    Name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [2, "Name must be at least 2 characters"],
      maxLength: [100, "Name too long"],
    },
    Dob: { type: String, trim: true, default: "" },
    Phone: {
      type: String,
      trim: true,
      default: "",
      validate: {
        validator: (v) => !v || /^[0-9]{10,15}$/.test(v),
        message: "Phone must be 10–15 digits or empty",
      },
    },
    BloodGroup: { type: String, trim: true, default: "" },
    Father: { type: String, trim: true, default: "" },
    Mother: { type: String, trim: true, default: "" },
    MarritalStatus: {
      type: String,
      enum: ["Married", "UnMarried", "Widow", "Widower"],
      default: "UnMarried",
      trim: true,
    },
    EducationalQualification: { type: String, trim: true, default: "" },
    otherEducationalQualification: { type: String, trim: true, default: "" },
    OtherQualification: { type: String, trim: true, default: "" },
    CurrentlyStudying: { type: String, trim: true, default: "" },
    OtherCourse: { type: String, trim: true, default: "" },
    EducationMainSubject: { type: String, trim: true, default: "" },
    OtherMainSubject: { type: String, trim: true, default: "" },

    TerminateWithoutCompletion: { type: Boolean, default: false },
    Course: { type: String, trim: true, default: "" },
    Reason: { type: String, trim: true, default: "" },
    CurrentlyWorking: { type: Boolean, default: false },
    CurrentOccupation: { type: String, trim: true, default: "" },
    Otheroccupations: { type: String, trim: true, default: "" },
    InstitutionName: { type: String, trim: true, default: "" },
    SelfEmployement: { type: Boolean, default: false },
    EmployementDetails: { type: String, trim: true, default: "" },
    OtherKnownJobs: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) =>
          Array.isArray(arr) && new Set(arr).size === arr.length,
        message: "Duplicate job names are not allowed",
      },
    },
    FixedIncome: { type: Boolean, default: false },
    AvgPersonalIncomeperMonth: { type: String, trim: true, default: "" },
    SocialWorkOrganaisations: { type: String, trim: true, default: "" },
    HonorsorAchivementsinanyfield: { type: String, trim: true, default: "" },
    ArtisticorAthleticAptitude: { type: String, trim: true, default: "" },
    RewardsorPrizes: { type: String, trim: true, default: "" },
    ExamTensionsorStress: { type: Boolean, default: false },
    HasIllnessOrDisability: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    Remarks: {
      type: String,
      trim: true,
      default: "",
      maxLength: 500, // optional limit
    },
    IllnessOrDisabilityDetails: { type: String, trim: true, default: "" },
    HasPhysicalDisability: { type: String, enum: ["Yes", "No"], default: "No" },
    PhysicalDisabilityDetails: { type: String, trim: true, default: "" },
    HasMentalDisability: { type: String, enum: ["Yes", "No"], default: "No" },
    MentalDisabilityDetails: { type: String, trim: true, default: "" },
    LifestyleDisease: { type: Boolean, default: false },
    LifestyleDiseaseType: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) =>
          Array.isArray(arr) && new Set(arr).size === arr.length,
        message: "Duplicate disease types are not allowed",
      },
    },
    GettingPension: { type: Boolean, default: false },
    NRI: { type: Boolean, default: false },
    LifeSatisfaction: {
      type: String,
      enum: ["Poor", "Fair", "Good", "Very Good", "Excellent","N/A"],
      default: "Good",
      trim: true,
    },
    PensionDetails: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) =>
          Array.isArray(arr) && new Set(arr).size === arr.length,
        message: "Duplicate pension types are not allowed",
      },
    },
  },
  { timestamps: true }
);

youthSchema.pre("validate", function (next) {
  if (!mongoose.Types.ObjectId.isValid(this.Userid)) {
    this.invalidate("Userid", `Invalid ObjectId format: ${this.Userid}`);
  }
  next();
});

const Youth = mongoose.model("Youth", youthSchema);
export default Youth;
