import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Drink from "../components/Drink";


// DKK & SD


export default function LykkenDetaljeside() {

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




    // Deler ingredienserne i en liste
    const ingredienserListe = currentDrink.ingredienser.map((ingrediens, index) => (
        <li key={index}>{ingrediens}</li>
    ));

    // Deler metoden i separate <p> elementer
    const metodeAfsnit = currentDrink.metode.map((afsnit, index) => (
        <li key={index}>{afsnit}</li>
    ));

    const history = useNavigate();
    

  
  
  
    return (
            
        <section className="op-wrap">
            
            {/*Vi laver en onclick function
            Så ved klik af knappen så går du et tilbage (-1) af din webbrowser historik*/}
            <button className="back" onClick={() => history(-1)}>
                <ArrowBackRoundedIcon />
            </button>

            <img className="opimg" src={currentDrink.billede} alt="Billede af drink" />
            
            <div className="fixedMargin">
                <div className="opheader">
                    <h2>{currentDrink.navn}</h2>
                    <div className="op-like">
                        <FavoritHjerteDrink />
                    </div>
                </div>
                <h3>Ingredienser</h3>
                <div className="items">
          <ul className="items">{ingredienserListe}</ul>
        </div>
        <h3>Fremgangsmåde</h3>
        <div className="howto">
          <ul>{metodeAfsnit}</ul>
        </div>
        <h3>Bedømmelse</h3>
        <StarRating />
      </div>
    </section>
            
    );
  }

  // <Drink key={currentDrink.id} drink={currentDrink} />
  