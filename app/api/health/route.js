/**
 * Health Check API
 * 
 * Used by monitoring services and load balancers to check app status.
 * Returns 200 if healthy, 503 if database is down.
 */

import clientPromise from '@/lib/mongodb';
import { getEnvInfo } from '@/lib/env';

export const dynamic = 'force-dynamic'; // Don't cache health checks

export async function GET() {
  const startTime = Date.now();
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    env: getEnvInfo().nodeEnv,
    checks: {},
  };

  // Check database connection
  try {
    const client = await clientPromise;
    const db = client.db('taptree');
    
    // Simple ping to verify connection
    await db.command({ ping: 1 });
    
    health.checks.database = {
      status: 'healthy',
      latencyMs: Date.now() - startTime,
    };
  } catch (error) {
    health.status = 'unhealthy';
    health.checks.database = {
      status: 'unhealthy',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Connection failed',
    };
  }

  // Calculate total response time
  health.responseTimeMs = Date.now() - startTime;

  const statusCode = health.status === 'healthy' ? 200 : 503;

  return Response.json(health, { 
    status: statusCode,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}
