import express from 'express';
import {
    registerUser, loginUser, submitSurveyForm, addFamilyMembers, addNewborn, addChild, addYouth,
    addMiddleage, addSeniorCitizen, addSuperCitizen, SurveyDetails, houseDetails, updateSurvey,
    familyDetails, updateNewborn, newbornDetails, updateChild, childDetails, youthDetails,
    updateYouth, middleageDetails, updateMiddleage, seniorCitizenDetails, updateSeniors,
    superCitizenDetails, updateSuperCitizen, PanchayathDetails,
    refreshAccessToken
} from "../controllers/user.js";
const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post("/refresh-token", refreshAccessToken);


userRouter.post('/surveyForm', submitSurveyForm);
userRouter.get('/listSurvey', SurveyDetails);
userRouter.get('/getSurvey', houseDetails);
userRouter.put('/updateSurvey', updateSurvey);


userRouter.post('/familyMembers', addFamilyMembers);
userRouter.get('/getFamily', familyDetails);


userRouter.post('/newborn', addNewborn);
userRouter.put('/updateNewborn', updateNewborn);
userRouter.get('/getNewborn', newbornDetails);


userRouter.post('/children', addChild);
userRouter.put('/updateChild', updateChild);
userRouter.get('/getChild', childDetails);


userRouter.post('/youth', addYouth);
userRouter.get('/youthDetails', youthDetails);
userRouter.put('/updateYouth', updateYouth);


userRouter.post('/middleage', addMiddleage);
userRouter.get('/middleageDetails', middleageDetails);
userRouter.put('/updateMiddleage', updateMiddleage);


userRouter.post('/seniorCitizen', addSeniorCitizen);
userRouter.get('/getSeniorCitizen', seniorCitizenDetails);
userRouter.put('/updateSeniors', updateSeniors);

userRouter.post('/superCitizen', addSuperCitizen);
userRouter.get('/getSuperCitizen', superCitizenDetails);
userRouter.put('/updateSuperCitizen', updateSuperCitizen);


userRouter.post('/PanchayathDetails', PanchayathDetails);

export default userRouter;
