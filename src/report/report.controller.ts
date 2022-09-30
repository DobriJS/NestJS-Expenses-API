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
  import { CreateReportDto, UpdateReportDto, ReportResponseDto } from '../dtos/report.dto';
  import { ReportService } from './report.service';
  import { ReportType } from '../data';

  @Controller('/report/:type')
  export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    @Get()
    getAllReports(@Param('type', new ParseEnumPipe(ReportType)) type: string) {
      const reportType = this.reportService.getReportType(type);
      return this.reportService.getAllReports(reportType);
    }

    @Get(':id')
    getReportById(@Param('type', new ParseEnumPipe(ReportType)) type: string, @Param('id', ParseUUIDPipe) id: string) {
      const reportType = this.reportService.getReportType(type);
      return this.reportService.getReportById(reportType, id);
    }

    @Post()
    createReport(
      @Body() { amount, source }: CreateReportDto,
      @Param('type', new ParseEnumPipe(ReportType)) type: string,
    ): ReportResponseDto {
      const reportType = this.reportService.getReportType(type);
      return this.reportService.createReport(reportType, { amount, source });
    }

    @Put(':id')
    updateReport(
      @Body() body: UpdateReportDto,
      @Param('id', ParseUUIDPipe) id: string,
      @Param('type', new ParseEnumPipe(ReportType)) type: string,
    ): ReportResponseDto {
      const reportType = this.reportService.getReportType(type);
      return this.reportService.updateReport(reportType, id, body);
    }

    @HttpCode(204)
    @Delete(':id')
    deleteReport(@Param('id', ParseUUIDPipe) id: string) {
      return this.reportService.deleteReport(id);
    }
  }