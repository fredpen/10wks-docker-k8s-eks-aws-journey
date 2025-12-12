import { createClient } from 'redis';

const redisClient = async () => {
  const { REDIS_PORT } = process.env;
  const url = `redis://my-redis:${REDIS_PORT}`;
  return await createClient({ url, database: 0 })
    .on('error', (err) => console.log('Redis Client Error', err))
    .connect();
};


export const setCache = async (key, value) => {
  const client = await redisClient();
  return client.set(key, value, { EX: 6000 });
};

export const getCache = async (key) => {
  const client = await redisClient();
  return client.get(key);
};