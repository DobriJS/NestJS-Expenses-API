import { IsNumber, IsPositive, IsNotEmpty, IsString, IsOptional } from 'class-validator';
export class CreateReportDto {
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsNotEmpty()
    @IsString()
    source: string;
}

export class UpdateReportDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    source: string;
}