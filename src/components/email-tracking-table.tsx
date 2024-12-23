import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface EmailTrackingTableProps {
  emails: {
    id: string;
    email: string;
    status: string;
    date: string;
  }[];
}

export function EmailTrackingTable({ emails }: EmailTrackingTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700">
          <TableHead className="text-teal-300">Email</TableHead>
          <TableHead className="text-teal-300">Status</TableHead>
          <TableHead className="text-teal-300">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {emails.map((item) => (
          <TableRow key={item.id} className="border-gray-700">
            <TableCell className="text-gray-200">{item.email}</TableCell>
            <TableCell className="text-gray-200">{item.status}</TableCell>
            <TableCell className="text-gray-200">{new Date(item.date).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
