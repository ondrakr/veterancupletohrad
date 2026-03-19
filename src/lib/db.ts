import mysql from 'mysql2/promise';
import { config } from './config';

// Singleton pool – v Next.js dev režimu zabraňuje vytváření více poolů při hot reload
const globalForDb = globalThis as unknown as { pool: mysql.Pool | undefined };

const pool =
  globalForDb.pool ??
  mysql.createPool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
    charset: 'utf8mb4',
    waitForConnections: true,
    connectionLimit: 3, // MAMP má omezený počet připojení
    queueLimit: 0,
  });

if (process.env.NODE_ENV !== 'production') globalForDb.pool = pool;

export default pool;
