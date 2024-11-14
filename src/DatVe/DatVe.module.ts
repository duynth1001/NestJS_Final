import { Module } from "@nestjs/common";
import { DatVeController } from "./DatVe.controller";
import { DatVeService } from "./DatVe.service";
import { JwtModule } from "@nestjs/jwt";
import { KeyModule } from "src/key/key.module";

@Module({
    imports:[JwtModule.register({}),KeyModule],
    controllers:[DatVeController],
    providers:[DatVeService]
})
export class DatVeModule{}