import { Link } from 'react-router-dom'
function OtherEventCard (props) {

    return (
        <div style = {{border: '1px solid black'}}>
            <p>{props.event.title}</p>
            <p>Description of the event would go here</p>
            <p>{props.event.time_start}</p>
            <Link to = {`/event/${props.event.id}`}>View Event</Link>
        </div>
    )
}

export default OtherEventCard