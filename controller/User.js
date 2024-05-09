
const express = require('express');
const axios = require('axios');
const bcrypt = require('bcrypt');
const router = express.Router();
const surveyform = require('../model/surveyform');
const Family = require('../model/familymembers');
const Newborn = require('../model/newborn');
const Childrens = require('../model/childrens');
const Youth = require('../model/youth');
const Middleage = require('../model/middleage');
const SeniorCitizen = require('../model/seniorcitizen');
const Supercitizen =require('../model/supercitizen');



                   /////////// basic details /////////
router.post('/surveyForm', async (req, res) => {
  try {
    const {
      Village,
      Panchayath,
      WardNo,
      HouseholdHead,
      HouseName,
      HouseNo,
      PostOffice,
      Pincode,
      FamilymembersNO,
      RationCardType,
      GasConnection,
      WoodStove,
      TypeofWoodStove,
      Electricity,
      Solar,
      TypeofHouse,
      AreaofHouse,
      NoofVehicles,
      AreaofLand_Paddyland,
      AreaofLand_Dryland,
      AreaofLand_Wetland,
      AreaofLand_Pond,
      AreaofLand_Chaalu,
      CurrentCultivationDetails,
      ToiletFacilities,
      AvailabilityofCleanWater,
      OrganicWasteManagementMethod,
      InorganicWasteManagementMethod
    } = req.body;


    // Check if the HouseNo already exists
    const existingHouse = await surveyform.findOne({ HouseNo: HouseNo });
    if (existingHouse) {
      return res.status(400).json({ message: 'The HouseNo already exists' });
    }

    // Create a new surveyform instance and save it
    const newSurvey = new surveyform({
      Village,
      Panchayath,
      WardNo,
      HouseholdHead,
      HouseName,
      HouseNo,
      PostOffice,
      Pincode,
      FamilymembersNO,
      RationCardType,
      GasConnection,
      WoodStove,
      TypeofWoodStove,
      Electricity,
      Solar,
      TypeofHouse,
      AreaofHouse,
      NoofVehicles,
      AreaofLand_Paddyland,
      AreaofLand_Dryland,
      AreaofLand_Wetland,
      AreaofLand_Pond,
      AreaofLand_Chaalu,
      CurrentCultivationDetails,
      ToiletFacilities,
      AvailabilityofCleanWater,
      OrganicWasteManagementMethod,
      InorganicWasteManagementMethod
    });
    await newSurvey.save();

    return res.status(200).json({ message: 'Survey data saved successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/listSurvey' , async (req,res)=>{
  try{
    const survey = await surveyform.find({ },'HouseholdHead HouseName HouseNo');
    return res.status(200).json({message: 'List of survey details' , survey});
  } catch (error){
    return res.status(500).json({message: 'internal server error' });
  }
});


router.get('/getSurvey' , async(req,res) =>{
  try{
    const id = req.query.id;
    console.log(id);
    const survey = await surveyform.find({ _id :id});
    if(!id){
      return res.status(404).json({message: 'data not found'});
    }
    return res.status(200).json({message:'Survey details' , survey});
  } catch (error){
    console.log(error);
    return res.status(500).json({message:'internal server error' })
  }
});


router.put('/updateSurvey' , async (req, res) =>{
  try{
    const id = req.query.id;
    const data = req.body;
    //console.log(data);
    const survey = await surveyform.findOne({_id :id});
    if(!id){
      return res.status(404).json({message:'data not found'});
    }
  const updateSurvey = await surveyform.updateOne(data)
  return res.status(200).json({message: 'data updated successfully'});
  } catch(error){
    console.log(error)
    return res.status(500).json({message:'internal server error'});
  }
});


              //////// family details api///////////

router.post('/familyMembers', async (req, res) => {
  try {
    const {
      Userid,
      FamilyMembers
    } = req.body;

    // Assuming FamilyMembers is an array of objects containing member details
    if (!Array.isArray(FamilyMembers)) {
      return res.status(400).json({ message: 'FamilyMembers must be an array' });
    }

    const newFamilyMembers = FamilyMembers.map(member => ({
      Userid,
      Name: member.Name,
      Age: member.Age,
      Gender: member.Gender,
      Relation: member.Relation
    }));

    // Assuming `family` is your Mongoose model for family members
    await Family.insertMany(newFamilyMembers);

    return res.status(200).json({ message: 'Family details updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/getFamily' , async(req,res) =>{
  try{
    const Userid = req.query.Userid; 
    //console.log(Userid)
    const family = await Family.find({Userid:Userid});
    if(!Userid){
      return res.status(404).json({message:'id not found'});
    }
    return res.status(200).json({ message: 'family members',family});
  } catch(error){
    console.log(error);
    return res.status(500).json({message:'internal server error'});
  }
});


   ///////////Individual members/////////////

router.post('/newborn', async (req, res) => {
  try {
    const data = req.body;
    if (!data ) {
      return res.status(400).json({ message: 'Invalid request body' });
    }
    const newborn = new Newborn(data); // Create a new instance of Newborn model
    await newborn.save();

    return res.status(201).json({ message: 'Newborn created successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


router.put('/updateNewborn', async (req, res) => {
  try {
    const id = req.query.id;
    const data = req.body;
    const user = await Newborn.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Member not found' });
    }
    await Newborn.findByIdAndUpdate(id, data); // Corrected update syntax
    return res.status(200).json({ message: 'Newborn details updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


router.get('/getNewborn', async (req, res) => {
  try {
    const id = req.query.id;
   // console.log(id)
    if (!id) { // Check if id is falsy (empty or undefined)
      return res.status(404).json({ message: 'ID required' });
    }
    const user = await Newborn.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: 'No Member Found' });
    }
    return res.status(200).json({ message: 'Data fetched successfully', user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/children' ,async(req,res) =>{
  try{
    const data = req.body;
    if(!data){
      return res.status(400).json({message:'data is required'});
    }
    const newchild = new Childrens(data);
    await newchild.save();
    return res.status(200).json({message:'data added successfully'});
  } catch(error) {
    return res.status(500).json({message:'internal server error'});
  }
});


router.put('/updateChild' , async(req,res) =>{
  try{
    const id = req.query.id;
    const data = req.body;
    const user = await Childrens.findById(id);
    if(!user){
      return res.status(404).json({message: 'data not found'});
    }
    await Childrens.findByIdAndUpdate(id,data);
  
  return res.status(200).json({message:'data updated successfully'});
  } catch(error){
    return res.status(500).json({message:'internal server error'});
  }
});


router.get('/getChild' , async(req, res)=>{
  try{
    const id = req.query.id;
    if(!id){
      return res.status(400).json({message:'Id reuired'});
    }
    const user = await Childrens.findOne({_id:id});
    if(!user){
      return res.status(404).json({message: 'user not found'});
    }
    return res.status(200).json({message:'data fetched successfully' , user});
  } catch( error) {
    return res.status(500).json({message:'internal server error'});
  }
});


router.post('/youth' , async (req , res) => {
  try{
    const data = req.body;
    if(!data){
      return res.status(404).json({message:'data is required'});
    }
    const user = new Youth(data);
    await user.save();
    return res.status(200).json({message:'data added successfully'});
  } catch (error){
    return res.status(500).json({message: 'internal server error'});
  }
});


router.get('/youthDetails' , async(req,res)=>{
  try{
    const id = req.query.id;
    if(!id){
      return res.status(404).json({message:'id is required'});   
    }
    const user = await Youth.findOne({_id:id});
    if(!user){
      return res.status(404).json({message:'user not found'});
    }
    return res.status(200).json({message:'data fetched successfully', user});
  } catch(error){
    return res.status(500).json({message:'internal server error'});
  }
});


router.put('/updateYouth' , async(req,res) =>{
  try{
    const id = req.query.id;
    const data = req.body;
    const user = await Youth.findById(id);
    if(!user){
      return res.status(404).json({message:'id is required'});
    }
    await Youth.findByIdAndUpdate(id,data);
    return res.status(200).json({message:'data updated successfully'});
  } catch(error){
    return res.status(500).json({message:'internal server error'});
  }
});


router.post('/middleage' , async(req,res)=>{
  try{
    const data = req.body;
    if(!data){
      return res.status(404).json({message:'data is required '});
    }
    const user = new Middleage(data);
    await user.save();
    return res.status(200).json({message:'data added successfully'});
  } catch(error){
    console.log(error);
    return res.status(500).json({message:'internal sever error'});
  }
});


router.get('/middleageDetails', async(req,res)=>{
  try{
    const id = req.query.id;
    if(!id){
      return res.status(404).json({message:'id is required'});
    }
    const user = await Middleage.findOne({_id:id});
    if(!user){
      return res.status(401).json({message:'user not found'});
    }
    return res.status(200).json({message:'data fetched successfully' ,user});
  } catch(error){
    return res.status(500).json({message:'internal server error'});
  }
});


router.put('/updateMiddleage' ,async(req,res) =>{
  try{
    const id = req.query.id;
    const data = req.body;
    if(!id){
      return res.status(404).json({message:'id required'});
    }
    const user = await Middleage.findById(id);
    if(!user){
      return res.status(401).json({message:'user not found'});
    }
    await Middleage.findByIdAndUpdate(id,data);
    return res.status(200).json({message: 'data updated successfully'});
  } catch(error){
    return res.status(500).json({message:'internal server error'});
  }
});


router.post('/seriorCitizen' , async(req,res) =>{
  try{
    const data= req.body;
    if(!data){
      return res.status(404).json({message:'No data available'});
    }
    const user = new SeniorCitizen(data);
    await user.save();
    return res.status(200).json({message:'data added successfully'});
  } catch(error){
    return res.status(500).json({message:'internal server error'});
  }
});


router.get('/getSeniorCitizen' ,async( req,res) =>{
  try{
    const id = req.query.id;
    if(!id){
      returnres.status(404).json({message:'id is required'});
    }
    const user = await SeniorCitizen.findOne({_id:id});
    if(!user){
      return res.status(401).json({message:'user not found'});
    }
    return res.status(200).json({message:'data fetched successfully' , user});
  } catch(error){
    return res.status(500).json({message:'internal server error'});
  }
});


router.put('/updateSeniors' ,async(req,res) =>{
  try{
    const id = req.query.id;
    const data = req.body;
    if(!id){
      return res.status(404).json({message:'id required'});
    }
    const user = await SeniorCitizen.findById(id);
    if(!user){
      return res.status(401).json({message:'user not found'});
    }
    await SeniorCitizen.findByIdAndUpdate(id,data);
    return res.status(200).json({message: 'data updated successfully'});
  } catch(error){
    return res.status(500).json({message:'internal server error'});
  }
});


router.post('/superCitizen' , async(req,res) =>{
  try{
    const data= req.body;
    if(!data){
      return res.status(404).json({message:'No data available'});
    }
    const user = new Supercitizen(data);
    await user.save();
    return res.status(200).json({message:'data added successfully'});
  } catch(error){
    return res.status(500).json({message:'internal server error'});
  }
});


router.get('/getSuperCitizen' ,async( req,res) =>{
  try{
    const id = req.query.id;
    if(!id){
      returnres.status(404).json({message:'id is required'});
    }
    const user = await Supercitizen.findOne({_id:id});
    if(!user){
      return res.status(401).json({message:'user not found'});
    }
    return res.status(200).json({message:'data fetched successfully' , user});
  } catch(error){
    return res.status(500).json({message:'internal server error'});
  }
});


router.put('/updateSuperCitizen' ,async(req,res) =>{
  try{
    const id = req.query.id;
    const data = req.body;
    if(!id){
      return res.status(404).json({message:'id required'});
    }
    const user = await Supercitizen.findById(id);
    if(!user){
      return res.status(401).json({message:'user not found'});
    }
    await Supercitizen.findByIdAndUpdate(id,data);
    return res.status(200).json({message: 'data updated successfully'});
  } catch(error){
    return res.status(500).json({message:'internal server error'});
  }
});
  module.exports = router