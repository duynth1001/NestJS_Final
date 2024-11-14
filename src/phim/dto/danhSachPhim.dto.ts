import { Expose } from "class-transformer";

export class danhSachPhimDto{
    @Expose()
    tenPhim:string;
    @Expose()
    maNhom: string ;
    @Expose()
    maPhim: number ;

}