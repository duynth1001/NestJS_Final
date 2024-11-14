import { Module } from "@nestjs/common";
import { LichChieuController } from "./LichChieu.controller";
import { LichChieuService } from "./LichChieu.service";
import { JwtModule } from "@nestjs/jwt";
import { KeyModule } from "src/key/key.module";

@Module({
    imports:[JwtModule.register({}),KeyModule],
    controllers:[LichChieuController],
    providers:[LichChieuService]
})
export class LichChieuModule{}