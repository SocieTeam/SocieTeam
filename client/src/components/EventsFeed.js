import StateContext from './contexts/StateContext'
import ReservationCard from './cards/reservationCard';
import { useState, useEffect, useContext } from 'react';
import OtherEventCard from './cards/otherEventsCard';

function EventFeed() {

    const { loggedUser, setNavbarLinks } = useContext(StateContext)
    
    const [reservations, setRes] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {

        if (!loggedUser) return

        const token = JSON.parse(localStorage.getItem('societeam-token')).token
        const options = {
            headers: {
                authorization: `Bearer ${token}`
            }
        }

        setNavbarLinks(['eventsFeed', 'eventManager'])
        fetch(`${process.env.REACT_APP_API_URL}/users/${loggedUser.id}/reservations`, options)
        .then(res => {
            if (res.ok) {
                res.json().then(json => {
                    setRes(json.reservations)
                })
            } else {
                console.log('something got fudged')
            }
        })
        fetch(`${process.env.REACT_APP_API_URL}/events`)
        .then(results => results.json())
        .then(data => {
            setEvents(data);
        })
    }, [loggedUser])

    return (
        <div className="top-level">
            <div className="title-banner">
                <h1>Event Feed</h1>
            </div>
            <h3 style={{textAlign: 'center'}}>Upcoming Reservations</h3>
            <div className="reservations">
                {
                    reservations.map(event => <ReservationCard key={event.title} event={event}/>)
                }
            </div>
            <h3 style={{textAlign: 'center'}}>Discover Events</h3>
            <div className="events">
                {
                    events.map(event => <OtherEventCard key={event.title} event={event}/>)
                }
            </div>
            <style jsx>{`
                .top-level {
                    display: flex;
                    flex-direction: column;
                    overflow-y: scroll;
                    height: 100%;
                    padding: 0.5em;
                }
                .title-banner {
                    display: flex;
                    justify-content: center;
                    margin-top: 1em;
                }
                .title-banner h1 {
                    margin: 0;
                    border-bottom: 1px solid black;
                }
                .reservations {
                    height: 15em;
                    display: flex;
                    align-items: center;
                    border: 1px solid black;
                    overflow-x: scroll;
                    padding: 0.5em;
                    flex-shrink: 0;
                }
                .events {
                    padding: 0 0.5em 0.5em 0.5em;
                    border: 1px solid black;
                }
            `}</style>
        </div>
    )
}

export default EventFeed;