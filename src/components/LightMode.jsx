// Kilde: https://www.youtube.com/watch?v=Uz35Qiia84g

import React from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import lightShaker from "../img/lightmodeShaker.gif";
import darkShaker from "../img/darkmodeShaker.gif";
import tomsideLight from "../img/tomside-light.png";
import tomsideDark from "../img/tomside-dark.png";

// DKK

// Funktion til at kunne skifte mellem light og dark mode.
const LightMode = () => {
    
    // Funktion som indstiller temaet til light mode.
    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light')
    };

    // Funktion som indstiller temaet til dark mode.
    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark')
    };

    // Hvis input HTML-tagget under return er checked, skal temaet være light mode. Ellers dark mode.
    // Her sørger vi også for at billeder, der afhænger af light/dark mode skifter.
    const toggleTheme = e => {

        // Definer shakerbillede (ligger under Prøv Lykken).
        const shakerbillede = document.getElementById("shakerbillede");

        // Definer tomsidebillede.
        const tomsidebillede = document.getElementById("tomsidebillede");

        if (e.target.checked) {
            setLightMode();
            console.log("Theme set to light");

            // Hvis shakerbilledet vises på skærmen, så skift det til lightShaker, hvis brugeren ændrer til lightmode.
            if (shakerbillede) {
                shakerbillede.src = lightShaker;
            }

            // Hvis tomsidebilledet vises på skærmen, så skift det til light, hvis brugeren ændrer til lightmode.
            if (tomsidebillede) {
                tomsidebillede.src = tomsideLight;
            }

        } else {
            setDarkMode();
            console.log("Theme set to dark");

            // Hvis shakerbilledet vises på skærmen, så skift det til darkShaker, hvis brugeren ændrer til darkmode.
            if (shakerbillede) {
                shakerbillede.src = darkShaker;
            }

            // Hvis tomsidebilledet vises på skærmen, så skift det til dark, hvis brugeren ændrer til darkmode.
            if (tomsidebillede) {
                tomsidebillede.src = tomsideDark;
            }
        }
    };
    
    return (
        <div className="light_mode">
            <input className="light_mode_input" type="checkbox" id="lightmode-toggle" onChange={toggleTheme}/>
            <label className="light_mode_label" htmlFor="lightmode-toggle">
                <DarkModeIcon className="modeIcon moonIcon" />
                <LightModeIcon className="modeIcon sunIcon" />
            </label>
        </div>
    )
}

export default LightMode;
