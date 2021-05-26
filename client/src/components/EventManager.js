import StateContext from './contexts/StateContext'
import { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import EventManagerCard from './EventManagerCard'

function EventManager () {

    const { loggedUser, setNavbarLinks, eventManagerPane, setEventManagerPane } = useContext(StateContext)

    const [reservedEvents, setReservedEvents] = useState([])
    const [userEvents, setUserEvents] = useState([])

    useEffect(() => {
        setNavbarLinks(['eventManager', 'eventsFeed'])
        if (!loggedUser) return

        const token = JSON.parse(localStorage.getItem('societeam-token')).token
        const options = {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
        fetch(`${process.env.REACT_APP_API_URL}/users/${loggedUser.id}/reservations`, options)
        .then(res => {
            if (res.ok) {
                res.json().then(json => {
                    setReservedEvents(json.reservations)
                })
            } else {
                console.log(res)
            }
        })
        fetch(`${process.env.REACT_APP_API_URL}/users/${loggedUser.id}/events`, options)
        .then(res => {
            if (res.ok) {
                res.json().then(json => {
                    setUserEvents(json.events)
                })
            } else {
                console.log(res)
            }
        })
    }, [loggedUser])
    
    return (
        <div className="top-level">
            <div className="title-banner">
                <h1>Event Manager</h1>
                <hr/>
            </div>
            <div className="new-event-button">
                <Link className="link" to='/newEvent'>
                    <div className="new-event-inner">New Event +</div>
                </Link>
            </div>
            <div className="event-section">
                <div className="event-tabs">
                    <div 
                    className={`event-tab ${eventManagerPane === 'reservations' ? 'active-tab' : ''}`}
                    onClick={()=> {setEventManagerPane('reservations')}}
                    >Reservations</div>
                    <div 
                    className={`event-tab ${eventManagerPane === 'user-events' ? 'active-tab' : ''}`}
                    onClick={()=> {setEventManagerPane('user-events')}}
                    >My Events</div>
                </div>
                <div 
                // style={{visibility: eventManagerPane === 'reservations' ? 'flex' : 'none'}} 
                className={`pane reservations-pane ${eventManagerPane === 'reservations' ? '' : 'hidden'}`}
                >
                    {
                        reservedEvents.map(event => <EventManagerCard key={event.id} eventType="reservation" event={event}/>)
                    }
                </div>
                <div 
                // style={{visibility: eventManagerPane === 'user-events' ? 'flex' : 'none'}}
                className={`pane user-events-pane ${eventManagerPane === 'user-events' ? '' : 'hidden'}`}
                >
                    {
                        userEvents.map(event => <EventManagerCard key={event.id} eventType="user-event" event={event}/>)
                    }
                </div>
            </div>
            <style jsx>{`
                .top-level {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    height: 100%;
                    padding: 5%;
                    overflow-y: hidden;
                }
                .title-banner h1 {
                    margin: 0;
                }
                .event-section {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    flex: 1;
                    align-items: center;
                    
                    margin-top: 1em;
                    overflow-y: hidden;
                }
                .event-tabs {
                    display: flex;
                    width: 100%;
                }
                .event-tab {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 50%;
                    border: 1px solid black;
                    text-align: center;
                    height: 2em;
                }
                .active-tab {
                    background-color: black;
                    color: white;
                }
                .pane {
                    overflow-y: scroll;
                    flex-direction: column;
                    flex: 1;
                    width: 100%;
                }
                .new-event-button a {
                    text-decoration: none;
                }
                .new-event-inner {
                    padding: 0.5em;
                    color: white;
                    background-color: black;
                    border-radius: 5px;
                    border: 1px solid black;
                }
                .new-event-inner :hover{
                    color: black;
                    background-color: white;
                }
                .hidden {
                    position: absolute;
                    visibility: hidden;
                    overflow-y: hidden;
                }
            `}</style>
        </div>
    )
}

export default EventManager