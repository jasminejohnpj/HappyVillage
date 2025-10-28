import express from "express";
import { getVillages ,getPanchayaths , getWardNumbers , getRationCardTypes , getMaritalStatus , getTypeOfHouse,
         getAreaOfHouse , getAvailabilityOfCleanWater , getOrganicWasteManagementMethods , getInorganicWasteManagementMethods,
         getEducationalQualifications ,getBloodGroups , getPensionDetails , getMedicineDetails, typeOfWoodStove, ToiletFacility,
         ToiletTankType , ResidentialHouse
} from "../controllers/dropdown.js";

const surveyRouter = express.Router();

surveyRouter.get("/village", getVillages);
surveyRouter.get("/Panchayath", getPanchayaths);
surveyRouter.get("/WardNo",getWardNumbers);
surveyRouter.get ("/RationCardType", getRationCardTypes);
surveyRouter.get("/MarritalStatus", getMaritalStatus);
surveyRouter.get("/TypeofHouse", getTypeOfHouse);
surveyRouter.get("/AreaofHouse", getAreaOfHouse);
surveyRouter.get("/AvailabilityofCleanWater", getAvailabilityOfCleanWater);
surveyRouter.get("/OrganicWasteManagementMethod", getOrganicWasteManagementMethods);
surveyRouter.get("/InorganicWasteManagementMethod", getInorganicWasteManagementMethods);
surveyRouter.get("/EducationalQualification", getEducationalQualifications);
surveyRouter.get("/BloodGroup", getBloodGroups);
surveyRouter.get("/PensionDetails", getPensionDetails);
surveyRouter.get("/MedicineDetails", getMedicineDetails);
surveyRouter.get('/typeOfWoodStove', typeOfWoodStove);
surveyRouter.get('/ToiletFacility', ToiletFacility);
surveyRouter.get('/ToiletTankType', ToiletTankType);
surveyRouter.get('/ResidentialHouse', ResidentialHouse);
export default surveyRouter;
