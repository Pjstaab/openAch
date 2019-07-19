export class RecordBatchTrailer {
  public recordTypeCode: number;

  public serviceClassCode: number;

  public entryCount: number;

  public entryHash: number;

  public totalDebitAmount: number;

  public totalCreditAmount: number;

  public companyId: string;

  public authenticationCode: string;

  public reservedData: string;

  public originatorAba: string;

  public batchNumber: number;

  public static parseLine(line: string): RecordBatchTrailer {
    return new RecordBatchTrailer({
      recordTypeCode: parseInt(line.substr(0, 1), 10),
      serviceClassCode: parseInt(line.substr(1, 3), 10),
      entryCount: parseInt(line.substr(4, 6), 10),
      entryHash: parseInt(line.substr(10, 10), 10),
      totalDebitAmount: parseFloat(`${line.substr(20, 10)}.${line.substr(30, 2)}`),
      totalCreditAmount: parseFloat(`${line.substr(32, 10)}.${line.substr(42, 2)}`),
      companyId: line.substr(44, 10),
      authenticationCode: line.substr(54, 19),
      reservedData: line.substr(73, 6),
      originatorAba: line.substr(79, 8),
      batchNumber: parseInt(line.substr(87, 7), 10),
    });
  }

  public constructor({
    recordTypeCode,
    serviceClassCode,
    entryCount,
    entryHash,
    totalDebitAmount,
    totalCreditAmount,
    companyId,
    authenticationCode,
    reservedData,
    originatorAba,
    batchNumber,
  }: {
    recordTypeCode: number;
    serviceClassCode: number;
    entryCount: number;
    entryHash: number;
    totalDebitAmount: number;
    totalCreditAmount: number;
    companyId: string;
    authenticationCode: string;
    reservedData: string;
    originatorAba: string;
    batchNumber: number;
  }) {
    this.recordTypeCode = recordTypeCode;
    this.serviceClassCode = serviceClassCode;
    this.entryCount = entryCount;
    this.entryHash = entryHash;
    this.totalDebitAmount = totalDebitAmount;
    this.totalCreditAmount = totalCreditAmount;
    this.companyId = companyId;
    this.authenticationCode = authenticationCode;
    this.reservedData = reservedData;
    this.originatorAba = originatorAba;
    this.batchNumber = batchNumber;
  }
}
