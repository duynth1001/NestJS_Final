import { Expose } from "class-transformer";

export class DanhSachNguoiDungDto{
    @Expose()
    tai_khoan:number;
    @Expose()
    ho_ten:string;

    @Expose()
    email:string;

    @Expose()
    so_dt:string;

    @Expose()
    mat_khau:string;

    @Expose()
    loai_nguoi_dung:string;
}