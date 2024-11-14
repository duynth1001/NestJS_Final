import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { NguoiDungService } from "./NguoiDung.service";
import { danhSachLoaiNguoiDungDto  } from "./dto/danhSachLoaiNguoiDung.dto";
import { Response } from "express";
import { DanhSachNguoiDungDto } from "./dto/danhSachNguoiDung.dto";
import { ThemNguoiDungDto } from "./dto/ThemNguoiDung.dto";
import { CapNhatNguoiDungDto } from "./dto/capNhatNguoiDung.dto";
import { AuthGuard } from "src/Auth/auth.guard";

@ApiTags("QuanLyNguoiDung")
@ApiBearerAuth('JWT-auth')
@Controller("QuanLyNguoiDung")
export class NguoiDungController{
    constructor(
        private readonly nguoiDungService:NguoiDungService
    ){}
    
    //api lay danh sach loai nguoi dung
    @Get("/LayDanhSachLoaiNguoiDung")
    async LayDanhSachLoaiNguoiDung(
        @Res()res:Response
    ):Promise<Response<danhSachLoaiNguoiDungDto[]>>{
        let danhSachLoaiNguoiDung = await this.nguoiDungService.LayDanhSachLoaiNguoiDung();
        return res.status(HttpStatus.OK).json(danhSachLoaiNguoiDung)
    }

    //api lay danh sach nguoi dung
    @Get("/LayDanhSachNguoiDung")
    async LayDanhSachNguoidung(
        @Res()res:Response
    ):Promise<Response<DanhSachNguoiDungDto[]>>{
        let danhSachNguoiDung = await this.nguoiDungService.LayDanhSachNguoiDung();
        return res.status(HttpStatus.OK).json(danhSachNguoiDung);
    }

    //api lay danh sach nguoi dung phan trang
    @Get("/LayDanhSachNguoiDungPhanTrang")
    @ApiQuery({name:"page",required:true,type:Number})
    @ApiQuery({name:"size",required:true,type:Number})
    async LayDanhSachNguoiDungPhanTrang(
        @Query('page') page:number,
        @Query('size') size:number,
        @Res() res:Response
    ):Promise<Response<DanhSachNguoiDungDto[]>>{
        const formatPage = page? Number(page):1;
        const formatSize = page? Number(size):8;
        let danhSachNguoiDungPhanTrang = await this.nguoiDungService.LayDanhSachNguoiDungPhanTrang(formatPage,formatSize);
        return res.status(HttpStatus.OK).json(danhSachNguoiDungPhanTrang);
    }

    //api tim kiem nguoi dung
    @Get('/TimKiemNguoiDung')
    @ApiQuery({name:"email",required:true,type:String})
    async TimKiemNguoiDung(
        @Query('email')email:string,
        @Res() res:Response
    ):Promise<Response<DanhSachNguoiDungDto>>{
        const formatEmail = email? String(email) :"test@mail.com";
        let nguoidung= await this.nguoiDungService.TimKiemNguoiDung(formatEmail);
        return res.status(HttpStatus.OK).json(nguoidung)
    }

    //api tim kiem nguoi dung phan trang
    @Get('/TimKiemNguoiDungPhanTrang')
    @ApiQuery({name:"email",required:false,type:String})
    @ApiQuery({name:"page",required:false,type:Number})
    @ApiQuery({name:"size",required:false,type:Number})
    async TimKiemNguoiDungPhanTrang(
        @Query('email')email:string,
        @Query('page')page:number,
        @Query('size')size:number,
        @Res() res:Response
    ):Promise<Response<DanhSachNguoiDungDto>>
    {
        const formatPage = page? Number(page):1;
        const formatSize = page? Number(size):8;
        let nguoidung = await this.nguoiDungService.TimKiemNguoiDungPhanTrang(formatPage,formatSize,email);
        return res.status(HttpStatus.OK).json(nguoidung)
    }
    
    //api Thong tin tai khoan
    @UseGuards(AuthGuard)
    @Get('/ThongTinTaiKhoan')
    @ApiQuery({name:'token',required:true,type:String})
    async ThongTinTaiKhoan(
        @Query('token')token:string,
        @Res()res:Response
    ):Promise<Response<DanhSachNguoiDungDto>>{
        let record = await this.nguoiDungService.ThongTinTaiKhoan(token);
        return res.status(HttpStatus.OK).json(record)
    }

    //api Lay Thong Tin nguoi dung
    @UseGuards(AuthGuard)
    @Get('/LayThongTinNguoiDung')
    @ApiQuery({name:"tai_khoan",required:true,type:Number})
    async LayThongTinNguoiDung(
        @Query('tai_khoan')tai_khoan:number,
        @Res() res:Response
    ):Promise<Response<DanhSachNguoiDungDto>>{
        let record = await this.nguoiDungService.LayThongTinNguoiDung(tai_khoan);
        return res.status(HttpStatus.OK).json(record);
    }

    //api them nguoi dung
    @UseGuards(AuthGuard)
    @Post("/ThemNguoiDung")
    async ThemNguoiDung(
        @Body()themNguoiDungDto:ThemNguoiDungDto,
        @Res() res:Response
    ):Promise<Response<DanhSachNguoiDungDto>>
    {
        let nguoiDung = await this.nguoiDungService.ThemNguoiDung(themNguoiDungDto);
        return res.status(HttpStatus.CREATED).json(nguoiDung);
    }

    //api cap nhat thong tin nguoi dung
    @UseGuards(AuthGuard)
    @Put("/CapNhatThongTinNguoiDung")
    async CapNhatThongTinNguoiDung(
        @Body() capNhatNguoiDungDto:CapNhatNguoiDungDto,
        @Res() res:Response
    ):Promise<Response<DanhSachNguoiDungDto>>
    {
        let nguoiDung = await this.nguoiDungService.CapNhatThongTinNguoiDung(capNhatNguoiDungDto);
        return res.status(HttpStatus.ACCEPTED).json(nguoiDung);
    }
    
    //api cap nhat thong tin nguoi dung Post
    @UseGuards(AuthGuard)
    @Post("/CapNhatThongTinNguoiDung")
    async CapNhatThongTinNguoiDungPost(
        @Body() capNhatNguoiDungDto:CapNhatNguoiDungDto,
        @Res() res:Response
    ):Promise<Response<DanhSachNguoiDungDto>>
    {
        let nguoiDung = await this.nguoiDungService.CapNhatThongTinNguoiDungPost(capNhatNguoiDungDto);
        return res.status(HttpStatus.ACCEPTED).json(nguoiDung);
    }

    //api xoa nguoi dung
    @UseGuards(AuthGuard)
    @Delete("/XoaNguoiDung")
    async XoaNguoiDung(
        @Query('tai_khoan')tai_khoan:number,
        @Res() res:Response
    ):Promise<Response<DanhSachNguoiDungDto>>{
        let nguoiDung = await this.nguoiDungService.XoaNguoiDung(tai_khoan);
        return res.status(HttpStatus.ACCEPTED).json(nguoiDung)
    }
}