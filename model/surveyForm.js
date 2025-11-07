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
    HouseName: { type: String, trim: true, maxLength: 100 },
    HouseNo: { type: String, trim: true, maxLength: 20 },

    FamilymembersNO: {
      type: Number,
      required: true,
      min: [1, "Family member count must be at least 1"],
      validate: {
        validator: Number.isInteger,
        message: "Family member count must be an integer",
      },
    },

    RationCardType: { type: String, trim: true, maxLength: 50 },
    GasConnection: { type: Boolean, default: false },
    WoodStove: { type: Boolean, default: false },
    TypeofWoodStove: { type: String, trim: true, maxLength: 50 },
    Electricity: { type: Boolean, default: false },
    Solar: { type: Boolean, default: false },
    ResidentialHouse: { type: String, trim: true, maxLength: 50 },
    HabitableHouse: { type: Boolean, default: false },
    TypeofHouse: { type: String, trim: true, maxLength: 50 },
    AreaofHouse: { type: String, trim: true, maxLength: 50 },

    // ✅ Only keep number versions
    Noofpeopleworkings: {
      type: Number,
      min: [0, "Working people count cannot be negative"],
      default: 0,
    },
    RegularIncomePeople: {
      type: Number,
      min: [0, "Regular income people count cannot be negative"],
      default: 0,
    },
    MonthlyHouseholdIncome: {
      type: Number,
      min: [0, "Monthly household income cannot be negative"],
      default: 0,
    },

    // ✅ Updated vehicle fields
    NoofVehicles: { type: Number, default: 0 },
    TwoWheeler: { type: Number, default: 0 },
    ThreeWheeler: { type: Number, default: 0 },
    FourWheeler: { type: Number, default: 0 },
    Other: { type: String, trim: true, match: [/^\d+$/, "Number of vehicles must be a number"], },


    Area_Paddyland: { type: String, trim: true, default: null },
    Area_Dryland: { type: String, trim: true, default: null },
    Area_Wetland: { type: String, trim: true, default: null },

    CurrentCultivationDetails: { type: String, trim: true, default: null },

    ToiletFacilities: { type: Boolean, default: false },
    ToiletTankType: { type: String, trim: true, maxLength: 100 },
    AvailabilityofCleanWater: { type: String, trim: true, maxLength: 100 },
    KWAConnection: { type: Boolean, default: false },
    OrganicWasteManagementMethod: { type: String, trim: true, maxLength: 100 },
    InorganicWasteManagementMethod: { type: String, trim: true, maxLength: 100 },
    OtherMethodInorganicWasteManagement: { type: String, trim: true, maxLength: 100 },

    SnehajalakamService: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
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
          validator: function (val) {
            return (
              Array.isArray(val) &&
              val.length === 2 &&
              val.every((v) => typeof v === "number")
            );
          },
          message: "Coordinates must be an array of two numbers: [longitude, latitude]",
        },
      },
    },
  },
  { timestamps: true }
);

surveyFormSchema.index({ location: "2dsphere" });
const SurveyForm = mongoose.model("SurveyForm", surveyFormSchema);

export default SurveyForm;
