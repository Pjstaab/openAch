import { AchParser } from './achParser';
import { resolve } from 'path';

describe('Unit AchParser Tests', () => {
  it('should fail when file does not exist', async () => {
    try {
      await AchParser.parseAchFile('file.does.not.exist');
    } catch (err) {
      expect(err.message).toEqual("AchParser: 'error' creating read stream for ACH parser.");
    }
  });

  it('should fail when standard entry class is invalid', async () => {
    try {
      const ach = await AchParser.parseAchFile(resolve('fixtures', 'basicInvalidSEC.ach'));
    } catch (err) {
      expect(err.message).toEqual(
        "AchParser: 'error' reading line 3. Error: AchParser: 'error'(line 3): standard entry class 'OMG' is not valid.",
      );
    }
  });

  it('should fail when record type code is invalid', async () => {
    try {
      const ach = await AchParser.parseAchFile(resolve('fixtures', 'basicInvalidRTC.ach'));
    } catch (err) {
      expect(err.message).toEqual('AchParser: \'error\' reading line 1. Error: AchParser: \'error\'(line 1): record type code \'A\' is not valid.');
    }
  });

  it('should fail when header record is invalid', async () => {
    try {
      const ach = await AchParser.parseAchFile(resolve('fixtures', 'basicInvalidHeader.ach'));
    } catch (err) {
        expect(err.message).toEqual('AchParser: \'error\' reading line 1. Error: RecordHeader: Line must be 94 characters in length.');
    }
  });
});
