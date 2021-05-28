import { useHistory } from 'react-router-dom';
import { GridListTile, GridListTileBar, makeStyles } from '@material-ui/core';

function ReservationCard(props) {

    const history = useHistory()
    const { title, time_start, username, id, image } = props.event
    console.log(image);

    function clickHandler () {
        history.push(`/event/${id}`)
    }


    return (
        <GridListTile onClick={clickHandler} className="feed-reservation-card" style={{maxWidth: '200px', maxHeight: '200px', marginRight:'1em'}}>
            <img src={image} alt = 'event'></img>
            <GridListTileBar className="Event-Title" title = {`${title}, ${new Date(time_start).toLocaleDateString()}`}>
                <span className="card-date">{new Date(time_start).toLocaleDateString()}</span>
            </GridListTileBar>
        </GridListTile>
    )
}

export default ReservationCard