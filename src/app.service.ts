import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { Report } from './interfaces/Report';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.report.filter((report) => report.type === type);
  }
  getReportType = (type: string) =>
    type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

  getReportById = (type: ReportType, id: string) => {
    return data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
  };

  createReport(type: ReportType, { amount, source }: Report) {
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
}
