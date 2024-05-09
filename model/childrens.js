const mongoose = require("mongoose")

const ChildSchema = new mongoose.Schema({
    Userid :  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SurveyForm'
    },
    Name : {type:String},
    Dob :{type:String},
    Father : {type:String},
    Mother :{type:String},
    Guardian : {type:String},
    EducationalQualification : {type:String},
    CurrentlyStudying : {type:String},
    DroppedClass : {type:String},
    Reason : {type:String},
    CurrentOccupation : {type:String},
    ArtisticorAthleticAptitude: {type:String},
    RewardsorPrizes : {type:String},
    PhysicalChallenges :{type:Boolean},
    MentalChallenges : {type:Boolean},
    ExamTensionMentalStress :{type:Boolean},
},{timestamps: false});

module.exports = mongoose.model('Childrens' , ChildSchema);

