import axios from "axios";

const API_KEY = "SvW4km91GItwujTwHuBCQhhBTPfmoc4X";
const BASE_URL = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/";

export const fetchWeatherForecast = async (city: string) => {
  try {
    const locationRes = await axios.get(
      `https://dataservice.accuweather.com/locations/v1/cities/search`,
      {
        params: { apikey: API_KEY, q: city },
      }
    );

    if (!locationRes.data.length) throw new Error("City not found");

    const locationKey = locationRes.data[0].Key;

    const forecastRes = await axios.get(`${BASE_URL}${locationKey}`, {
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
    throw new Error("Failed to fetch forecast data");
  }
};
