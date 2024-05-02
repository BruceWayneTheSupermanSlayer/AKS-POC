import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RabbitMqService {
  private readonly logger = new Logger(RabbitMqService.name);
  constructor(@Inject('QUEUE_SERVICE') private readonly client: ClientProxy) {}

  async sendMessage(eventName: any, payload: Record<string, any>) {
    try {
      const result = await lastValueFrom(this.client.emit(eventName, payload));
      this.logger.log(`Message sent to RabbitMQ: ${JSON.stringify(result)}`);
    } catch (error) {
      this.logger.error(
        `Error sending message to RabbitMQ: ${JSON.stringify(error)}`,
      );
    }
  }
}
