export class RecordAddendaRoc {
  public recordTypeCode: number;

  public addendaTypeCode: number;

  public returnNocCode: string;

  public originalTraceNumber: number;

  public dateOfDeath: number | null;

  public originalRdfiId: number;

  public addendaInfo: string;

  public traceNumber: number;

  public static parseLine(line: string): RecordAddendaRoc {
    const dob = parseInt(line.substr(21, 6), 10);
    return new RecordAddendaRoc({
      recordTypeCode: parseInt(line.substr(0, 1), 10),
      addendaTypeCode: parseInt(line.substr(1, 2), 10),
      returnNocCode: line.substr(3, 3),
      originalTraceNumber: parseInt(line.substr(6, 15), 10),
      dateOfDeath: Number.isNaN(dob) ? null : dob,
      originalRdfiId: parseInt(line.substr(27, 8), 10),
      addendaInfo: line.substr(35, 44),
      traceNumber: parseInt(line.substr(79, 15), 10),
    });
  }

  public constructor({
    recordTypeCode,
    addendaTypeCode,
    returnNocCode,
    originalTraceNumber,
    dateOfDeath,
    originalRdfiId,
    addendaInfo,
    traceNumber,
  }: {
    recordTypeCode: number;
    addendaTypeCode: number;
    returnNocCode: string;
    originalTraceNumber: number;
    dateOfDeath: number | null;
    originalRdfiId: number;
    addendaInfo: string;
    traceNumber: number;
  }) {
    this.recordTypeCode = recordTypeCode;
    this.addendaTypeCode = addendaTypeCode;
    this.returnNocCode = returnNocCode;
    this.originalTraceNumber = originalTraceNumber;
    this.dateOfDeath = dateOfDeath;
    this.originalRdfiId = originalRdfiId;
    this.addendaInfo = addendaInfo;
    this.traceNumber = traceNumber;
  }
}
