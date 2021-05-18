import StateContext from './contexts/StateContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

function Navbar () {

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
    
    return (
        <nav className="navbar">
            <div className="logo-banner">
                <h1>SocieTeam</h1>
            </div>
            <div className="links-and-user">
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
                                <img style={{width: '50%'}} src={loggedUser.profile_pic ? loggedUser.profile_pic : './user.svg'}/>
                            </div>
                        </Link>
                    </div> : null
                }
            </div>
            <style jsx>{`
                .navbar {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: black;
                    color: white;
                    padding: 0 1em;
                    border-bottom: 0.25em solid white;
                }
                .logo-banner h1 {
                    font-size: 1em;
                }
                .nav-link {
                    display: flex;
                    justify-content: center;
                    margin-left: 1em;
                }
                .links-and-user {
                    display: flex;
                    align-items: center;
                    font-size: 0.5em;
                }
                .links-section {
                    display: flex;
                }
                .logged-user {
                    margin-left: 1em;
                }
                .user-avatar {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 2em;
                    height: 2em;
                    border-radius: 1.5em;
                    background-color: lightgrey;
                }
            `}</style>
        </nav>
    )
}

export default Navbar