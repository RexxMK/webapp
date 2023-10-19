import Dumb from '../img/tomside-light.png'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import StarRating from './StarRating';

//SD

export default function Opskrift() {
    return (
        <section className='op-wrap'>
        <button className='back'>
            <ArrowBackRoundedIcon/>
        </button>
        <img src={Dumb} className='opimg'/>
        <div className='fixedMargin'>
        <div className='opheader'>
            <h2>Gin Hass</h2>
            <div className='op-like'>
                <FavoriteRoundedIcon/>
            </div>
        </div>
        <h3>Ingredienser</h3>
        <ul className='items'>
            <li>4 cl Gin</li>
            <li>2 cl Mangosirup</li>
            <li>1 Lime</li>
            <li>10 cl Lemon sodanvand</li>
        </ul>
        <h3>Fremgangsmåde</h3>
        <ol className='howto'>
            <li>Skær limefrugten over og skær et par tynde skiver af den ene halvdel.</li>
            <li>Kom gin, mangosirup og saften fra en halv lime i et glas og rør godt rundt.</li>
            <li>Tilføj isterninger og top op med lemonsodavand og pynt med limeskiver og evt. en kvist mynteblade.</li>
        </ol>
        <h3>Bedømmelse</h3>
        <StarRating/>
        </div>
        </section>
    )
}