import { FaStar } from 'react-icons/fa'
import { useState } from 'react'

//SD

export default function StarRating () {
    
    {/*useState(null) så at rating er tomt når du aldrig har rated før */}
    const [rating, setRating] = useState(null)
    
    return (
        <>
        {/*En måde at have 5 af det samme element uden at indsette det 5 gange 
        Med at lave en empty array hvor jeg så skriver hvor mange gange je vil at det skal indsettes*/}
        {[...Array(5)].map((star, i) => {
            {/*I arrays er første element altid value 0, med at sige i + 1, sikkrer vi at første element er value 1 
            Det gør vi fordi vi vil at første stjerne siger 1 ud af 5 stjerner og ikke 0*/}
            const ratingValue = i + 1;
            return (
            <label className='rate'> 
                {/*Når du klikker på en stjerne skifter du state value til det value stjernen er */}
                <input type='radio' name='rating' value={ratingValue} 
                onClick={() => setRating(ratingValue)}/>
                {/*Med farven siger vi om value som er mindre eller lig med ratingValue skal være gul
                og om value ikke er nogle af tingene så forbliver den grå
                ? er en if statement og : er else*/}
                <FaStar size={35} color={ratingValue <= rating ? "#EDBB59" : "var(--menu-color)"} /> 
            </label>
            )
        }
        )}
        </>
    )
}