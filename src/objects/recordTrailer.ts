export class RecordTrailer {
  public recordTypeCode: number;

  public batchCount: number;

  public blockCount: number;

  public entryCount: number;

  public entryHash: number;

  public totalDebits: number;

  public totalCredits: number;

  public reservedData: string;

  public static parseLine(line: string): RecordTrailer {
    return new RecordTrailer({
      recordTypeCode: parseInt(line.substr(0, 1), 10),
      batchCount: parseInt(line.substr(1, 6), 10),
      blockCount: parseInt(line.substr(7, 6), 10),
      entryCount: parseInt(line.substr(13, 8), 10),
      entryHash: parseInt(line.substr(21, 10), 10),
      totalDebits: parseFloat(`${line.substr(31, 10)}.${line.substr(41, 2)}`),
      totalCredits: parseFloat(`${line.substr(43, 10)}.${line.substr(53, 2)}`),
      reservedData: line.substr(55, 39),
    });
  }

  public constructor({
    recordTypeCode,
    batchCount,
    blockCount,
    entryCount,
    entryHash,
    totalDebits,
    totalCredits,
    reservedData,
  }: {
    recordTypeCode: number;
    batchCount: number;
    blockCount: number;
    entryCount: number;
    entryHash: number;
    totalDebits: number;
    totalCredits: number;
    reservedData: string;
  }) {
    this.recordTypeCode = recordTypeCode;
    this.batchCount = batchCount;
    this.blockCount = blockCount;
    this.entryCount = entryCount;
    this.entryHash = entryHash;
    this.totalDebits = totalDebits;
    this.totalCredits = totalCredits;
    this.reservedData = reservedData;
  }
}
