import { NavLink } from "react-router-dom"

export default function Navigation() {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/lykken">Prøv lykken</NavLink>
            <NavLink to="/find">Find drink</NavLink>
            <NavLink to="/tilfoj">Tilføj</NavLink>
            <NavLink to="/favoritter">Favoritter</NavLink>
        </nav>
    )
}