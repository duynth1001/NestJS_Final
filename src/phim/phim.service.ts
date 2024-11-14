import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { responseData } from 'src/config/response';
import { danhSachBannerDto } from './dto/danhSachBanner.dto';
import { plainToClass } from 'class-transformer';
import { danhSachPhimDto } from './dto/danhSachPhim.dto';
@Injectable()
export class PhimService {
  prisma = new PrismaClient();
  async LayDanhSachBanner() {
    try {
      let listBanner = await this.prisma.banner.findMany();
      return listBanner.map((record) =>
        plainToClass(danhSachBannerDto, record),
      );
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Something went wrong',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async LayDanhSachPhim(tenPhim?: string) {
    try {
      const filter: any = {};
      if (tenPhim) {
        filter.ten_phim = {
          contains: tenPhim,
        };
      }
      let listBanner = await this.prisma.phim.findMany({ where: filter });
      return listBanner.map((record) => plainToClass(danhSachPhimDto, record));
    } catch (error) {
      console.error('Error in LayDanhSachPhim:', error); // Add logging
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Something went wrong',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async LayDanhSachPhimPhanTrang(
    tenPhim?: string,
    soTrang?: number,
    soPhanTuTrenTrang?: number,
  ) {
    try {
      const filter: any = {};
      if (tenPhim) {
        filter.ten_phim = {
          contains: tenPhim,
        };
      }
      const phimList = await this.prisma.phim.findMany({
        where: filter,
        skip: (soTrang - 1) * soPhanTuTrenTrang,
        take: Number(soPhanTuTrenTrang),
      });
      // let listBanner = await this.prisma.phim.findMany({ where: filter });
      return phimList.map((record) => plainToClass(danhSachPhimDto, record));
    } catch (error) {
      console.error('Error in LayDanhSachPhim:', error); // Add logging
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Something went wrong',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async LayDanhSachPhimTheoNgay(
    tenPhim?: string,
    soTrang?: number,
    soPhanTuTrenTrang?: number,
    tuNgay?: string,
    denNgay?: string,
  ) {
    try {
      const filter: any = {};
      if (tenPhim) {
        filter.ten_phim = {
          contains: tenPhim,
        };
      }
      if (tuNgay && denNgay) {
        filter.ngay_khoi_chieu = {
          gte: new Date(tuNgay),
          lte: new Date(denNgay),
        };
      }
      const phimList = await this.prisma.phim.findMany({
        where: filter,
        skip: (soTrang - 1) * soPhanTuTrenTrang,
        take: Number(soPhanTuTrenTrang),
      });
      // let listBanner = await this.prisma.phim.findMany({ where: filter });
      return phimList.map((record) => plainToClass(danhSachPhimDto, record));
    } catch (error) {
      console.error('Error in LayDanhSachPhim:', error); // Add logging
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Something went wrong',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async LayThongTinPhim(maPhim?: number) {
    try {
      const filter: any = {};
      if (maPhim) {
        filter.ma_phim = {
          equals: parseInt(maPhim.toString()),
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
      const phimDetail = await this.prisma.phim.findFirst({ where: filter });
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
  // update(id: number, updatePhimDto: UpdatePhimDto) {
  //   return `This action updates a #${id} phim`;
  // }

  remove(id: number) {
    return `This action removes a #${id} phim`;
  }
}
