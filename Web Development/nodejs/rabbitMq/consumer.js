const ampq = require("amqplib");

connect();

async function connect() {
    try {
        const connection = await ampq.connect("amqp://localhost:5672");
        const channel = await connection.createChannel();
        const result = await channel.assertQueue("jobs"); // If queue doesn't exist it'll be created.

        // Apart from consuming the message it's important to let the server know this event. Otherwise, the consumer will keep consuming the same message.
        channel.consume("jobs", message => { 
            console.log(JSON.parse(message.content.toString())); 
            channel.ack(message);
        });

        console.log("Waiting for messages");
    }
    catch (ex) {
        console.error(ex);
    }
}