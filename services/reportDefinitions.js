export const REPORT_DEFINITIONS = [
  // 1–4 Ration card
  { slNo: 1, name: "AAY RC HOLDERS", match: h => h.RationCardType === "AAY" },
  { slNo: 2, name: "BPL RC HOLDER", match: h => h.RationCardType === "BPL" },
  { slNo: 3, name: "NPHH RC HOLDERS", match: h => h.RationCardType === "NPHH" },
  { slNo: 4, name: "APL RC HOLDERS", match: h => h.RationCardType === "APL" },

  // 5–7 Cooking
  { slNo: 5, name: "LPG USING FAMILIES", match: h => h.GasConnection === true },
  {
    slNo: 6,
    name: "NORMAL FIRE WOOD CHOOLA USING FAMILIES",
    match: h => h.WoodStove === true && h.TypeofWoodStove !== "Smokeless Stove"
  },
  {
    slNo: 7,
    name: "SMOKELESS CHOOLA USING FAMILIES",
    match: h => h.WoodStove === true && h.TypeofWoodStove === "Smokeless Stove"
  },

  // 8–9 Electricity / Solar
  { slNo: 8, name: "FAMILIES WITHOUT ELECTRICITY CONNECTION", match: h => h.Electricity === false },
  { slNo: 9, name: "FAMILIES WHICH HAVE SOLAR PANELS", match: h => h.Solar === true },

  // 10–11 House
  {
    slNo: 10,
    name: "FAMILIES WHICH HAVE NOT OWN HOUSES",
    match: h => h.ResidentialHouse !== "Own House"
  },
  { slNo: 11, name: "FAMILIES WHICH HAVE NO HABITABLE HOUSES", match: h => h.HabitableHouse === false },

  // 12–14 Area (string based)
  { slNo: 12, name: "HOUSES BELOW 500 SQFT", match: h => h.AreaofHouse === "Below 500" },
  { slNo: 13, name: "HOUSES BETWEEN 500-1000 SQFT", match: h => h.AreaofHouse === "500 - 1000" },
  { slNo: 14, name: "HOUSES ABOVE 1000 SQFT", match: h => h.AreaofHouse === "Above 1000" },

  // 15–16 Employment
  { slNo: 15, name: "FAMILIES WITH NO WORKING MEMBER", match: h => h.Noofpeopleworkings === 0 },
  { slNo: 16, name: "NO PERMANENT INCOME MEMBER", match: h => h.RegularIncomePeople === 0 },

  // 17–22 Income
  { slNo: 17, name: "INCOME BELOW 10000", match: h => h.MonthlyHouseholdIncome < 10000 },
  { slNo: 18, name: "INCOME 10000-15000", match: h => h.MonthlyHouseholdIncome >= 10000 && h.MonthlyHouseholdIncome <= 15000 },
  { slNo: 19, name: "INCOME 15000-25000", match: h => h.MonthlyHouseholdIncome > 15000 && h.MonthlyHouseholdIncome <= 25000 },
  { slNo: 20, name: "INCOME 25000-50000", match: h => h.MonthlyHouseholdIncome > 25000 && h.MonthlyHouseholdIncome <= 50000 },
  { slNo: 21, name: "INCOME 50000-100000", match: h => h.MonthlyHouseholdIncome > 50000 && h.MonthlyHouseholdIncome <= 100000 },
  { slNo: 22, name: "INCOME ABOVE 100000", match: h => h.MonthlyHouseholdIncome > 100000 },

  // 23–26 Vehicles
  { slNo: 23, name: "FAMILIES WITHOUT ANY VEHICLE", match: h => h.NoofVehicles === 0 },
  { slNo: 24, name: "FAMILIES WHICH HAVE 3 WHEELERS", match: h => h.ThreeWheeler > 0 },
  { slNo: 25, name: "FAMILIES WHICH HAVE 4 WHEELERS", match: h => h.FourWheeler > 0 },
  { slNo: 26, name: "FAMILIES WHICH HAVE OTHER TYPE OF VEHICLES", match: h => h.Other && h.Other.trim() !== "" },

  // 27–30 Land
  {
    slNo: 27,
    name: "FAMILIES WHICH HAVE NO LAND",
    match: h =>
      (!h.Area_Paddyland || h.Area_Paddyland === "00") &&
      (!h.Area_Dryland || h.Area_Dryland === "00") &&
      (!h.Area_Wetland || h.Area_Wetland === "00")
  },
  { slNo: 28, name: "FAMILIES WHICH HAVE PADDY LAND", match: h => h.Area_Paddyland && h.Area_Paddyland !== "00" },
  { slNo: 29, name: "FAMILIES WHICH HAVE WET LAND", match: h => h.Area_Wetland && h.Area_Wetland !== "00" },
  {
    slNo: 30,
    name: "FAMILIES WHICH HAVE AGRI FARMING",
    match: h => h.CurrentCultivationDetails && h.CurrentCultivationDetails !== "ഇല്ല"
  },

  // 31–34 Toilets
  { slNo: 31, name: "FAMILIES WHICH HAVE NO TOILETS", match: h => h.ToiletFacilities === false },
  { slNo: 32, name: "CEMENT RING TOILETS", match: h => h.ToiletTankType === "Cement Ring" },
  { slNo: 33, name: "PVC TANK TOILETS", match: h => h.ToiletTankType === "PVC Tank" },
  { slNo: 34, name: "SEPTIC TANK TOILETS", match: h => h.ToiletTankType === "Septic Tank" },

  // 35–40 Water
  { slNo: 35, name: "NO CLEAN WATER SOURCE", match: h => !h.AvailabilityofCleanWater },
  { slNo: 36, name: "BOREWELL USERS", match: h => h.AvailabilityofCleanWater === "Borewell" },
  { slNo: 37, name: "POND USERS", match: h => h.AvailabilityofCleanWater === "Pond" },
  { slNo: 38, name: "PUBLIC TAP USERS", match: h => h.AvailabilityofCleanWater === "Public tap" },
  { slNo: 39, name: "RAIN WATER HARVESTING", match: h => h.AvailabilityofCleanWater === "Rainwater harvesting" },
  { slNo: 40, name: "WELL USERS", match: h => h.AvailabilityofCleanWater === "Well" },

  // 41 KWA
  { slNo: 41, name: "NO KWA CONNECTION", match: h => h.KWAConnection === false },

  // 42–47 Waste
  { slNo: 42, name: "NO ORGANIC WASTE MANAGEMENT SYSTEM", match: h => h.OrganicWasteManagementMethod === "N/A" },
  { slNo: 43, name: "BIO BIN USERS", match: h => h.OrganicWasteManagementMethod === "Bio bin" },
  { slNo: 44, name: "BIO GAS PLANTS", match: h => h.OrganicWasteManagementMethod === "Bio gas" },
  { slNo: 45, name: "COMPOSTING PITS", match: h => h.OrganicWasteManagementMethod === "Composting pit" },
  { slNo: 46, name: "NO SOLID WASTE MANAGEMENT SYSTEM", match: h => h.InorganicWasteManagementMethod === "N/A" },
  { slNo: 47, name: "HARITHA KARMA SENA USERS", match: h => h.InorganicWasteManagementMethod === "Haritha Karma Sena" },

  // 48–50 Waste water
  { slNo: 48, name: "NO WASTE WATER TREATMENT SYSTEM", match: h => h.WasteWaterManagementSystem === "No" },
  { slNo: 49, name: "SOAKAGE PITS", match: h => h.WasteWaterManagementSystem === "Soakage Pit" },
  { slNo: 50, name: "OPEN DRAINAGE", match: h => h.WasteWaterManagementSystem === "Open drainage" },

  // 51–55 Animals
  { slNo: 51, name: "CHICKEN REARING", match: h => h.DomesticAnimals?.includes("Hen") },
  { slNo: 52, name: "DUCK REARING", match: h => h.DomesticAnimals?.includes("Duck") },
  { slNo: 53, name: "CATTLE REARING", match: h => h.DomesticAnimals?.includes("Cow") },
  { slNo: 54, name: "GOAT REARING", match: h => h.DomesticAnimals?.includes("Goat") },
  { slNo: 55, name: "FISH FARMING", match: h => h.DomesticAnimals?.includes("fish") },

  // 56 Snehajalakam
  { slNo: 56, name: "SNEHAJALAKAM BENEFICIARIES", match: h => h.SnehajalakamService === "Yes" }
];
