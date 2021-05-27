import { useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom'
import AutoComplete from './AutoComplete';
import Progress from './ProgressPerc';
import { Paper, Container, CardMedia, Card, CardContent, Typography, Button, TextField } from '@material-ui/core';

function EditEvent () {
    
    const history = useHistory()
    const { id } = useParams()

        //FireBase UseStates ALSO checks to see if proper file is chosen
        const [file, setFile] = useState(null);
        const [fileError, setError] = useState(null);
    
        //FileURL
        const [image, setFileURL] = useState('');
    
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
    
    const [title, setTitle] = useState('')
    const [isvirtual, setVirtual] = useState(false)
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [time_start, set_time_start] = useState('')
    const [time_end, set_time_end] = useState('');
    const [zip, setZip] = useState('')
    
    const token = JSON.parse(localStorage.getItem('societeam-token')).token

    function dateInputParser (rawDate) {
        const obj = new Date(rawDate)
        const year = obj.getFullYear()
        let month = obj.getMonth() + 1
        month = String(month).length === 1 ? `0${month}` : month
        let day = obj.getDate()
        day = String(day).length === 1 ? `0${day}` : day 
        let hours = obj.getHours()
        hours = String(hours).length === 1 ? `0${hours}` : hours 
        let minutes = obj.getMinutes()
        minutes = String(minutes).length === 1 ? `0${minutes}` : minutes
        return `${year}-${month}-${day}T${hours}:${minutes}`
    }

    useEffect(() => {

        const options = {
            headers: {authorization: `Bearer ${token}`}
        }

        fetch(`${process.env.REACT_APP_API_URL}/events/${id}`, options)
        .then(res => {
            if (res.ok) {
                res.json().then(json => {
                    setTitle(json.title)
                    setVirtual(json.isvirtual)
                    setLocation(json.location)
                    setDescription(json.description)
                    set_time_start(json.time_start)
                    set_time_end(json.time_end)
                    setZip(json.zip)
                    setFileURL(json.image)
                })
            } else {
                console.log('there was an error')
            }
        })
    }, [])

    function editHandler (e) {
        e.preventDefault()
        const options = {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, isvirtual, location, description, time_start, time_end, image, zip})
        }
        fetch(`${process.env.REACT_APP_API_URL}/events/${id}`, options)
        .then(res => {
            if (res.ok) {
                res.json().then(json => {
                    history.push('/event-manager')
                })
            }
        })
    }
    
    return (
        <Container componennt="main" maxWidth='md' style={{marginTop: '1em', padding: '1em'}}>
            <div className="title-banner" style={{textAlign: 'center'}}>
                <h1 className="title">Edit Event</h1>
                <hr/>
            </div>
            <Paper elevation={3} style={{width: '100%', height: '100%'}}>
                <Card>
                    <CardMedia src={image} alt='park' component='img' height='300'/>
                    <CardContent style={{textAlign: 'center'}}>
                        <input type = 'file' accept = 'image/*' onChange = {imageChoose} id = 'contained-button-file' style={{display: 'none'}}></input>
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span" style={{background: 'black'}}>
                                Upload
                            </Button>
                        </label>
                        <form onSubmit={editHandler} >
                            <div>
                                { fileError && <div> {fileError} </div>}
                                { file && <Progress file = {file} setFile = {setFile} setFileURL = {setFileURL}/>}
                            </div>
                            <TextField style={{width: '70%', marginTop: '1em'}} label="Event Title" value = {title} onChange={(e)=>setTitle(e.target.value)} />
                            <div className="event-type">
                                <div className="event-type-buttons">
                                    <div className={`type-button ${isvirtual ? '' : 'active-button'}`} onClick={()=>setVirtual(false)}>In-Person</div>
                                    <div className={`type-button ${isvirtual ? 'active-button' : ''}`} onClick={()=>setVirtual(true)}>Virtual</div>
                                </div>
                            </div>
                            <div className="dates">
                                <div className="edit-event-date-group">
                                    <TextField 
                                        label="Start Date & Time"
                                        type="datetime-local"
                                        onChange={(e)=> set_time_start(e.target.value)}
                                        value={dateInputParser(time_start)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    
                                </div>
                                <div className="edit-event-date-group">
                                    <TextField 
                                        label="End Date & Time"
                                        type="datetime-local"
                                        onChange={(e)=> set_time_end(e.target.value)}
                                        value={dateInputParser(time_end)}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="new-event-input-group">
                            { isvirtual ? 
                                <div>
                                
                                <TextField
                                type='text'
                                name='location'
                                label='Video Meeting Link'
                                style={{width: '70%', marginTop: '1em'}}
                                value={location}
                                onChange={(e)=>setLocation(e.target.value)}/>

                                    <TextField 
                                    type='text'
                                    name='location'
                                    label='Zip Code'
                                    value={zip}
                                    style={{width: '70%', marginTop: '1em'}}
                                    onChange={(e)=>setZip(e.target.value)}
                                    required
                                    />
                                </div>

                                :
                                <div>
                                <p>{location}</p>
                                
                                    
                                
                                <AutoComplete setLocation = {setLocation} setZip={setZip}/>
                                <TextField 
                                    type='text'
                                    name='location'
                                    label='Zip Code'
                                    value={zip}
                                    style={{width: '70%', marginTop: '1em'}}
                                    disabled
                                />
                                
                                </div>
                                
                            }
                    
                            </div>
                            <div className="edit-event-input-group">
                                <label htmlFor='description'>Event Description</label>
                                <textarea name='description'
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}
                                rows='5'></textarea>
                            </div>

                <button className="submit-button" type='submit'>Submit Changes</button>
                        </form>
                    </CardContent>
                </Card>
            </Paper>
            
            <form onSubmit={editHandler} className="edit-event-form">
                

                
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
                .edit-event-form {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: calc(100% - 2em);
                    flex: 1;
                    padding: 1em;
                }
                .edit-event-input-group {
                    width: 100%;
                    margin-top: 1.5em;
                    display: flex;
                    flex-direction: column;
                }
                .edit-event-input-group input {
                    border: 0px;
                    height: 2.5em;
                }
                .edit-event-input-group hr {
                    margin-top: 0;
                    width: 100%;
                }
                .edit-event-input-group textarea {
                    border-radius: 5px;
                }
                .dates {
                    margin-top: 1.5em;
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                }
                .edit-event-date-group {
                    display: flex;
                    flex-direction: column;
                    width: 45%;
                }
                .edit-event-date-group input {
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
            `}</style>
        </Container>
    )
} 

export default EditEvent;