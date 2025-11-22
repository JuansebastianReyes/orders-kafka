import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';

@Injectable()
export class ConsumerService implements OnModuleInit {
  private consumer: Consumer;

  constructor() {
    const brokers = (process.env.KAFKA_BROKERS || 'localhost:9092')
      .split(',')
      .map((b) => b.trim())
      .filter(Boolean);

    const clientId = process.env.KAFKA_CONSUMER_CLIENT_ID || 'orders-consumer';
    const groupId = process.env.KAFKA_CONSUMER_GROUP || 'orders-consumer-group';

    const kafka = new Kafka({ clientId, brokers });
    this.consumer = kafka.consumer({ groupId });
  }

  async onModuleInit() {
    await this.consumer.connect();

    const topics = [
      process.env.KAFKA_TOPIC_ORDERS_PROCESSED || 'orders.processed',
      process.env.KAFKA_TOPIC_ORDERS_FAILED || 'orders.failed',
    ];

    for (const topic of topics) {
      await this.consumer.subscribe({ topic, fromBeginning: true });
    }

    await this.consumer.run({
      eachMessage: async ({ topic, message }) => {
        // Manejo básico de mensajes; reemplazar por lógica de negocio
        const payload = message.value?.toString();
        console.log(`📥 Message on ${topic}: ${payload}`);
      },
    });
  }
}
