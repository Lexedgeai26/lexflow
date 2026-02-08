import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { Button } from './ui/button';
import { Loader2, FileText, Download, Trash2, UploadCloud } from 'lucide-react';
import { format } from 'date-fns';

interface DocumentSectionProps {
    employeeId: string;
}

// Simple direct service for documents
const documentActions = {
    list: async (employeeId: string) => {
        const { data } = await api.get(`/documents/employee/${employeeId}`);
        return data;
    },
    upload: async ({ employeeId, file }: { employeeId: string, file: File }) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('employee_id', employeeId);
        formData.append('document_type', 'other');
        const { data } = await api.post('/documents/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return data;
    },
    download: async (documentId: string, fileName: string) => {
        const response = await api.get(`/documents/download/${documentId}`, {
            responseType: 'blob'
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
    delete: async (documentId: string) => {
        await api.delete(`/documents/${documentId}`);
    }
};

export function DocumentSection({ employeeId }: DocumentSectionProps) {
    const queryClient = useQueryClient();
    const [isUploading, setIsUploading] = useState(false);

    const { data: documents, isLoading } = useQuery({
        queryKey: ['documents', employeeId],
        queryFn: () => documentActions.list(employeeId)
    });

    const uploadMutation = useMutation({
        mutationFn: documentActions.upload,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['documents', employeeId] });
            setIsUploading(false);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: documentActions.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['documents', employeeId] });
        }
    });

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            await uploadMutation.mutateAsync({ employeeId, file });
        } catch (error) {
            console.error('Upload failed', error);
            setIsUploading(false);
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Employee Documents</h3>
                <div className="relative">
                    <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={isUploading}
                    />
                    <label htmlFor="file-upload">
                        <Button asChild variant="outline" size="sm" className="cursor-pointer" disabled={isUploading}>
                            <span className="flex items-center gap-2">
                                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UploadCloud className="w-4 h-4" />}
                                Upload Document
                            </span>
                        </Button>
                    </label>
                </div>
            </div>

            <div className="bg-white rounded-xl border overflow-hidden">
                {isLoading ? (
                    <div className="p-8 text-center text-muted-foreground flex flex-col items-center gap-2">
                        <Loader2 className="w-8 h-8 animate-spin" />
                        <p>Loading documents...</p>
                    </div>
                ) : documents?.length === 0 ? (
                    <div className="p-12 text-center text-muted-foreground flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                            <FileText className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-medium text-foreground">No documents uploaded</p>
                            <p className="text-sm">Upload contracts, IDs, or other relevant files.</p>
                        </div>
                    </div>
                ) : (
                    <div className="divide-y">
                        {documents?.map((doc: any) => (
                            <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm">{doc.filename}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {formatFileSize(doc.file_size || 0)} • Uploaded {format(new Date(doc.created_at), 'MMM d, yyyy')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => documentActions.download(doc.id, doc.filename)}
                                    >
                                        <Download className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                        onClick={() => deleteMutation.mutate(doc.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
