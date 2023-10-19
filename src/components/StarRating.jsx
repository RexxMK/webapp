import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';

export default function StarRating () {
    return (
        <>
        {/*En måde at have 5 af det samme element uden at indsette det 5 gange */}
        {[...Array(5)].map((star) => {
            return (
            <label className='rate'> 
                <input type='radio' name='rating'/>
                <StarBorderRoundedIcon/> 
            </label>
            )
        }
        )}
        </>
    )
}