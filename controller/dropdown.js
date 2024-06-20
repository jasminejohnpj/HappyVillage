const express = require('express');
const axios = require('axios');
const bcrypt = require('bcrypt');
const router = express.Router();
const surveydata = require('../model/surveydata');





router.get('/village', async (req, res) => {
  try {
    const list = await surveydata.find({ Village : { $ne :"0"} }).select('Village -_id').exec();
    const villages = list.map(item => item.Village);
    return res.status(200).json(villages);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'internal server error' });
  }
});

router.get('/Panchayath', async (req, res) => {
  try {
    const types = await surveydata.find({ Panchayath : { $ne :"0"} }).select('Panchayath -_id').exec();
    const Panchayath = types.map(item => item.Panchayath);
    return res.status(200).json(Panchayath);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'internal server error' });
  }
});





  router.get('/WardNo', async (req, res) => {
    try {
      const Panchayath = req.query.Panchayath;
      let wardno;
  
      if (Panchayath === 'aryad') {
        wardno = await surveydata.find({ WardNo: { $in: ["16", "17"] } }).select('WardNo -_id').exec();
      } else if (Panchayath === 'maarikulam south') {
        wardno = await surveydata.find({ WardNo: { $in: ["8", "9", "10", "11", "12", "13", "14", "15", "16", "17"] } }).select('WardNo');
      } else {
        wardno = await surveydata.find({ WardNo: { $ne: "0" } }).select('WardNo -_id').exec();
      }
  
      return res.status(200).json({ wardno });
    } catch (err) {
      return res.status(500).json({ error: 'internal server error' });
    }
  });
  
  

  router.get('/RationCardType', async (req, res) => {
    try {
      const rationcards = await surveydata.find({ RationCardType : { $ne :"0"} }).select('RationCardType -_id').exec();
      const rationCardTypes = rationcards.map(item => item.RationCardType);
      return res.status(200).json(rationCardTypes);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'internal server error' });
    }
  });


  router.get('/MarritalStatus', async (req, res) => {
    try {
      const status = await surveydata.find({ MarritalStatus : { $ne :"0"} }).select('MarritalStatus -_id').exec();
      const MaritalStatus = status.map(item => item.MarritalStatus);
      return res.status(200).json(MaritalStatus);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'internal server error' });
    }
  });

  router.get('/TypeofHouse', async (req, res) => {
    try {
      const types = await surveydata.find({ TypeofHouse : { $ne :"0"} }).select('TypeofHouse -_id').exec();
      const TypeofHouse = types.map(item => item.TypeofHouse);
      return res.status(200).json(TypeofHouse);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'internal server error' });
    }
  });

  router.get('/AreaofHouse', async (req, res) => {
    try {
      const types = await surveydata.find({ AreaofHouse : { $ne :"0"} }).select('AreaofHouse -_id').exec();
      const AreaofHouse = types.map(item => item.AreaofHouse);
      return res.status(200).json(AreaofHouse);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'internal server error' });
    }
  });

 
  router.get('/AvailabilityofCleanWater', async (req, res) => {
    try {
      const types = await surveydata.find({ AvailabilityofCleanWater : { $ne :"0"} }).select('AvailabilityofCleanWater -_id').exec();
      const AvailabilityofCleanWater = types.map(item => item.AvailabilityofCleanWater);
      return res.status(200).json(AvailabilityofCleanWater);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'internal server error' });
    }
  });


  router.get('/OrganicWasteManagementMethod', async (req, res) => {
    try {
      const types = await surveydata.find({ OrganicWasteManagementMethod : { $ne :"0"} }).select('OrganicWasteManagementMethod -_id').exec();
      const organicwaste = types.map(item => item.OrganicWasteManagementMethod);
      return res.status(200).json(organicwaste);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'internal server error' });
    }
  });


  router.get('/InorganicWasteManagementMethod', async (req, res) => {
    try {
      const types = await surveydata.find({ InorganicWasteManagementMethod : { $ne :"0"} }).select('InorganicWasteManagementMethod -_id').exec();
      const inorganicwaste = types.map(item => item.InorganicWasteManagementMethod);
      return res.status(200).json(inorganicwaste);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'internal server error' });
    }
  });

  router.get('/EducationalQualification', async (req, res) => {
    try {
      const types = await surveydata.find({ EducationalQualification : { $ne :"0"} }).select('EducationalQualification -_id').exec();
      const qualification = types.map(item => item.EducationalQualification);
      return res.status(200).json(qualification);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'internal server error' });
    }
  });

 
  router.get('/BloodGroup', async (req, res) => {
    try {
      const types = await surveydata.find({ BloodGroup : { $ne :"0"} }).select('BloodGroup -_id').exec();
      const bloodgroup = types.map(item => item.BloodGroup);
      return res.status(200).json(bloodgroup);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'internal server error' });
    }
  });



  router.get('/PensionDetails', async (req, res) => {
    try {
      const types = await surveydata.find({ PensionDetails : { $ne :"0"} }).select('PensionDetails -_id').exec();
      const pension = types.map(item => item.PensionDetails);
      return res.status(200).json(pension);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'internal server error' });
    }
  });


  router.get('/MedicineDetails', async (req, res) => {
    try {
      const types = await surveydata.find({ MedicineDetails : { $ne :"0"} }).select('MedicineDetails -_id').exec();
      const medicine = types.map(item => item.MedicineDetails);
      return res.status(200).json(medicine);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'internal server error' });
    }
  });








  




  
  module.exports = router