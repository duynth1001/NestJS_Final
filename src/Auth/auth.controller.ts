import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { Response } from "express";
import { SignInDto } from "./dto/singin.dto";

@ApiTags("QuanLyNguoiDung")
@Controller("QuanLyNguoiDung")
export class AuthController{
    constructor(
        private readonly authService:AuthService
    ){}
    //api dang ky

    @Post("/DangKy")
    async DangKy(
        @Body() authDto:AuthDto,
        @Res() res:Response<AuthDto>
    ):Promise<Response<AuthDto>>{
        let newUser = await this.authService.DangKy(authDto);
        return res.status(HttpStatus.CREATED).json(newUser);
    }

    //api Dang nhap
    @Post("/DangNhap")
    async DangNhap(
        @Body() body:SignInDto,
        @Res() res:Response
    ):Promise<Response<string>>{
        try {
            const result = await this.authService.DangNhap(body);
            return res.status(HttpStatus.OK).json(result);
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:error.message});            
        }
    }
}