import express from "express";
import { registerSuperAdmin, loginSuperAdmin, allCounts, getWardNumbers, wardDetails , familyDetailsinWardwise,
    houseDetails ,personalDetails, searchHouse , filterValues, PanchayathDetails
} from "../controllers/admin.js";
import { generateToken } from "../middleware/generatetoken.js";


const adminRouter = express.Router();

adminRouter.post("/superAdmin", registerSuperAdmin);
adminRouter.post("/superLogin", loginSuperAdmin , generateToken);
adminRouter.get("/allCounts", allCounts);
adminRouter.get("/WardNo",getWardNumbers);
adminRouter.get("/wardDetails", wardDetails);
adminRouter.get("/familyDetails", familyDetailsinWardwise);
adminRouter.get("/houseDetails", houseDetails);
adminRouter.get("/personalDetails", personalDetails);
adminRouter.get ('/searchHouse', searchHouse);
adminRouter.get('/filterValues', filterValues);
adminRouter.post('/PanchayathDetails', PanchayathDetails);
export default adminRouter;

