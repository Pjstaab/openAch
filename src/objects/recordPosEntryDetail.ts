import { RecordAddenda } from './recordAddenda';
import { RecordAddendaRoc } from './recordAddendaRoc';

export class RecordPosEntryDetail {
  public recordTypeCode: number;

  public transactionCode: number;

  public receivingAba: string;

  public checkDigit: number;

  public receivingDda: string;

  public amount: number;

  public individualId: string;

  public individualName: string;

  public cardTransactionTypeCode: number;

  public addendaRecordIndicator: number;

  public traceNumber: string;

  public addenda: (RecordAddenda | RecordAddendaRoc)[] = [];

  public static parseLine(line: string): RecordPosEntryDetail {
    return new RecordPosEntryDetail({
      recordTypeCode: parseInt(line.substr(0, 1), 10),
      transactionCode: parseInt(line.substr(1, 2), 10),
      receivingAba: line.substr(3, 8),
      checkDigit: parseInt(line.substr(11, 1), 10),
      receivingDda: line.substr(12, 17),
      amount: parseFloat(`${line.substr(29, 8)}.${line.substr(37, 2)}`),
      individualId: line.substr(39, 15),
      individualName: line.substr(54, 22),
      cardTransactionTypeCode: parseInt(line.substr(76, 2), 10),
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
    individualId,
    individualName,
    cardTransactionTypeCode,
    addendaRecordIndicator,
    traceNumber,
  }: {
    recordTypeCode: number;
    transactionCode: number;
    receivingAba: string;
    checkDigit: number;
    receivingDda: string;
    amount: number;
    individualId: string;
    individualName: string;
    cardTransactionTypeCode: number;
    addendaRecordIndicator: number;
    traceNumber: string;
  }) {
    this.recordTypeCode = recordTypeCode;
    this.transactionCode = transactionCode;
    this.receivingAba = receivingAba;
    this.checkDigit = checkDigit;
    this.receivingDda = receivingDda;
    this.amount = amount;
    this.individualId = individualId;
    this.individualName = individualName;
    this.cardTransactionTypeCode = cardTransactionTypeCode;
    this.addendaRecordIndicator = addendaRecordIndicator;
    this.traceNumber = traceNumber;
  }
}
