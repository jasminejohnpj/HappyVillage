import mongoose from "mongoose";

const familySchema = new mongoose.Schema(
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
    Age: {
      type: String,
      required: [true, "Age is required"],
      trim: true,
    },
    Gender: {
      type: String,
      required: [true, "Gender is required"]
    },
    Relation: {
      type: String,
      required: [true, "Relation is required"],
      trim: true,
    },
    Phone: {
      type: String,
      trim: true,
      minLength: 10,
      maxLength: 15,
    },
  },
  { timestamps: true }
);

const Family = mongoose.model("Family", familySchema);

export default Family;
