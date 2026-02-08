import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Upload,
    Search,
    File,
    Download,
    Trash2,
    FileText,
    Shield,
    History,
    CheckCircle2,
    XCircle,
    Clock
} from 'lucide-react';
import api from '../services/api';
import MainLayout from '../components/layout/MainLayout';
import { cn } from '../utils/cn';
import { format } from 'date-fns';

const Documents: React.FC = () => {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ['documents', searchTerm],
        queryFn: () => {
            let url = '/documents?';
            if (searchTerm) url += `search=${searchTerm}`;
            return api.get(url).then(res => res.data);
        }
    });

    const uploadMutation = useMutation({
        mutationFn: (formData: FormData) => api.post('/documents/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['documents'] });
            setIsUploading(false);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => api.delete(`/documents/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['documents'] });
        }
    });

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            uploadMutation.mutate(formData);
        }
    };

    const downloadFile = async (id: string, name: string) => {
        try {
            const response = await api.get(`/documents/download/${id}`, {
                responseType: 'blob'
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', name);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Download failed', error);
            alert('Failed to download document. Please try again.');
        }
    };

    const documents = data?.documents || [];

    return (
        <MainLayout>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-neutral-900">Documents</h1>
                        <p className="text-neutral-500 mt-1">Securely manage and version your enterprise assets</p>
                    </div>

                    <label className="flex items-center space-x-2 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-100 cursor-pointer group">
                        <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                        <span>Upload Document</span>
                        <input type="file" className="hidden" onChange={handleFileUpload} disabled={uploadMutation.isPending} />
                    </label>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm relative">
                            <Search className="absolute left-7 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="Search documents by name or content..."
                                className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-hidden transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wider font-semibold">
                                        <tr>
                                            <th className="px-6 py-4">Document Name</th>
                                            <th className="px-6 py-4">Size</th>
                                            <th className="px-6 py-4">Version</th>
                                            <th className="px-6 py-4">Created At</th>
                                            <th className="px-6 py-4 text-center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-100">
                                        {isLoading ? (
                                            Array.from({ length: 5 }).map((_, i) => (
                                                <tr key={i} className="animate-pulse">
                                                    <td colSpan={5} className="px-6 py-6 h-12 bg-neutral-50/20" />
                                                </tr>
                                            ))
                                        ) : documents.map((doc: any) => (
                                            <tr key={doc.id} className="hover:bg-neutral-50/50 transition-colors group">
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="p-2 bg-primary-50 text-primary-600 rounded-lg">
                                                            <FileText className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors truncate max-w-xs">{doc.name}</p>
                                                            <p className="text-xs text-neutral-400 uppercase">{doc.mimeType.split('/')[1] || 'FILE'}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-sm text-neutral-600">
                                                    {(doc.size / 1024).toFixed(1)} KB
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center space-x-1.5 px-2 py-1 bg-neutral-100 rounded-md w-fit">
                                                        <History className="w-3.5 h-3.5 text-neutral-400" />
                                                        <span className="text-xs font-bold text-neutral-700">v{doc.version}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-5 text-sm text-neutral-500">
                                                    {format(new Date(doc.createdAt), 'MMM dd, h:mm a')}
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <button
                                                            onClick={() => downloadFile(doc.id, doc.name)}
                                                            className="p-2 hover:bg-primary-50 rounded-lg text-neutral-400 hover:text-primary-600 transition-colors"
                                                        >
                                                            <Download className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm('Permanently delete this document and all versions?')) {
                                                                    deleteMutation.mutate(doc.id);
                                                                }
                                                            }}
                                                            className="p-2 hover:bg-red-50 rounded-lg text-neutral-400 hover:text-red-600 transition-colors"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {!isLoading && documents.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-20 text-center text-neutral-400 italic">
                                                    No documents found. Upload your first asset to get started.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-primary-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center space-x-2 mb-4">
                                    <Shield className="w-5 h-5 text-primary-400" />
                                    <h3 className="font-bold">Security Status</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-primary-300">AWS S3 Integration</span>
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-primary-300">AES-256 Encryption</span>
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-primary-300">Versioning Enabled</span>
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    </div>
                                </div>
                                <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <Clock className="w-4 h-4 text-primary-400" />
                                        <span className="text-xs font-bold uppercase tracking-wider text-primary-200">System Logs</span>
                                    </div>
                                    <p className="text-[10px] text-primary-400 font-mono leading-tight">
                                        [10:04:22] SYNC_S3_READY<br />
                                        [10:05:01] ENCRYPT_HANDSHAKE_OK<br />
                                        [10:05:45] REPLICA_HEALTH_UP
                                    </p>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600 blur-[80px] opacity-20" />
                        </div>

                        <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
                            <h3 className="font-bold text-neutral-900 mb-4">Usage Limits</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between text-xs font-medium mb-1">
                                        <span className="text-neutral-500 uppercase">Storage</span>
                                        <span className="text-neutral-900 font-bold">4.2 GB / 10 GB</span>
                                    </div>
                                    <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                                        <div className="bg-primary-600 h-full rounded-full" style={{ width: '42%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between text-xs font-medium mb-1">
                                        <span className="text-neutral-500 uppercase">Daily Bandwidth</span>
                                        <span className="text-neutral-900 font-bold">12%</span>
                                    </div>
                                    <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: '12%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Documents;
