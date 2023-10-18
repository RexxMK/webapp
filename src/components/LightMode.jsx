import React from "react";
import "./LightMode.css";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const LightMode = () => {
    
    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light')
    };

    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark')
    };

    const toggleTheme = e =>{
        if (e.target.checked) setLightMode();
        else setDarkMode();
    };
    
    return (
        <div className="light_mode">
            <input className="light_mode_input" type="checkbox" id="lightmode-toggle" onChange={toggleTheme}/>
            <label className="light_mode_label" for="lightmode-toggle">
                <LightModeIcon className="modeIcon sunIcon" />
                <DarkModeIcon className="modeIcon moonIcon" />
            </label>
        </div>
    )
}

export default LightMode;
