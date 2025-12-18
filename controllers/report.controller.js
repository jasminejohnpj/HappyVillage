
import mongoose from "mongoose";
import { buildDemographicReport } from "../services/demographic.service.js";
import { getHouseholdDetailsService } from "../services/household.service.js";
import { getIndividualDetailsService } from "../services/individual.service.js";
import { buildWardHouseholdReport } from "../services/wardHousehold.service.js";
import { buildHouseholdSummaryReport } from "../services/householdSummary.service.js";

/**
 * Calculate age from DOB
 */
const calculateAge = (dob) => {
  if (!dob) return null;

  const birthDate = new Date(dob);
  if (isNaN(birthDate.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
};

/**
 * Age groups
 */
const getAgeCategory = (age) => {
  if (age == null) return null;

  if (age <= 3) return "0-3";
  if (age <= 18) return "4-18";
  if (age <= 40) return "19-40";
  if (age <= 60) return "41-60";
  if (age <= 75) return "61-75";
  return "76+";
};

/**
 * Get demographic report (same as your code, unchanged)
 */
export const getDemographicReport = async (req, res) => {
  try {
    const result = await buildDemographicReport(req.query);
    res.json({
      success: true,
      data: [...result.rows, result.totals],
      summary: result.summary
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
export const getWardHouseholdDetails = async (req, res) => {
  try {
    const result = await buildWardHouseholdReport(req.query);
    res.json({ success: true, ...result });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
/**
 * ⭐ New: Get full details of a single household
 */

export const getHouseholdDetails = async (req, res) => {
  try {
    const data = await getHouseholdDetailsService(req.query.houseId);
    res.json({ success: true, ...data });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};




export const getIndividualReportDetails = async (req, res) => {
  try {
    const data = await getIndividualDetailsService(req.query.familyId);
    res.json({ success: true, ...data });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};



export const getHouseholdSummaryReport = async (req, res) => {
  try {
    const result = await buildHouseholdSummaryReport(req.query);
    res.json({ success: true, ...result });
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};