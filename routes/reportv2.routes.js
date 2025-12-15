import express from "express";
import {
  // JSON Reports
  getDemographicReport,
  getWardHouseholdDetails,
  getHouseholdDetails,
  getIndividualReportDetails,

  // Exports

  // System

} from "../controllers/report.controller.js";
import { exportDemographicReportExcel, exportWardHouseholdsExcel } from "../controllers/export.controller.js";


const router = express.Router();

/* =====================================================
   📊 REPORTS (JSON APIs)
===================================================== */

// Demographic report (ward-wise population table)
router.get("/demographic", getDemographicReport);

// Ward → households summary
router.get("/ward-households", getWardHouseholdDetails);

// Single household full survey + members
router.get("/household-details", getHouseholdDetails);

// Individual person full category form
router.get("/individual", getIndividualReportDetails);


/* =====================================================
   📥 EXPORTS (Excel / CSV)
===================================================== */

// Demographic report → Excel
router.get("/demographic/excel", exportDemographicReportExcel);

// Ward households → Excel
router.get("/ward-households/excel", exportWardHouseholdsExcel);

// Ward households → CSV



/* =====================================================
   🩺 SYSTEM / ADMIN
===================================================== */

// Database health & data quality check

export default router;
