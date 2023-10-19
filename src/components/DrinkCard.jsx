import StarBorderIcon from '@mui/icons-material/StarBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

//SD

export default function DrinkCard (props) {
    return (
        <div className='drinkcard'>
            <div className='like'>
            <FavoriteIcon/>
            </div>
            <img src={props.img} className='drinkimg'/>
            <h3 className='drinkheader'>{props.titel}</h3>
            <div className='star-wrap'>
                <StarBorderIcon/>
                <StarBorderIcon/>
                <StarBorderIcon/>
                <StarBorderIcon/>
                <StarBorderIcon/>
            </div>
        </div>
    )
}