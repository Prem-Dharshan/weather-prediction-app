import axios from "axios";

const CURRENT_API_URL = "http://api.weatherstack.com/forecast";
const API_KEY = import.meta.env.VITE_WEATHERSTACK_API_KEY || "bb0c9b6bf319a5624fe47eb825570225";
const VITE_STORM_API_KEY="SvW4km91GItwujTwHuBCQhhBTPfmoc4X"

export const fetchForecast = async (city: string, days: number, hours: number) => {
  try {

    const response = await axios.get(CURRENT_API_URL, {
      params: {
        access_key: API_KEY,
        query: city,
        forecast_days: days,
        hourly: hours
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


export const  accuForecast = async (city: string) => {
  const resp = await axios.get("http://dataservice.accuweather.com/locations/v1/cities/search", {
    params: {
      api_key: VITE_STORM_API_KEY,
      q: city,
  }})

  const locKey = resp.data[0].Key 

  const response = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locKey}`, {
    params: {
      api_key: VITE_STORM_API_KEY,
      locationKey: locKey,
    }
  }
  )

  console.log(response)

  return response.data;
}