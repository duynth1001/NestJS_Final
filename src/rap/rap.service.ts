import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { danhSachRapDto } from './dto/danhSachRap.dto';

@Injectable()
export class RapService {
  prisma = new PrismaClient();

  async LayThongTinHeThongRap(maHeThongRap:number) {
    try {
      const filter: any = {};
      if (maHeThongRap) {
        filter.ma_rap = {
          equals: parseInt(maHeThongRap.toString()),
        };
      } else {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Phim không tồn tại',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const phimDetail = await this.prisma.rapPhim.findFirst({ where: filter });
      if (!phimDetail) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Phim không tồn tại',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return phimDetail;
    } catch (error) {
      console.error('Error in LayDanhSachPhim:',  error); // Add logging
      throw new HttpException(
        {
          status:error.response.status ||HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.response.error||'Something went wrong',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
