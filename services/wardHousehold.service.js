import SurveyForm from "../model/surveyForm.js";
import Family from "../model/familyMembers.js";

export const buildWardHouseholdReport = async ({ panchayath, wardNo }) => {
  if (!panchayath || !wardNo) {
    throw new Error("panchayath & wardNo required");
  }

  const houses = await SurveyForm.find({
    Panchayath: panchayath,
    WardNo: wardNo
  });

  let slNo = 1;

  const summary = {
    totalHouseholds: houses.length,
    totalMale: 0,
    totalFemale: 0,
    totalTrans: 0,
    totalPopulation: 0
  };

  const data = [];

  for (const h of houses) {
    const members = await Family.find({ Userid: h._id });

    let male = 0;
    let female = 0;
    let trans = 0;

    members.forEach((m) => {
      const gender = m.Gender?.toLowerCase();
      if (gender === "male") male++;
      else if (gender === "female") female++;
      else if (gender === "transgender") trans++;
    });

    const total = male + female + trans;

    summary.totalMale += male;
    summary.totalFemale += female;
    summary.totalTrans += trans;
    summary.totalPopulation += total;

    data.push({
      houseId: h._id,              // ✅ REQUIRED
      slNo: slNo++,
      houseNo: h.HouseNo,
      houseName: h.HouseName,
      familyHead: h.HouseholdHead,
      mobile: members[0]?.Phone || "",
      male,
      female,
      trans,
      total
    });
  }

  return {
    ward: { panchayath, wardNo },
    data,
    summary
  };
};
