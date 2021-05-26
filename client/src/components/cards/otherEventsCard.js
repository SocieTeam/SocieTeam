import { useHistory } from 'react-router-dom'
import { Card, CardActionArea, CardActions, CardMedia, CardContent, Typography, Button} from '@material-ui/core';

function OtherEventCard (props) {

    const { title, time_start, username, id, image, location } = props.event
    console.log(props.event);

    const history = useHistory()

    function eventClickHandler () {
        history.push(`/event/${id}`)
    }

    return (
        <Card onClick={eventClickHandler} style={{maxWidth: '345'}} variant='outlined' style={{marginBottom:"2em"}}>
            <CardActionArea>
                <CardMedia 
                    component="img"
                    alt="event-image"
                    height='140'
                    image={image}
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>{title}</Typography>
                    <Typography variant='body2' component='p' color='textSecondary'>{location}</Typography>
                    <Typography variant='body2' component='p' color='textSecondary'>{new Date(time_start).toLocaleDateString()}</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={eventClickHandler}>
                            Learn More
                    </Button>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}

export default OtherEventCard