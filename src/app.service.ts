import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { Report } from './interfaces/Report';
import { UpdateReport } from './interfaces/UpdateReport';
import { ReportResponseDto} from './dtos/report.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.report.filter((report) => report.type === type).map(report => new ReportResponseDto(report));
  }
  getReportType(type: string) {
    return type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

      if(!report) return;

      return new ReportResponseDto(report)
  }

  createReport(type: ReportType, { amount, source }: Report): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return newReport;
  }

  updateReport(type: ReportType, id: string, body: UpdateReport): ReportResponseDto {
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date(),
    };

    return data.report[reportIndex];
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);
    if (reportIndex === -1) return;
    data.report.splice(reportIndex, 1);
    return;
  }
}
