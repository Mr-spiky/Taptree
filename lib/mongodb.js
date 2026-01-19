// lib/mongodb.js

import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

// Connection options optimized for serverless
const options = {
  maxPoolSize: 10,           // Max connections in pool
  minPoolSize: 1,            // Min connections to maintain
  maxIdleTimeMS: 60000,      // Close idle connections after 60s
  connectTimeoutMS: 10000,   // Connection timeout
  socketTimeoutMS: 45000,    // Socket timeout
}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error(
    '❌ MONGODB_URI is not defined.\n' +
    'Please add it to your .env.local file:\n' +
    'MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/database'
  )
}

if (process.env.NODE_ENV === 'development') { 
  // In development, use global to preserve connection across HMR
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production, create a new client for each instance
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise