import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

function Event (props) {
    
    const {id} = useParams();
    const [title, setTitle] = useState('')
    const [isVirtual, setVirtual] = useState(false)
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [startDate, setDate] = useState('')
    const [endDate, setEnd] = useState('');


    useEffect(() => {
        fetch(`http://localhost:5000/events/${id}`)
        .then(results => results.json())
        .then(data => {
            setTitle(data.title);
            setVirtual(data.isvirtual);
            setLocation(data.location);
            // setDescription(data.description)
            setDate(data.time_start);
            setEnd(data.time_end);
        })
    }, [])


    return (
        <div>
            <img src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/SunsetPark.jpg/290px-SunsetPark.jpg' alt='park'></img>
            
                <h2>Title:</h2><br></br>
                <h3>{title}</h3><br></br>
                
                <h2>Is it a Virtual?</h2>
                <h3>{isVirtual}</h3>

                <h2>Start Date: </h2>
                <h3>{startDate}</h3><br></br>

                <h2>End Date: </h2>
                <h3>{endDate}</h3><br></br>

                <h2>Location/Meeting Link</h2>
                <h3>{location}</h3><br></br>

                <h2>Event Description</h2>
                <h3>{description}</h3><br></br>

                <button type = 'submit'>Submit</button>
            
        </div>
    )
} 

export default Event;