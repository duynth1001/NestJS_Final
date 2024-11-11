import { Expose } from "class-transformer";

export class danhSachLoaiNguoiDungDto{
    @Expose()
    loai_nguoi_dung:string;
}