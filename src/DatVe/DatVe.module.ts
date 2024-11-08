import { Module } from "@nestjs/common";
import { DatVeController } from "./DatVe.controller";
import { DatVeService } from "./DatVe.service";

@Module({
    imports:[],
    controllers:[DatVeController],
    providers:[DatVeService]
})
export class DatVeModule{}