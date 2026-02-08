import CryptoJS from 'crypto-js';
import { logger } from '../config/logger';

// Encryption key from environment variable
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'default-key-change-in-production';
const ALGORITHM = 'AES';

if (ENCRYPTION_KEY === 'default-key-change-in-production') {
    logger.warn('⚠️  Using default encryption key - CHANGE IN PRODUCTION!');
}

export class EncryptionService {
    /**
     * Encrypt sensitive data
     */
    static encrypt(data: string | number): string {
        try {
            const encrypted = CryptoJS.AES.encrypt(String(data), ENCRYPTION_KEY).toString();
            return encrypted;
        } catch (error) {
            logger.error('Encryption error:', error);
            throw new Error('Failed to encrypt data');
        }
    }

    /**
     * Decrypt sensitive data
     */
    static decrypt(encryptedData: string): string {
        try {
            const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
            return decrypted.toString(CryptoJS.enc.Utf8);
        } catch (error) {
            logger.error('Decryption error:', error);
            throw new Error('Failed to decrypt data');
        }
    }

    /**
     * Encrypt number (for salary, etc.)
     */
    static encryptNumber(num: number): string {
        return this.encrypt(num);
    }

    /**
     * Decrypt number
     */
    static decryptNumber(encryptedNum: string): number {
        const decrypted = this.decrypt(encryptedNum);
        return parseFloat(decrypted);
    }

    /**
     * Hash sensitive data (one-way)
     */
    static hash(data: string): string {
        return CryptoJS.SHA256(data).toString();
    }

    /**
     * Generate random encryption key
     */
    static generateKey(length: number = 32): string {
        return CryptoJS.lib.WordArray.random(length).toString();
    }
}
