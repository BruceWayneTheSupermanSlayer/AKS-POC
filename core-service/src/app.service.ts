import { Body, Injectable, Logger } from '@nestjs/common';
import { RabbitMqService } from './rabbit-mq.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  constructor(private readonly rabbitMqService: RabbitMqService) {}

  async getHello(): Promise<string> {
    this.logger.log(`Posting message to queue`);
    const mqResponse = await this.rabbitMqService.sendMessage('notifications', {
      message: 'Hello World!',
    });
    this.logger.log('Mq Response ', mqResponse);
    return 'Message sent to queue';
  }

  async postMessageToQueue(@Body() body: Record<string, any>) {
    try {
      this.logger.log(`Posting message to queue`);
      const mqResponse = await this.rabbitMqService.sendMessage(
        'notifications',
        body,
      );
      this.logger.log('Mq Response ', mqResponse);
      return 'Message sent to queue';
    } catch (e) {
      this.logger.error(e);
    }
  }
}
