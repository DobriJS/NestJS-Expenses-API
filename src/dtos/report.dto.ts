import { IsNumber, IsPositive, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import {Exclude, Expose} from 'class-transformer';
import { ReportType } from 'src/data';

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

export class ReportResponseDto {
    id: string;
    source: string;
    amount: number;
    created_at: Date;

    @Exclude()
    updated_at: Date;
    type: ReportType;

    constructor(partial: Partial<ReportResponseDto>) {}
}