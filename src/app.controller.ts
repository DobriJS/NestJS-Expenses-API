import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { CreateReportDto, UpdateReportDto, ReportResponseDto } from './dtos/report.dto';

import { AppService } from './app.service';
import { ReportType } from './data';

@Controller('/report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type', new ParseEnumPipe(ReportType)) type: string) {
    const reportType = this.appService.getReportType(type);
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(@Param('type', new ParseEnumPipe(ReportType)) type: string, @Param('id', ParseUUIDPipe) id: string) {
    const reportType = this.appService.getReportType(type);
    return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Body() { amount, source }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto {
    const reportType = this.appService.getReportType(type);
    return this.appService.createReport(reportType, { amount, source });
  }

  @Put(':id')
  updateReport(
    @Body() body: UpdateReportDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto {
    const reportType = this.appService.getReportType(type);
    return this.appService.updateReport(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.deleteReport(id);
  }
}
