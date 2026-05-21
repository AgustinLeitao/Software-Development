const Sets = (redis) => {
    redis.sadd('tags', 'angular', 'c');       
    redis.sadd('tags:react', 'redux', 'react native', 'react router');       
    redis.sismember('tags', 'c');      
    
    redis.smembers('tags:react', (err, result) => {
        console.log(result);
    });
    redis.smembers('tags', (err, result) => {
        console.log(result);
    })
};

export { Sets };