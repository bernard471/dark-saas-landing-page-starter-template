import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ReportStatusUpdate } from "./report-status-update";

interface ReportDetailsModalProps {
  report: {
    id: string;
    username: string;
    accountId: string;
    platform: string;
    status: string;
    submittedAt: string;
    evidence: string[];
    lastUpdated: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (reportId: string, status: string) => Promise<void>;
}

export function ReportDetailsModal({ report, isOpen, onClose, onStatusUpdate }: ReportDetailsModalProps) {
  if (!report) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Report Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Report Information Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Username</label>
              <p className="text-gray-100">{report.username}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Account ID</label>
              <p className="text-gray-100">{report.accountId}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Platform</label>
              <p className="text-gray-100 capitalize">{report.platform}</p>
            </div>
            <div>
              <label className="text-sm text-gray-400">Status</label>
              <br />
              <span className={`px-2 py-1 rounded-full text-xs ${
                report.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
                report.status === 'Taken Down' ? 'bg-red-500/20 text-red-500' :
                report.status === 'Under Review' ? 'bg-blue-500/20 text-blue-500' :
                'bg-green-500/20 text-green-500'
              }`}>
               
                {report.status}
              </span>
            </div>
          </div>

          {/* Status Update Section */}
          <div className="mt-4">
            <label className="text-sm text-gray-400 mb-2 block">Update Status</label>
            <ReportStatusUpdate 
              currentStatus={report.status}
              reportId={report.id}
              onStatusUpdate={async (status) => {
                await onStatusUpdate(report.id, status);
              }}
            />
          </div>  

          {/* Evidence Section */}
          <div>
            <label className="text-sm text-gray-400">Evidence</label>
            <div className="mt-2 grid grid-cols-2 gap-4">
              {report.evidence.map((url, index) => (
                <div key={index} className="relative h-32 rounded-lg overflow-hidden">
                  <Image 
                    src={url} 
                    alt={`Evidence ${index + 1}`} 
                    fill 
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={onClose}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
