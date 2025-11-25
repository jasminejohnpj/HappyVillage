import SurveyData from "../model/surveydata.js";
import surveydata from "../model/surveydata.js";



export const getVillages = async (req, res, next) => {
    try {
        const list = await surveydata
            .find({ Village: { $ne: "0", $ne: null } })
            .select("Village -_id")
            .exec();

        const villages = list
            .map(item => item.Village?.trim())
            .filter(v => v && v.length > 0);

        const uniqueVillages = [...new Set(villages)].sort();

        return res.status(200).json(uniqueVillages);
    } catch (error) {
        next(error.message);
    }
};


export const getPanchayaths = async (req, res, next) => {
    try {
        const list = await surveydata
            .find({ Panchayath: { $nin: ["0", null, ""] } })
            .select("Panchayath -_id")
            .exec();

        const panchayaths = list
            .map(item => item.Panchayath?.trim())
            .filter(p => p && p.length > 0);
        const uniquePanchayaths = [...new Set(panchayaths)].sort();
        return res.status(200).json(uniquePanchayaths);
    } catch (error) {
        next(error.message);
    }
};


export const getWardNumbers = async (req, res, next) => {
    try {
        let { Panchayath } = req.query;

        if (!Panchayath) {
            return res.status(400).json({ WardNo: [], message: "Panchayath is required" });
        }

        Panchayath = Panchayath.trim().toLowerCase();

        let wardNumbers = [];

        if (Panchayath === "aryad") {
            wardNumbers = [16, 17];
        } else if (Panchayath === "mararikulam south") {
            wardNumbers = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
        }

        return res.status(200).json({ WardNo: wardNumbers });
    } catch (error) {
        next(error.message);
    }
};


export const getRationCardTypes = async (req, res, next) => {
    try {
        const list = await surveydata
            .find({ RationCardType: { $nin: ["0", null, ""] } })
            .select("RationCardType -_id")
            .exec();

        const rationCardTypes = list
            .map(item => item.RationCardType?.trim())
            .filter(rc => rc && rc.length > 0);

        const uniqueRationCardTypes = [...new Set(rationCardTypes)].sort();

        return res.status(200).json(uniqueRationCardTypes);
    } catch (error) {
        next(error.message);
    }
};


export const getMaritalStatus = async (req, res, next) => {
  try {
    // Default list of marital statuses as per schema enum
    const maritalStatusList = [
      "Married",
      "UnMarried",
      "Widow",
      "Widower",
    ];

    return res.status(200).json({
      success: true,
      data: maritalStatusList,
    });
  } catch (error) {
    console.error("Error fetching Marital Status:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch Marital Status options",
      error: error.message,
    });
  }
};


export const getTypeOfHouse = async (req, res, next) => {
    try {
        const list = await surveydata
            .find({ TypeofHouse: { $nin: ["0", null, ""] } })
            .select("TypeofHouse -_id")
            .exec();

        const typeOfHouse = list
            .map(item => item.TypeofHouse?.trim())
            .filter(type => type && type.length > 0);

        const uniqueTypeOfHouse = [...new Set(typeOfHouse)].sort();

        return res.status(200).json(uniqueTypeOfHouse);
    } catch (error) {
        next(error.message);
    }
};



export const getAreaOfHouse = async (req, res, next) => {
  try {
    const list = await surveydata
      .find({ AreaofHouse: { $nin: ["0", null, ""] } })
      .select("AreaofHouse -_id")
      .exec();

    const areaOfHouse = list
      .map(item => item.AreaofHouse?.trim())
      .filter(area => area && area.length > 0);

    const uniqueAreaOfHouse = [...new Set(areaOfHouse)];

    // Desired order
    const order = ["Below 500", "500 - 1000", "Above 1000"];

    const sortedAreaOfHouse = uniqueAreaOfHouse.sort((a, b) => {
      const aIndex = order.indexOf(a);
      const bIndex = order.indexOf(b);

      // If not found in order list, push to end
      const safeA = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
      const safeB = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;

      return safeA - safeB;
    });

    return res.status(200).json(sortedAreaOfHouse);
  } catch (error) {
    next(error.message);
  }
};

