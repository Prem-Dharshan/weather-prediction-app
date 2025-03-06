import axios from "axios";

const CURRENT_API_URL = "https://api.weatherstack.com/current";
const API_KEY = import.meta.env.VITE_WEATHERSTACK_API_KEY || "c59a6b299141de998e92177176257efb";

export const fetchCurrentWeather = async (city: string) => {
  try {
    const response = await axios.get(CURRENT_API_URL, {
      params: {
        access_key: API_KEY,
        query: city,
      },
    });

    console.log(response);

    if (!response.data || !response.data.current) {
      throw new Error("City not found");
    }

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error?.info || "Error fetching weather data");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
