import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";
import { Response } from "express";

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
}