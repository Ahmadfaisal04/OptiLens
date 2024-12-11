import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class QueryDTO {

    @ApiPropertyOptional({description : "Page number", type : Number, example : 1})
    @IsOptional()
    @Transform(({value}) => Number(value))
    @IsNumber()
    page? : number;


    @ApiPropertyOptional({description : "Limit of the data", type : Number, example : 10})
    @IsOptional()
    @Transform(({value}) => Number(value))
    @IsNumber()
    limit? : number;

    @ApiPropertyOptional({description : "Search query", type : String, example : ""})
    @IsOptional()
    @IsString()
    search? : string




}