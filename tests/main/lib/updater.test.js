import { checkUpdate, __RewireAPI__ as RewireAPI } from "@/main/lib/updater";

const sampleUrl = "http://example.com";

describe("checkUpdate()", () => {
  let currentVersion;
  let result;

  beforeAll(() => {
    RewireAPI.__Rewire__("fetchLatestVersion", () =>
      Promise.resolve({
        tag_name: "v1.1.0",
        html_url: sampleUrl
      })
    );
  });

  beforeEach(async () => {
    RewireAPI.__Rewire__("getCurrentVersion", () => currentVersion);
    result = await checkUpdate();
  });

  describe("when current version is newer", () => {
    beforeAll(() => (currentVersion = "1.2.0"));

    it("returns false", () => {
      expect(result).toBeFalsy();
    });
  });

  describe("when current version is same", () => {
    beforeAll(() => (currentVersion = "1.1.0"));

    it("returns false", () => {
      expect(result).toBeFalsy();
    });
  });

  describe("when current version is older", () => {
    beforeAll(() => (currentVersion = "1.0.0"));

    it("returns url", () => {
      expect(result).toBe(sampleUrl);
    });
  });
});
