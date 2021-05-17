import ReservationCard from './cards/reservationCard';
import { useState, useEffect } from 'react';
import OtherEventCard from './cards/otherEventsCard';

function EventFeed() {

    const [reservations, setRes] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/users/1/reservations') //for now only getting reservations from user id = 1
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