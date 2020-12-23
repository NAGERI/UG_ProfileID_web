import React, { Component } from "react";
import Web3 from "web3";
import { FormData } from "./FormData";
// import { request } from "./mailJetEmail";
import { ipfs } from "./constants";
import "./App.css";

import Document from "../abis/Document.json";
// import { send } from "./mailJetEmail";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  constructor(props) {
    super(props);

    this.state = {
      imageHash: "",
      documentHash: "",
      contract: null,
      web3: null,
      imageBuffer: null,
      documentbuffer: null,
      account: null,
      inputResult: ""
    };
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });
    const networkId = await web3.eth.net.getId();
    const networkData = Document.networks[networkId];
    console.log(networkData);
    if (networkData) {
      const contract = web3.eth.Contract(Document.abi, networkData.address);
      this.setState({ contract });
      const ImageHash = await contract.methods.getImage().call();
      this.setState({ imageHash: ImageHash });

      // the profile details
      console.log(await contract.methods.getProfile().call());
    } else {
      window.alert(
        "Smart contract not deployed to detected network or start Local blockchain (Ganache). "
      );
    }
  }

  onSubmit = event => {
    event.preventDefault();
    console.log("Submitting file to ipfs...");

    // send();

    ipfs.add(this.state.imageBuffer, (error, result) => {
      console.log("Ipfs image result", result);
      if (error) {
        console.error(error);
        return;
      }
      this.state.contract.methods
        .setImage(result[0].hash)
        .send({ from: this.state.account })
        .then(r => {
          return this.setState({ imageHash: result[0].hash });
        });
    });

    ipfs.add(this.state.documentbuffer, (error, result) => {
      console.log("Ipfs document result", result);
      if (error) {
        console.error(error);
        return;
      }
      this.state.contract.methods
        .setDocument(result[0].hash)
        .send({ from: this.state.account })
        .then(r => {
          return this.setState({ documentHash: result[0].hash });
        });
    });

    this.state.contract.methods
      .setProfile(JSON.stringify(this.state.inputResult))
      .send({ from: this.state.account });

    window.alert("Form Submitted Susscessfully");
    event.target.reset();
  };

  // failing to upload to IPFS
  captureDocument = event => {
    event.preventDefault();
    const file = event.target.files[0];
    const docReader = new window.FileReader();
    docReader.readAsArrayBuffer(file);
    try {
      docReader.onloadend = () => {
        this.setState({ documentbuffer: Buffer(docReader.result) });
        console.log("Document buffer", this.state.documentbuffer);
      };
    } catch (error) {
      console.error("Failed to upload -> ", error);
    }
  };

  captureImageFile = event => {
    event.preventDefault();
    console.log("file Uploaded");
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    try {
      reader.onloadend = () => {
        this.setState({ imageBuffer: Buffer(reader.result) });
        console.log("Image buffer", this.state.imageBuffer);
      };
    } catch (error) {
      console.error(error);
    }
  };

  getResult = data => {
    this.setState({ inputResult: data });
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            UG Profile ID
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <img
                  src={`https://ipfs.infura.io/ipfs/${this.state.imageHash}`}
                  className="App-logo"
                  alt="User_Picture"
                />
                <div className="card, container-fluid">
                  <FormData
                    captureImageFile={this.captureImageFile}
                    captureDocument={this.captureDocument}
                    onSubmit={this.onSubmit}
                    getResult={this.getResult}
                  />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
