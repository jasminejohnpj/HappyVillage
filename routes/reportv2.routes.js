import express from "express";
import { 
  getDemographicReport,
  getWardHouseholdDetails,
  getHouseholdDetails,

  exportWardHouseholdsCSV,
  checkDatabaseHealth,
  getIndividualReportDetails,
  exportWardHouseholdsExcel,
  exportDemographicReportExcel
} from "../controllers/report.controller.js";

const router = express.Router();

router.get("/demographic", getDemographicReport);


router.get("/ward-households", getWardHouseholdDetails);
router.get("/ward-households/export", exportWardHouseholdsCSV);
router.get("/individual", getIndividualReportDetails);

// ⭐ New route
router.get("/household-details", getHouseholdDetails);

router.get("/report/demographic/excel", exportDemographicReportExcel);
router.get("/report/ward-households/excel", exportWardHouseholdsExcel);
router.get("/report/household/excel", exportWardHouseholdsExcel);



router.get("/db-health", checkDatabaseHealth);
export default router;
