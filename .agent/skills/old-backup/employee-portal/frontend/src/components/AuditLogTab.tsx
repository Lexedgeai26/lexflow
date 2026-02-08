import { useQuery } from '@tanstack/react-query';
import { auditLogService } from '@/services/auditLogService';
import { format } from 'date-fns';
import {
    Activity,
    User as UserIcon,
    FileText,
    Trash2,
    PlusCircle,
    Download,
    Upload,
    RefreshCw
} from 'lucide-react';

interface AuditLogTabProps {
    entityType: string;
    entityId: string;
}

const getActionIcon = (action: string) => {
    switch (action) {
        case 'create': return <PlusCircle className="w-4 h-4 text-green-500" />;
        case 'update': return <RefreshCw className="w-4 h-4 text-blue-500" />;
        case 'delete': return <Trash2 className="w-4 h-4 text-red-500" />;
        case 'upload': return <Upload className="w-4 h-4 text-purple-500" />;
        case 'download': return <Download className="w-4 h-4 text-amber-500" />;
        default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
};

export function AuditLogTab({ entityType, entityId }: AuditLogTabProps) {
    const { data: logs, isLoading } = useQuery({
        queryKey: ['audit-logs', entityType, entityId],
        queryFn: () => auditLogService.getEntityLogs(entityType, entityId)
    });

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-20 bg-gray-50 rounded-lg animate-pulse" />
                ))}
            </div>
        );
    }

    if (!logs || logs.length === 0) {
        return (
            <div className="py-12 text-center text-muted-foreground">
                <Activity className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>No activity recorded yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {logs.map((log) => (
                <div key={log.id} className="flex gap-4 p-4 bg-white border rounded-xl hover:border-blue-200 transition-colors">
                    <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border">
                            {getActionIcon(log.action)}
                        </div>
                    </div>
                    <div className="flex-grow">
                        <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold capitalize">{log.action} {log.entity_type}</span>
                            <span className="text-xs text-muted-foreground">
                                {format(new Date(log.created_at), 'MMM d, yyyy HH:mm')}
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                            <UserIcon className="w-3.5 h-3.5" />
                            <span>Admin Action</span>
                            {log.ip_address && (
                                <>
                                    <span className="mx-1">•</span>
                                    <span>{log.ip_address}</span>
                                </>
                            )}
                        </p>
                        {log.changes && (
                            <div className="mt-3 text-xs bg-gray-50 p-3 rounded-lg overflow-x-auto">
                                <pre className="font-mono text-gray-600">
                                    {JSON.stringify(log.changes, null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
