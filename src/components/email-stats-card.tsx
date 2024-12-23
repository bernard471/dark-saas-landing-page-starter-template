import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export function EmailStatsCard({ totalEmails }: { totalEmails: number }) {
  return (
    <Card className="bg-blue-600 text-white">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-5 w-5" />
          <h3 className="font-medium">Total E-mails traced</h3>
        </div>
        <p className="text-3xl font-bold">{totalEmails}</p>
      </CardContent>
    </Card>
  );
}
