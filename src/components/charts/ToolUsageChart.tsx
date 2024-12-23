import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ToolUsageChart() {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-100">Tool Usage Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-gray-400">No usage data available</p>
        </div>
      </CardContent>
    </Card>
  )
}