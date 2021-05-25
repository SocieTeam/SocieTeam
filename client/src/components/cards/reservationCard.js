import { useHistory } from 'react-router-dom';
import {GridList, GridListTile, GridListTileBar} from '@material-ui/core';

function ReservationCard(props) {

    const history = useHistory()
    const { title, time_start, username, id, image } = props.event
    console.log(image);

    function clickHandler () {
        history.push(`/event/${id}`)
    }

    return (
        <GridListTile onClick={clickHandler} className="feed-reservation-card" style={{maxWidth: '200px', maxHeight: '200px'}}>
            <img src={image} alt = 'event'></img>
            <GridListTileBar className="card-details" title = {`${title}, ${new Date(time_start).toLocaleDateString()}`}>
                <span className="card-date">{new Date(time_start).toLocaleDateString()}</span>
            </GridListTileBar>
        </GridListTile>
    )
}

export default ReservationCard