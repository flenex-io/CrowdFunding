import abi from "./contracts/CrowdFunding.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Contributers from "./components/Contributers";
import "./components/Main.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("No account connected");

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xCCEa6E4A3134726FBb66b90B8145BD126362a1aD";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  const checkConnectedWallet = async () => {
    const { ethereum } = window;
    if (ethereum && ethereum.selectedAddress) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedAccount = await signer.getAddress();
      setState({ provider, signer, connectedAccount });
    }
  };

  useEffect(() => {
    checkConnectedWallet();
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <h1>
          Crowd<span className="blue">Funding</span>
        </h1>
        <h4>A Permanent Repository for Charitable Contributions</h4>

        {/* <div className="Account"> */}
          <p className="App-connection"> <span className="blue">Connected Account:</span> {String(account).toUpperCase()}</p>
        {/* </div> */}

        <Buy state={state} />
        <Contributers state={state} />
      </div>
    </div>
  );
}

export default App;
