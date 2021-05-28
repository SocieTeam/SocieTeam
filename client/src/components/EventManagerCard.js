import { useHistory } from 'react-router-dom';
import close from '../assets/images/close.svg'
import edit from '../assets/images/edit.svg'

function EventManagerCard (props) {

    const history = useHistory()
    const token = JSON.parse(localStorage.getItem('societeam-token')).token
    const auth = `Bearer ${token}` 

    const { event, eventType } = props

    function eventClickHandler () {
        history.push(`/event/${event.id}`)
    }

    function unreserve () {
        const options = {
            method: 'POST',
            headers: {
                authorization: auth
            },
        }
        fetch(`${process.env.REACT_APP_API_URL}/events/${event.id}/reserve`, options)
        .then(res => {
            if (res.ok) {
                res.json().then(json => {
                    history.push('/fake')
                    history.goBack()
                })
            }
        })
    }

    function deleteEvent () {
        const options = {
            method: 'DELETE',
            headers: {
                authorization: auth
            },
        }
        fetch(`${process.env.REACT_APP_API_URL}/events/${event.id}/`, options)
        .then(res => {
            if (res.ok) {
                history.push('/fake')
                history.goBack()
            }
        })
    }

    return (
        <div className="event-card">
            <div onClick={eventClickHandler} className="card-image">
                <img src = {event.image} width = '100%'></img>
            </div>
            <div onClick={eventClickHandler} className="card-info">
                <span className="event-title">{ event.title }</span>
                <div className="event-info">
                {
                    eventType === 'user-event' ? null : <span className="event-host">{event.username}</span>
                }
                    <div className="event-dates">
                        <span className="event-start">{ new Date(event.time_start).toLocaleDateString() }</span>
                        <span>-</span>
                        <span className="event-end">{ new Date(event.time_end).toLocaleDateString() }</span>
                    </div>
                    <div className="event-location">
                        {
                            event.isvirtual ?
                            <span>{`Event Link: ${event.location}`}</span>
                            :
                            <span>{event.location}</span>
                        }
                    </div>
                </div>
            </div>
            <div className="card-options">
                {
                    eventType === 'user-event' ?
                    <>
                        <div onClick={() => {history.push(`/event/${event.id}/edit`)}} className="option-icon">
                            <img src={edit}></img>
                        </div>
                        <div className="option-icon"><img src={close}></img></div>

                    </>
                    :
                    <div onClick={unreserve} className="option-icon"><img src={close}></img></div>
                } 
            </div>
            <style jsx>{`
                .event-card {
                    visibility: inherit;
                    display: flex;
                    align-items: center;
                    height: 10em;
                    width: calc(100% - 1em);
                    margin: 0.5em 0.5em 0 0.5em;
                    border: 1px solid black;
                    border-radius: 2%;
                    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.5);
                    padding: 0.5em;
                    box-sizing: border-box;
                }
                .card-image {
                    background-color: lightgrey;
                    height: 100%;
                    aspect-ratio: 1;
                }
                .card-image img {
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                }
                .card-info {
                    margin-left: 1em;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    flex: 1;
                    font-size: 0.7em;
                    height: 100%;
                }
                .card-options {
                    height: 100%;
                    width: 1.5em;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                }
                .event-title {
                    font-weight: bold;
                    margin-bottom: 0.5em;
                    font-size: 2em;
                }
                .option-icon {
                    width: 100%
                }
                .option-icon img {
                    width: 100%;
                }
                .event-info {
                    font-family: 'Oswald';
                    font-size: 1.5em;
                }
            `}</style>
        </div>
    )
}

export default EventManagerCard