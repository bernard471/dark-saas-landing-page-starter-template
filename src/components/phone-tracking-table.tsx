import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface PhoneTrackingTableProps {
  phones: {
    id: string;
    phoneNumber: string;
    status: string;
    location: string;
    date: string;
  }[];
}

export function PhoneTrackingTable({ phones }: PhoneTrackingTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700">
          <TableHead className="text-teal-300">Number</TableHead>
          <TableHead className="text-teal-300">Status</TableHead>
          <TableHead className="text-teal-300">Location</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {phones.map((item) => (
          <TableRow key={item.id} className="border-gray-700">
            <TableCell className="text-gray-200">{item.phoneNumber}</TableCell>
            <TableCell className="text-gray-200">{item.status}</TableCell>
            <TableCell className="text-gray-200">{item.location}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
