import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";

// RMK

//CardRating tager en enkelt prop, cardId, som identificerer det kort, som vurderingen refererer til
export default function CardRating({ cardId }) {
  //localStorageKey dannes ved at tilføje cardId til en string, der bruges som en key til at gemme rating for hvert kort
  const localStorageKey = `cardRating_${cardId}`;

  //useState bruges til at oprette en tilstand, rating, som indeholder ratingværdien for det pågældende kort
  const [rating, setRating] = useState(() => {
    //Den starter med at hente rating fra localStorage, og hvis den ikke findes, er den som standard null
    const storedRating = localStorage.getItem(localStorageKey);
    return storedRating ? parseInt(storedRating, 10) : null;
  });

  //useEffect reagerer på ændringer i rating og opdaterer localStorage med den nye ratingværdi
  //Det sikrer, at ratingen for hvert kort gemmes separat
  useEffect(() => {
    if (rating !== null) {
      localStorage.setItem(localStorageKey, rating);
    }
  }, [rating, localStorageKey]);

  // RMK & SD

  return (
    <>
      {/*En måde at have 5 af det samme element uden at indsette det 5 gange 
        Med at lave en empty array hvor jeg så skriver hvor mange gange je vil at det skal indsettes*/}
      {[...Array(5)].map((star, i) => {
        {
          /*I arrays er første element altid value 0, med at sige i + 1, sikkrer vi at første element er value 1 
            Det gør vi fordi vi vil at første stjerne siger 1 ud af 5 stjerner og ikke 0*/
        }
        const ratingValue = i + 1;
        return (
          <label className="rate" key={ratingValue}>
            {/*Når du klikker på en stjerne skifter du state value til det value stjernen er */}
            <input
              type="radio"
              name={`rating_${cardId}`}
              value={ratingValue}
              //Når man klikker på en stjerne, opdateres rating til stjernens værdi ved hjælp af setRating(ratingValue)
              //Dette skifter stjernernes farve og markerer dem som vurderet
              onClick={() => setRating(ratingValue)}
              //defaultChecked bruges til at markere den korrekte stjerne baseret på den aktuelle rating
              defaultChecked={ratingValue === rating}
            />
            {/*Med farven siger vi om value som er mindre eller lig med ratingValue skal være gul
                og om value ikke er nogle af tingene så forbliver den grå
                ? er en if statement og : er else*/}
            <FaStar
              size={20}
              color={ratingValue <= rating ? "#EDBB59" : "var(--menu-color)"}
            />
          </label>
        );
      })}
    </>
  );
}
