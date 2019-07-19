import { AchParser } from '../services/achParser';
import { RecordPosEntryDetail } from './recordPosEntryDetail';
import { resolve } from 'path';

describe("Unit POS File Parsing", () => {
   it("parses basic pos file", async () => {
        let result = await AchParser.parseAchFile(resolve('src', 'fixtures', 'basicPosFile.ach'));
        expect(result.fileHeader).not.toEqual(null);
        expect(result.batches).not.toEqual(null);
        expect(result.batches.length).toEqual(1);
        let boc = result.batches[0].entries[0] as RecordPosEntryDetail;
        expect(boc.amount).toEqual(50000000.12);
    });

});
