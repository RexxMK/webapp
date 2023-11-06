import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Drink from "../components/Drink";


// DKK


export default function LykkenDetaljeside() {



  // Drinken med det rigtige id hentes.

  // Kopieret og tilrettet fra SD, Rediger.jsx.
  const params = useParams();
  const [currentDrink, setCurrentDrink] = useState({});
  const url =
        `https://webapp-68213-default-rtdb.europe-west1.firebasedatabase.app/drinks/${params.currentDrinkId}.json`;
  
  useEffect(() => {
    async function getCurrentDrink() {
      const response = await fetch(url);
      const data = await response.json();
      setCurrentDrink(data);
    }
    getCurrentDrink();
  }, [url]);

    

  // Den pågældende drink indsættes i skabelonen for opsætningen af en drinkopskrift, Drink.jsx.
  return (
            
    <section className="op-wrap">
      <Drink key={currentDrink.id} drink={currentDrink} />
    </section>
            
    );
  }
