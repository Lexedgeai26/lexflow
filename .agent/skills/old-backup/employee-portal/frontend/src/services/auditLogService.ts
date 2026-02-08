import api from './api';

export interface AuditLog {
    id: string;
    user_id?: string;
    action: string;
    entity_type: string;
    entity_id?: string;
    changes?: any;
    ip_address?: string;
    created_at: string;
}

export const auditLogService = {
    list: async (params?: { entity_type?: string; entity_id?: string; user_id?: string; skip?: number; limit?: number }) => {
        const response = await api.get<AuditLog[]>('/audit-logs/', { params });
        return response.data;
    },

    getEntityLogs: async (entityType: string, entityId: string) => {
        const response = await api.get<AuditLog[]>(`/audit-logs/entity/${entityType}/${entityId}`);
        return response.data;
    }
};
