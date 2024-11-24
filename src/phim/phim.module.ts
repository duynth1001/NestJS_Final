import { Module } from '@nestjs/common';
import { PhimService } from './phim.service';
import { PhimController } from './phim.controller';
import { KeyModule } from 'src/key/key.module';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    JwtModule.register({}),
    KeyModule,
    MulterModule.register({
      dest: './uploads', 
      limits: {
        fileSize: 1 * 1024 * 1024, 
      },
    }),
  ],
  controllers: [PhimController],
  providers: [PhimService],
})
export class PhimModule {}
