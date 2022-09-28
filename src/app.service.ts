import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';

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
}
