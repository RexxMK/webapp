import { useNavigate } from "react-router-dom";
import RedigerOpskrift from "../components/RedigerOpskrift";

//SD

export default function NyDrink() {
    const navigate = useNavigate();
    
    async function createTilfoj(newTilfoj) {
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
        <h1>Create New Translation</h1>
            <RedigerOpskrift saveTilfoj={createTilfoj} />
       </section>
    );
}