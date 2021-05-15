import {useState} from 'react';

function NewEvent () {
    const [title, setTitle] = useState('')
    const [isVirtual, setVirtual] = useState(false)
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setDate] = useState('')
    const [endDate, setEnd] = useState('');

    function eventSubmit (e) {
        e.preventDefault();
        let obj = {
            title,
            isVirtual,
            location,
            description,
            time_start: new Date(startDate),
            time_end: new Date(endDate)
        }

        fetch('http://localhost:5000/events/new', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(obj)
        })
    }


    return (
        <div>
            <img src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/SunsetPark.jpg/290px-SunsetPark.jpg' alt='park'></img>
            <form onSubmit = {eventSubmit}>
                <label for='title'>Title:</label><br></br>
                <input type='text' id = 'title' placeholder = 'Ex: Cyber Security Talk' value = {title} onChange = {(e)=>setTitle(e.target.value)}></input><br></br>
                
                <p>Is it a Virtual?</p>
                <input type="radio" id="isVirtual" name="isVirtual" value="true" onChange = {()=>setVirtual(true)}></input>
                <label for = 'isVirtual'>Yes</label>
                <input type="radio" id="isVirtual" name="isVirtual" value="false" onChange = {()=>setVirtual(false)}></input>
                <label for = 'isVirtual'>No</label><br></br>

                <label for = 'dateStart'>Start Date: </label>
                <input type = 'datetime-local' id = 'dateStart' onChange = {(e)=> setDate(e.target.value)}></input><br></br>

                <label for = 'dateEnd'>End Date: </label>
                <input type = 'datetime-local' name = 'dateEnd' onChange = {(e)=> setEnd(e.target.value)}></input><br></br>

                <label for='location'>Location/Meeting Link</label>
                <input type = 'text' id='location' name = 'location' placeholder = '1234 A BLVD' value = {location} onChange = {(e)=>setLocation(e.target.value)}></input><br></br>

                <label for = 'description'>Event Description</label>
                <textarea id = 'description' name = 'description' value = {description} onChange = {(e)=>setDescription(e.target.value)}></textarea><br></br>

                <button type = 'submit'>Submit</button>
            </form>
        </div>
    )
} 

export default NewEvent;