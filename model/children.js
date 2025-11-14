import mongoose from "mongoose";

const ChildSchema = new mongoose.Schema(
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
      maxLength: [50, "Name cannot exceed 50 characters"],
    },
    Dob: {
      type: String,
      required: [true, "Date of Birth is required"],
      trim: true,
    },
    Father: { type: String, trim: true, maxLength: 50, default: "" },
    Mother: { type: String, trim: true, maxLength: 50, default: "" },
    Guardian: { type: String, trim: true, maxLength: 50, default: "" },
    Phone: {
      type: String,
      trim: true,
      default: "",
      validate: {
        validator: (v) => !v || /^[0-9]{10,15}$/.test(v),
        message: "Phone must be 10–15 digits or empty",
      },
    },
    EducationalQualification: { type: String, trim: true, default: "" },
    CurrentlyStudying: { type: String, trim: true, default: "" },
    DroppedClass: { type: String, trim: true, default: "" },
    Reason: { type: String, trim: true, default: "" },
    CurrentOccupation: { type: String, trim: true, default: "" },
    Otheroccupations: { type: String, trim: true, default: "" },
    ArtisticorAthleticAptitude: { type: String, trim: true, default: "" },
    RewardsorPrizes: { type: String, trim: true, default: "" },
    ExamTensionMentalStress: { type: Boolean, default: false },
    BloodGroup: { type: String, trim: true, default: "" },
    Vaccination: { type: Boolean, default: false },
    MarritalStatus: {
      type: String,
      enum: ["Married", "UnMarried", "Widow", "Widower"],
      default: "UnMarried",
    },
    HasIllnessOrDisability: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    IllnessOrDisabilityDetails: { type: String, trim: true, default: "" },
    HasPhysicalDisability: { type: String, enum: ["Yes", "No"], default: "No" },
    PhysicalDisabilityDetails: { type: String, trim: true, default: "" },
    HasMentalDisability: { type: String, enum: ["Yes", "No"], default: "No" },
    MentalDisabilityDetails: { type: String, trim: true, default: "" },
    GettingPension: { type: Boolean, default: false },
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

// ✅ Double safety against bad ObjectIds
ChildSchema.pre("validate", function (next) {
  if (!mongoose.Types.ObjectId.isValid(this.Userid)) {
    this.invalidate("Userid", `Invalid ObjectId format: ${this.Userid}`);
  }
  next();
});

const Childrens = mongoose.model("Childrens", ChildSchema);
export default Childrens;
