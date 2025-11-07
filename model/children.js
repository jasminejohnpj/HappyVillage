import mongoose from "mongoose";

const ChildSchema = new mongoose.Schema(
  {
    Userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SurveyForm",
      required: [true, "User ID is required"],
    },
    Name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    Dob: {
      type: String,
      required: [true, "Date of Birth is required"],
      trim: true,
    },
    Father: {
      type: String,
      trim: true,
      maxLength: 50,
    },
    Mother: {
      type: String,
      trim: true,
      maxLength: 50,
    },
    Guardian: {
      type: String,
      trim: true,
      maxLength: 50,
    },
    Phone: {
      type: String,
      trim: true,
      minLength: 10,
      maxLength: 15,
    },
    EducationalQualification: {
      type: String,
      trim: true,
      maxLength: 100,
    },
    CurrentlyStudying: {
      type: String,
      trim: true,
      maxLength: 100,
    },
    DroppedClass: {
      type: String,
      trim: true,
      maxLength: 50,
    },
    Reason: {
      type: String,
      trim: true,
      maxLength: 200,
    },
    CurrentOccupation: {
      type: String,
      trim: true,
      maxLength: 100,
    },
    Otheroccupations: {
      type: String,
      trim: true,
      maxLength: 100,
    },
    ArtisticorAthleticAptitude: {
      type: String,
      trim: true,
      maxLength: 100,
    },
    RewardsorPrizes: {
      type: String,
      trim: true,
      maxLength: 200,
    },

    ExamTensionMentalStress: {
      type: Boolean,
      default: false,
    },
       BloodGroup: {
      type: String,
      trim: true,
    },
    Vaccination: {
      type: Boolean,
      default: false,
    },
    MarritalStatus: {
      type: String,
      trim: true,
      enum: ["Married", "UnMarried", "Widow", "Widower"],
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
    GettingPension: {
      type: Boolean,
      default: false,
    },
    PensionDetails: {
      type: [String],
      default: [],
      validate: {
        validator: function (arr) {
          return Array.isArray(arr) && new Set(arr).size === arr.length;
        },
        message: "Duplicate pension types are not allowed",
      },
    },
  },

  { timestamps: true }
);

const Childrens = mongoose.model("Childrens", ChildSchema);

export default Childrens;
