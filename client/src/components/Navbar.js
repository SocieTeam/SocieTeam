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
                        <span>{ loggedUser.username }</span>
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
                }
                .nav-link {
                    display: flex;
                    justify-content: center;
                    width: 4em;
                }
                .links-and-user {
                    display: flex;
                }
                .links-section {
                    display: flex;
                }
                .links-section a {
                    text-decoration: none;
                    color: white;
                }
            `}</style>
        </nav>
    )
}

export default Navbar