import mongoose from "mongoose";

const newbornSchema = new mongoose.Schema(
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
    Phone: {
      type: String,
      trim: true,
      minLength: 10,
      maxLength: 15,
    },
    Guardian: {
      type: String,
      trim: true,
      maxLength: 50,
    },
    CurrentHealthIssues: {
      type: Boolean,
      default: false,
    },
    Vaccination:{
       type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

const Newborn = mongoose.model("Newborn", newbornSchema);

export default Newborn;
