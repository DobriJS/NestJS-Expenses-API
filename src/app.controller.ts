import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { data } from 'src/data';
import { AppService } from './app.service';

@Controller('/report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type: string) {
    const reportType = this.appService.getReportType(type);
    return this.appService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType = this.appService.getReportType(type);
    return this.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Body() { amount, source }: { amount: number; source: string },
    @Param('type') type: string,
  ) {
    const reportType = this.appService.getReportType(type);
    return this.appService.createReport(reportType, { amount, source });
  }

  @Put(':id')
  updateReport(
    @Body() body: { amount: number; souce: string },
    @Param('id') id: string,
    @Param('type') type: string,
  ) {
    const reportType = this.appService.getReportType(type);
    const reportToUpdate = data.report
      .filter((report) => report.type === reportType)
      .find((report) => report.id === id);
    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex((report) => report.id === id);
    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
    };
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id') id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
    return;
  }
}
