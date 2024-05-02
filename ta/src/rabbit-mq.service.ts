import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Injectable()
export class RabbitMqConsumerService {
  private readonly logger = new Logger(RabbitMqConsumerService.name);
  constructor() {}

  async onModuleInit() {
   // await this.startConsuming();
  }

  /* async startConsuming() {
    // Connect to RabbitMQ server
    await this.client.connect().catch((err) => {
      this.logger.error(`Error connecting to RabbitMQ server: ${JSON.stringify(err)}`);
    });
  } */
  @MessagePattern('notifications')
  async handleNotifications(data: unknown, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    console.log('Received notification:', data);
    channel.ack(originalMsg);
  }
}
