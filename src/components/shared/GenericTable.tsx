import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface GenericTableProps {
  headers: string[];
  data: string[][];
  tableCaption: string;
}

const GenericTable = ({ headers, data, tableCaption }: GenericTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border border-border shadow-sm max-w-2xl mx-auto">
      <Table className="w-full border-collapse">
        <TableCaption className="text-muted-foreground">
          { tableCaption }
        </TableCaption>
        <TableHeader className="bg-background">
          <TableRow className="border-b">
            {headers.map((header, index) => (
              <TableHead
                key={index}
                className="px-4 py-3 text-center text-sm font-semibold text-foreground"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <TableRow
                key={rowIndex}
                className="border-b even:bg-muted/40 transition hover:bg-muted/60"
              >
                {row.map((cell, cellIndex) => (
                  <TableCell
                    key={cellIndex}
                    className="px-4 py-3 text-center text-sm text-foreground"
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={headers.length}
                className="px-4 py-3 text-center text-muted-foreground"
              >
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default GenericTable;
