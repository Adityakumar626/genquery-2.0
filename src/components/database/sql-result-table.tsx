import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface SqlResultTableProps {
  rows: Record<string, any>[];
}

export function SqlResultTable({ rows }: SqlResultTableProps) {
  if (!rows || rows.length === 0) {
    return <div className="p-4 text-sm text-muted-foreground">No data returned.</div>;
  }

  const columns = Object.keys(rows[0]);

  return (
    <div className="rounded-md border">
      <ScrollArea className="w-full whitespace-nowrap">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column} className="font-semibold capitalize">
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell key={`${rowIndex}-${column}`}>
                    {row[column] === null ? (
                      <span className="italic text-muted-foreground opacity-50">null</span>
                    ) : (
                      String(row[column])
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
