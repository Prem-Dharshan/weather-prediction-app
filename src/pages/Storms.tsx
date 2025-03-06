import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchStormsByYear, Storm } from "@/services/storms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GenericTable from "@/components/shared/GenericTable";
import Navbar from "@/components/shared/Navbar";

export default function Storms() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1999 }, (_, i) => currentYear - i);

  const [selectedYear, setSelectedYear] = useState<number>(currentYear);

  const { data: storms, isLoading } = useQuery<Storm[]>({
    queryKey: ["storms", selectedYear],
    queryFn: () => fetchStormsByYear(selectedYear),
  });

  const tableHeaders = ["Storm Name", "City"];

  const tableData = storms
    ? storms.map((storm) => [storm.name, storm.city || "Unknown City"])
    : [];

  return (

    <>
    <div className="pt-16">
        <Navbar />
    </div>
    
    <div className="min-h-screen bg-background text-foreground p-6 flex flex-col items-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Government-Issued Storms by Year</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <Select
            value={selectedYear.toString()}
            onValueChange={(value) => setSelectedYear(parseInt(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a year" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-[200px]">
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>

        {isLoading ? (
            <div className="mt-4">
                <p>Loading storms...</p>
            </div>
        ) : (
            <GenericTable headers={tableHeaders} data={tableData} tableCaption={`A list of storms in ${selectedYear}`} />
        )}
        </CardContent>
      </Card>
    </div>
    </>
  );
}
