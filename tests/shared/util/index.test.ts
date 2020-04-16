import * as util from "@/shared/util";
jest.setTimeout(50000);

describe("toSeconds()", () => {
  describe("recieved correct time", () => {
    it("returns correct seconds", () => {
      expect(util.toSeconds(1)).toBe(1);
      expect(util.toSeconds(1.1)).toBe(1.1);
      expect(util.toSeconds(61)).toBe(61);
      expect(util.toSeconds(3661)).toBe(3661);
      expect(util.toSeconds("1")).toBe(1);
      expect(util.toSeconds("1.1")).toBe(1.1);
      expect(util.toSeconds("01:01")).toBe(61);
      expect(util.toSeconds("01:01.000")).toBe(61);
      expect(util.toSeconds("00:00:01.000")).toBe(1);
      expect(util.toSeconds("00:01:01.000")).toBe(61);
      expect(util.toSeconds("01:01:01.000")).toBe(3661);
      expect(util.toSeconds("01:01:01.123")).toBe(3661.123);
      expect(util.toSeconds("01:01:01.1")).toBe(3661.1);
      expect(util.toSeconds("01:01:01.123456")).toBe(3661.123);
      expect(util.toSeconds("11:11:11")).toBe(40271);
      expect(util.toSeconds("1:1:1.1")).toBe(3661.1);
    });
  });

  describe("recieved incorrect time", () => {
    it("returns zero second", () => {
      expect(util.toSeconds("")).toBe(0);
      expect(util.toSeconds("aaa")).toBe(0);
      expect(util.toSeconds("a12aa")).toBe(0);
      expect(util.toSeconds("12.34.567")).toBe(0);
      expect(util.toSeconds("12:34:56:78")).toBe(0);
    });
  });
});

describe("toFormattedTime()", () => {
  describe("recieved correct time", () => {
    it("returns correct formatted time", () => {
      expect(util.toFormattedTime(1)).toBe("00:00:01.000");
      expect(util.toFormattedTime(1.1)).toBe("00:00:01.100");
      expect(util.toFormattedTime(61)).toBe("00:01:01.000");
      expect(util.toFormattedTime(3661)).toBe("01:01:01.000");
      expect(util.toFormattedTime("1")).toBe("00:00:01.000");
      expect(util.toFormattedTime("1.1")).toBe("00:00:01.100");
      expect(util.toFormattedTime("61")).toBe("00:01:01.000");
      expect(util.toFormattedTime("3661")).toBe("01:01:01.000");
      expect(util.toFormattedTime("01:01")).toBe("00:01:01.000");
      expect(util.toFormattedTime("01:01.000")).toBe("00:01:01.000");
      expect(util.toFormattedTime("00:00:01.000")).toBe("00:00:01.000");
      expect(util.toFormattedTime("00:01:01.000")).toBe("00:01:01.000");
      expect(util.toFormattedTime("01:01:01.000")).toBe("01:01:01.000");
      expect(util.toFormattedTime("01:01:01.123")).toBe("01:01:01.123");
      expect(util.toFormattedTime("01:01:01.1")).toBe("01:01:01.100");
      expect(util.toFormattedTime("01:01:01.123456")).toBe("01:01:01.123");
      expect(util.toFormattedTime("11:11:11")).toBe("11:11:11.000");
      expect(util.toFormattedTime("1:1:1.1")).toBe("01:01:01.100");
    });
  });

  describe("recieved incorrect time", () => {
    it("returns zero time", () => {
      expect(util.toFormattedTime("")).toBe("00:00:00.000");
      expect(util.toFormattedTime("aaa")).toBe("00:00:00.000");
      expect(util.toFormattedTime("a12aa")).toBe("00:00:00.000");
      expect(util.toFormattedTime("12.34.567")).toBe("00:00:00.000");
      expect(util.toFormattedTime("12:34:56:78")).toBe("00:00:00.000");
    });
  });
});
