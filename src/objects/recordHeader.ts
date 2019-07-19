export class RecordHeader {
  public recordTypeCode: number;

  public priorityCode: number;

  public immediateDestination: string;

  public immediateOrigin: string;

  public fileCreationDate: string;

  public fileCreationTime: string;

  public fileIdModifier: string;

  public recordSize: number;

  public blockingFactor: number;

  public formatCode: number;

  public immediateDestinationName: string;

  public immediateOriginName: string;

  public referenceCode: string;

  private static validateLine(line: string) {
    if (!line || line.length !== 94) {
      throw new Error('RecordHeader: Line must be 94 characters in length.');
    }
  }

  public static parseLine(line: string): RecordHeader {
    this.validateLine(line);
    return new RecordHeader({
      recordTypeCode: parseInt(line.substr(0, 1), 10),
      priorityCode: parseInt(line.substr(1, 2), 10),
      immediateDestination: line.substr(3, 10),
      immediateOrigin: line.substr(13, 10),
      fileCreationDate: line.substr(23, 6),
      fileCreationTime: line.substr(29, 4),
      fileIdModifier: line.substr(33, 1),
      recordSize: parseInt(line.substr(34, 3), 10),
      blockingFactor: parseInt(line.substr(37, 2), 10),
      formatCode: parseInt(line.substr(39, 1), 10),
      immediateDestinationName: line.substr(40, 23),
      immediateOriginName: line.substr(63, 23),
      referenceCode: line.substr(86, 8),
    });
  }

  public constructor({
    recordTypeCode,
    priorityCode,
    immediateDestination,
    immediateOrigin,
    fileCreationDate,
    fileCreationTime,
    fileIdModifier,
    recordSize,
    blockingFactor,
    formatCode,
    immediateDestinationName,
    immediateOriginName,
    referenceCode,
  }: {
    recordTypeCode: number;
    priorityCode: number;
    immediateDestination: string;
    immediateOrigin: string;
    fileCreationDate: string;
    fileCreationTime: string;
    fileIdModifier: string;
    recordSize: number;
    blockingFactor: number;
    formatCode: number;
    immediateDestinationName: string;
    immediateOriginName: string;
    referenceCode: string;
  }) {
    this.recordTypeCode = recordTypeCode;
    this.priorityCode = priorityCode;
    this.immediateDestination = immediateDestination;
    this.immediateOrigin = immediateOrigin;
    this.fileCreationDate = fileCreationDate;
    this.fileCreationTime = fileCreationTime;
    this.fileIdModifier = fileIdModifier;
    this.recordSize = recordSize;
    this.blockingFactor = blockingFactor;
    this.formatCode = formatCode;
    this.immediateDestinationName = immediateDestinationName;
    this.immediateOriginName = immediateOriginName;
    this.referenceCode = referenceCode;
  }
}
