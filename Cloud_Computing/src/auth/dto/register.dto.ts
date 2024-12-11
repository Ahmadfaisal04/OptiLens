import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class RegisterDTO {

    @ApiProperty({description : "Email of the user", type : String, example : "username"})
    @IsEmail()
    email: string;

    @ApiProperty({description :"Password", type : String, example : "password"})
    @IsString()
    password: string;

    @ApiProperty({description :"Username", type : String, example : "username"})
    @IsString()
    username : string;

    @ApiProperty({description :"Fullname", type : String, example : "Galbi Nadifah"})
    @IsString()
    nama : string;

}