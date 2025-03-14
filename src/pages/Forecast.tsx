import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CloudRainWind } from "lucide-react";
import { InputWithButton } from "@/components/shared/InputWithButton";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/shared/Navbar";
import GenericTable from "@/components/shared/GenericTable";
import { fetchWeatherForecast } from "@/services/forecast";
import ErrorDialog from "@/components/shared/ErrorDialog";

const Forecast = () => {
  const [city, setCity] = useState("New York");
  const [showError, setShowError] = useState(false);

  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ["forecast", city],
    queryFn: () => fetchWeatherForecast(city),
    enabled: false,
  });

  if (isError) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return (
      <ErrorDialog isOpen={showError} onClose={setShowError} message={errorMessage} />
    );
  }

  const headers = ["Date", "Temperature", "Condition"];
  const forecastData = data
    ? data.forecast.map((day: any) => [
        day.date,
        `${day.temperature} °C`,
        day.condition,
      ])
    : [];

  return (
    <>
      <div className="pt-16">
        <Navbar />
      </div>

      <div className="mt-6 max-w-6xl w-full shadow-sm rounded-lg p-6 mx-auto flex flex-row items-center gap-4">
        <Avatar>
          <AvatarFallback className="bg-gray-100 flex items-center justify-center w-10 h-10">
            <CloudRainWind className="w-6 h-6 text-gray-600" />
          </AvatarFallback>
        </Avatar>

        <InputWithButton
          btnText="Fetch"
          placeholderText="Enter the city"
          onSubmit={() => refetch()}
          onChange={setCity}
        />
      </div>

      {isLoading && <Skeleton className="h-32 w-full" />}
      
      <div className="mt-6 max-w-6xl w-full mx-auto">
        {data && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Forecast</h2>
            <GenericTable headers={headers} data={forecastData} tableCaption="A list of forecast for 5 days"/>
          </div>
        )}
      </div>
    </>
  );
};

export default Forecast;
