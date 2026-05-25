const SortedSets = (redis) => {
    redis.zadd('rockets', 1966, 'SpaceX1', 1980, 'SpaceX2', 2000, 'SpaceX3', 2016, 'SpaceX4');    
  
    redis.zrangebyscore('rockets', '-inf', 2000, 'withscores', (err, result) => {
        console.log(result);
    })
};

export { SortedSets };