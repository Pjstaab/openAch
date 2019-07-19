import { RecordBatchTrailer } from './recordBatchTrailer';
import { RecordBocEntryDetail } from './recordBocEntryDetail';
import { RecordCcdEntryDetail } from './recordCcdEntryDetail';
import { RecordCtxEntryDetail } from './recordCtxEntryDetail';
import { RecordPosEntryDetail } from './recordPosEntryDetail';
import { RecordPpdEntryDetail } from './recordPpdEntryDetail';

export class RecordBatch {
  public recordTypeCode: number;

  public serviceClassCode: number;

  public companyName: string;

  public companyDescriptiveData: string;

  public companyId: string;

  public standardEntryClass: string;

  public entryDescription: string;

  public companyDescriptiveDate: string;

  public effectiveEntryDate: string;

  public settlementDate: string;

  public originatorStatusCode: string;

  public originatorAba: string;

  public batchNumber: number;

  public entries: (
    | RecordBocEntryDetail
    | RecordCcdEntryDetail
    | RecordCtxEntryDetail
    | RecordPosEntryDetail
    | RecordPpdEntryDetail)[] = [];

  public trailer?: RecordBatchTrailer;

  public static parseLine(line: string): RecordBatch {
    return new RecordBatch({
      recordTypeCode: parseInt(line.substr(0, 1), 10),
      serviceClassCode: parseInt(line.substr(1, 3), 10),
      companyName: line.substr(4, 16),
      companyDescriptiveData: line.substr(20, 20),
      companyId: line.substr(40, 10),
      standardEntryClass: line.substr(50, 3),
      entryDescription: line.substr(53, 10),
      companyDescriptiveDate: line.substr(63, 6),
      effectiveEntryDate: line.substr(69, 6),
      settlementDate: line.substr(75, 3),
      originatorStatusCode: line.substr(78, 1),
      originatorAba: line.substr(79, 8),
      batchNumber: parseInt(line.substr(87, 7), 10),
    });
  }

  public constructor({
    recordTypeCode,
    serviceClassCode,
    companyName,
    companyDescriptiveData,
    companyId,
    standardEntryClass,
    entryDescription,
    companyDescriptiveDate,
    effectiveEntryDate,
    settlementDate,
    originatorStatusCode,
    originatorAba,
    batchNumber,
  }: {
    recordTypeCode: number;
    serviceClassCode: number;
    companyName: string;
    companyDescriptiveData: string;
    companyId: string;
    standardEntryClass: string;
    entryDescription: string;
    companyDescriptiveDate: string;
    effectiveEntryDate: string;
    settlementDate: string;
    originatorStatusCode: string;
    originatorAba: string;
    batchNumber: number;
  }) {
    this.recordTypeCode = recordTypeCode;
    this.serviceClassCode = serviceClassCode;
    this.companyName = companyName;
    this.companyDescriptiveData = companyDescriptiveData;
    this.companyId = companyId;
    this.standardEntryClass = standardEntryClass;
    this.entryDescription = entryDescription;
    this.companyDescriptiveDate = companyDescriptiveDate;
    this.effectiveEntryDate = effectiveEntryDate;
    this.settlementDate = settlementDate;
    this.originatorStatusCode = originatorStatusCode;
    this.originatorAba = originatorAba;
    this.batchNumber = batchNumber;
  }
}
