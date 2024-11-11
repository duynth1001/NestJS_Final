import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { NguoiDungService } from "./NguoiDung.service";
import { danhSachLoaiNguoiDungDto } from "./dto/danhSachLoaiNguoiDung.dto";
import { Response } from "express";

@ApiTags("QuanLyNguoiDung")
@Controller("QuanLyNguoiDung")
export class NguoiDungController{
    constructor(
        private readonly nguoiDungService:NguoiDungService
    ){}
    @Get("/LayDanhSachLoaiNguoiDung")
    async LayDanhSachLoaiNguoiDung(
        @Res()res:Response
    ):Promise<Response<danhSachLoaiNguoiDungDto[]>>{
        let danhSachLoaiNguoiDung = await this.nguoiDungService.LayDanhSachLoaiNguoiDung();
        return res.status(HttpStatus.OK).json(danhSachLoaiNguoiDung)
    }
}