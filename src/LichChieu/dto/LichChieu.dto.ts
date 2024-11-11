import { Expose } from "class-transformer";


export class LichChieuDto{
    @Expose()
    ma_lich_chieu:number;
    
    @Expose()
    ma_rap:number;

    @Expose()
    ma_phim:number;

    @Expose()
    ngay_gio_chieu:Date;

    @Expose()
    gia_ve:number;
}