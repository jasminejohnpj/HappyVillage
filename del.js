

// del.js

import mongoose from "mongoose";
import Childrens from "./model/children.js";
import Family from "./model/familyMembers.js";
import Middleage from "./model/middleAge.js";
import Newborn from "./model/newborn.js";
import SeniorCitizen from "./model/seniorCitizen.js";
import Supercitizen from "./model/superCitizen.js";
import SurveyForm from "./model/surveyForm.js";
import Youth from "./model/youth.js";



const MONGO_URI = 'mongodb+srv://sreelakshmij45_db_user:sree123@cluster0.q1hypqf.mongodb.net/happy_village';

async function run() {
  try {
    await mongoose.connect(MONGO_URI);

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    console.log()

    const filter = { createdAt: { $gte: startOfToday, $lte: endOfToday } };

    await SurveyForm.deleteMany(filter);
 
    await Childrens.deleteMany(filter);
    await Family.deleteMany(filter);
    await Middleage.deleteMany(filter);
    await Newborn.deleteMany(filter);
    await SeniorCitizen.deleteMany(filter);
    await SurveyForm.deleteMany(filter)
   
    await Supercitizen.deleteMany(filter);
    await Youth.deleteMany(filter);

    console.log('Today records deleted from all models');
  } catch (err) {
    console.error(err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();

