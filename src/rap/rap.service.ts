import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { danhSachRapDto } from './dto/danhSachRap.dto';

@Injectable()
export class RapService {
  prisma = new PrismaClient();

  async LayThongTinHeThongRap(maHeThongRap: number) {
    try {
      if (!maHeThongRap) {
        return await this.prisma.heThongRap.findMany();
      }
      const heThongRap = await this.prisma.heThongRap.findFirst({
        where: { ma_he_thong_rap: parseInt(maHeThongRap.toString()) },
      });

      return heThongRap;
    } catch (error) {
      console.error('Error in LayDanhSachPhim:', error); // Add logging
      throw new HttpException(
        {
          status: error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.response.error || 'Something went wrong',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async LayThongTinCumRapTheoHeThong(query: { maHeThongRap: number }) {
    try {
      let { maHeThongRap } = query;

      if (!maHeThongRap) {
        throw new HttpException(
          'maHeThongRap không được để trống',
          HttpStatus.BAD_REQUEST,
        );
      }

      const data = await this.prisma.cumRap.findMany({
        where: { ma_he_thong_rap: { equals: Number(maHeThongRap) } },
        include: { RapPhim: { select: { ma_rap: true, ten_rap: true } } },
      });

      data.forEach((item) => {
        delete item.ma_he_thong_rap;
      });
      return data;
    } catch (error) {
      console.error('Error in LayThongTinCumRapTheoHeThong:', error);
      throw new HttpException(
        {
          status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.response?.error || 'Something went wrong',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async LayThongTinLichChieuHeThongRap(query: { maHeThongRap: number }) {
    try {
      const { maHeThongRap } = query;

      // Truy vấn hệ thống rạp bao gồm các cụm rạp và rạp phim
      const heThongRap = await this.prisma.heThongRap.findMany({
        where: {
          ma_he_thong_rap: Number(maHeThongRap),
        },
        include: {
          CumRap: {
            select: {
              ma_cum_rap: true,
              ten_cum_rap: true,
              dia_chi: true,
              RapPhim: {
                select: {
                  ma_rap: true,
                  ten_rap: true,
                },
              },
            },
          },
        },
      });

      // Truy vấn tất cả lịch chiếu
      const lichChieuArr = await this.prisma.lichChieu.findMany();

      const danhSachPhim = await this.prisma.phim.findMany({
        select: {
          ma_phim: true,
          ten_phim: true,
        },
      });
      // Xử lý và cấu trúc lại dữ liệu
      const results = heThongRap.map((htRap) => ({
        ma_he_thong_rap: htRap.ma_he_thong_rap,
        ten_he_thong_rap: htRap.ten_he_thong_rap,
        logo: htRap.logo,
        lstCumRap: htRap.CumRap.map((cumRap) => ({
          ma_cum_rap: cumRap.ma_cum_rap,
          ten_cum_rap: cumRap.ten_cum_rap,
          dia_chi: cumRap.dia_chi,
          LichChieuPhim: cumRap.RapPhim.map((rapPhim) => {
            const lichChieuTheoRap = lichChieuArr.filter(
              (lichChieu) => lichChieu.ma_rap === rapPhim.ma_rap,
            );

            // Kết hợp thông tin tên phim vào lịch chiếu
            const lichChieuPhim = lichChieuTheoRap.map((lichChieu) => {
              const phim = danhSachPhim.find(
                (p) => p.ma_phim === lichChieu.ma_phim,
              );
              return {
                ngay_gio_chieu: lichChieu.ngay_gio_chieu,
                ten_phim: phim?.ten_phim || 'Tên phim không có sẵn', // Thêm tên phim nếu có
              };
            });

            return {
              ten_rap: rapPhim.ten_rap,
              lichChieu: lichChieuPhim,
            };
          }),
        })),
      }));

      return results;
    } catch (error) {
      console.error('Error in LayThongTinLichChieuHeThongRap:', error);
      throw new HttpException(
        {
          status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.response?.error || 'Something went wrong',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // async LayThongTinLichChieuPhim(query: { maPhim: string }) {
  //   try {
  //     let { maPhim } = query;
  //     if (!maPhim)
  //       throw new HttpException(
  //         'maPhim không được để trống',
  //         HttpStatus.BAD_REQUEST,
  //       );

  //     const cumRapChieu = await this.prisma.heThongRap.findMany({
  //       include: {
  //         CumRap: {
  //           include: {
  //             RapPhim: {
  //               select: {
  //                 ten_rap: true,
  //                 ma_rap: true,
  //                 LichChieu: {
  //                   select: {
  //                     ma_lich_chieu: true,
  //                     ngay_gio_chieu: true,
  //                     gia_ve: true,
  //                   },
  //                   where: { ma_phim: Number(maPhim) },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     });
  //     return cumRapChieu;
  //   } catch (error) {
  //     console.error('Error in LayThongTinLichChieuHeThongRap:', error);
  //     throw new HttpException(
  //       {
  //         status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
  //         error: error.response?.error || 'Something went wrong',
  //       },
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }
  async LayThongTinLichChieuPhim(query: { maPhim:Number }) {
    try {
      let { maPhim } = query

      if (!maPhim) {
        throw new HttpException(
          'maPhim không được để trống',
          HttpStatus.BAD_REQUEST,
        );
      }
      const cumRapChieu = await this.prisma.heThongRap.findMany({
        include: {
          CumRap: {
            include: {
              RapPhim: {
                select: {
                  ten_rap: true,
                  ma_rap: true,
                  LichChieu: {
                    where: { ma_phim: Number(maPhim) },
                    select: {
                      ma_lich_chieu: true,
                      ngay_gio_chieu: true,
                      gia_ve: true
                    },
                  }
                }
              }
            }
          }
        }
      })

     
      return cumRapChieu;
    } catch (error) {
      console.error('Error in LayThongTinLichChieuPhim:', error);
      throw new HttpException(
        {
          status: error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.response?.error || 'Something went wrong',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
}
