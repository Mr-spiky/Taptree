/**
 * Database Index Management
 * 
 * Ensures proper indexes exist for optimal query performance.
 * Run this during deployment or app startup.
 */

import clientPromise from './mongodb';
import logger from './logger';

/**
 * Create all required database indexes
 * Safe to run multiple times - createIndex is idempotent
 */
export async function ensureIndexes() {
  try {
    const client = await clientPromise;
    const db = client.db('taptree');

    logger.info('Creating database indexes...');

    // Users collection indexes
    const usersCollection = db.collection('users');
    await usersCollection.createIndex(
      { email: 1 },
      { unique: true, name: 'email_unique' }
    );
    logger.db('createIndex', 'users', { index: 'email_unique' });

    // Links (Taptrees) collection indexes
    const linksCollection = db.collection('links');
    
    // Unique index on handle for fast lookups
    await linksCollection.createIndex(
      { handle: 1 },
      { unique: true, name: 'handle_unique' }
    );
    logger.db('createIndex', 'links', { index: 'handle_unique' });

    // Index on userId for finding user's taptrees
    await linksCollection.createIndex(
      { userId: 1 },
      { name: 'userId_lookup' }
    );
    logger.db('createIndex', 'links', { index: 'userId_lookup' });

    // Compound index for ownership checks (common query pattern)
    await linksCollection.createIndex(
      { handle: 1, userId: 1 },
      { name: 'handle_userId_compound' }
    );
    logger.db('createIndex', 'links', { index: 'handle_userId_compound' });

    logger.info('Database indexes created successfully');
    
    return { success: true };
  } catch (error) {
    logger.error('Failed to create database indexes', { error: error.message });
    throw error;
  }
}

/**
 * Get current index statistics
 */
export async function getIndexStats() {
  try {
    const client = await clientPromise;
    const db = client.db('taptree');

    const usersIndexes = await db.collection('users').indexes();
    const linksIndexes = await db.collection('links').indexes();

    return {
      users: usersIndexes.map(i => i.name),
      links: linksIndexes.map(i => i.name),
    };
  } catch (error) {
    logger.error('Failed to get index stats', { error: error.message });
    return null;
  }
}
