const Lists = (redis) => {
    redis.rpush('planets', 'pluton', 'earth', 'mars');    
    redis.rpush('planets', 'jupiter');
    redis.lpush('planets', 'saturn');
    redis.rpop('planets');
    redis.lrange('planets', 0, -1, (err, result) => {
        console.log(result);
    })
};

export { Lists };