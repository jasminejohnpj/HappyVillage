import mongoose from "mongoose";

const familySchema = new mongoose.Schema(
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
    Name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [2, "Name must be at least 2 characters"],
      maxLength: [50, "Name cannot exceed 50 characters"],
    },
    Age: {
      type: String,
      required: [true, "Age is required"],
      trim: true,
    },
    Gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["Male", "Female", "Other"],
    },
    Relation: {
      type: String,
      required: [true, "Relation is required"],
      trim: true,
    },
    Phone: {
      type: String,
      trim: true,
      default: "",
      validate: {
        validator: (v) => !v || /^[0-9]{10,15}$/.test(v),
        message: "Phone must be 10–15 digits or empty",
      },
    },
    otherRelationship: {
      type: String,
      trim: true,
      default: "",
      maxLength: [50, "Other relationship cannot exceed 50 characters"],
    },
  },
  { timestamps: true }
);

// ✅ Prevent crashes on invalid ObjectId
familySchema.pre("validate", function (next) {
  if (!mongoose.Types.ObjectId.isValid(this.Userid)) {
    this.invalidate("Userid", `Invalid ObjectId format: ${this.Userid}`);
  }
  next();
});

const Family = mongoose.model("Family", familySchema);
export default Family;
