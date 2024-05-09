const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    Village : {type:String},
    Panchayath :{type:String},
    WardNo : {type:String},
    RationCardType: {type:String},
    MarritalStatus : {type:String},
    TypeofHouse : {type:String},
    AreaofHouse :{type:String},
    AvailabilityofCleanWater : {type:String},
    OrganicWasteManagementMethod : {type:String},
    InorganicWasteManagementMethod : {type:String},
    EducationalQualification :{type:String},
    BloodGroup : {type:String},
    PensionDetails : {type:String},
    MedicineDetails :{type:String},

},
{timestamps: false});

module.exports = mongoose.model('surveydata' ,dataSchema);