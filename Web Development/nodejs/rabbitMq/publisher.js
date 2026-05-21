const ampq = require("amqplib");

const message = {
    number: 10
}

connect();

async function connect() {
    try {
        const connection = await ampq.connect("amqp://localhost:5672"); // There's a RabbitMQ server running in docker.
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs"); // If queue doesn't exist it'll be created.

        channel.sendToQueue("jobs", Buffer.from(JSON.stringify(message)));
        console.log(`Job sent sucessfully ${message.number}`);
    }
    catch (ex) {
        console.error(ex);
    }
}