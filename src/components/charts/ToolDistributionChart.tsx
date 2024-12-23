import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ToolDistributionChart() {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-100">Tool Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-gray-400">No distribution data available</p>
        </div>
      </CardContent>
    </Card>
  )
}
