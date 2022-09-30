import { IsNumber, IsPositive, IsNotEmpty, IsString } from 'class-validator';
export class CreateReportDto {
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsNotEmpty()
    @IsString()
    source: string;
}