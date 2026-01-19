/**
 * Environment Variable Validation
 * 
 * This module validates all required environment variables at startup.
 * If any required variable is missing, the app will fail fast with a clear error.
 */

const requiredEnvVars = [
  'MONGODB_URI',
  'AUTH_SECRET',
];

const optionalEnvVars = [
  'AUTH_URL',           // Set automatically by Vercel
  'NODE_ENV',           // development | production
  'VERCEL_URL',         // Auto-set by Vercel
];

/**
 * Validates that all required environment variables are set
 * Call this at app startup to fail fast if config is missing
 */
export function validateEnv() {
  const missing = [];
  const warnings = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  // Validate MONGODB_URI format
  if (process.env.MONGODB_URI && !process.env.MONGODB_URI.startsWith('mongodb')) {
    warnings.push('MONGODB_URI should start with mongodb:// or mongodb+srv://');
  }

  // Validate AUTH_SECRET length
  if (process.env.AUTH_SECRET && process.env.AUTH_SECRET.length < 32) {
    warnings.push('AUTH_SECRET should be at least 32 characters for security');
  }

  if (missing.length > 0) {
    throw new Error(
      `❌ Missing required environment variables:\n${missing.map(v => `   - ${v}`).join('\n')}\n\n` +
      `Please add them to your .env.local file or Vercel environment settings.`
    );
  }

  if (warnings.length > 0 && process.env.NODE_ENV === 'development') {
    console.warn('⚠️ Environment warnings:\n' + warnings.map(w => `   - ${w}`).join('\n'));
  }

  return true;
}

/**
 * Get environment info for debugging (safe - no secrets exposed)
 */
export function getEnvInfo() {
  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    hasMongoUri: !!process.env.MONGODB_URI,
    hasAuthSecret: !!process.env.AUTH_SECRET,
    vercelUrl: process.env.VERCEL_URL || null,
    isProduction: process.env.NODE_ENV === 'production',
  };
}
