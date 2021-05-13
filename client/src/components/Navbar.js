import StateContext from './contexts/StateContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

function Navbar () {

    const { navbarLinks } = useContext(StateContext)

    const linkMap = {
        login: {
            route: '/login',
            name: 'Login'
        }, 
        register: {
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