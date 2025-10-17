import express from "express";
import { rationCardType, rationCardTypeExcel } from "../controllers/report.js";

const reportRouter = express.Router();

reportRouter.get('/rationCardReport', rationCardType);
reportRouter.get('/rationCardReportExcel', rationCardTypeExcel)

export default reportRouter;
