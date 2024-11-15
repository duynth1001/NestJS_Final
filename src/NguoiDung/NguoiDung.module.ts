import { Module } from "@nestjs/common";
import { NguoiDungController } from "./NguoiDung.controller";
import { NguoiDungService } from "./NguoiDung.service";
import { JwtModule } from "@nestjs/jwt";
import { KeyModule } from "src/key/key.module";

@Module({
    imports:[JwtModule.register({}),KeyModule],
    controllers:[NguoiDungController],
    providers:[NguoiDungService]
})
export class NguoiDungModule{}