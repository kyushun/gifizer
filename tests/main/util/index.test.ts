import * as util from "@/main/util/index";
jest.setTimeout(50000);

describe("packageJson()", () => {
  it("app name", () => {
    expect(util.packageJson().name).toBe("gifizer");
  });
});

describe("calcfps()", () => {
  it("fps", () => {
    const fps = util.calcfps("30/1");
    expect(fps).toBe(30);
  });

  it("invalid format", () => {
    const fps = util.calcfps("30");
    expect(fps).toBe(0);
  });
});
