import { Module } from "@nestjs/common";
import { NguoiDungController } from "./NguoiDung.controller";
import { NguoiDungService } from "./NguoiDung.service";

@Module({
    imports:[],
    controllers:[NguoiDungController],
    providers:[NguoiDungService]
})
export class NguoiDungModule{}