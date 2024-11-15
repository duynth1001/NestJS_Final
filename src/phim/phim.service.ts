import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { danhSachBannerDto } from './dto/danhSachBanner.dto';
import { plainToClass } from 'class-transformer';
import { danhSachPhimDto } from './dto/danhSachPhim.dto';
import { UpdatePhimDto } from './dto/phimUpdate.dto';
import { UploadDTO } from './dto/upload.dto';
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

  async XoaPhim(maPhim?: number) {
    try {
      let record = await this.prisma.phim.findFirst({
        where: {
          ma_phim: Number(maPhim),
        },
      });
      if (!record) {
        throw new HttpException(
          `Khong tim thay phim voi ma phim ${maPhim}}`,
          HttpStatus.FORBIDDEN,
        );
      }
      const deleteNguoiDung = await this.prisma.phim.delete({
        where: {
          ma_phim: Number(maPhim),
        },
      });
      return plainToClass(danhSachPhimDto, deleteNguoiDung);
    } catch (error) {
      console.error('Error in XoaPhim:', error); // Add logging
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        {
          status: error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
          error: error.response.error || 'Something went wrong',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePhim(body: UpdatePhimDto, hinhAnh: any) {
    try {
      const {
        ma_phim,
        ten_phim,
        trailer,
        mo_ta,
        ngay_khoi_chieu,
        danh_gia,
        hot,
        dang_chieu,
        sap_chieu,
      } = body;
  
      // Kiểm tra mã phim có hợp lệ không
      if (!ma_phim) {
        throw new HttpException('Mã phim không được để trống', HttpStatus.BAD_REQUEST);
      }
  
      // Kiểm tra phim có tồn tại không
      const detailMovie = await this.prisma.phim.findUnique({
        where: { ma_phim: Number(ma_phim) },
      });
  
      if (!detailMovie) {
        throw new HttpException('Phim không tồn tại', HttpStatus.NOT_FOUND);
      }
  
      // Chuẩn bị dữ liệu cập nhật
      const updateInfo: any = {
        ten_phim: ten_phim || detailMovie.ten_phim,
        trailer: trailer || detailMovie.trailer,
        mo_ta: mo_ta || detailMovie.mo_ta,
        ngay_khoi_chieu: ngay_khoi_chieu ? new Date(ngay_khoi_chieu) : detailMovie.ngay_khoi_chieu,
        danh_gia: danh_gia ? Number(danh_gia) : detailMovie.danh_gia,
        hot: hot ? hot.toString() === 'true' : detailMovie.hot,
        dang_chieu: dang_chieu ? dang_chieu.toString() === 'true' : detailMovie.dang_chieu,
        sap_chieu: sap_chieu ? sap_chieu.toString() === 'true' : detailMovie.sap_chieu,
        hinh_anh: hinhAnh?.originalname || detailMovie.hinh_anh,
      };
  
      // Cập nhật phim
      const updatedMovie = await this.prisma.phim.update({
        where: { ma_phim: Number(ma_phim) },
        data: updateInfo,
      });
  
      return {
        status: HttpStatus.OK,
        message: 'Cập nhật thành công',
        data: updatedMovie,
      };
    } catch (exception) {
      console.error('Error in updatePhim:', exception);
  
      // Xử lý lỗi trả về
      if (exception instanceof HttpException) {
        throw exception;
      }
  
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Đã xảy ra lỗi trong quá trình cập nhật phim',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  

}
