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
    PhysicalChallenges: {
      type: Boolean,
      default: false,
    },
    MentalChallenges: {
      type: Boolean,
      default: false,
    },
    ExamTensionMentalStress: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Childrens = mongoose.model("Childrens", ChildSchema);

export default Childrens;
