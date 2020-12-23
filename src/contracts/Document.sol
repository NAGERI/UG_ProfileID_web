// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.8.0;

contract Document {
  string documentHash;
  string imageHash;
  string profile;

  function setImage(string memory _imageHash) public {
    imageHash = _imageHash;
  }

  function getImage() public view returns (string memory) {
    return imageHash;
  }

  function setProfile(string memory _profile) public {
    profile = _profile;
  }

  function getProfile() view public returns (string memory){
    return profile;
  }

  function setDocument( string memory _documentHash) public{
    documentHash = _documentHash;
  }

  function getDocument() view public returns (string memory){
    return documentHash;
  }

}
