/**
 * Simple Production Logger
 * 
 * Provides structured logging with levels.
 * In production, only logs warn and error.
 * In development, logs everything.
 */

const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const isProduction = process.env.NODE_ENV === 'production';
const minLevel = isProduction ? LOG_LEVELS.warn : LOG_LEVELS.debug;

/**
 * Format log entry with timestamp and metadata
 */
function formatLog(level, message, meta = {}) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level,
    message,
    ...meta,
  };

  // In production, output JSON for log aggregation services
  if (isProduction) {
    return JSON.stringify(logEntry);
  }

  // In development, output readable format
  const levelColors = {
    debug: '\x1b[36m', // cyan
    info: '\x1b[32m',  // green
    warn: '\x1b[33m',  // yellow
    error: '\x1b[31m', // red
  };
  const reset = '\x1b[0m';
  const color = levelColors[level] || reset;

  const metaStr = Object.keys(meta).length > 0 
    ? ` ${JSON.stringify(meta)}` 
    : '';

  return `${color}[${level.toUpperCase()}]${reset} ${timestamp} - ${message}${metaStr}`;
}

/**
 * Log at specified level
 */
function log(level, message, meta = {}) {
  if (LOG_LEVELS[level] < minLevel) return;

  const formatted = formatLog(level, message, meta);

  switch (level) {
    case 'error':
      console.error(formatted);
      break;
    case 'warn':
      console.warn(formatted);
      break;
    default:
      console.log(formatted);
  }
}

export const logger = {
  debug: (message, meta) => log('debug', message, meta),
  info: (message, meta) => log('info', message, meta),
  warn: (message, meta) => log('warn', message, meta),
  error: (message, meta) => log('error', message, meta),

  /**
   * Log API request (useful for debugging)
   */
  apiRequest: (method, path, meta = {}) => {
    log('info', `${method} ${path}`, { type: 'api_request', ...meta });
  },

  /**
   * Log API error with stack trace
   */
  apiError: (method, path, error, meta = {}) => {
    log('error', `${method} ${path} failed`, {
      type: 'api_error',
      error: error.message,
      stack: isProduction ? undefined : error.stack,
      ...meta,
    });
  },

  /**
   * Log database operation
   */
  db: (operation, collection, meta = {}) => {
    log('debug', `DB ${operation} on ${collection}`, { type: 'db', ...meta });
  },

  /**
   * Log authentication event
   */
  auth: (event, meta = {}) => {
    log('info', `Auth: ${event}`, { type: 'auth', ...meta });
  },
};

export default logger;
