import express from "express";
import { 
  getDemographicReport,
  getWardHouseholdDetails,
  getHouseholdDetails,

  exportWardHouseholdsCSV,
  checkDatabaseHealth,
  getIndividualReportDetails
} from "../controllers/report.controller.js";

const router = express.Router();

router.get("/demographic", getDemographicReport);


router.get("/ward-households", getWardHouseholdDetails);
router.get("/ward-households/export", exportWardHouseholdsCSV);
router.get("/individual", getIndividualReportDetails);

// ⭐ New route
router.get("/household-details", getHouseholdDetails);



router.get("/db-health", checkDatabaseHealth);
export default router;
