import StateContext from './contexts/StateContext'
import ReservationCard from './cards/reservationCard';
import { useState, useEffect, useContext } from 'react';
import OtherEventCard from './cards/otherEventsCard';
import {Container, Card, CardContent, Typography, GridList, makeStyles} from '@material-ui/core';

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
        fetch(`${process.env.REACT_APP_API_URL}/users/${loggedUser.id}/feed`)
        .then(results => results.json())
        .then(data => {
            setEvents(data);
            // console.log(data);
        })
    }, [loggedUser])

    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
          overflow: 'hidden',
          backgroundColor: theme.palette.background.paper,
        },
        gridList: {
          flexWrap: 'nowrap',
          // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
          transform: 'translateZ(0)',
        }
      }));

      const classes = useStyles()

    return (
        <Container component='main' maxWidth='md'>
            <div className="title-banner">
                <h1>Event Feed</h1>
            </div>
            <h3 style={{textAlign: 'center'}}>Upcoming Reservations</h3>
            <div className={classes.root} style={{textAlign: 'center'}}>
                
                
                {   reservations.length ?
                    <GridList cols='2.5' className={classes.gridList}>
                        {reservations.map(event => <ReservationCard key={event.title} event={event}/>)}
                    </GridList>
                    :
                    <Card variant='outlined'>
                        <CardContent>
                            <Typography>You Have No Reservations</Typography>
                        </CardContent>
                    </Card>
                }
            </div>
            <h3 style={{textAlign: 'center'}}>Discover Events</h3>
            <div className="events">
                {
                    events.map(event => <OtherEventCard key={event.title} event={event}/>)
                }
            </div>
        </Container>
    )
}

export default EventFeed;