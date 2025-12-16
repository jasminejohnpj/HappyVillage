import SurveyForm from "../model/surveyForm.js";
import Family from "../model/familyMembers.js";

export const getHouseholdDetailsService = async (houseId) => {
  const house = await SurveyForm.findById(houseId)
    .populate("createdBy", "userName")
    .lean();

  if (!house) throw new Error("House not found");

  const members = await Family.find({ Userid: houseId });
  return { house, submittedBy: house.createdBy, members };
};
