import { Injectable } from '@nestjs/common';

interface QueryMetrics {
    query: string;
    duration: number;
    documentCount: number;
    cacheHit: boolean;
    timestamp: Date;
}

@Injectable()
export class MetricsService {
    private queryMetrics: QueryMetrics[] = [];
    private readonly MAX_METRICS = 1000;

    logQuery(query: string, duration: number, documentCount: number, cacheHit: boolean) {
        this.queryMetrics.push({
            query,
            duration,
            documentCount,
            cacheHit,
            timestamp: new Date(),
        });

        // Keep only last MAX_METRICS entries
        if (this.queryMetrics.length > this.MAX_METRICS) {
            this.queryMetrics = this.queryMetrics.slice(-this.MAX_METRICS);
        }
    }

    getMetrics() {
        const totalQueries = this.queryMetrics.length;
        const cacheHits = this.queryMetrics.filter(m => m.cacheHit).length;
        const cacheMisses = totalQueries - cacheHits;
        const cacheHitRate = totalQueries > 0 ? (cacheHits / totalQueries) * 100 : 0;
        
        const totalDuration = this.queryMetrics.reduce((sum, m) => sum + m.duration, 0);
        const avgDuration = totalQueries > 0 ? totalDuration / totalQueries : 0;

        return {
            totalQueries,
            cacheHits,
            cacheMisses,
            cacheHitRate: parseFloat(cacheHitRate.toFixed(2)),
            avgDuration: parseFloat(avgDuration.toFixed(2)),
            recentQueries: this.queryMetrics.slice(-10).reverse(),
        };
    }

    getHealth() {
        const metrics = this.getMetrics();
        return {
            status: 'healthy',
            cacheHitRate: `${metrics.cacheHitRate}%`,
            avgResponseTime: `${metrics.avgDuration}ms`,
            totalQueries: metrics.totalQueries,
        };
    }
}

