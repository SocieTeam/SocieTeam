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
                        <Link className="link" to='/account'><span>{ loggedUser.username }</span></Link>
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
                    font-size: 0.5em;
                }
                .links-section {
                    display: flex;
                }
                .logged-user {
                    margin-left: 1em;
                }
            `}</style>
        </nav>
    )
}

export default Navbar