import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, Matches } from "class-validator";
import { LoaiNguoiDungEnum } from "../enum/loainguoidung.enum";

export class ThemNguoiDungDto{
    @IsNotEmpty({message:"Ho ten khong duoc de trong"})
    @ApiProperty()
    ho_ten:string;
 
    @IsNotEmpty({message:"Email khong duoc de trong"})
    @IsEmail({},{message:"Vui long nhap dung dinh dang email"})
    @ApiProperty()
    email:string;

    @IsNotEmpty({message:"So dien thoai khong duoc de trong"})
    @ApiProperty()
    @Matches(/^0\d{9}$/, { message: "So dien thoai phai co 10 chu so va bat dau bang 0" })
    so_dt:string;

    @IsNotEmpty({message:"Mat khau khong duoc de trong"})
    @ApiProperty()
    mat_khau:string;

    @IsNotEmpty({message:"Loai nguoi dung khong duoc de trong"})
    @ApiProperty({enum:LoaiNguoiDungEnum})
    @IsEnum(LoaiNguoiDungEnum)
    loai_nguoi_dung:string;
}