export const getAvailabilityOfCleanWater = async (req, res, next) => {
    try {
        const list = await surveydata
            .find({ AvailabilityofCleanWater: { $nin: ["0", null, ""] } })
            .select("AvailabilityofCleanWater -_id")
            .exec();

        const cleanWaterAvailability = list
            .map(item => item.AvailabilityofCleanWater?.trim())
            .filter(water => water && water.length > 0);

        const uniqueCleanWaterAvailability = [...new Set(cleanWaterAvailability)].sort();

        return res.status(200).json(uniqueCleanWaterAvailability);
    }catch (error) {
        next(error.message);
    }
};

export const getOrganicWasteManagementMethods = async (req, res, next) => {
    try {
        const list = await surveydata
            .find({ OrganicWasteManagementMethod: { $nin: ["0", null, ""] } })
            .select("OrganicWasteManagementMethod -_id")
            .exec();

        const organicMethods = list
            .map(item => item.OrganicWasteManagementMethod?.trim())
            .filter(method => method && method.length > 0);

        const uniqueOrganicMethods = [...new Set(organicMethods)].sort();

        return res.status(200).json(uniqueOrganicMethods);
    } catch (error) {
        next(error.message);
    }
};


export const getInorganicWasteManagementMethods = async (req, res, next) => {
    try {
        const list = await surveydata
            .find({ InorganicWasteManagementMethod: { $nin: ["0", null, ""] } })
            .select("InorganicWasteManagementMethod -_id")
            .exec();

        const inorganicMethods = list
            .map(item => item.InorganicWasteManagementMethod?.trim())
            .filter(method => method && method.length > 0);

        const uniqueInorganicMethods = [...new Set(inorganicMethods)].sort();

        return res.status(200).json(uniqueInorganicMethods);
    } catch (error) {
        next(error.message);
    }
};

export const getEducationalQualifications = async (req, res, next) => {
  try {
    const { Age } = req.query;

    const list = await surveydata
      .find({ EducationalQualification: { $nin: ["0", null, ""] } })
      .select("EducationalQualification -_id")
      .lean();

    // Extract all educational qualifications
    let qualifications = list
      .map(item => item.EducationalQualification?.trim())
      .filter(Boolean); // removes "", null, undefined

    // Apply age-based filtering
    const ageNum = Number(Age);
    if (!isNaN(ageNum) && ageNum >= 4 && ageNum <= 18) {
      qualifications = qualifications.filter(
        q => q !== "PG" && q !== "Other"
      );
    }

    const uniqueQualifications = [...new Set(qualifications)].sort();

    return res.status(200).json(uniqueQualifications);
  } catch (error) {
    console.error("Error fetching EducationalQualification list:", error);
    return res.status(500).json({ message: error.message });
  }
};


export const getBloodGroups = async (req, res, next) => {
    try {
        const list = await surveydata
            .find({ BloodGroup: { $nin: ["0", null, ""] } })
            .select("BloodGroup -_id")
            .exec();

        const bloodGroups = list
            .map(item => item.BloodGroup?.trim())
            .filter(bg => bg && bg.length > 0);

        const uniqueBloodGroups = [...new Set(bloodGroups)].sort();

        return res.status(200).json(uniqueBloodGroups);
    } catch (error) {
        next(error.message);
    }
};

