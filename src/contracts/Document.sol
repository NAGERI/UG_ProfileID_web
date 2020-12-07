// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.8.0;

contract Document {
  string documentHash;

  function set(string memory _documentHash) public {
    documentHash = _documentHash;
  }

  function get() public view returns (string memory) {
    return documentHash;
  }
}
