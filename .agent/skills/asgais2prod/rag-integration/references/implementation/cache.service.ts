import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

interface CacheEntry {
    answer: string;
    sources: any[];
    timestamp: number;
    queryHash: string;
    workspaceId?: string;
}

@Injectable()
export class CacheService {
    private cache: Map<string, CacheEntry> = new Map();
    private readonly MAX_CACHE_SIZE = 5000; // Increased for more caching
    private readonly CACHE_TTL_MS = 1000 * 60 * 60 * 4; // 4 hours (longer for speed)

    private generateHash(query: string, workspaceId?: string): string {
        const key = `${query}_${workspaceId || 'global'}`;
        return crypto.createHash('sha256').update(key.toLowerCase().trim()).digest('hex');
    }

    get(query: string, workspaceId?: string): CacheEntry | null {
        const hash = this.generateHash(query, workspaceId);
        const entry = this.cache.get(hash);

        if (!entry) return null;

        // Check if expired
        const age = Date.now() - entry.timestamp;
        if (age > this.CACHE_TTL_MS) {
            this.cache.delete(hash);
            return null;
        }

        return entry;
    }

    set(query: string, answer: string, sources: any[], workspaceId?: string): void {
        const hash = this.generateHash(query, workspaceId);

        // Implement LRU eviction if cache is full
        if (this.cache.size >= this.MAX_CACHE_SIZE) {
            const oldestKey = this.findOldestEntry();
            if (oldestKey) {
                this.cache.delete(oldestKey);
            }
        }

        this.cache.set(hash, {
            answer,
            sources,
            timestamp: Date.now(),
            queryHash: hash,
            workspaceId,
        });
    }

    private findOldestEntry(): string | null {
        let oldestKey: string | null = null;
        let oldestTime = Infinity;

        for (const [key, entry] of this.cache.entries()) {
            if (entry.timestamp < oldestTime) {
                oldestTime = entry.timestamp;
                oldestKey = key;
            }
        }

        return oldestKey;
    }

    invalidate(workspaceId?: string): void {
        if (!workspaceId) {
            this.cache.clear();
            return;
        }

        // Invalidate workspace-specific cache entries
        for (const [key, entry] of this.cache.entries()) {
            if (entry.workspaceId === workspaceId) {
                this.cache.delete(key);
            }
        }
    }

    getStats() {
        const now = Date.now();
        const entries = Array.from(this.cache.values());

        return {
            totalEntries: this.cache.size,
            maxSize: this.MAX_CACHE_SIZE,
            ttlMs: this.CACHE_TTL_MS,
            oldestEntryAge: entries.length > 0
                ? Math.max(...entries.map(e => now - e.timestamp))
                : 0,
            averageAge: entries.length > 0
                ? entries.reduce((sum, e) => sum + (now - e.timestamp), 0) / entries.length
                : 0,
        };
    }

    clear(): void {
        this.cache.clear();
    }
}

