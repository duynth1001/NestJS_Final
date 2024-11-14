import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthDto{

    @IsNotEmpty({message:'Ho ten khong duoc de trong'})
    @ApiProperty()
    ho_ten:string;

    @IsNotEmpty({message:"Email khong duoc de trong"})
    @IsEmail({},{message:"Vui long nhap dung dinh dang email"})
    @ApiProperty()
    email:string;

    @IsNotEmpty({message:"So dien thoai khong duoc de trong"})
    @ApiProperty()
    so_dt:string;

    @IsNotEmpty({message:"Mat khau khong duoc de trong"})
    @ApiProperty()
    mat_khau:string;

    @IsNotEmpty({message:"Loai nguoi dung khong duoc de trong"})
    @ApiProperty()
    loai_nguoi_dung:string;
}