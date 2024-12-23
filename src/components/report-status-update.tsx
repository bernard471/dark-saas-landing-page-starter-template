import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Loader2 } from "lucide-react"

interface StatusUpdateProps {
  currentStatus: string;
  reportId: string;
  onStatusUpdate: (status: string) => Promise<void>;
}

export function ReportStatusUpdate({ currentStatus, reportId, onStatusUpdate }: StatusUpdateProps) {
  const [isUpdating, setIsUpdating] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(currentStatus)

  const handleStatusUpdate = async () => {
    if (selectedStatus === currentStatus) return
    
    setIsUpdating(true)
    try {
      await onStatusUpdate(selectedStatus)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
        <SelectTrigger className="w-[180px] bg-gray-700">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-gray-800">
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Under Review">Under Review</SelectItem>
          <SelectItem value="Taken Down">Taken Down</SelectItem>
          <SelectItem value="Valid Account">Valid Account</SelectItem>
        </SelectContent>
      </Select>

      <Button 
        onClick={handleStatusUpdate}
        disabled={isUpdating || selectedStatus === currentStatus}
        className="bg-teal-500 hover:bg-teal-600"
      >
        {isUpdating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating...
          </>
        ) : (
          'Update Status'
        )}
      </Button>
    </div>
  )
}
