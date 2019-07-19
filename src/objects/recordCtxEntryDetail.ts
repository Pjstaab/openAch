import { RecordAddenda } from './recordAddenda';
import { RecordAddendaRoc } from './recordAddendaRoc';

/**
 * This class handles data for the detail records of type BOC, ARC, and POP.
 */
export class RecordCtxEntryDetail {
  public recordTypeCode: number;

  public transactionCode: number;

  public receivingAba: string;

  public checkDigit: number;

  public receivingDda: string;

  public amount: number;

  public identificationNumber: string;

  public addendaRecords: number;

  public receivingCompanyName: string;

  public reservedData: string;

  public discretionaryData: string;

  public addendaRecordIndicator: number;

  public traceNumber: string;

  public addenda: (RecordAddenda | RecordAddendaRoc)[] = [];

  public static parseLine(line: string): RecordCtxEntryDetail {
    return new RecordCtxEntryDetail({
      recordTypeCode: parseInt(line.substr(0, 1), 10),
      transactionCode: parseInt(line.substr(1, 2), 10),
      receivingAba: line.substr(3, 8),
      checkDigit: parseInt(line.substr(11, 1), 10),
      receivingDda: line.substr(12, 17),
      amount: parseFloat(`${line.substr(29, 8)}.${line.substr(37, 2)}`),
      identificationNumber: line.substr(39, 15),
      addendaRecords: parseInt(line.substr(54, 4), 10),
      receivingCompanyName: line.substr(58, 17),
      reservedData: line.substr(74, 2),
      discretionaryData: line.substr(76, 2),
      addendaRecordIndicator: parseInt(line.substr(78, 1), 10),
      traceNumber: line.substr(79, 15),
    });
  }

  public constructor({
    recordTypeCode,
    transactionCode,
    receivingAba,
    checkDigit,
    receivingDda,
    amount,
    identificationNumber,
    addendaRecords,
    receivingCompanyName,
    reservedData,
    discretionaryData,
    addendaRecordIndicator,
    traceNumber,
  }: {
    recordTypeCode: number;
    transactionCode: number;
    receivingAba: string;
    checkDigit: number;
    receivingDda: string;
    amount: number;
    identificationNumber: string;
    addendaRecords: number;
    receivingCompanyName: string;
    reservedData: string;
    discretionaryData: string;
    addendaRecordIndicator: number;
    traceNumber: string;
  }) {
    this.recordTypeCode = recordTypeCode;
    this.transactionCode = transactionCode;
    this.receivingAba = receivingAba;
    this.checkDigit = checkDigit;
    this.receivingDda = receivingDda;
    this.amount = amount;
    this.identificationNumber = identificationNumber;
    this.addendaRecords = addendaRecords;
    this.receivingCompanyName = receivingCompanyName;
    this.reservedData = reservedData;
    this.discretionaryData = discretionaryData;
    this.addendaRecordIndicator = addendaRecordIndicator;
    this.traceNumber = traceNumber;
  }
}
