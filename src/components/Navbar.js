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
            route: '/register',
            name: 'Register'
        }
    }



    return (
        <div className="navbar">
            <div className="logo-banner">
                <h1>SocieTeam</h1>
            </div>
            <div className="links">
                {
                    navbarLinks.map(link => {
                        return (
                        <Link 
                        to={ linkMap[link].route }
                        key={ link }
                        >
                            { linkMap[link].name }
                        </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Navbar