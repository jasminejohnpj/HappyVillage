import ExcelJS from "exceljs";
import { buildDemographicReport } from "../services/demographic.service.js";
import { buildWardHouseholdReport } from "../services/wardHousehold.service.js";

export const exportDemographicReportExcel = async (req, res) => {
  try {
    const report = await buildDemographicReport(req.query);

    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet("Demographic Report");

    ws.columns = Object.keys(report.rows[0] || {}).map(k => ({
      header: k,
      key: k,
      width: 18
    }));

    report.rows.forEach(r => ws.addRow(r));
    ws.addRow(report.totals);

    ws.getRow(1).font = { bold: true };

    res.setHeader("Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition",
      "attachment; filename=Demographic_Report.xlsx");

    await wb.xlsx.write(res);
    res.end();
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};




export const exportWardHouseholdsExcel = async (req, res) => {
  try {
    const report = await buildWardHouseholdReport(req.query);

    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet("Ward Households");

    ws.columns = Object.keys(report.data[0] || {}).map(k => ({
      header: k,
      key: k,
      width: 18
    }));

    report.data.forEach(r => ws.addRow(r));

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${req.query.panchayath}_Ward_${req.query.wardNo}.xlsx`
    );

    await wb.xlsx.write(res);
    res.end();
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
