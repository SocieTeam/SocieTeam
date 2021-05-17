function EventManagerCard (props) {

    const { event, eventType } = props

    return (
        <div className="event-card">
            <div className="card-image"></div>
            <div className="card-info">
                <span className="event-title">{ event.title }</span>
                <div className="event-info">
                {
                    eventType === 'user-event' ? null : <span className="event-host">{event.username}</span>
                }
                    <div className="event-dates">
                        <span className="event-start">{ new Date(event.time_start).toLocaleDateString() }</span>
                        <span>-</span>
                        <span className="event-end">{ new Date(event.time_end).toLocaleDateString() }</span>
                    </div>
                    <div className="event-location">
                        {
                            event.isvirtual ?
                            <span>{`Event Link: ${event.location}`}</span>
                            :
                            <span>{event.location}</span>
                        }
                    </div>
                </div>
            </div>
            <div className="card-options">
                {
                    eventType === 'user-event' ?
                    <>
                        <div className="option-icon"><img src="./edit.svg"></img></div>
                        <div className="option-icon"><img src="./close.svg"></img></div>
                    </>
                    :
                    <div className="option-icon"><img src="./close.svg"></img></div>
                } 
            </div>
            <style jsx>{`
                .event-card {
                    display: flex;
                    align-items: center;
                    height: calc(25% - 0.5em);
                    width: calc(100% - 1em);
                    margin: 0.5em 0.5em 0 0.5em;
                    border: 1px solid black;
                    padding: 0.5em;
                    box-sizing: border-box;
                }
                .card-image {
                    background-color: lightgrey;
                    height: 100%;
                    aspect-ratio: 1;
                }
                .card-info {
                    margin-left: 1em;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    flex: 1;
                    font-size: 0.7em;
                    height: 100%;
                }
                .card-options {
                    height: 100%;
                    width: 1.5em;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                }
                .event-title {
                    font-weight: bold;
                    margin-bottom: 0.5em;
                    font-size: 1.5em;
                }
                .option-icon {
                    width: 100%
                }
                .option-icon img {
                    width: 100%;
                }
            `}</style>
        </div>
    )
}

export default EventManagerCard