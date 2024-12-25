import redis from 'redis';

const redisClient = redis.createClient({
    socket: {
        host: '127.0.0.1',
        port: 6379,
    },
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

export function connect() {
    return redisClient.connect();
}

export { redisClient };