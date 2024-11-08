import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatVeModule } from './DatVe/DatVe.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),//load tất cả biến môi trường và sử dụng ở mọi nơi
    DatVeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
