import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PageTrackingTableProps {
  pages: {
    id: string;
    url: string;
    status: string;
    detectedDate: string;
  }[];
}

export function PageTrackingTable({ pages }: PageTrackingTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700">
          <TableHead className="text-teal-300">URL</TableHead>
          <TableHead className="text-teal-300">Status</TableHead>
          <TableHead className="text-teal-300">Detected Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pages.map((item) => (
          <TableRow key={item.id} className="border-gray-700">
            <TableCell className="text-gray-200">{item.url}</TableCell>
            <TableCell className="text-gray-200">{item.status}</TableCell>
            <TableCell className="text-gray-200">{new Date(item.detectedDate).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
