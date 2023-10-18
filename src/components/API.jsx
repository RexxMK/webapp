//https://sailssoftware.com/how-to-integrate-api-in-reactjs-step-by-step-guide/

import React, { useEffect, useState } from "react";

const DrinkList = () => {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    fetch("www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
      .then((response) => response.json())
      .then((data) => setDrinks(data))
      .catch((error) => console.error("Error fetching drinks:", error));
  }, []);

  return (
    <div>
      {drinks.map((drink) => (
        <div key={drink.id}>{drink.name}</div>
      ))}
    </div>
  );
};

export default DrinkList;
