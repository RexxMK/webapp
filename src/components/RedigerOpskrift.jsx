import { useEffect, useState } from "react";

//SD

export default function RedigerOpskrift({ saveTilfoj, tilfoj }){
    const [navn, setNavn] = useState("");
    const [ingridienser, setIngridienser] = useState("");
    const [metode, setMetode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


useEffect(() => {
    if (tilfoj) {
        setNavn(tilfoj.navn);
        setIngridienser(tilfoj.ingr);
        setMetode(tilfoj.metode);
    } 
}, [tilfoj]);

async function handleSubmit(e) {
    e.preventDefault();
    const formData = {
        navn: navn,
        ingridienser: ingridienser,
        metode: metode
    }

   const validForm = formData.navn && formData.ingr && formData.metode;
   if (validForm) {
    saveTilfoj(formData);
   } else {
    setErrorMessage("Please, fill in all fields.");
   }
}

return (
    <form onSubmit={handleSubmit}>
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
