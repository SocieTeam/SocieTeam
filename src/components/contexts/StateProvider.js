import { useEffect, useState } from 'react'
import StateContext from './StateContext'

function StateProvider (props) {

    const [navbarLinks, setNavbarLinks] = useState([])
    const [loggedUser, setLoggedUser] = useState(null)

    const value = {
        navbarLinks, setNavbarLinks,
        loggedUser, setLoggedUser
    }
    
    return (
        <StateContext.Provider value={ value }>
            { props.children }
        </StateContext.Provider>
    )
}

export default StateProvider