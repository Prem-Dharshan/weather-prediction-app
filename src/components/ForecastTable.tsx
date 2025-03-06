import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ForeCastTableProps {
  data: string[][];
}

const forecastHeaders = [
    "date",
    "weatherIcon",
    "mintemp",
    "maxtemp",
    "avgtemp",
    "uv_index",
    "prediction"
]

const ForeCastTable = ({ data }: ForeCastTableProps) => {
  return (
    <Table className="w-full">
      <TableCaption>A list of weather metrics.</TableCaption>
      <TableHeader>
        <TableRow>
          {forecastHeaders.map((header, index) => (
            <TableHead key={index}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ForeCastTable;
