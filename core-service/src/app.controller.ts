import { Body, Controller, Get, Inject, Logger, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    @Inject('QUEUE_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }

  @Post('send-message')
  async postMessageToQueue(@Body() body: Record<string, any>) {
    return await this.appService.postMessageToQueue(body);
  }
}
