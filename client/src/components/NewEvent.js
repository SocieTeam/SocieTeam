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
        <div>
            <img src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/SunsetPark.jpg/290px-SunsetPark.jpg' alt='park'></img>
            <form onSubmit = {eventSubmit}>
                <label htmlFor='title'>Title:</label><br></br>
                <input type='text' id = 'title' placeholder = 'Ex: Cyber Security Talk' value = {title} onChange = {(e)=>setTitle(e.target.value)}></input><br></br>
                
                <p>Is it a Virtual?</p>
                <input type="radio" id="isVirtual" name="isVirtual" value="true" onChange = {()=>setVirtual(true)}></input>
                <label htmlFor = 'isVirtual'>Yes</label>
                <input type="radio" id="isVirtual" name="isVirtual" value="false" onChange = {()=>setVirtual(false)}></input>
                <label htmlFor = 'isVirtual'>No</label><br></br>

                <label htmlFor = 'dateStart'>Start Date: </label>
                <input type = 'datetime-local' id = 'dateStart' onChange = {(e)=> setDate(e.target.value)}></input><br></br>

                <label htmlFor = 'dateEnd'>End Date: </label>
                <input type = 'datetime-local' name = 'dateEnd' onChange = {(e)=> setEnd(e.target.value)}></input><br></br>

                <label htmlFor='location'>Location/Meeting Link</label>
                <input type = 'text' id='location' name = 'location' placeholder = '1234 A BLVD' value = {location} onChange = {(e)=>setLocation(e.target.value)}></input><br></br>

                <label htmlFor = 'description'>Event Description</label>
                <textarea id = 'description' name = 'description' value = {description} onChange = {(e)=>setDescription(e.target.value)}></textarea><br></br>

                <button type = 'submit'>Submit</button>
            </form>
        </div>
    )
} 

export default NewEvent;