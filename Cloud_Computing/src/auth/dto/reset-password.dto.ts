import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class ResetPasswordDTO {

    @ApiProperty({description :"Password", type : String, example : "password"})
    @IsString()
    password: string;

    @ApiProperty({description :"New Password", type : String, example : "new password"})
    @IsString()
    new_password: string;
    
}