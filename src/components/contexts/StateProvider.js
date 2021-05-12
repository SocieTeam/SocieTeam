import { useEffect, useState } from 'react'
import StateContext from './StateContext'

function StateProvider (props) {
    const value = {}
    return(
        <StateContext.Provider value={ value }>
            { props.children }
        </StateContext.Provider>
    )
}

export default StateProvider