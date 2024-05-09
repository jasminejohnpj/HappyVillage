const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Village: {type:String},
    Panchayath :{type:String},
    WardNo : {type:String},
    HouseholdHead:{type:String},
    HouseName : {type:String},
    HouseNo :{type:String},
    PostOffice:{type:String},
    Pincode: {type:String},
    FamilymembersNO:{type:String},
    RationCardType: {type:String},
    GasConnection:{ type:Boolean},
    WoodStove:{ type:Boolean},
    TypeofWoodStove:{type:String},
    Electricity:{ type:Boolean},
    Solar:{ type:Boolean},
    TypeofHouse:{type:String},
    AreaofHouse:{type:String},
    NoofVehicles:{type:String},
    AreaofLand_Paddyland: {type:String},
    AreaofLand_Dryland: {type:String},
    AreaofLand_Wetland: {type:String},
    AreaofLand_Pond: {type:String},
    AreaofLand_Chaalu: {type:String},
    CurrentCultivationDetails:{type:String},
    ToiletFacilities: { type:Boolean},
    AvailabilityofCleanWater:{type:String},
    OrganicWasteManagementMethod:{type:String},
    InorganicWasteManagementMethod:{type:String},
},
{timestamps: false});


module.exports = mongoose.model('SurveyForm' , userSchema);