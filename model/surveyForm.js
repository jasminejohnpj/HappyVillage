import mongoose from "mongoose";

const surveyFormSchema = new mongoose.Schema(
  {
    Village: {
      type: String,
      required: [true, "Village name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    Panchayath: {
      type: String,
      required: [true, "Panchayath name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    WardNo: {
      type: String,
      required: [true, "Ward number is required"],
      trim: true,
      maxLength: 10,
    },
    PostOffice: {
      type: String,
      required: [true, "Post Office is required"],
      trim: true,
      maxLength: 100,
    },
    Pincode: {
      type: String,
      required: [true, "Pin Code is required"],
      trim: true,
      match: [/^\d{6}$/, "Invalid pincode format (should be 6 digits)"],
    },
    HouseholdHead: {
      type: String,
      required: [true, "Household head name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    HouseName: { type: String, trim: true, default: "" },
    HouseNo: { type: String, trim: true, default: "" },

    FamilymembersNO: {
      type: Number,
      required: [true, "No. of house members is required"],
      min: [1, "No. of house members must be at least 1"],
      validate: {
        validator: Number.isInteger,
        message: "No. of house members must be an integer",
      },
    },

    RationCardType: { type: String, trim: true, default: "" },
    GasConnection: { type: Boolean, default: false },
    WoodStove: { type: Boolean, default: false },
    TypeofWoodStove: { type: String, trim: true, default: "" },
    Electricity: { type: Boolean, default: false },
    Solar: { type: Boolean, default: false },
    ResidentialHouse: { type: String, trim: true, default: "" },
    HabitableHouse: { type: Boolean, default: false },
    TypeofHouse: { type: [String], default: [] },
    AreaofHouse: { type: String, trim: true, default: "" },

    Noofpeopleworkings: { type: Number, min: 0, default: 0 },
    RegularIncomePeople: { type: Number, min: 0, default: 0 },
    MonthlyHouseholdIncome: { type: Number, min: 0, default: 0 },
    NoofVehicles: { type: Number, default: 0 },
    TwoWheeler: { type: Number, default: 0 },
    ThreeWheeler: { type: Number, default: 0 },
    FourWheeler: { type: Number, default: 0 },
    Other: {
      type: String,
      trim: true,
      default: "",
    },

    Area_Paddyland: { type: String, trim: true, default: "" },
    Area_Dryland: { type: String, trim: true, default: "" },
    Area_Wetland: { type: String, trim: true, default: "" },
    CurrentCultivationDetails: { type: String, trim: true, default: "" },

    ToiletFacilities: { type: Boolean, default: false },
    ToiletTankType: { type: String, trim: true, default: "" },
    AvailabilityofCleanWater: { type: String, trim: true, default: "" },
    KWAConnection: { type: Boolean, default: false },
    OrganicWasteManagementMethod: { type: String, trim: true, default: "" },
    InorganicWasteManagementMethod: { type: String, trim: true, default: "" },
    OtherMethodInorganicWasteManagement: {
      type: String,
      trim: true,
      default: "",
    },

    SnehajalakamService: { type: String, enum: ["Yes", "No"], default: "No" },
    SnehajalakamServiceDetails: {
      type: [String],
      enum: [
        "Palliative Care",
        "Janakiya Lab",
        "Janakiya Pharmacy",
        "Janakiya Bhakshanashala",
        "Vidyajalakam",
        "Sahayajalam",
        "Snehabhavanam",
      ],
      default: [],
    },
    DomesticAnimals: {
      type: [String],
      enum: [
        "Hen",
        "Duck",
        "Cow",
        "Goat",
        "Rabbit",
        "Quail",
        "Dog",
        "Cat",
        "Buffalo",
        "fish",
        "love birds",
        "N/A",
      ],
      default: [],
    },
    Remarks: {
      type: String,
      trim: true,
      default: "",
      maxLength: 500, // optional limit
    },
    WasteWaterManagementSystem: {
      type: String,
      enum: ["No", "Soakage Pit", "Open drainage"],
      default: "No",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      validate: {
        validator: (v) => mongoose.Types.ObjectId.isValid(v),
        message: (props) => `Invalid Admin ID: ${props.value}`,
      },
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
        validate: {
          validator: (val) =>
            Array.isArray(val) &&
            val.length === 2 &&
            val.every((v) => typeof v === "number"),
          message: "Coordinates must be [longitude, latitude]",
        },
      },
    },
  },
  { timestamps: true }
);

surveyFormSchema.pre("validate", function (next) {
  if (!mongoose.Types.ObjectId.isValid(this.createdBy)) {
    this.invalidate("createdBy", `Invalid ObjectId format: ${this.createdBy}`);
  }
  next();
});

surveyFormSchema.index({ location: "2dsphere" });

const SurveyForm = mongoose.model("SurveyForm", surveyFormSchema);
export default SurveyForm;
