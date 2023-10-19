import { NavLink } from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';
import CasinoIcon from '@mui/icons-material/Casino';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';

//SD

export default function Navigation() {
    return (
        <nav className="navbar">
            <NavLink to="/" className="menupunkt">
                <HomeIcon/>
                <p>Hjem</p>
            </NavLink>
            <NavLink to="/lykken" className="menupunkt">
                <CasinoIcon/>
                <p>Prøv lykken</p>
            </NavLink>
            <NavLink to="/find" className="menupunkt">
                <LocalBarIcon/>
                <p>Find drink</p>
            </NavLink>
            <NavLink to="/tilfoj" className="menupunkt sticon">
                <AddIcon/>
                <p>Tilføj</p>
            </NavLink>
            <NavLink to="/favoritter" className="menupunkt">
                <FavoriteIcon/>
                <p>Favoritter</p>
            </NavLink>
        </nav>
    )
}