import { Body, Controller, Get, Post } from '@nestjs/common';
import { KafkaProducerService } from '../../kafka/kafka-producer.service';
import { CreateOrderDto } from '../dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly kafkaService: KafkaProducerService) {}

  @Post()
  async createOrder(@Body() order: CreateOrderDto) {
    await this.kafkaService.emit('orders.created', order.orderId, order);

    return {
      message: 'Order sent to Kafka',
      order,
    };
  }

  @Get()
  async getOrders() {
    return { message: 'Orders endpoint OK' };
  }
}
