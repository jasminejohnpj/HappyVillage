import mongoose from "mongoose";

const newbornSchema = new mongoose.Schema(
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
   
      trim: true,
    },
    Father: {
      type: String,
      trim: true,
      maxLength: [50, "Father name too long"],
      default: "",
    },
    Mother: {
      type: String,
      trim: true,
      maxLength: [50, "Mother name too long"],
      default: "",
    },
    Phone: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          // Allow empty OR valid number
          return !v || /^[0-9]{10,15}$/.test(v);
        },
        message: "Phone must be 10–15 digits or empty",
      },
      default: "",
    },
    Guardian: {
      type: String,
      trim: true,
      maxLength: [50, "Guardian name too long"],
      default: "",
    },
    CurrentHealthIssues: {
      type: Boolean,
      default: false,
    },
    HasIllnessOrDisability: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    IllnessOrDisabilityDetails: {
      type: String,
      trim: true,
      maxLength: [200, "Details too long"],
      default: "",
    },
    HasPhysicalDisability: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    PhysicalDisabilityDetails: {
      type: String,
      trim: true,
      maxLength: [200, "Details too long"],
      default: "",
    },
    HasMentalDisability: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    MentalDisabilityDetails: {
      type: String,
      trim: true,
      maxLength: [200, "Details too long"],
      default: "",
    },
    Remarks: {
  type: String,
  trim: true,
  default: "",
  maxLength: 500, // optional limit
},
    Vaccination: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// 🧠 Prevent crash from invalid ID before validation
newbornSchema.pre("validate", function (next) {
  if (!mongoose.Types.ObjectId.isValid(this.Userid)) {
    this.invalidate("Userid", `Invalid ObjectId format: ${this.Userid}`);
  }
  next();
});

const Newborn = mongoose.model("Newborn", newbornSchema);
export default Newborn;
