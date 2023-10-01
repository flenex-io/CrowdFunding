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
      {contributers.map((contributers, index) => (
        <div className="contri" key={index}>
          <p>Name: {contributers.name}</p>
          <p>
            Time: {new Date(contributers.timestamp * 1000).toLocaleString()}
          </p>
          <p>
            From: {contributers.from.slice(0, 4).toUpperCase()}...
            {contributers.from.slice(-4).toUpperCase()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Contributers;
