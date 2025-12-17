import { createClient } from 'redis';

const redisClient = async () => {
  const { REDIS_PORT, REDIS_HOST } = process.env;
  const url = `redis://${REDIS_HOST}:${REDIS_PORT}`;
  return await createClient({ url, database: 0 })
    .on('error', (err) => console.log('Redis Client Error', err))
    .connect();
};


export const setCache = async (key, value) => {
  const { REDIS_TTL } = process.env;
  const client = await redisClient();
  return client.set(key, value, { EX: REDIS_TTL });
};

export const getCache = async (key) => {
  const client = await redisClient();
  return client.get(key);
};