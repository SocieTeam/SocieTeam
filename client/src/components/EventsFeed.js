import StateContext from './contexts/StateContext'
import ReservationCard from './cards/reservationCard';
import { useState, useEffect, useContext } from 'react';
import OtherEventCard from './cards/otherEventsCard';

function EventFeed() {
    const { loggedUser } = useContext(StateContext);
    const [reservations, setRes] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/users/${loggedUser.id}/reservations`)
        .then(results => results.json())
        .then(data => {
            setRes(data.reservations);
        });

        fetch('http://localhost:5000/events')
        .then(results => results.json())
        .then(data => {
            setEvents(data);
        })
    }, [])

    return (
        <div>
            <h1>Reservations</h1>
            <div>
                {reservations.map(event => <ReservationCard event = {event}/>)}
            </div>
            <h1>Other Events</h1>
            <div>
                {events.map(event => <OtherEventCard event = {event}/>)}
            </div>
        </div>
    )
}

export default EventFeed;