import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, Partitioners } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer?: Producer;

  constructor() {
    const brokers = (process.env.KAFKA_BROKERS || 'localhost:9092')
      .split(',')
      .map((b) => b.trim())
      .filter(Boolean);

    const clientId = process.env.KAFKA_CLIENT_ID || 'nest-orders';

    this.kafka = new Kafka({ clientId, brokers });
  }

  async onModuleInit() {
    this.producer = this.kafka.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
    });
    await this.producer.connect();
  }

  async onModuleDestroy() {
    if (this.producer) {
      await this.producer.disconnect();
    }
  }

  getProducer(): Producer {
    if (!this.producer) {
      // creación perezosa para contextos de prueba
      this.producer = this.kafka.producer();
    }
    return this.producer;
  }
}
