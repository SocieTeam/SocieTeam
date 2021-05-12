import StateContext from './contexts/StateContext'
import { useContext, useEffect } from 'react'

function Login () {

    const { setNavbarLinks } = useContext(StateContext)

    useEffect(()=> {
        setNavbarLinks(['login', 'register'])
    }, [])


    return (
        <>
            <div className="name-jumbotron">Login</div>
        </>
    )
}

export default Login