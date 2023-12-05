import abi from "./contracts/CrowdFunding.json";
import { useState } from "react";
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
  const [walletConnected, setWalletConnected] = useState(false);

  const connectWallet = async () => {
    const contractAddress = "0xfE43401dD548F958e20503376F2D4EA8386185ed";
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
        setWalletConnected(true);
      } else {
        alert("Please install metamask");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {walletConnected ? (
        <div className="App">
          <div className="App-header">
            <h1>
              Crowd<span className="blue">Funding</span>
            </h1>
            <h3>A Permanent Repository for Charitable Contributions</h3>

            <p className="App-connection">
              {" "}
              <span className="blue">Connected Account:</span>{" "}
              {String(account).toUpperCase()}
            </p>
            <br/>

            <Buy state={state} />
            <Contributers state={state} />
          </div>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default App;
