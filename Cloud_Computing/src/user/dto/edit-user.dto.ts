import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class EditUserDTO {

    @ApiProperty({description : "Nama Lengkap", type : String, example : "Galbi Nadifah" })
    @IsString()
    nama : string;

    @ApiPropertyOptional({description :"Gambar", type : "string",format:"binary", example : "username"})
    foto_profile : string;

}