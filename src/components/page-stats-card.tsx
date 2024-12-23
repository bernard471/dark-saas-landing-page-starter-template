import { Card, CardContent } from "@/components/ui/card";
import { Globe } from "lucide-react";

export function PageStatsCard({ totalPages }: { totalPages: number }) {
  return (
    <Card className="bg-purple-600 text-white">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="h-5 w-5" />
          <h3 className="font-medium">Total Pages Detected</h3>
        </div>
        <p className="text-3xl font-bold">{totalPages}</p>
      </CardContent>
    </Card>
  );
}
