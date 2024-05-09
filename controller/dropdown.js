const express = require('express');
const axios = require('axios');
const bcrypt = require('bcrypt');
const router = express.Router();
const surveydata = require('../model/surveydata');



 router.get('/village', async (req, res) => {
    try {
      const villages = await surveydata.find({ Village: { $ne: "0" } }).select('Village');
      return res.status(200).json({ villages });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });



 router.get('/Panchayath' ,async(req, res) => {
    try {
      const Panchayath = await surveydata.find( { Panchayath : { $ne :"0"} }).select('Panchayath');
      return res.status(200).json({Panchayath});
    } catch (err) {
      return res.status(500).json({ error: 'internal server error'})
    }
  });


  router.get('/WardNo' , async (req,res) =>{
    try{
      const wardno = await surveydata.find({WardNo : { $ne : "0"} }).select('WardNo');
      return res.status(200).json({wardno});
    } catch ( err){
      return res.status(500).json({error: 'internal server error'});
    }
  });



  router.get('/RationCardType' , async (req,res) =>{
    try{
      const rationcard = await surveydata.find({RationCardType : { $ne : "0"} }).select('RationCardType');
      return res.status(200).json({rationcard});
    } catch ( err){
      return res.status(500).json({error: 'internal server error'});
    }
  });



  router.get('/MarritalStatus' , async (req,res) =>{
    try{
      const marritalstatus = await surveydata.find({MarritalStatus : { $ne : "0"} }).select('MarritalStatus');
      return res.status(200).json({marritalstatus});
    } catch ( err){
      return res.status(500).json({error: 'internal server error'});
    }
  });



  router.get('/TypeofHouse' , async (req,res) =>{
    try{
      const types = await surveydata.find({TypeofHouse : { $ne : "0"} }).select('TypeofHouse');
      return res.status(200).json({types});
    } catch ( err){
      return res.status(500).json({error: 'internal server error'});
    }
  });



  router.get('/AreaofHouse' , async (req,res) =>{
    try{
      const areatype = await surveydata.find({AreaofHouse : { $ne : "0"} }).select('AreaofHouse');
      return res.status(200).json({areatype});
    } catch ( err){
      return res.status(500).json({error: 'internal server error'});
    }
  });
  


  
router.get('/AvailabilityofCleanWater' , async (req,res) =>{
    try{
      const availability = await surveydata.find({AvailabilityofCleanWater : { $ne : "0"} }).select('AvailabilityofCleanWater');
      return res.status(200).json({availability});
    } catch ( err){
      return res.status(500).json({error: 'internal server error'});
    }
  });



  router.get('/OrganicWasteManagementMethod' , async (req,res) =>{
    try{
      const organicwaste = await surveydata.find({OrganicWasteManagementMethod : { $ne : "0"} }).select('OrganicWasteManagementMethod');
      return res.status(200).json({organicwaste});
    } catch ( err){
      return res.status(500).json({error: 'internal server error'});
    }
  });



  router.get('/InorganicWasteManagementMethod' , async (req,res) =>{
    try{
      const inorganicwaste = await surveydata.find({InorganicWasteManagementMethod : { $ne : "0"} }).select('InorganicWasteManagementMethod');
      return res.status(200).json({inorganicwaste});
    } catch ( err){
      return res.status(500).json({error: 'internal server error'});
    }
  });



  router.get('/EducationalQualification' , async (req,res) =>{
    try{
      const qualification = await surveydata.find({EducationalQualification : { $ne : "0"} }).select('EducationalQualification');
      return res.status(200).json({qualification});
    } catch ( err){
      return res.status(500).json({error: 'internal server error'});
    }
  });



  router.get('/BloodGroup' , async (req,res) =>{
    try{
      const bloodgroup = await surveydata.find({BloodGroup : { $ne : "0"} }).select('BloodGroup');
      return res.status(200).json({bloodgroup});
    } catch ( err){
      return res.status(500).json({error: 'internal server error'});
    }
  });



  router.get('/PensionDetails' , async (req,res) =>{
    try{
      const pension = await surveydata.find({PensionDetails : { $ne : "0"} }).select('PensionDetails');
      return res.status(200).json({pension});
    } catch ( err){
      return res.status(500).json({error: 'internal server error'});
    }
  });




  router.get('/MedicineDetails' , async (req,res) =>{
    try{
      const medicine = await surveydata.find({MedicineDetails : { $ne : "0"} }).select('MedicineDetails');
      return res.status(200).json({medicine});
    } catch ( err){
      return res.status(500).json({error: 'internal server error'});
    }
  });

  
  module.exports = router