import express from "express";
import { rationCardReport, gasTypes , gasConnectionReport, WoodStoveReport, electricityTypes, electricityReport,
        solarTypes, solarReport, downloadExcel ,areawiseHouseReport, houseReport, paddyLandReport, dryLandReport,
        wetLandReport, PondReport, ChaaluAreaReport
} from "../controllers/report.js";

const reportRouter = express.Router();


reportRouter.post('/downloadExcel',downloadExcel);

reportRouter.get('/rationCardReport', rationCardReport);

reportRouter.get('/gasList', gasTypes);
reportRouter.get('/gasConnectionReport', gasConnectionReport);

reportRouter.get('/WoodStoveReport', WoodStoveReport);

reportRouter.get('/electricityList', electricityTypes);
reportRouter.get('/electricityReport', electricityReport);

reportRouter.get('/solarList', solarTypes);
reportRouter.post('/solarReport', solarReport);

reportRouter.get('/areawiseHouseReport', areawiseHouseReport);
reportRouter.get('/houseReport', houseReport);

reportRouter.get('/paddyLandReport', paddyLandReport);
reportRouter.get('/dryLandReport', dryLandReport);
reportRouter.get('/wetLandReport', wetLandReport);
reportRouter.get('/PondReport', PondReport);
reportRouter.get('/ChaaluAreaReport', ChaaluAreaReport);
export default reportRouter;
