import StateContext from './contexts/StateContext'
import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Progress from './ProgressPerc';
import AutoComplete from './AutoComplete';
import { Paper, Container, CardMedia, Card, CardContent, Button, TextField} from '@material-ui/core';

function NewEvent () {

    const { loggedUser } = useContext(StateContext)

    const history = useHistory()

    const [title, setTitle] = useState('')
    const [isVirtual, setVirtual] = useState(false)
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setDate] = useState('')
    const [endDate, setEnd] = useState('');

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
        <Container component='main' maxWidth='md' style={{marginTop: '1em', padding: '1em'}}>
            <div className="title-banner" style={{textAlign: 'center'}}>
                <h1 className="title">New Event</h1>
                <hr/>
            </div>
            <Paper elevation={3} style={{width: '100%', height: '100%'}}>
                <Card>
                    <CardMedia src={fileURL} alt='park' component='img' height='300'/>
                    <CardContent style={{textAlign: 'center'}}>
                        <input type = 'file' accept = 'image/*' onChange = {imageChoose} id="contained-button-file" style={{display: 'none'}}></input>
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span" style={{background: 'black'}}>
                                Upload
                            </Button>
                        </label>
                        <br></br>
                        <form onSubmit={eventSubmit}>
                            <div>
                                { fileError && <div> {fileError} </div>}
                                { file && <Progress file = {file} setFile = {setFile} setFileURL = {setFileURL}/>}
                            </div>
                            <TextField style={{width: '70%', marginTop: '1em'}} label="Event Title" value = {title} onChange = {(e)=>setTitle(e.target.value)}></TextField>
                            <div className="event-type">
                                {/* <span className="new-event-input-label">Event Type</span> */}
                                <div className="event-type-buttons">
                                    <div className={`type-button ${isVirtual ? '' : 'active-button'}`} onClick={()=>setVirtual(false)}>In-Person</div>
                                    <div className={`type-button ${isVirtual ? 'active-button' : ''}`} onClick={()=>setVirtual(true)}>Virtual</div>
                                </div>
                            </div>
                            <div className="dates">
                                <div className="new-event-date-group">
                                    <TextField
                                        label="Start Date & Time"
                                        type="datetime-local"
                                        // className={classes.textField}
                                        onChange={(e)=> setDate(e.target.value)}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                
                                    />
                                </div>
                                <div className="new-event-date-group">
                                    <TextField
                                        label="End Date & Time"
                                        type="datetime-local"
                                        // className={classes.textField}
                                        onChange={(e)=> setEnd(e.target.value)}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="new-event-input-group">
                            { isVirtual ? 
                                <div>
                                
                                <TextField
                                type='text'
                                name='location'
                                label='Video Meeting Link'
                                style={{width: '70%', marginTop: '1em'}}
                                value={location}
                                onChange={(e)=>setLocation(e.target.value)}/>
                                </div>

                                :
                                <div>
                                
                                <AutoComplete setLocation = {setLocation} />
                                </div>
                            }
                    
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
                    </CardContent>
                </Card>
            </Paper>
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
        </Container>
    )
} 

export default NewEvent;