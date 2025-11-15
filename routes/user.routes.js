import express from "express";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  submitSurveyForm,
  SurveyDetails,
  houseDetails,
  updateSurvey,
  addFamilyMembers,
  familyDetails,
  addNewborn,
  updateNewborn,
  newbornDetails,
  addChild,
  updateChild,
  childDetails,
  addYouth,
  youthDetails,
  updateYouth,
  addMiddleage,
  middleageDetails,
  updateMiddleage,
  addSeniorCitizen,
  seniorCitizenDetails,
  updateSeniors,
  addSuperCitizen,
  superCitizenDetails,
  updateSuperCitizen,
  PanchayathDetails,
  getIndividualDetails,
} from "../controllers/user.js";

import { verifyJWT } from "../middleware/auth.middleware.js"

const userRouter = express.Router();

// ✅ Public routes (no login required)
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/refresh-token", refreshAccessToken);

//survay form
userRouter.post("/surveyForm", verifyJWT, submitSurveyForm);
userRouter.get("/listSurvey", verifyJWT, SurveyDetails);
userRouter.get("/getSurvey", verifyJWT, houseDetails);
userRouter.put("/updateSurvey", verifyJWT, updateSurvey);

// ✅ Family routes
userRouter.post("/familyMembers", verifyJWT, addFamilyMembers);
userRouter.get("/getFamily", verifyJWT, familyDetails);

// ✅ Newborn routes
userRouter.post("/newborn", verifyJWT, addNewborn);
userRouter.put("/updateNewborn", verifyJWT, updateNewborn);
userRouter.get("/getNewborn", verifyJWT, newbornDetails);

// ✅ Children routes
userRouter.post("/children", verifyJWT, addChild);
userRouter.put("/updateChild", verifyJWT, updateChild);
userRouter.get("/getChild", verifyJWT, childDetails);

// ✅ Youth routes
userRouter.post("/youth", verifyJWT, addYouth);
userRouter.get("/youthDetails", verifyJWT, youthDetails);
userRouter.put("/updateYouth", verifyJWT, updateYouth);

// ✅ Middle Age routes
userRouter.post("/middleage", verifyJWT, addMiddleage);
userRouter.get("/middleageDetails", verifyJWT, middleageDetails);
userRouter.put("/updateMiddleage", verifyJWT, updateMiddleage);

// ✅ Senior Citizen routes
userRouter.post("/seniorCitizen", verifyJWT, addSeniorCitizen);
userRouter.get("/getSeniorCitizen", verifyJWT, seniorCitizenDetails);
userRouter.put("/updateSeniors", verifyJWT, updateSeniors);

// ✅ Super Citizen routes
userRouter.post("/superCitizen", verifyJWT, addSuperCitizen);
userRouter.get("/getSuperCitizen", verifyJWT, superCitizenDetails);
userRouter.put("/updateSuperCitizen", verifyJWT, updateSuperCitizen);

// ✅ Panchayath details (public or restricted based on your choice)
userRouter.post("/PanchayathDetails", verifyJWT, PanchayathDetails);

userRouter.get("/individualDetails",verifyJWT,getIndividualDetails)

export default userRouter;
