import * as util from '@renderer/util/time';

jest.setTimeout(50000);

describe('timeToSeconds()', () => {
  describe('recieved correct time', () => {
    it('returns correct seconds', () => {
      expect(util.timeToSeconds(1)).toBe(1);
      expect(util.timeToSeconds(1.1)).toBe(1.1);
      expect(util.timeToSeconds(61)).toBe(61);
      expect(util.timeToSeconds(3661)).toBe(3661);
      expect(util.timeToSeconds('1')).toBe(1);
      expect(util.timeToSeconds('1.1')).toBe(1.1);
      expect(util.timeToSeconds('01:01')).toBe(61);
      expect(util.timeToSeconds('01:01.000')).toBe(61);
      expect(util.timeToSeconds('00:00:01.000')).toBe(1);
      expect(util.timeToSeconds('00:01:01.000')).toBe(61);
      expect(util.timeToSeconds('01:01:01.000')).toBe(3661);
      expect(util.timeToSeconds('01:01:01.123')).toBe(3661.123);
      expect(util.timeToSeconds('01:01:01.1')).toBe(3661.1);
      expect(util.timeToSeconds('01:01:01.123456')).toBe(3661.123);
      expect(util.timeToSeconds('11:11:11')).toBe(40271);
      expect(util.timeToSeconds('1:1:1.1')).toBe(3661.1);
    });
  });

  describe('recieved incorrect time', () => {
    it('returns zero second', () => {
      expect(util.timeToSeconds('')).toBe(0);
      expect(util.timeToSeconds('aaa')).toBe(0);
      expect(util.timeToSeconds('a12aa')).toBe(0);
      expect(util.timeToSeconds('12.34.567')).toBe(0);
      expect(util.timeToSeconds('12:34:56:78')).toBe(0);
    });
  });
});

describe('secondsToStringTime()', () => {
  describe('recieved correct time', () => {
    it('returns correct formatted time', () => {
      expect(util.secondsToStringTime(1)).toBe('00:00:01.000');
      expect(util.secondsToStringTime(1.1)).toBe('00:00:01.100');
      expect(util.secondsToStringTime(61)).toBe('00:01:01.000');
      expect(util.secondsToStringTime(3661)).toBe('01:01:01.000');
      expect(util.secondsToStringTime('1')).toBe('00:00:01.000');
      expect(util.secondsToStringTime('1.1')).toBe('00:00:01.100');
      expect(util.secondsToStringTime('61')).toBe('00:01:01.000');
      expect(util.secondsToStringTime('3661')).toBe('01:01:01.000');
      expect(util.secondsToStringTime('01:01')).toBe('00:01:01.000');
      expect(util.secondsToStringTime('01:01.000')).toBe('00:01:01.000');
      expect(util.secondsToStringTime('00:00:01.000')).toBe('00:00:01.000');
      expect(util.secondsToStringTime('00:01:01.000')).toBe('00:01:01.000');
      expect(util.secondsToStringTime('01:01:01.000')).toBe('01:01:01.000');
      expect(util.secondsToStringTime('01:01:01.123')).toBe('01:01:01.123');
      expect(util.secondsToStringTime('01:01:01.1')).toBe('01:01:01.100');
      expect(util.secondsToStringTime('01:01:01.123456')).toBe('01:01:01.123');
      expect(util.secondsToStringTime('11:11:11')).toBe('11:11:11.000');
      expect(util.secondsToStringTime('1:1:1.1')).toBe('01:01:01.100');
    });
  });

  describe('recieved incorrect time', () => {
    it('returns zero time', () => {
      expect(util.secondsToStringTime('')).toBe('00:00:00.000');
      expect(util.secondsToStringTime('aaa')).toBe('00:00:00.000');
      expect(util.secondsToStringTime('a12aa')).toBe('00:00:00.000');
      expect(util.secondsToStringTime('12.34.567')).toBe('00:00:00.000');
      expect(util.secondsToStringTime('12:34:56:78')).toBe('00:00:00.000');
    });
  });
});
