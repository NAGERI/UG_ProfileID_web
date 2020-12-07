import React, { Component } from "react";
import Web3 from "web3";
import { FormData } from "./FormData";
import { ipfs, documentUrl } from "./constants";
import "./App.css";

import Document from "../abis/Document.json";

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  constructor(props) {
    super(props);

    this.state = {
      documentHash: "",
      contract: null,
      web3: null,
      buffer: null,
      account: null
    };
    // this.handleAddressChange = this.handleAddressChange.bind(this);
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
    // console.log(networkData," ------------ ", networkId)
    if (networkData) {
      const contract = web3.eth.Contract(Document.abi, networkData.address);
      this.setState({ contract });
      const DocumentHash = await contract.methods.get().call();
      this.setState({ documentHash: DocumentHash });
    } else {
      window.alert(
        "Smart contract not deployed to detected network or start Local blockchain (Ganache). "
      );
    }
  }

  onSubmit = event => {
    event.preventDefault();
    console.log("Submitting file to ipfs...");

    ipfs.add(this.state.buffer, (error, result) => {
      console.log("Ipfs result", result);
      if (error) {
        console.error(error);
        return;
      }
      this.state.contract.methods
        .set(result[0].hash)
        .send({ from: this.state.account })
        .then(r => {
          return this.setState({ documentHash: result[0].hash });
        });
    });
  };

  captureFile = event => {
    event.preventDefault();
    console.log("file Uploaded");
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    try {
      reader.onloadend = () => {
        this.setState({ buffer: Buffer(reader.result) });
        console.log("buffer", this.state.buffer);
      };
    } catch (error) {
      console.error(error);
    }
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
                  src={
                    this.state.documentHash
                      ? `https://ipfs.infura.io/ipfs/${this.state.documentHash}`
                      : documentUrl
                  }
                  className="App-logo"
                  alt="document"
                />
                <div className="card">
                  <div className="container container-fluid">
                    <form onChange={this.onSubmit}>
                      <FormData
                        captureFile={this.captureFile}
                        onSubmit={this.onSubmit}
                      />

                      {/* <input type="submit" value="submit" /> */}
                    </form>
                  </div>
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
