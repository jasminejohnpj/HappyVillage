const mongoose = require("mongoose")

const SeniorcitizenSchema = new mongoose.Schema({
    Userid :  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SurveyForm'
    },
    Name : {type:String},
    Dob :{type:String},
    BloodGroup : {type:String},
    MarritalStatus: {type:String},
    EducationalQualification :{type:String},
    CurrentlyWorking : {type:Boolean},
    CurrentOccupation : {type:String},
    InstitutionName : {type:String},
    SelfEmployement: {type:Boolean},
    EmployementDetails : {type:String},
    Unemployed : {type:Boolean},
    UnemployementReson : {type:String},
    PreviouslyEmployed :{type:Boolean},
    PreviousJobDetails : {type:String},
    FixedIncome :{type:Boolean},
    AvgPersonalIncomeperMonth:{type:String},
    GettingPension : {type:Boolean},
    PensionDetails : {type:String},
    SocialWorkOrganaisations : {type:String},
    HonorsorAchivementsinanyfield : {type:String},
    ArtisticorAthleticAptitude:{type:String},
    RewardsorPrizes : {type:String},
    PhysicalChallenges :{type:Boolean},
    MentalChallenges : {type:Boolean},
    FinancialLiability : {type:Boolean},
    FinancialLiabilityDetails : {type:String},
    Bedridden :{type:Boolean},
    PalliativeTreatmentAvailable : {type:Boolean},
    PalliativeTreatmentDetails : {type:String},
    DepressionandStress : {type:Boolean},
    RegularMedicine : {type:Boolean},
    MedicineDetails : {type:String},
},{ timestamps : false});

module.exports = mongoose.model('SeniorCitizen' , SeniorcitizenSchema);

