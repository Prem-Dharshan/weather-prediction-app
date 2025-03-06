import ErrorDialog from "@/components/shared/ErrorDialog";
import GenericTable from "@/components/shared/GenericTable";
import { InputWithButton } from "@/components/shared/InputWithButton";
import Navbar from "@/components/shared/Navbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import WeatherCard, { WeatherData } from "@/components/WeatherCard";
import { fetchCurrentWeather } from "@/services/dashboard";
import { useQuery } from "@tanstack/react-query";
import { CloudSunRain } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const [city, setCity] = useState("New York");
  const [showError, setShowError] = useState(false);

  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ["current", city],
    queryFn: () => fetchCurrentWeather(city),
    enabled: false,
  });

  if (isError) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return (
      <ErrorDialog
        isOpen={showError}
        onClose={setShowError}
        message={errorMessage}
      />
    );
  }

  const headers = ["Metric", "Value"];
  const weatherData = data
    ? [
        ["Wind Speed", `${data.current.wind_speed} km/h`],
        ["Wind Direction", data.current.wind_dir],
        ["Pressure", `${data.current.pressure} hPa`],
        ["Precipitation", `${data.current.precip} mm`],
        ["Humidity", `${data.current.humidity} %`],
        ["Cloud Cover", `${data.current.cloudcover} %`],
        ["Feels Like", `${data.current.feelslike} °C`],
        ["UV Index", `${data.current.uv_index}`],
        ["Visibility", `${data.current.visibility} km`],
      ]
    : [];

  return (
    <>
      <div className="pt-6">
        <Navbar />
      </div>

      <div className="mt-6 max-w-6xl w-full shadow-sm rounded-lg p-6 mx-auto flex flex-row items-center gap-4">
        <Avatar>
          <AvatarFallback className="bg-gray-100 flex items-center justify-center w-10 h-10">
            <CloudSunRain className="w-6 h-6 text-gray-600" />
          </AvatarFallback>
        </Avatar>

        <InputWithButton
          btnText="Fetch"
          placeholderText="Enter the city"
          onSubmit={() => refetch()}
          onChange={setCity}
        />
      </div>

      {isLoading && (
      <div className="max-w-6xl mx-auto space-y-4">

        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>

        <div className="max-w-6xl mx-auto rounded-lg border shadow-sm">
          <Skeleton className="h-10 w-full bg-muted rounded-t-lg" />
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      </div>
    )}


      <div className="mt-6">
        {data && <WeatherCard data={data as WeatherData} />}
      </div>

      <div className="mt-6 max-w-6xl w-full mx-auto">
        {data && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Weather Metrics</h2>
            <GenericTable headers={headers} data={weatherData} tableCaption="A list of weather metrics"/>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
