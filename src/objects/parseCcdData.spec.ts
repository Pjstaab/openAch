import { AchParser } from '../services/achParser';
import { RecordCcdEntryDetail } from './recordCcdEntryDetail';
import { resolve } from 'path';

describe("Unit CCD File Parsing", () => {
    it("parses basic ccd file", async () => {
        let result = await AchParser.parseAchFile(resolve('fixtures', 'basicCCDFile.ach'));
        expect(result.fileHeader).not.toEqual(null);
        expect(result.batches).not.toEqual(null);
        expect(result.batches.length).toEqual(1);
        let boc = result.batches[0].entries[0] as RecordCcdEntryDetail;
        expect(boc.amount).toEqual(50000000.12);
    });

});
