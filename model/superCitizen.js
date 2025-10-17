import mongoose from "mongoose";

const superCitizenSchema = new mongoose.Schema(
  {
    Userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SurveyForm",
    },
    Name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minLength: 2,
      maxLength: 100,
    },
    BloodGroup: {
      type: String,
      trim: true,
    },
    Phone: {
      type: String,
      trim: true,
      minLength: 10,
      maxLength: 15,
    },
    MarritalStatus: {
      type: String,
      trim: true,
    },
    EducationalQualification: {
      type: String,
      trim: true,
    },
    CurrentlyWorking: {
      type: Boolean,
      default: false,
    },
    CurrentOccupation: {
      type: String,
      trim: true,
    },
    InstitutionName: {
      type: String,
      trim: true,
    },
    SelfEmployement: {
      type: Boolean,
      default: false,
    },
    EmployementDetails: {
      type: String,
      trim: true,
    },
    Unemployed: {
      type: Boolean,
      default: false,
    },
    PreviouslyEmployed: {
      type: Boolean,
      default: false,
    },
    Occupation: {
      type: String,
      trim: true,
    },
    FixedIncome: {
      type: Boolean,
      default: false,
    },
    AvgPersonalIncomeperMonth: {
      type: String,
      trim: true,
    },
    GettingPension: {
      type: Boolean,
      default: false,
    },
    PensionDetails: {
      type: String,
      trim: true,
    },
    SocialWorkOrganaisations: {
      type: String,
      trim: true,
    },
    HonorsorAchivementsinanyfield: {
      type: String,
      trim: true,
    },
    RewardsorPrizes: {
      type: String,
      trim: true,
    },
    PhysicalChallenges: {
      type: Boolean,
      default: false,
    },
    MentalChallenges: {
      type: Boolean,
      default: false,
    },
    FinancialLiability: {
      type: Boolean,
      default: false,
    },
    FileinancialLiabilityDetails: {
      type: String,
      trim: true,
    },
    Bedridden: {
      type: Boolean,
      default: false,
    },
    PalliativeTreatmentAvailable: {
      type: Boolean,
      default: false,
    },
    PalliativeTreatmentDetails: {
      type: String,
      trim: true,
    },
    DepressionandStress: {
      type: Boolean,
      default: false,
    },
    RegularMedicine: {
      type: Boolean,
      default: false,
    },
    MedicineDetails: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true } // enables createdAt and updatedAt
);

const Supercitizen = mongoose.model("Supercitizen", superCitizenSchema);

export default Supercitizen;
