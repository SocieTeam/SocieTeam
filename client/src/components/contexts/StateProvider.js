import { useEffect, useState } from 'react'
import StateContext from './StateContext'

function StateProvider (props) {

    const [navbarLinks, setNavbarLinks] = useState([])
    const [loggedUser, setLoggedUser] = useState(null)
    const [eventManagerPane, setEventManagerPane] = useState('reservations')

    const value = {
        navbarLinks, setNavbarLinks,
        loggedUser, setLoggedUser,
        eventManagerPane, setEventManagerPane
    }
    
    return (
        <StateContext.Provider value={ value }>
            { props.children }
        </StateContext.Provider>
    )
}

export default StateProvider