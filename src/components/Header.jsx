// Komponent til logo og light/dark mode knap.

import LightMode from "./LightMode";

// DKK
export default function Header() {

    return (
        <div className="header fixedMargin">
            <p className="logo">Stir it up</p>
            <LightMode /> 
        </div>
    )
}