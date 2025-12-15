import Family from "../model/familyMembers.js";
import Newborn from "../model/newborn.js";
import Childrens from "../model/children.js";
import Youth from "../model/youth.js";
import Middleage from "../model/middleAge.js";
import SeniorCitizen from "../model/seniorCitizen.js";
import Supercitizen from "../model/superCitizen.js";

export const getIndividualDetailsService = async (familyId) => {
  const family = await Family.findById(familyId);
  if (!family) throw new Error("Member not found");

  const forms = await Promise.all([
    Newborn.findOne({ Familymemberid: familyId }),
    Childrens.findOne({ Familymemberid: familyId }),
    Youth.findOne({ Familymemberid: familyId }),
    Middleage.findOne({ Familymemberid: familyId }),
    SeniorCitizen.findOne({ Familymemberid: familyId }),
    Supercitizen.findOne({ Familymemberid: familyId })
  ]);

  const formData = forms.find(f => f);
  if (!formData) throw new Error("No form found");

  return { family, formData };
};
