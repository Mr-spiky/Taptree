/**
 * Database Initialization Script
 * 
 * Run this script to set up database indexes.
 * Can be run manually or as part of deployment.
 * 
 * Usage: node scripts/init-db.mjs
 */

import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI environment variable is not set');
  console.log('Set it with: $env:MONGODB_URI="your-connection-string"');
  process.exit(1);
}

async function initDatabase() {
  console.log('🔄 Connecting to MongoDB...');
  
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('taptree');
    
    // Create users collection indexes
    console.log('\n📦 Creating users collection indexes...');
    const usersCollection = db.collection('users');
    
    await usersCollection.createIndex(
      { email: 1 },
      { unique: true, name: 'email_unique' }
    );
    console.log('   ✓ email_unique index created');
    
    // Create links collection indexes
    console.log('\n📦 Creating links collection indexes...');
    const linksCollection = db.collection('links');
    
    await linksCollection.createIndex(
      { handle: 1 },
      { unique: true, name: 'handle_unique' }
    );
    console.log('   ✓ handle_unique index created');
    
    await linksCollection.createIndex(
      { userId: 1 },
      { name: 'userId_lookup' }
    );
    console.log('   ✓ userId_lookup index created');
    
    await linksCollection.createIndex(
      { handle: 1, userId: 1 },
      { name: 'handle_userId_compound' }
    );
    console.log('   ✓ handle_userId_compound index created');
    
    // Print index summary
    console.log('\n📊 Index Summary:');
    
    const usersIndexes = await usersCollection.indexes();
    console.log('\n   users collection:');
    usersIndexes.forEach(idx => console.log(`      - ${idx.name}`));
    
    const linksIndexes = await linksCollection.indexes();
    console.log('\n   links collection:');
    linksIndexes.forEach(idx => console.log(`      - ${idx.name}`));
    
    console.log('\n✅ Database initialization complete!');
    
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n🔌 Connection closed');
  }
}

initDatabase();
