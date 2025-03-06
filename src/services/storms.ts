import axios from "axios";

const API_KEY = "LjcJQpO8Mc7SLoBK6w4cfA9t46o3pduF";
const BASE_URL = "https://dataservice.accuweather.com/api/tropical/v1/gov/storms";

export interface Storm {
  id: string;
  name: string;
  basinId: string;
  year: number;
  city?: string;
}

const FALLBACK_STORMS: Storm[] = [
  { id: "2025-AL-01", name: "Andrea", basinId: "AL", year: 2025, city: "Miami" },
  { id: "2025-AL-02", name: "Barry", basinId: "AL", year: 2025, city: "New Orleans" },

  { id: "2024-AL-01", name: "Alberto", basinId: "AL", year: 2024, city: "Houston" },
  { id: "2024-AL-02", name: "Beryl", basinId: "AL", year: 2024, city: "Tampa" },

  { id: "2023-AL-01", name: "Arlene", basinId: "AL", year: 2023, city: "Corpus Christi" },
  { id: "2023-AL-02", name: "Bret", basinId: "AL", year: 2023, city: "Mobile" },
  { id: "2023-AL-03", name: "Cindy", basinId: "AL", year: 2023, city: "Galveston" },

  { id: "2022-AL-01", name: "Alex", basinId: "AL", year: 2022, city: "Key West" },
  { id: "2022-AL-02", name: "Bonnie", basinId: "AL", year: 2022, city: "Charleston" },
  { id: "2022-AL-03", name: "Colin", basinId: "AL", year: 2022, city: "Savannah" },

  { id: "2021-AL-01", name: "Ana", basinId: "AL", year: 2021, city: "Wilmington" },
  { id: "2021-AL-02", name: "Bill", basinId: "AL", year: 2021, city: "Norfolk" },
  { id: "2021-AL-03", name: "Claudette", basinId: "AL", year: 2021, city: "Pensacola" },

  { id: "2020-AL-01", name: "Arthur", basinId: "AL", year: 2020, city: "Myrtle Beach" },
  { id: "2020-AL-02", name: "Bertha", basinId: "AL", year: 2020, city: "Virginia Beach" },
  { id: "2020-AL-03", name: "Cristobal", basinId: "AL", year: 2020, city: "Baton Rouge" },
  { id: "2020-AL-04", name: "Dolly", basinId: "AL", year: 2020, city: "Brownsville" },
];

export const fetchStormsByYear = async (year: number): Promise<Storm[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/${year}`, {
      params: {
        apikey: API_KEY,
      },
    });
    return response.data.map((storm: any) => ({
      id: storm.ID,
      name: storm.Name,
      basinId: storm.BasinID,
      year: storm.Year,
      city: storm.City || "Unknown",
    }));
  } catch (error) {
    console.error("API failed, using fallback data:", error);
    return FALLBACK_STORMS.filter((storm) => storm.year === year);
  }
};
