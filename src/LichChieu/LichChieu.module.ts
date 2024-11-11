import { Module } from "@nestjs/common";
import { LichChieuController } from "./LichChieu.controller";
import { LichChieuService } from "./LichChieu.service";

@Module({
    imports:[],
    controllers:[LichChieuController],
    providers:[LichChieuService]
})
export class LichChieuModule{}