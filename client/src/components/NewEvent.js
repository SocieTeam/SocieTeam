import StateContext from './contexts/StateContext'
import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Progress from './ProgressPerc';

function NewEvent () {

    const { loggedUser } = useContext(StateContext)

    const history = useHistory()

    const [title, setTitle] = useState('')
    const [isVirtual, setVirtual] = useState(false)
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setDate] = useState('')
    const [endDate, setEnd] = useState('');
    const [zip, setZip] = useState('')

    //FireBase UseStates ALSO checks to see if proper file is chosen
    const [file, setFile] = useState(null);
    const [fileError, setError] = useState(null);

    //FileURL
    const [fileURL, setFileURL] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/SunsetPark.jpg/290px-SunsetPark.jpg');

    function imageChoose (e) {
        const file = e.target.files[0];
        
        const types = ['image/png', 'image/jpeg'];

        if(file && types.includes(file.type)) {
            setFile(file);
            setError(null);
        }
        else {
            setFile(null);
            setError('Please Select an image file (png or jpeg)');
        }
    }

    function eventSubmit (e) {
        e.preventDefault();
        let obj = {
            userId: loggedUser.id,
            title,
            isVirtual,
            location,
            description,
            zip,
            time_start: new Date(startDate),
            time_end: new Date(endDate),
            image: fileURL
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
                <img src = {fileURL} alt='park'></img>
            </div>
            <form className="new-event-form" onSubmit={eventSubmit}>
            <input type = 'file' accept = 'image/*' onChange = {imageChoose}></input>
            <div>
                { fileError && <div> {fileError} </div>}
                { file && <Progress file = {file} setFile = {setFile} setFileURL = {setFileURL}/>}
            </div>
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
                <div className="location-input-group">
                    <div style={{width: '60%'}} className="inner-group">
                        <label for='location'>Location/Meeting Link</label>
                        <input
                        type='text'
                        name='location'
                        placeholder='Ex. 100 Sample Road'
                        value={location}
                        onChange={(e)=>setLocation(e.target.value)}/>
                    </div>
                    <div className="inner-group zip-group">
                        <span className="new-event-input-label">Zip Code</span>
                        <input placeholder="Ex. 10001" onChange={(e)=>setZip(e.target.value)} name="zip"/>
                    </div>
                </div>

                <div className="new-event-input-group">
                    <label for='description'>Event Description</label>
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
                    overflow-y: scroll;
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
                    box-sizing: border-box;
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
                .location-input-group {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                }
                .inner-group input {
                    width: 100%;
                    box-sizing: border-box;
                    border: 0;
                    border-bottom: 1px solid black;
                }
                .zip-group {
                    width: 5em;
                }
            `}</style>
        </div>
    )
} 

export default NewEvent;