import SurveyForm from "../model/surveyForm.js";
import { REPORT_DEFINITIONS } from "./reportDefinitions.js";

export const buildHouseholdSummaryReport = async ({ panchayath, wards }) => {
  if (!panchayath) throw new Error("panchayath is required");

  let wardList = wards
    ? wards.split(",").map(w => w.trim())
    : await SurveyForm.distinct("WardNo", { Panchayath: panchayath });

  const households = await SurveyForm.find({
    Panchayath: panchayath,
    WardNo: { $in: wardList }
  }).lean();

  const reports = REPORT_DEFINITIONS.map(r => {
    let total = 0;
    const values = {};

    wardList.forEach(w => {
      const count = households.filter(
        h => h.WardNo === w && r.match(h)
      ).length;
      values[w] = count;
      total += count;
    });

    values.TOTAL = total;

    return {
      slNo: r.slNo,
      reportName: r.name,
      values
    };
  });

  return {
    panchayath,
    wardCount: wardList.length,
    wards: [...wardList, "TOTAL"],
    reports
  };
};
