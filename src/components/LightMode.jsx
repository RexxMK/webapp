// Kilde: https://www.youtube.com/watch?v=Uz35Qiia84g

import React from "react";
import "./LightMode.css";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

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
    const toggleTheme = e => {
        if (e.target.checked) setLightMode();
        else setDarkMode();
    };
    
    return (
        <div className="light_mode">
            <input className="light_mode_input" type="checkbox" id="lightmode-toggle" onChange={toggleTheme}/>
            <label className="light_mode_label" for="lightmode-toggle">
                <DarkModeIcon className="modeIcon moonIcon" />
                <LightModeIcon className="modeIcon sunIcon" />
            </label>
        </div>
    )
}

export default LightMode;
