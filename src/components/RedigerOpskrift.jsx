import { useEffect, useState } from "react";
import imgPlaceholder from "../img/app-fav.png"

//SD

export default function RedigerOpskrift({ saveTilfoj, tilfoj }){
    const [billede, setBillede] = useState("");
    const [navn, setNavn] = useState("");
    const [ingridienser, setIngridienser] = useState("");
    const [metode, setMetode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


useEffect(() => {
    if (tilfoj) {
        setBillede(tilfoj.billede);
        setNavn(tilfoj.navn);
        setIngridienser(tilfoj.ingridienser);
        setMetode(tilfoj.metode);
    } 
}, [tilfoj]);

function handleImageChange(event) {
        const file = event.target.files[0];
        if (file.size < 500000) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = event => {
                setImage(event.target.result);
            };
            reader.readAsDataURL(file);
            setErrorMessage("");
        } else {
            setErrorMessage("The image file must be below 0,5 MB");
        }
    }
    async function uploadImage() {
        const url = `https://firebasestorage.googleapis.com/v0/b/webapp-68213.appspot.com/o/${imageFile.name}`;
        const response = await fetch(url, {
            method: "POST",
            body: imageFile,
            headers: { "Content-Type": imageFile.type }
        });
        const data = await response.json();
        console.log(data);
        const imageUrl = `${url}?alt=media`;
        return imageUrl;
    }

async function handleSubmit(e) {
    e.preventDefault();
    const imageUrl = await uploadImage();
    const formData = {
        billede: imageUrl,
        navn: navn,
        ingridienser: ingridienser,
        metode: metode
    }

   const validForm = formData.billede && formData.navn && formData.ingridienser && formData.metode;
   if (validForm) {
    saveTilfoj(formData);
   } else {
    setErrorMessage("Please, fill in all fields.");
   }
}

return (
    <form onSubmit={handleSubmit}>
     <label>
        Image
        <input type="file" className="file-input" accept="billede/*" onChange={handleImageChange} />
        <img className="image-preview" src={billede} alt="Choose" onError={event => (event.target.src = imgPlaceholder)} />
    </label>
     <label>
         Navn<input type="text" name="navn" value={navn} placeholder="Type navn" onChange={e => setNavn(e.target.value)} />
     </label>
     <label>
         Ingridienser<input type="text" name="ingridienser" value={ingridienser} placeholder="Type ingridienser" onChange={e => setIngridienser(e.target.value)} />
     </label>
     <label>
         Fremgangsmåde<input type="text" name="metode" value={metode} placeholder="Type metode" onChange={e => setMetode(e.target.value)} />
     </label>
     <p className="text-error">{errorMessage}</p>
     <button type="submit">Save</button>
     </form>
 );

}
