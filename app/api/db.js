import Database from 'better-sqlite3';

const db = new Database('./trips.sqlite', { verbose: console.log });

db.exec(`
  CREATE TABLE IF NOT EXISTS trips (
    id TEXT PRIMARY KEY,
    name TEXT,
    days TEXT,
    userId TEXT NOT NULL
  )
`);

export default db;