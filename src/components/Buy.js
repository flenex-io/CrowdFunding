import { ethers } from "ethers";
import { useState, useEffect } from "react";

const Buy = ({ state }) => {
  const [raisedAmount, setRaisedAmount] = useState(0);
  const [donationAmount, setDonationAmount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedAmount = localStorage.getItem("raisedAmount");
    if (storedAmount) {
      setRaisedAmount(parseFloat(storedAmount));
    }
  }, []);

  const sendDonation = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { contract } = state;
    const name = document.querySelector("#name").value;
    console.log(name, contract);

    if (!donationAmount) {
      setLoading(false);
      alert("Please enter a valid donation amount");
      return;
    }

    const parsedAmount = ethers.utils.parseEther(donationAmount.toString());
    const amount = { value: parsedAmount };

    const updatedAmount = raisedAmount + parseFloat(donationAmount);

    const transaction = await contract.sendDonation(name, amount);
    await transaction.wait();
    setLoading(false);
    alert("Transaction done");
    localStorage.setItem("raisedAmount", updatedAmount.toString());
    setRaisedAmount(updatedAmount);
  };

  const handleDonationChange = (event) => {
    setDonationAmount(event.target.value);
  };

  return (
    <>
      <div className="App-button-box">
        <h6>Raising Amount: 30 ETH</h6>
        <h6>Raised Amount: {raisedAmount}</h6>
        {loading && <div className="loading-animation"></div>}
        <form onSubmit={sendDonation}>
          <div className="mb-3">
            <input type="text" id="name" placeholder="Enter Your Name" />
            <input
              type="number"
              id="number"
              placeholder="Enter The Amount"
              value={donationAmount}
              onChange={handleDonationChange}
              step={0.01}
              defaultValue={0.01}
            />
          </div>
          <button type="submit" disabled={!state.contract}>
            Pay
          </button>
        </form>
      </div>
    </>
  );
};

export default Buy;
