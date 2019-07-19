import * as fs from 'async-file';
import { accessSync } from 'fs';
import { Readable } from 'stream';
import { ReadLine, createInterface } from 'readline';
import { AchFile } from '../objects/achFile';
import { RecordHeader } from '../objects/recordHeader';
import { RecordBatch } from '../objects/recordBatch';
import { RecordPpdEntryDetail } from '../objects/recordPpdEntryDetail';
import { RecordAddenda } from '../objects/recordAddenda';
import { RecordAddendaRoc } from '../objects/recordAddendaRoc';
import { RecordBocEntryDetail } from '../objects/recordBocEntryDetail';
import { RecordCcdEntryDetail } from '../objects/recordCcdEntryDetail';
import { RecordCtxEntryDetail } from '../objects/recordCtxEntryDetail';
import { RecordPosEntryDetail } from '../objects/recordPosEntryDetail';
import { RecordBatchTrailer } from '../objects/recordBatchTrailer';
import { RecordTrailer } from '../objects/recordTrailer';
import { log } from '../../../utils/log';

export class AchParser {
  private static async createReadStream(data: string | Readable): Promise<ReadLine> {
    let stream: ReadLine;
    if (typeof data === 'string') {
      try {
        accessSync(data);
        stream = createInterface({
          input: fs.createReadStream(data),
        });
      } catch (ex) {
        const m = `AchParser: 'error' reading file '${data}'. Message: ${ex}.`;
        log('error', m);
        throw new Error(m);
      }
    } else {
      stream = createInterface({
        input: data,
      });
    }
    return stream;
  }

  private static handleLine(line: string, achInput: AchFile, linenum: number) {
    const ach = achInput;
    if (line[0] === '1') ach.fileHeader = RecordHeader.parseLine(line);
    else if (line[0] === '5') ach.batches.push(RecordBatch.parseLine(line));
    else if (line[0] === '6') {
      const batch = ach.batches[ach.batches.length - 1];
      let parseFunc = null;
      switch (batch.standardEntryClass) {
        case 'PPD':
        case 'TEL':
        case 'WEB': {
          parseFunc = RecordPpdEntryDetail.parseLine;
          break;
        }
        case 'BOC':
        case 'ARC':
        case 'POP': {
          parseFunc = RecordBocEntryDetail.parseLine;
          break;
        }
        // Technically any type can be COR as COR just means that there was a notice of change
        // We only ever send CCD payments so our CORs will only ever be CCD
        case 'COR':
        case 'CCD': {
          parseFunc = RecordCcdEntryDetail.parseLine;
          break;
        }
        case 'CTX': {
          parseFunc = RecordCtxEntryDetail.parseLine;
          break;
        }
        case 'POS': {
          parseFunc = RecordPosEntryDetail.parseLine;
          break;
        }
        default: {
          parseFunc = null;
        }
      }

      if (!parseFunc) {
        const m = `AchParser: 'error'(line ${linenum}): standard entry class '${batch.standardEntryClass}' is not valid.`;
        throw new Error(m);
      }

      ach.batches[ach.batches.length - 1].entries.push(parseFunc(line));
    } else if (line[0] === '7') {
      let parseFunc = null;
      if (line[1] === '9' && ['8', '9'].includes(line[2])) {
        parseFunc = RecordAddendaRoc.parseLine;
      } else {
        parseFunc = RecordAddenda.parseLine;
      }
      const batch = ach.batches[ach.batches.length - 1];
      batch.entries[ach.batches[ach.batches.length - 1].entries.length - 1].addenda.push(
        parseFunc(line),
      );
    } else if (line[0] === '8') {
      const batch = ach.batches[ach.batches.length - 1];
      batch.trailer = RecordBatchTrailer.parseLine(line);
    } else if (line[0] === '9') {
      ach.fileTrailer = RecordTrailer.parseLine(line);
    } else {
      const m = `AchParser: 'error'(line ${linenum}): record type code '${line[0]}' is not valid.`;
      throw new Error(m);
    }
  }

  public static async parseAchFile(data: string | Readable): Promise<AchFile> {
    return new Promise<AchFile>(async (resolve, reject) => {
      let reader: ReadLine;
      try {
        reader = await AchParser.createReadStream(data);
        await log('info', 'AchParser: stream opened successfully.');
      } catch (ex) {
        const m = "AchParser: 'error' creating read stream for ACH parser.";
        await log('error', m);
        reject(Error(m));
        return;
      }

      let lineNum = 0;
      const ach = new AchFile();

      reader.on('line', (line) => {
        lineNum += 1;
        try {
          AchParser.handleLine(line, ach, lineNum);
        } catch (ex) {
          const m = `AchParser: 'error' reading line ${lineNum}. ${ex}`;
          log('error', m);
          reject(Error(m));
        }
      });
      reader.on('close', () => {
        log('info', `AchParser: stream closed. Lines read: ${lineNum}.`);
        resolve(ach);
      });
      reader.on('end', () => {
        log('info', `AchParser: stream ended. Lines read: ${lineNum}.`);
        resolve(ach);
      });
      reader.on('error', (err) => {
        log('error', `AchParser: 'error' while reading ACH stream. ${err}`);
        reject(Error(err));
      });
    });
  }
}