export const getPensionDetails = async (req, res) => {
  try {
    const { Age } = req.query;

    const list = await surveydata
      .find({ PensionDetails: { $nin: ["0", null, ""] } })
      .select("PensionDetails -_id")
      .lean();

    // Extract all pension details
    let pensionDetails = list
      .map(item => item.PensionDetails?.trim())
      .filter(Boolean); // removes "", null, undefined

    // If age is provided and between 4–18 → remove EPF & Aaswasakiranam
    const ageNum = Number(Age);
    if (!isNaN(ageNum) && ageNum >= 4 && ageNum <= 18) {
      pensionDetails = pensionDetails.filter(
        pd => pd !== "EPF" && pd !== "Aaswasakiranam"
      );
    }

    const uniquePensionDetails = [...new Set(pensionDetails)].sort();

    return res.status(200).json(uniquePensionDetails);
  } catch (err) {
    console.error("Error fetching PensionDetails:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getMedicineDetails = async (req, res,next) => {
    try {
        const list = await surveydata
            .find({ MedicineDetails: { $nin: ["0", null, ""] } })
            .select("MedicineDetails -_id")
            .exec();

        const medicineDetails = list
            .map(item => item.MedicineDetails?.trim())
            .filter(md => md && md.length > 0);

        const uniqueMedicineDetails = [...new Set(medicineDetails)].sort();

        return res.status(200).json(uniqueMedicineDetails);
    } catch (error) {
        next(error.message);
    }
};

export const typeOfWoodStove = async (req, res, next) => {
  try {
    const list = await surveydata
      .find(
        {
          TypeofWoodStove: { $exists: true, $ne: "", $nin: ["0", null] }
        },
        { TypeofWoodStove: 1, _id: 0 }
      )
      .lean();

    const TypeofWoodStove = list
      .map(item => item.TypeofWoodStove?.trim())
      .filter(value => value && value.length > 0);

    const uniqueTypeofWoodStove = [...new Set(TypeofWoodStove)].sort();

    return res.status(200).json(uniqueTypeofWoodStove);
  } catch (error) {
    next(error.message);
  }
};

export const ToiletFacility = async(req,res,next)=>{
    try{
        const list = await surveydata
            .find({ ToiletFacility: { $nin: ["0", null, ""] } })
            .select("ToiletFacility -_id")
            .exec();

        const ToiletFacility = list
            .map(item => item.ToiletFacility?.trim())
            .filter(pd => pd && pd.length > 0);

        const uniqueToiletFacility = [...new Set(ToiletFacility)].sort();
         return res.status(200).json(uniqueToiletFacility);
    } catch(error){
        next(error.message);
    }
   
}

export const ToiletTankType = async(req,res,next)=>{
    try{
        const list = await surveydata
            .find({ ToiletTankType: { $nin: ["0", null, ""] } })
            .select("ToiletTankType -_id")
            .exec();

        const ToiletTankType = list
            .map(item => item.ToiletTankType?.trim())
            .filter(pd => pd && pd.length > 0);

        const uniqueToiletTankType = [...new Set(ToiletTankType)].sort();
         return res.status(200).json(uniqueToiletTankType);
    } catch(error){
        next(error.message);
    }
}

export const ResidentialHouse = async(req,res,next)=>{
    try{
        const list = await surveydata
            .find({ ResidentialHouse: { $nin: ["0", null, ""] } })
            .select("ResidentialHouse -_id")
            .exec();

        const ResidentialHouse = list
            .map(item => item.ResidentialHouse?.trim())
            .filter(pd => pd && pd.length > 0);

        const uniqueResidentialHouse = [...new Set(ResidentialHouse)].sort();
         return res.status(200).json(uniqueResidentialHouse);
    } catch(error){
        next(error.message);
    }
}

export const CurrentOccupation = async (req,res,next)=>{
    try{
         const list = await surveydata
            .find({ CurrentOccupation: { $nin: ["0", null, ""] } })
            .select("CurrentOccupation -_id")
            .exec();

        const CurrentOccupation = list
            .map(item => item.CurrentOccupation?.trim())
            .filter(pd => pd && pd.length > 0);

        const uniqueCurrentOccupation = [...new Set(CurrentOccupation)].sort();
         return res.status(200).json(uniqueCurrentOccupation);
    } catch(error){
        next(error.message);
    }
 }

export const Gender = async (req, res, next) => {
  try {
    const list = await surveydata
      .find({ Gender: { $nin: ["0", null, ""] } })
      .select("Gender -_id")
      .exec();

    const GenderList = list
      .map(item => item.Gender?.trim())
      .filter(g => g && g.length > 0);

    const unique = [...new Set(GenderList)];

    // ⭐ Custom order
    const order = ["Male", "Female", "Transgender"];

    const sorted = unique.sort(
      (a, b) => order.indexOf(a) - order.indexOf(b)
    );

    return res.status(200).json(sorted);

  } catch (error) {
    next(error.message);
  }
};

export const EducationMainSubject = async(req, res, next)=>{
    try{
         const list = await surveydata
            .find({ EducationMainSubject: { $nin: ["0", null, ""] } })
            .select("EducationMainSubject -_id")
            .exec();

        const EducationMainSubject = list
            .map(item => item.EducationMainSubject?.trim())
            .filter(pd => pd && pd.length > 0);

        const uniqueEducationMainSubject = [...new Set(EducationMainSubject)].sort();
         return res.status(200).json(uniqueEducationMainSubject);
    } catch(error){
        next(error.message);
    }
    }

export const LifestyleDiseaseType = async (req, res) => {
  try {
    const list = await surveydata
      .find({ LifestyleDiseaseType: { $nin: [null, "", "0"] } })
      .select("LifestyleDiseaseType -_id")
      .lean();

    // Flatten arrays and clean up data
    let diseaseTypes = list.flatMap(item => {
      const value = item.LifestyleDiseaseType;
      if (Array.isArray(value)) return value.map(v => v.trim());
      return [value?.trim()];
    }).filter(Boolean);

    // Remove duplicates and sort alphabetically
    const uniqueDiseaseTypes = [...new Set(diseaseTypes)].sort();

    return res.status(200).json(uniqueDiseaseTypes);
  } catch (err) {
    console.error("Error fetching LifestyleDiseaseType:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const RelationshipWithFamily = async (req, res, next) => {
  try {
    const list = await surveydata
      .find({ RelationshipWithFamily: { $nin: ["0", null, ""] } })
      .select("RelationshipWithFamily -_id")
      .lean();

    const relationships = list
      .map(item => item.RelationshipWithFamily?.trim())
      .filter(Boolean); // remove "", null, undefined

    // remove duplicates
    const unique = [...new Set(relationships)];

    // ⭐ EXACT required order
    const order = [
      "Family Head",
      "Father",
      "Mother",
      "Husband",
      "Wife",
      "Son",
      "Daughter",
      "Daughter in law",
      "Son in law",
      "Grandmother",
      "Grandfather",
      "Grandson",
      "Granddaughter",
      "Brother",
      "Sister",
      "Uncle",
      "Aunt",
      "Niece",
      "Nephew",
      "Others (Specify) "
    ];

    // ⭐ custom sorting
    const sorted = unique.sort(
      (a, b) => order.indexOf(a) - order.indexOf(b)
    );

    return res.status(200).json(sorted);

  } catch (error) {
    console.error("Error fetching RelationshipWithFamily list:", error);
    return res.status(500).json({ message: error.message });
  }
};

   
export const getSnehajalakamServices = async (req, res, next) => {
  try {
    const services = [
      "Palliative Care",
      "Janakiya Lab",
      "Janakiya Pharmacy",
      "Janakiya Bhakshanashala",
      "Vidyajalakam",
      "Sahayajalam",
      "Snehabhavanam"
    ];

    return res.status(200).json(services);
  } catch (error) {
    next(error.message);
  }
};


export const getLifeSatisfactionLevels = async (req, res, next) => {
  try {
    const levels = ["Poor", "Fair", "Good", "Very Good", "Excellent","N/A"];
    return res.status(200).json(levels);
  } catch (error) {
    next(error.message);
  }
};



export const getDomesticAnimals = async (req, res, next) => {
  try {
    const animals = [
      "Hen",
      "Duck",
      "Cow",
      "Goat",
      "Rabbit",
      "Quail",
      "Dog",
      "Cat",
      "Buffalo",
      "fish",
      "love birds",
      "N/A"
    ];
    return res.status(200).json(animals);
  } catch (error) {
    next(error.message);
  }
};

export const getWasteWaterManagementOptions = async (req, res, next) => {
  try {
    const options = ["No", "Soakage Pit", "Open drainage"];
    return res.status(200).json(options);
  } catch (error) {
    next(error.message);
  }
};
