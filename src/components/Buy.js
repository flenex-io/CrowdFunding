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

    try {
      const parsedAmount = ethers.utils.parseEther(donationAmount.toString());
      const amount = { value: parsedAmount };

      const updatedAmount = raisedAmount + parseFloat(donationAmount);

      const transaction = await contract.sendDonation(name, amount);
      await transaction.wait();

      setLoading(false); // Stop the loading animation on successful transaction
      alert("Transaction done");
      localStorage.setItem("raisedAmount", updatedAmount.toString());
      setRaisedAmount(updatedAmount);
    } catch (error) {
      setLoading(false); // Stop the loading animation on transaction failure
      console.error("Transaction failed:", error.message);
      // You can add additional error handling here if needed
      alert("Transaction failed. Please try again.");
    }
  };

  const handleDonationChange = (event) => {
    setDonationAmount(event.target.value);
  };

  return (
    <>
      <div className="donation-container">
        <div className="App-button-box">
          <h5>Raising Amount: 30 ETH</h5>
          <h5>Amount you donated: {raisedAmount}</h5>
          {loading && <div className="loading-animation"></div>}
          <form onSubmit={sendDonation} className="donation-form">
            <div className="input-group">
              <input
                type="text"
                id="name"
                placeholder="Enter Your Name"
                className="input-field"
              />
              <input
                type="number"
                id="number"
                placeholder="Enter The Amount"
                value={donationAmount}
                onChange={handleDonationChange}
                step={0.01}
                defaultValue={0.01}
                className="input-field"
              />
            </div>
            <button
              type="submit"
              disabled={!state.contract}
              className="donate-button"
            >
              Pay
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Buy;
