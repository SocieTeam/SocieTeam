import {useState} from 'react';

function NewEvent () {
    const [title, setTitle] = useState('')
    const [isVirtual, setVirtual] = useState(false)
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')


    return (
        <div>
            <img src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/SunsetPark.jpg/290px-SunsetPark.jpg' alt='park'></img>
            <form>
                <label for='title'>Title:</label><br></br>
                <input type='text' id = 'title' placeholder = 'Ex: Cyber Security Talk' value = {title} onChange = {(e)=>setTitle(e.target.value)}></input><br></br>
                
                <p>Is it a Virtual?</p>
                <input type="radio" id="isVirtual" name="isVirtual" value="true" onChange = {()=>setVirtual(true)}></input>
                <label for = 'isVirtual'>Yes</label>
                <input type="radio" id="isVirtual" name="isVirtual" value="false" onChange = {()=>setVirtual(false)}></input>
                <label for = 'isVirtual'>No</label><br></br>

                <label for='location'>Location/Meeting Link</label>
                <input type = 'text' id='location' name = 'location' placeholder = '1234 A BLVD' value = {location} onChange = {(e)=>setLocation(e.target.value)}></input><br></br>

                <label for = 'description'>Event Description</label>
                <textarea id = 'description' name = 'description' value = {description} onChange = {(e)=>setDescription(e.target.value)}></textarea>
            </form>
        </div>
    )
} 

export default NewEvent;