import { AchParser } from '../services/achParser';
import { RecordBocEntryDetail } from './recordBocEntryDetail';
import { resolve } from 'path';

describe("Unit BOC File Parsing", () => {
    it("parses basic boc file", async () => {
        let result = await AchParser.parseAchFile(resolve('fixtures', 'basicBocFile.ach'));
        expect(result.fileHeader).not.toEqual(null);
        expect(result.batches).not.toEqual(null);
        expect(result.batches.length).toEqual(1);
        let boc = result.batches[0].entries[0] as RecordBocEntryDetail;
        expect(boc.amount).toEqual(74.22);
    });

});
