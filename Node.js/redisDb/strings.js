const Strings = (redis) => {
    redis.set('name', 'agustin', 'EX', 5);
    redis.get('name', (err, result) => {
    console.log(result);
});

    redis.incrby('address', 300);
    redis.get('address', (err, result) => {
        console.log(result);
    })

    redis.mset('street', 'Gaona', 'city', 'Buenos Aires');
    redis.mget('street', 'city', (err, result) => {
        console.log(result);
    })
}

export { Strings };