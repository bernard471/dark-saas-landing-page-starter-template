import { Card, CardContent } from "@/components/ui/card";
import { Phone } from "lucide-react";

export function PhoneStatsCard({ totalPhones }: { totalPhones: number }) {
  return (
    <Card className="bg-teal-600 text-white">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Phone className="h-5 w-5" />
          <h3 className="font-medium">Total Numbers Traced</h3>
        </div>
        <p className="text-3xl font-bold">{totalPhones}</p>
      </CardContent>
    </Card>
  );
}
