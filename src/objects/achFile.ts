import { RecordHeader } from './recordHeader';
import { RecordBatch } from './recordBatch';
import { RecordTrailer } from './recordTrailer';

export class AchFile {
  public fileHeader?: RecordHeader;

  public fileTrailer?: RecordTrailer;

  public batches: RecordBatch[] = [];
}
