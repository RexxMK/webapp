import { useNavigate } from "react-router-dom";
import RedigerOpskrift from "../components/RedigerOpskrift";

//SD

export default function NyOpskrift() {
    const navigate = useNavigate();

    // Function that makes the creation(POST) of a
    // new translation. It receives an object "newPost"
    // that is transferred to the server in the
    // fetch body.
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

    // PostForm.js is implemented and 
    // callback "savePost" holds the 
    // name of the method that creates
    // the new translation.
    return (
       <section className="page">
        <h1>Create New Translation</h1>
            <RedigerOpskrift savePost={createTilfoj} />
       </section>
    );
}