import axios from "axios";

const API_KEY = "LjcJQpO8Mc7SLoBK6w4cfA9t46o3pduF";
const BASE_URL = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/";
const LOCATION_URL = "https://dataservice.accuweather.com/locations/v1/cities/search";

const FALLBACK_FORECAST = {
  "London": [
    { date: "2025-03-09", temperature: 12, condition: "Partly cloudy" },
    { date: "2025-03-10", temperature: 14, condition: "Sunny" },
    { date: "2025-03-11", temperature: 11, condition: "Rain showers" },
    { date: "2025-03-12", temperature: 13, condition: "Cloudy" },
    { date: "2025-03-13", temperature: 15, condition: "Mostly sunny" },
  ],
  "New York": [
    { date: "2025-03-09", temperature: 5, condition: "Snow showers" },
    { date: "2025-03-10", temperature: 7, condition: "Partly cloudy" },
    { date: "2025-03-11", temperature: 4, condition: "Rain" },
    { date: "2025-03-12", temperature: 6, condition: "Cloudy" },
    { date: "2025-03-13", temperature: 8, condition: "Sunny" },
  ],
};

export interface ForecastDay {
  date: string;
  temperature: number;
  condition: string;
}

export const fetchWeatherForecast = async (city: string): Promise<{ forecast: ForecastDay[] }> => {
  try {
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
    };

    const locationRes = await axios.get(LOCATION_URL, {
      headers,
      params: { apikey: API_KEY, q: city },
    });

    if (!locationRes.data.length) {
      console.warn(`City "${city}" not found in AccuWeather API`);
      throw new Error("City not found");
    }

    const locationKey = locationRes.data[0].Key;
    console.log(`Location key for ${city}: ${locationKey}`);

    const forecastRes = await axios.get(`${BASE_URL}${locationKey}`, {
      headers,
      params: { apikey: API_KEY, metric: true },
    });

    return {
      forecast: forecastRes.data.DailyForecasts.map((day: any) => ({
        date: day.Date.split("T")[0],
        temperature: day.Temperature.Maximum.Value,
        condition: day.Day.IconPhrase,
      })),
    };
  } catch (error) {
    console.error("Failed to fetch forecast data:", error);
    if (FALLBACK_FORECAST[city as keyof typeof FALLBACK_FORECAST]) {
      console.log(`Using fallback data for ${city}`);
      return { forecast: FALLBACK_FORECAST[city as keyof typeof FALLBACK_FORECAST] };
    }
    throw new Error("Failed to fetch forecast data and no fallback available");
  }
};
