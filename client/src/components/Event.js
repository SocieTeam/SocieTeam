import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import StateContext from './contexts/StateContext'
import clock from '../assets/images/clock.svg'
import back from '../assets/images/back.svg'
import video from '../assets/images/video.svg'
import location from '../assets/images/location.svg'
import edit from '../assets/images/edit.svg'
import editLite from '../assets/images/editLite.svg'
import closeLite from '../assets/images/closeLite.svg'
import checkLite from '../assets/images/checkLite.svg'
import { Paper, Container, CardMedia, Card, CardContent, Typography } from '@material-ui/core';

function Event () {

    const { loggedUser, setNavbarLinks } = useContext(StateContext)
    
    const history = useHistory()
    const { id } = useParams();
    const [event, setEvent] = useState({})
    const [user, setUser] = useState({})
    const [isReserved, setReserved] = useState(false)
    let query = ''
    if(event.location) {
        query = event.location.split(' ').join('+');
    }

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('societeam-token')).token

        if (!loggedUser) {
            return
        } else { setUser(loggedUser) }

        setNavbarLinks(['eventsFeed', 'eventManager'])

        const options = {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
        fetch(`${process.env.REACT_APP_API_URL}/events/${id}`, options)
        .then(res => {
            if (res.ok) {
                res.json().then(json => {
                    setEvent(json)
                })
            }
        })

        fetch(`${process.env.REACT_APP_API_URL}/users/${loggedUser.id}/reservations`, options)
        .then(res => {
            if (res.ok) {
                res.json().then(json => {
                    setReserved(!(json.reservations.every(reservation => reservation.id != id)))
                })
            } else {
                console.log('something got fudged')
            }
        })
    }, [loggedUser])

    function deleteHandler () {
        const options = {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('societeam-token')).token}`
            },
        }
        fetch(`${process.env.REACT_APP_API_URL}/events/${id}/`, options)
        .then(res => {
            if (res.ok) {
                history.push('/event-manager')
            }
        })
    }

    function reserveHandler () {
        const options = {
            method: 'POST',
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('societeam-token')).token}`
            },
        }
        fetch(`${process.env.REACT_APP_API_URL}/events/${id}/reserve`, options)
        .then(res => {
            if (res.ok) {
                res.json().then(json => {
                    history.push('/event-manager')
                })
            }
        })
    }


    return (
        <Container component='main' maxWidth='md' style={{marginTop: '1em', padding: '1em'}}>
        <Paper className="top-level" elevation={3} style={{width: '100%', height: '100%'}}>
            
            
            <Card>
                <CardMedia src={event.image} alt='park' component='img' height='300'/>
                <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'><b>{event.title}</b></Typography>

                    <section className="info-section">
                <div className="info-wrapper">
                    <div className="label-wrapper">
                        <img className="icon" src={clock}/>
                        <span className="info-label">Start Date</span>
                    </div>
                    <span className="date">{`${new Date(event.time_start).toLocaleDateString()}`}</span>
                    <span className="time">At {`${new Date(event.time_start).toLocaleTimeString()}`}</span>
                </div>
                <div className="info-wrapper">
                    <div className="label-wrapper">
                        <img className="icon" src={clock}/>
                        <span className="info-label">End Date</span>
                    </div>
                    <span className="date">{`${new Date(event.time_end).toLocaleDateString()}`}</span>
                    <span className="time">At {`${new Date(event.time_end).toLocaleTimeString()}`}</span>
                </div>
                <div className="info-wrapper">
                    <div className="label-wrapper">
                        <img className="icon" src={edit}/>
                        <span className="info-label">Description</span>
                    </div>
                    <span className="description">{event.description ? event.description : <i>The event organizer did not include a description.</i>}</span>
                </div>
                <div className="info-wrapper">
                    <div className="label-wrapper">
                        <img className="icon" src={event.isvirtual ? video : location}/>
                        <span className="info-label">{event.isvirtual ? 'Virtual Event' : 'In-Person Event'}</span>
                    </div>
                    <span className="location">{event.location}</span><br></br>
                    {   
                        event.isvirtual ? <p>{location}</p> :
                        <iframe src={`https://www.google.com/maps/embed/v1/search?q=${query}&key=${process.env.REACT_APP_GOOGLEAPI}`} style={{width: '100%'}}></iframe>
                        
                    }
                </div>
                
                <div className="actions">
                    {
                        user.id === event.user_id ?
                        <div style={{width:'100%', display: 'flex', justifyContent: 'space-evenly'}}>
                            <div onClick={() => {history.push(`/event/${id}/edit`)}} className="action editButton">
                                <img src={editLite}/>
                                <span>Edit</span>
                            </div>
                            <div onClick={deleteHandler} className="action deleteButton">
                                <img src={closeLite}/>
                                <span>Delete</span>
                            </div>
                        </div>
                        :
                        isReserved ? 
                        <div onClick={reserveHandler} className="action reserve-button">
                            <img src={closeLite}/>
                            <span>Un-RSVP</span>
                        </div>
                        :
                        <div onClick={reserveHandler} className="action reserve-button">
                            <img src={checkLite}/>
                            <span>RSVP</span>
                        </div>
                    }
                </div>
            </section>

                </CardContent>
            </Card>
            {/* <div className="back-button" onClick={() => {history.goBack()}}><img src={back}/><span>Back</span></div> */}
            
            
            <style jsx>{`
                .top-level {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    overflow-y: scroll;
                }
                .image-banner {
                    height: 15em;
                }
                .image-banner img {
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                }
                .title {
                    margin: 0;
                    word-wrap: break-word;
                }
                .info-section {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    padding: 1.5em;
                }
                .date {
                    margin-right: 3em;
                }
                .icon {
                    height: 1em;
                }
                .label-wrapper {
                    display: flex;
                    align-items: center;
                }
                .info-wrapper {
                    margin-top: 1.5em;
                    padding-bottom: 0.25em;
                    border-bottom: 1px solid black;
                }
                .info-label {
                    margin-left: 0.5em;
                }
                .back-button {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 1em;
                    line-height: 1px;
                    width: 4em;
                    padding: 0.25em;
                    justify-content: space-evenly;
                    border: 1px solid black;
                    border-radius: 5px;
                    margin: 0.5em;
                }
                .back-button img {
                    height: 100%;
                }
                .actions {
                    height: 3em;
                    margin-top: 2em;
                    display: flex;
                    justify-content: center;
                }
                .action {
                    padding: 0.5em;
                    width: 6.55em;
                    border: 1px solid black;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    border-radius: 5px;
                    background-color: black;
                    color: white;
                }
                .action img {
                   height: 60%;
                }
            `}</style>
        </Paper>
        </Container>
    )
} 

export default Event;