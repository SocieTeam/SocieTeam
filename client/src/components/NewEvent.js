import StateContext from './contexts/StateContext'
import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom'

function NewEvent () {

    const { loggedUser } = useContext(StateContext)

    const history = useHistory()

    const [title, setTitle] = useState('')
    const [isVirtual, setVirtual] = useState(false)
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setDate] = useState('')
    const [endDate, setEnd] = useState('');

    function eventSubmit (e) {
        e.preventDefault();
        let obj = {
            userId: loggedUser.id,
            title,
            isVirtual,
            location,
            description,
            time_start: new Date(startDate),
            time_end: new Date(endDate)
        }

        const token = JSON.stringify(localStorage.getItem('societeam-token')).token
        const options = {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(obj)
        }

        fetch(`${process.env.REACT_APP_API_URL}/events/new`, options)
        .then(res => {
            if (res.ok) {
                res.json().then(json => {
                    history.push('/event-manager')
                })
            } else {
                console.log(res)
            }
        })
    }


    return (
        <div className="top-level">
            <div className="title-banner">
                <h1 className="title">New Event</h1>
                <hr/>
            </div>
            <div className="image-banner">
                <img src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/SunsetPark.jpg/290px-SunsetPark.jpg' alt='park'></img>
            </div>
            <form className="new-event-form" onSubmit={eventSubmit}>
                <div className="new-event-input-group">
                    <span className="new-event-input-label">Event Title</span>
                    <input 
                    type='text'
                    placeholder='Ex: Cyber Security Talk'
                    value = {title} 
                    onChange = {(e)=>setTitle(e.target.value)}
                    />
                    <hr/>
                </div>
                
                <div className="event-type">
                    <span className="new-event-input-label">Event Type</span>
                    <div className="event-type-buttons">
                        <div className={`type-button ${isVirtual ? '' : 'active-button'}`} onClick={()=>setVirtual(false)}>In-Person</div>
                        <div className={`type-button ${isVirtual ? 'active-button' : ''}`} onClick={()=>setVirtual(true)}>Virtual</div>
                    </div>
                </div>
                <div className="dates">
                    <div className="new-event-date-group">
                        <span className="new-event-input-label">Start Date & Time</span>
                        <input type='datetime-local' onChange={(e)=> setDate(e.target.value)}/>
                    </div>
                    <div className="new-event-date-group">
                        <span className="new-event-input-label">End Date & Time</span>
                        <input type='datetime-local' name='dateEnd' onChange={(e)=> setEnd(e.target.value)}/>
                    </div>
                </div>
                <hr style={{width: '100%'}}/>
                <div className="new-event-input-group">
                    <label for='location'>Location/Meeting Link</label>
                    <input
                    type='text'
                    name='location'
                    placeholder='1234 A BLVD'
                    value={location}
                    onChange={(e)=>setLocation(e.target.value)}/>
                    <hr/>
                </div>

                <div className="new-event-input-group">
                    <label for = 'description'>Event Description</label>
                    <textarea name='description'
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    rows='5'></textarea>
                </div>

                <button className="submit-button" type='submit'>Create Event</button>
            </form>
            <style jsx>{`
                .top-level {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    flex: 1;
                }
                .title-banner {
                    margin-top: 2em;
                }
                .title-banner h1 {
                    margin: 0
                }
                .image-banner {
                    height: 15em;
                    width: 100%;
                }
                .image-banner img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .new-event-form {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: calc(100% - 2em);
                    flex: 1;
                    padding: 1em;
                }
                .new-event-input-group {
                    width: 100%;
                    margin-top: 1.5em;
                    display: flex;
                    flex-direction: column;
                }
                .new-event-input-group input {
                    border: 0px;
                    height: 2.5em;
                }
                .new-event-input-group hr {
                    margin-top: 0;
                    width: 100%;
                }
                .new-event-input-group textarea {
                    border-radius: 5px;
                }
                .dates {
                    margin-top: 1.5em;
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                }
                .new-event-date-group {
                    display: flex;
                    flex-direction: column;
                    width: 45%;
                }
                .new-event-date-group input {
                    width: 100%;
                }
                .event-type {
                    width: 100%;
                    margin-top: 1.5em;
                }
                .event-type-buttons {
                    height: 2.5em;
                    display: flex;
                    border: 1px solid black;
                    background-color: white;
                    color: black;
                }
                .active-button {
                    background-color: black;
                    color: white;
                }
                .type-button {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex: 1;
                }
                .submit-button {
                    margin-top: 1.5em;
                    width: 50%;
                    height: 3em;
                    background-color: black;
                    color: white;
                    border-radius: 10px;
                    font-size: 1em;
                }
            `}</style>
        </div>
    )
} 

export default NewEvent;