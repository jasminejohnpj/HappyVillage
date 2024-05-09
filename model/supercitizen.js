const mongoose = require("mongoose");

const SupercitizenSchema = new mongoose.Schema({
    Userid :  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SurveyForm'
    },
    Name : {type:String},
    BloodGroup : {type:String},
    MarritalStatus: {type:String},
    EducationalQualification :{type:String},
    CurrentlyWorking : {type:Boolean},
    CurrentOccupation : {type:String},
    InstitutionName :{type:String},
    SelfEmployement: {type:Boolean},
    EmployementDetails : {type:String},
    Unemployed : {type:Boolean},
    PreviouslyEmployed : {type:Boolean},
    Occupation: {type:String},
    FixedIncome : {type:Boolean},
    AvgPersonalIncomeperMonth:{type:String},
    GettingPension : {type:Boolean},
    PensionDetails : {type:String},
    SocialWorkOrganaisations : {type:String},
    HonorsorAchivementsinanyfield : {type:String},
    RewardsorPrizes : {type:String},
    PhysicalChallenges :{type:Boolean},
    MentalChallenges :{type:Boolean},
    FinancialLiability : {type:Boolean},
    FileinancialLiabilityDetails :{type:String},
    Bedridden : {type:Boolean},
    PalliativeTreatmentAvailable : {type:Boolean},
    PalliativeTreatmentDetails : {type:String},
    DepressionandStress : {type:Boolean},
    RegularMedicine :{type:Boolean},
    MedicineDetails : {type:String},
},{ timestamps : false});

module.exports = mongoose.model('Supercitizen' , SupercitizenSchema);

