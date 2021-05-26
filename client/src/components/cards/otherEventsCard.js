import { useHistory } from 'react-router-dom'

function OtherEventCard (props) {

    const { title, time_start, username, id, image } = props.event

    const history = useHistory()

    function eventClickHandler () {
        history.push(`/event/${id}`)
    }

    return (
        <div onClick={eventClickHandler} className="feed-event-card">
            <div className="card-image">
                <img src={image}></img>
            </div>
            <div className="card-details">
                <span className="card-title">{title}</span>
                <span className="card-date">{new Date(time_start).toLocaleDateString()}</span>
                <span className="card-host">{username}</span>
            </div>
            <style jsx>{`
                .feed-event-card {
                    display: flex;
                    width: 100%;
                    border: 1px solid black;
                    margin-top: 0.5em;
                    padding: 0.5em;
                    box-sizing: border-box;
                }
                .card-image {
                    width: 8em;
                    height: 8em;
                    border: 3px solid black;
                }
                .card-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .card-details {
                    margin-left: 0.5em;
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                }
                .card-title {
                    font-weight: bold;
                }
            `}</style>
        </div>
    )
}

export default OtherEventCard