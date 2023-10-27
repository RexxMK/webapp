import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Drink from "../components/Drink";


// DKK


export default function Detaljeside() {



  // Drinken med det rigtige id hentes.

  // Kopieret og tilrettet fra SD, Rediger.jsx.
  const params = useParams();
  const [drink, setDrink] = useState({});
  const url =
        `https://webapp-68213-default-rtdb.europe-west1.firebasedatabase.app/drinks/${params.drinkId}.json`;
  
  useEffect(() => {
    async function getDrink() {
      const response = await fetch(url);
      const data = await response.json();
      setDrink(data);
    }
    getDrink();
  }, [url]);



  // Den pågældende drink indsættes i skabelonen for opsætningen af en drinkopskrift, Drink.jsx.
  return (
            
    <section className="op-wrap">
      <Drink key={drink.id} drink={drink} />
    </section>
            
    );
  }
