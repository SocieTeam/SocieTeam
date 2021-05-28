import StateContext from './contexts/StateContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import icon from '../assets/images/user.svg';
import {useHistory} from 'react-router-dom'
import { AppBar, Toolbar, Button, Typography, makeStyles, Avatar} from '@material-ui/core'

function Navbar () {
    const history = useHistory()
    const { navbarLinks, loggedUser } = useContext(StateContext)
    
    const linkMap = {
        login: {
            route: '/login',
            name: 'Login'
        }, 
        signup: {
            route: '/signup',
            name: 'Sign Up'
        },
        eventManager: {
            route: '/event-manager',
            name: 'Event Manager'
        },
        eventsFeed: {
            route: '/eventsFeed',
            name: 'Event Feed'
        }
    }

    function clickHandler (path) {
        history.push(path)
    }

    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
          flexGrow: 1,
        },
      }));
    const classes = useStyles();
    
    return (
        <AppBar className="navbar" position='static' style={{background: '#89A894', fontFamily: 'Lobster'}}>
            <Toolbar>
                <Avatar src='https://firebasestorage.googleapis.com/v0/b/societeam-b90d7.appspot.com/o/logo-white.svg?alt=media&token=2400cd88-c9f4-4584-84b0-501bda92e750' onClick={()=>clickHandler('/')}/>
                <Typography variant="h6" className={classes.title} style={{marginLeft: '1em', fontFamily: 'Lobster'}}>
                    SocieTeam
                </Typography>



                {
                    navbarLinks.map(link => {
                        return (
                        <Button
                        style={{color: 'white'}}    
                        onClick={()=>clickHandler(linkMap[link].route)}
                        key={ link }>
                            { linkMap[link].name }
                        </Button>
                        )
                    })
                }
                { loggedUser ? 
                    <Avatar src={loggedUser.profile_pic} 
                        onClick={()=>clickHandler('/account')}
                    />
                    : null
                }



                {/* <Button color="inherit">Events Feed</Button>
                <Button color="inherit">Events Manager</Button> */}
            </Toolbar>
            {/* <div className="links-and-user">
                <div className="links-section">
                    {
                        navbarLinks.map(link => {
                            return (
                            <Link
                            
                            className="link"
                            to={ linkMap[link].route }
                            key={ link }
                            >
                                <div className="nav-link">
                                    { linkMap[link].name }
                                </div>
                            </Link>
                            )
                        })
                    }
                 </div>
                { loggedUser ? 
                    <div className="logged-user">
                        <Link className="link" to='/account'>
                            <div className="user-avatar">
                                <img style={{width: '50%'}} src={loggedUser.profile_pic ? loggedUser.profile_pic : icon}/>
                            </div>
                        </Link>
                    </div> : null
                }
            </div>     */}
        </AppBar>
    )
}

export default Navbar