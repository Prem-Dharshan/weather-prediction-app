import ErrorDialog from "@/components/shared/ErrorDialog";
import { InputWithButton } from "@/components/shared/InputWithButton";
import Navbar from "@/components/shared/Navbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import WeatherCard, { WeatherData } from "@/components/WeatherCard";
import { accuForecast } from "@/services/forecast"
import { useQuery } from "@tanstack/react-query"
import { CloudSunRain } from "lucide-react";
import { useState } from "react"

const AccuForecast = () => {

    const [city, setCity] = useState("New York");
  const [showError, setShowError] = useState(false);

  const { data, isLoading, error, isError, refetch } = useQuery({
    queryKey: ["forecast", city],
    queryFn: () => accuForecast(city),
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
    return (
        <>
            <div>
                Accu Forecast

                <Navbar />  
      <div className="mt-4 max-w-6xl w-full bg-white shadow-sm rounded-lg p-6 mx-auto flex flex-row items-center gap-4">
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

      {isLoading && <Skeleton className="h-32 w-full" />}

      <div className="mt-6">
        {data && <WeatherCard data={data as WeatherData} />}
      </div>


                { JSON.stringify(data)}
            </div>
        </>
    )
}

export default AccuForecast;