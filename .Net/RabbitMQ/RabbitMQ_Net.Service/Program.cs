using RabbitMQ.Client;
using System;
using System.Text;

namespace RabbitMQ.Publisher
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                var factory = new ConnectionFactory() { HostName = "localhost", Port = 5672 };
                using (var connection = factory.CreateConnection())
                {
                    using (var channel = connection.CreateModel())
                    {
                        char pressedKey;
                      
                        channel.QueueDeclare("testQueue", false, false, false, null);

                        Console.WriteLine(" Press f to exit. Other key to send a message");

                        do
                        {
                            channel.BasicPublish(string.Empty, "testQueue", null, Encoding.UTF8.GetBytes("testMessage"));
                            pressedKey = Console.ReadKey(true).KeyChar;
                        } while (pressedKey != 'f');
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }        
        }
    }
}