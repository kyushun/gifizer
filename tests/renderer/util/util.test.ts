import path from 'path';

import * as util from '@renderer/util/util';

jest.setTimeout(50000);

declare let window: {
  path: any;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
window = { path };

describe('getFilename()', () => {
  it('returns with new Extension', () => {
    expect(util.getFilename('hoge.png')).toBe('hoge.png');
    expect(util.getFilename('/tmp/hoge.png')).toBe('hoge.png');
    expect(util.getFilename('/tmp/fuga/hoge.png')).toBe('hoge.png');
  });
});

describe('changeExtension()', () => {
  it('returns with new Extension', () => {
    expect(util.changeExtension('hoge.png', 'jpg')).toBe('hoge.jpg');
    expect(util.changeExtension('/tmp/hoge.png', 'jpg')).toBe('/tmp/hoge.jpg');
    expect(util.changeExtension('/tmp/hoge.png.zip', 'jpg')).toBe(
      '/tmp/hoge.png.jpg'
    );
  });
});

describe('zeroPadding()', () => {
  it('returns padding number', () => {
    expect(util.zeroPadding(10, 0)).toBe('10');
    expect(util.zeroPadding(10, 1)).toBe('10');
    expect(util.zeroPadding(10, 2)).toBe('10');
    expect(util.zeroPadding(10, 3)).toBe('010');
    expect(util.zeroPadding(10, 4)).toBe('0010');
  });
});

describe('secToTimeString()', () => {
  it('returns valid time', () => {
    expect(util.secToTimeString(1)).toBe('00:01');
    expect(util.secToTimeString(10)).toBe('00:10');
    expect(util.secToTimeString(61)).toBe('01:01');
    expect(util.secToTimeString(610)).toBe('10:10');

    expect(util.secToTimeString(1.1)).toBe('00:01.1');
    expect(util.secToTimeString(10.1)).toBe('00:10.1');
    expect(util.secToTimeString(61.1)).toBe('01:01.1');
    expect(util.secToTimeString(610.1)).toBe('10:10.1');

    expect(util.secToTimeString(1.1234)).toBe('00:01.123');
    expect(util.secToTimeString(10.1234)).toBe('00:10.123');
    expect(util.secToTimeString(61.1234)).toBe('01:01.123');
    expect(util.secToTimeString(610.1234)).toBe('10:10.123');
  });
});
