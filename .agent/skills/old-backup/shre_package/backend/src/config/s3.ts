import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { logger } from './logger';

// S3 Configuration
const S3_ENABLED = process.env.S3_ENABLED === 'true';
const S3_BUCKET = process.env.S3_BUCKET || 'shre-documents';
const S3_REGION = process.env.S3_REGION || 'us-east-1';
const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY_ID;
const S3_SECRET_KEY = process.env.S3_SECRET_ACCESS_KEY;

// Initialize S3 Client
let s3Client: S3Client | null = null;

if (S3_ENABLED && S3_ACCESS_KEY && S3_SECRET_KEY) {
    s3Client = new S3Client({
        region: S3_REGION,
        credentials: {
            accessKeyId: S3_ACCESS_KEY,
            secretAccessKey: S3_SECRET_KEY
        }
    });
    logger.info('✅ AWS S3 client initialized');
} else {
    logger.warn('⚠️  S3 not enabled - using local file storage');
}

export class S3Service {
    /**
     * Upload file to S3
     */
    static async uploadFile(key: string, body: Buffer, contentType: string): Promise<string> {
        if (!s3Client) {
            throw new Error('S3 client not initialized');
        }

        const command = new PutObjectCommand({
            Bucket: S3_BUCKET,
            Key: key,
            Body: body,
            ContentType: contentType,
            ServerSideEncryption: 'AES256' // Enable server-side encryption
        });

        try {
            await s3Client.send(command);
            logger.info(`File uploaded to S3: ${key}`);
            return key;
        } catch (error) {
            logger.error('S3 upload error:', error);
            throw new Error('Failed to upload file to S3');
        }
    }

    /**
     * Get file from S3
     */
    static async getFile(key: string): Promise<Buffer> {
        if (!s3Client) {
            throw new Error('S3 client not initialized');
        }

        const command = new GetObjectCommand({
            Bucket: S3_BUCKET,
            Key: key
        });

        try {
            const response = await s3Client.send(command);

            if (!response.Body) {
                throw new Error('Empty response from S3');
            }

            // Convert stream to buffer
            const chunks: Uint8Array[] = [];
            for await (const chunk of response.Body as any) {
                chunks.push(chunk);
            }

            return Buffer.concat(chunks);
        } catch (error) {
            logger.error('S3 download error:', error);
            throw new Error('Failed to download file from S3');
        }
    }

    /**
     * Delete file from S3
     */
    static async deleteFile(key: string): Promise<void> {
        if (!s3Client) {
            throw new Error('S3 client not initialized');
        }

        const command = new DeleteObjectCommand({
            Bucket: S3_BUCKET,
            Key: key
        });

        try {
            await s3Client.send(command);
            logger.info(`File deleted from S3: ${key}`);
        } catch (error) {
            logger.error('S3 delete error:', error);
            throw new Error('Failed to delete file from S3');
        }
    }

    /**
     * Generate pre-signed URL for secure download
     */
    static async getPresignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
        if (!s3Client) {
            throw new Error('S3 client not initialized');
        }

        const command = new GetObjectCommand({
            Bucket: S3_BUCKET,
            Key: key
        });

        try {
            const url = await getSignedUrl(s3Client, command, { expiresIn });
            return url;
        } catch (error) {
            logger.error('S3 presigned URL error:', error);
            throw new Error('Failed to generate presigned URL');
        }
    }

    /**
     * Check if S3 is enabled
     */
    static isEnabled(): boolean {
        return S3_ENABLED && s3Client !== null;
    }

    /**
     * Get S3 bucket name
     */
    static getBucket(): string {
        return S3_BUCKET;
    }
}

export { s3Client };
