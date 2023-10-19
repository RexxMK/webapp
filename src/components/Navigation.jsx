import { NavLink } from "react-router-dom"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CasinoIcon from '@mui/icons-material/Casino';
import LocalBarRoundedIcon from '@mui/icons-material/LocalBarRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';


//SD

export default function Navigation() {
    return (
        <nav className="navbar">
            <NavLink to="/" className="menupunkt">
                <HomeRoundedIcon/>
                <p>Hjem</p>
            </NavLink>
            <NavLink to="/lykken" className="menupunkt">
                <CasinoIcon/>
                <p>Prøv lykken</p>
            </NavLink>
            <NavLink to="/find" className="menupunkt">
                <LocalBarRoundedIcon/>
                <p>Find drink</p>
            </NavLink>
            <NavLink to="/tilfoj" className="menupunkt sticon">
                <AddRoundedIcon/>
                <p>Tilføj</p>
            </NavLink>
            <NavLink to="/favoritter" className="menupunkt">
                <FavoriteRoundedIcon/>
                <p>Favoritter</p>
            </NavLink>
        </nav>
    )
}