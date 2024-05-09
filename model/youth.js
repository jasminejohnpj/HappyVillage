const mongoose = require("mongoose")

const YouthSchema = new mongoose.Schema({
    Userid :  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SurveyForm'
    },
    Name : {type:String},
    Dob :{type:String},
    BloodGroup : {type:String},
    Father : {type:String},
    Mother : {type:String},
    MarritalStatus: {type:String},
    EducationalQualification :{type:String},
    CurrentlyStudying : {type:String},
    TerminateWithoutCompletion : {type:Boolean},
    Course: {type:String},
    Reason : {type:String},
    CurrentlyWorking : {type:Boolean},
    CurrentOccupation : {type:String},
    InstitutionName : {type:String},
    SelfEmployement: {type:Boolean},
    EmployementDetails : {type:String},
    FixedIncome :{type:Boolean},
    AvgPersonalIncomeperMonth: {type:String},
    SocialWorkOrganaisations : {type:String},
    HonorsorAchivementsinanyfield : {type:String},
    ArtisticorAthleticAptitude: {type:String},
    RewardsorPrizes : {type:String},
    PhysicalChallenges : {type:Boolean},
    MentalChallenges : {type:Boolean},
    ExamTensionsorStress : {type:Boolean}
});




module.exports = mongoose.model('Youth' , YouthSchema);

