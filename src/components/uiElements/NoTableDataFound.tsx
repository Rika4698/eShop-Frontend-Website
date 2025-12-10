import { SearchX } from "lucide-react";
import { TableCell, TableRow } from "../ui/table";

const NoTableDataFound = ({ span }: { span?: number }) => {
  return (
    <TableRow>
      <TableCell colSpan={span || 3} className="h-32 text-center">
        <div
          className="flex flex-col items-center justify-center space-y-3"
          role="status"
          aria-live="polite"
        >
          <SearchX
            className="h-12 w-12 text-muted-foreground"
            aria-hidden="true"
          />
          <div className="text-lg font-medium text-muted-foreground">
            No data found
          </div>
          <div className="text-sm text-muted-foreground max-w-sm"></div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default NoTableDataFound;
