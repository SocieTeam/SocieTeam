import { useHistory } from 'react-router-dom';

function ReservationCard(props) {

    const history = useHistory()
    const { title, time_start, username, id } = props.event

    function clickHandler () {
        history.push(`/event/${id}`)
    }

    return (
        <div onClick={clickHandler} className="feed-reservation-card">
            <div className="card-image">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/SunsetPark.jpg/290px-SunsetPark.jpg"></img>
            </div>
            <div className="card-details">
                <span className="card-title">{title}</span>
                <span className="card-date">{new Date(time_start).toLocaleDateString()}</span>
                <span className="card-host">{username}</span>
            </div>
            <style jsx>{`
                .feed-reservation-card {
                    display: flex;
                    flex-direction: column;
                    height: 95%;
                    width: 10em;
                    border: 1px solid black;
                    margin-right: 0.5em;
                    flex-shrink: 0;
                }
                .card-image {
                    height: 50%;
                    width: 100%;
                    border-bottom: 3px solid black;
                }
                .card-image img {
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                }
                .card-details {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: center;
                }
                .card-title {
                    font-weight: bold;
                    overflow: hidden;
                }
            `}</style>
        </div>
    )
}

export default ReservationCard