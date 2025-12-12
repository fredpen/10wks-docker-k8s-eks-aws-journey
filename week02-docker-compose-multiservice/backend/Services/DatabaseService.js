import { Pool } from 'pg';

export const pgPool = async () => {
  const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER } = process.env;
  return new Pool({
    host: POSTGRES_HOST,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    maxLifetimeSeconds: 60,
  });
};


