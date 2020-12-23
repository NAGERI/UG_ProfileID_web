const { assert } = require("chai");
const _deploy_contracts = require("../migrations/2_deploy_contracts");

const Document = artifacts.require("Document");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("Document", accounts => {
  let document;

  before(async () => {
    document = await Document.deployed();
  });

  describe("deployment", async () => {
    it("deployes successfully", async () => {
      const address = document.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });
  });

  describe("storage", async () => {
    it("updates documentHash", async () => {
      let documentHash;

      documentHash = "abc123";
      await document.setDocument(documentHash);
      const result = await document.getDocument();
      assert.equal(result, documentHash);
    });
  });

  describe("profile storage", async () => {
    it("updates profile JSON", async () => {
      let profile;

      profile = JSON.stringify({ name: "Francis", age: 12 });
      await document.setProfile(profile);
      const result = await document.getProfile();
      assert.equal(result, profile);
      console.log(result);
    });
  });
});
