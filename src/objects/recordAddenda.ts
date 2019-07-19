export class RecordAddenda {
  public recordTypeCode: number;

  public addendaTypeCode: number;

  public data: string;

  public sequenceNumber: number;

  public detailSequenceNumber: number;

  public static parseLine(line: string): RecordAddenda {
    return new RecordAddenda({
      recordTypeCode: parseInt(line.substr(0, 1), 10),
      addendaTypeCode: parseInt(line.substr(1, 2), 10),
      data: line.substr(3, 80),
      sequenceNumber: parseInt(line.substr(83, 4), 10),
      detailSequenceNumber: parseInt(line.substr(87, 7), 10),
    });
  }

  public constructor({
    recordTypeCode,
    addendaTypeCode,
    data,
    sequenceNumber,
    detailSequenceNumber,
  }: {
    recordTypeCode: number;
    addendaTypeCode: number;
    data: string;
    sequenceNumber: number;
    detailSequenceNumber: number;
  }) {
    this.recordTypeCode = recordTypeCode;
    this.addendaTypeCode = addendaTypeCode;
    this.data = data;
    this.sequenceNumber = sequenceNumber;
    this.detailSequenceNumber = detailSequenceNumber;
  }
}
