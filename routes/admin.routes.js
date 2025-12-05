import express from "express";
import { registerSuperAdmin, loginSuperAdmin, allCounts, getWardNumbers, wardDetails , familyDetailsinWardwise,
    houseDetails ,personalDetails, searchHouse , filterValues, 
} from "../controllers/admin.js";



const adminRouter = express.Router();

adminRouter.post("/superLogin", loginSuperAdmin);
adminRouter.post("/superAdmin", registerSuperAdmin);

adminRouter.get("/allCounts", allCounts);
adminRouter.get("/WardNo",getWardNumbers);
adminRouter.get("/wardDetails", wardDetails);
adminRouter.get("/familyDetails", familyDetailsinWardwise);
adminRouter.get("/houseDetails", houseDetails);
adminRouter.get("/personalDetails", personalDetails);
adminRouter.get ('/searchHouse', searchHouse);
adminRouter.get('/filterValues', filterValues);
export default adminRouter;

