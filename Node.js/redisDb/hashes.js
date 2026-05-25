const Hashes = (redis) => {
    redis.hmset('users', 'firstName', 'John', 'lastName', 'Barker', 'age', 30);
    redis.hincrby('users', 'age', 20);
    redis.hgetall('users', (err, result) => {
        console.log(result);
    });
};

export { Hashes };