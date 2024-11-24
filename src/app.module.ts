import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatVeModule } from './DatVe/DatVe.module';
import { LichChieuModule } from './LichChieu/LichChieu.module';
import { NguoiDungModule } from './NguoiDung/NguoiDung.module';
import { AuthModule } from './Auth/auth.module';
import { PhimModule } from './phim/phim.module';
import { RapModule } from './rap/rap.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),//load tất cả biến môi trường và sử dụng ở mọi nơi
    DatVeModule,
    LichChieuModule,
    NguoiDungModule,
    AuthModule,
    PhimModule,
    RapModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
