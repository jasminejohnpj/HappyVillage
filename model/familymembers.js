const mongoose = require('mongoose')

const familySchema = new mongoose.Schema({
    Userid :  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SurveyForm'
    },
    Name : {type:String},
    Age :{type:String},
    Gender : {type:String},
    Relation: {type:String}
},
{timestamps: false});

module.exports = mongoose.model('Family' ,familySchema);