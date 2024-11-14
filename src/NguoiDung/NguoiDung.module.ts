import { Module } from "@nestjs/common";
import { NguoiDungController } from "./NguoiDung.controller";
import { NguoiDungService } from "./NguoiDung.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports:[JwtModule.register({})],
    controllers:[NguoiDungController],
    providers:[NguoiDungService]
})
export class NguoiDungModule{}