import { useNavigate } from "react-router-dom";
import RedigerOpskrift from "../components/RedigerOpskrift";

//SD

export default function NyDrink() {
    const navigate = useNavigate();
    
    // Ved brug af use navigate kan vi lave en go back knap
    // Så ved tryk af knappen navigerer hjemmesiden dig til den side du var sidst på
    const history = useNavigate();
    
    async function createTilfoj(newTilfoj) {
        newTilfoj.uid = "0";
        
        const url = "https://webapp-68213-default-rtdb.europe-west1.firebasedatabase.app/tilfoj.json";
        
        const response = await fetch(url, {
            method: "POST", 
            body: JSON.stringify(newTilfoj) 
        });
        const data = await response.json();
        console.log(data);
        navigate("/tilfoj");
    }

    return (
       <section> 
            <RedigerOpskrift saveTilfoj={createTilfoj} />
            <button type="submit" className="buttonEmpty" onClick={() => history(-1)}>Fortryd</button>
       </section>
    );
}