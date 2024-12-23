import { useState } from "react";
import { ReportDetailsModal } from "./report-details-modal";
import { Button } from "./ui/button";


interface AccountReport {
    id: string;
    username: string;
    accountId: string;
    platform: string;
    status: string;
    submittedAt: string;
    evidence: string[];
}

export function AccountReportsTable({ reports }: { reports: AccountReport[] }) {
    const [selectedReport, setSelectedReport] = useState<AccountReport | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onViewDetails = (report: AccountReport) => {
        // Convert file names to full URLs if they aren't already
        const processedReport = {
            ...report,
            evidence: report.evidence.map(evidence => {
                if (evidence.startsWith('http://') || evidence.startsWith('https://')) {
                    return evidence;
                }
                // Use a placeholder image or your actual image URL base path
                return `/uploads/${evidence}`;
            })
        };
        setSelectedReport(processedReport);
        setIsModalOpen(true);
    };
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs uppercase bg-gray-700">
                    <tr>
                        <th className="px-4 py-3">Username</th>
                        <th className="px-4 py-3">Platform</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Submitted</th>
                        <th className="px-4 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>

                {reports.map((report) => (
                        <tr key={report.id} className="border-b border-gray-700">
                            <td className="px-4 py-3">{report.username}</td>
                            <td className="px-4 py-3 capitalize">{report.platform}</td>
                            <td className="px-4 py-3">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                    report.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
                                    report.status === 'Taken Down' ? 'bg-red-500/20 text-red-500' :
                                    report.status === 'Under Review' ? 'bg-blue-500/20 text-blue-500' :
                                    'bg-green-500/20 text-green-500'
                                }`}>
                                    {report.status}
                                </span>
                            </td>
                            <td className="px-4 py-3">{new Date(report.submittedAt).toLocaleDateString()}</td>
                            <td className="px-4 py-3">
                                <Button variant="ghost" size="sm" onClick={() => onViewDetails(report)}>
                                    View Details
                                </Button>
                            </td>
                        </tr>
                    ))}

            </tbody>
            </table>

            <ReportDetailsModal 
                report={selectedReport ? { ...selectedReport, lastUpdated: '' } : null}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedReport(null);
                }}
                onStatusUpdate={async (reportId, status) => {
                    // Handle status update logic here
                    console.log('Status update:', reportId, status);
                }}
            />
        </div>
    );
}
