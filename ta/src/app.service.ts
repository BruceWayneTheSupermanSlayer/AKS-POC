import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: DataSource) {}
  getHello() {    
    return {
      time: new Date().toISOString(),
      message: 'Hello World!',
    };
  }
}
