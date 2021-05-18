import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';

function Event () {
    
    const { id } = useParams();
    const [event, setEvent] = useState({})

    useEffect(() => {
        fetch(`http://localhost:5000/events/${id}`)
        .then(results => results.json())
        .then(data => {
            setEvent(data)
        })
    }, [])


    return (
        <div className="top-level">
            <div className="image-banner">
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/SunsetPark.jpg/290px-SunsetPark.jpg' alt='park'></img>
            </div>
            <section className="info-section">
                <h2 className="title">{event.title}</h2>
                <div className="info-wrapper">
                    <div className="label-wrapper">
                        <img className="icon" src="../clock.svg"/>
                        <span className="info-label">Start Date</span>
                    </div>
                    <span className="date">{`${new Date(event.time_start).toLocaleDateString()}`}</span>
                    <span className="time">At {`${new Date(event.time_start).toLocaleTimeString()}`}</span>
                </div>
                <div className="info-wrapper">
                    <div className="label-wrapper">
                        <img className="icon" src="../clock.svg"/>
                        <span className="info-label">End Date</span>
                    </div>
                    <span className="date">{`${new Date(event.time_end).toLocaleDateString()}`}</span>
                    <span className="time">At {`${new Date(event.time_end).toLocaleTimeString()}`}</span>
                </div>
                <div className="info-wrapper">
                    <div className="label-wrapper">
                        <img className="icon" src={event.isvirtual ? '../video.svg' : '../location.svg'}/>
                        <span className="info-label">{event.isvirtual ? 'Virtual Event' : 'In-Person Event'}</span>
                    </div>
                    <span className="location">{event.location}</span>
                </div>
                <div className="info-wrapper">
                    <div className="label-wrapper">
                        <img className="icon" src="../edit.svg"/>
                        <span className="info-label">Description</span>
                    </div>
                    <span className="desciption">{event.description ? event.description : <i>The event organizer did not include a description.</i>}</span>
                </div>
            </section>
            
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
            `}</style>
        </div>
    )
} 

export default Event;