import { useState, useEffect } from "react";

const Contributers = ({ state }) => {
  const [contributers, setContributers] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (contract) {
          const contributersData = await contract.getContributers();
          setContributers(contributersData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [contract]);

  return (
    <div className="contri-container">
      <h2>Contributers</h2>
      {contributers.map((contributor, index) => (
        <a
          href={`https://sepolia.etherscan.io/address/${contributers[index].from}`}
        >
          <div className="contri" key={index}>
            <p>Name: {contributor.name}</p>
            <p>
              Time: {new Date(contributor.timestamp * 1000).toLocaleString()}
            </p>
            <p>
              From: {contributor.from.slice(0, 4).toUpperCase()}...
              {contributor.from.slice(-4).toUpperCase()}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Contributers;
