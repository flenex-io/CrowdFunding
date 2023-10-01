import { ethers } from "ethers";

const Buy = ({ state }) => {
  const sendDonation = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    console.log(name, contract);
    const amount = { value: ethers.utils.parseEther("0.001") };
    const transaction = await contract.sendDonation(name, amount);
    await transaction.wait();
    alert("Transaction done");
  };

  return (
    <>
      <div className="App-button-box">
        <form onSubmit={sendDonation}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Your Name"
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
