const mongoose = require('mongoose')

const newbornSchema = new mongoose.Schema({
    Userid :  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SurveyForm'
    },
    Name: {type:String},
    Dob : {type:String},
    Father : {type:String},
    Mother: {type:String},
    Guardian: {type:String},
    CurrentHealthIssues: {type:Boolean},
},{ timestamps : false});

module.exports = mongoose.model('Newborn' ,newbornSchema);  