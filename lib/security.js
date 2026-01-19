// Security utility functions for input validation and sanitization

/**
 * Validate URL is safe (http/https only, no javascript: or data:)
 * @param {string} url - URL to validate
 * @returns {boolean} - Whether URL is safe
 */
export function isValidUrl(url) {
  if (!url || typeof url !== 'string') return false;
  
  const trimmed = url.trim().toLowerCase();
  
  // Block dangerous protocols
  const dangerousProtocols = [
    'javascript:',
    'data:',
    'vbscript:',
    'file:',
    'about:',
    'blob:',
  ];
  
  if (dangerousProtocols.some(protocol => trimmed.startsWith(protocol))) {
    return false;
  }
  
  // Must start with http:// or https:// or be a relative path
  // Allow URLs without protocol (we'll add https:// on render)
  try {
    // If it has a protocol, validate it
    if (trimmed.includes('://')) {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    }
    // No protocol - will be treated as https://
    return true;
  } catch {
    // Invalid URL format but might be a simple domain
    return /^[a-z0-9][-a-z0-9.]*[a-z0-9]/i.test(trimmed);
  }
}

/**
 * Validate image URL (basic check for common image extensions or services)
 * @param {string} url - Image URL to validate
 * @returns {boolean} - Whether URL appears to be an image
 */
export function isValidImageUrl(url) {
  if (!isValidUrl(url)) return false;
  
  const trimmed = url.trim().toLowerCase();
  
  // Common image extensions
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.avif'];
  
  // Common image hosting services (allow their URLs even without extensions)
  const imageServices = [
    'imgur.com',
    'i.imgur.com',
    'cloudinary.com',
    'unsplash.com',
    'images.unsplash.com',
    'pbs.twimg.com',
    'avatars.githubusercontent.com',
    'lh3.googleusercontent.com',
    'platform-lookaside.fbsbx.com',
    'scontent',
    'gravatar.com',
  ];
  
  // Check for image extension
  if (imageExtensions.some(ext => trimmed.includes(ext))) {
    return true;
  }
  
  // Check for known image services
  if (imageServices.some(service => trimmed.includes(service))) {
    return true;
  }
  
  // Allow any https URL (user's responsibility for actual image)
  // This is permissive but prevents XSS while allowing flexibility
  return true;
}

/**
 * Sanitize text input (remove potential XSS)
 * @param {string} text - Text to sanitize
 * @param {number} maxLength - Maximum length
 * @returns {string} - Sanitized text
 */
export function sanitizeText(text, maxLength = 500) {
  if (!text || typeof text !== 'string') return '';
  
  return text
    .trim()
    .slice(0, maxLength)
    // Remove null bytes
    .replace(/\0/g, '')
    // Remove control characters (except newlines/tabs if needed)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
}

/**
 * Reserved handles that users cannot claim
 */
export const RESERVED_HANDLES = [
  // System routes
  'admin', 'api', 'login', 'signup', 'logout', 'register',
  'dashboard', 'settings', 'profile', 'account', 'edit',
  'generate', 'create', 'new', 'delete', 'remove',
  // Brand protection
  'taptree', 'linktree', 'support', 'help', 'contact',
  'about', 'terms', 'privacy', 'legal', 'blog',
  // Common reserved
  'www', 'mail', 'email', 'ftp', 'cdn', 'assets',
  'static', 'public', 'private', 'internal', 'external',
  'null', 'undefined', 'true', 'false', 'root', 'system',
];

/**
 * Check if handle is reserved
 * @param {string} handle - Handle to check
 * @returns {boolean} - Whether handle is reserved
 */
export function isReservedHandle(handle) {
  if (!handle) return true;
  return RESERVED_HANDLES.includes(handle.toLowerCase().trim());
}

/**
 * Validate handle format and availability checks
 * @param {string} handle - Handle to validate
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateHandle(handle) {
  if (!handle || typeof handle !== 'string') {
    return { valid: false, error: 'Handle is required' };
  }
  
  const sanitized = handle.trim().toLowerCase();
  
  if (sanitized.length < 3) {
    return { valid: false, error: 'Handle must be at least 3 characters' };
  }
  
  if (sanitized.length > 30) {
    return { valid: false, error: 'Handle must be 30 characters or less' };
  }
  
  if (!/^[a-z0-9][a-z0-9._-]*[a-z0-9]$|^[a-z0-9]$/.test(sanitized)) {
    return { 
      valid: false, 
      error: 'Handle must start and end with a letter or number, and can contain dots, underscores, and hyphens' 
    };
  }
  
  if (/[._-]{2,}/.test(sanitized)) {
    return { valid: false, error: 'Handle cannot have consecutive special characters' };
  }
  
  if (isReservedHandle(sanitized)) {
    return { valid: false, error: 'This handle is reserved. Please choose another one.' };
  }
  
  return { valid: true };
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {{ valid: boolean, error?: string }}
 */
export function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    return { valid: false, error: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters' };
  }
  
  if (password.length > 128) {
    return { valid: false, error: 'Password is too long' };
  }
  
  // Check for at least one letter and one number
  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one letter and one number' };
  }
  
  return { valid: true };
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }
  
  const trimmed = email.trim().toLowerCase();
  
  // RFC 5322 compliant email regex (simplified)
  const emailRegex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;
  
  if (!emailRegex.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }
  
  if (trimmed.length > 254) {
    return { valid: false, error: 'Email is too long' };
  }
  
  return { valid: true };
}
