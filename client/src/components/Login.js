import StateContext from './contexts/StateContext'
import { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {TextField, Container, Button} from '@material-ui/core';

function Login () {

    const history = useHistory();

    const { setNavbarLinks, setLoggedUser } = useContext(StateContext)

    const [identity, setIdentity] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(false)

    useEffect(()=> {
        setNavbarLinks(['login', 'signup'])
    }, [setNavbarLinks])

    function submitHandler (e) {
        e.preventDefault()

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({identity, password})
        }

        fetch(`${process.env.REACT_APP_API_URL}/users/login`, options)
        .then(res => {
            if (res.ok) {
                res.json().then(json => {
                    const verifiedUser = {user: json.user.username, token: json.token, userId: json.user.id}
                    localStorage.setItem('societeam-token', JSON.stringify(verifiedUser))
                    setLoggedUser(json.user)
                    history.push('/eventsFeed')
                })
            } else {
                setLoginError(true)
            }
        })
    }

    // function changeHandler (e) {
    //     switch (e.target.name) {
    //         case 'identity':
    //             setIdentity(e.target.value)
    //             break;
    //         case 'password':
    //             setPassword(e.target.value)
    //             break;
    //         default:
    //     }
    // }

    return (
        <Container component="main" maxWidth="sm" style={{marginTop: '2em'}}>
            <h1>Login</h1>
            <form className="login-form" onSubmit={submitHandler}>
                    <TextField id="userName" label="Username Or Email" fullWidth variant="outlined" value = {identity} onChange={(e)=>setIdentity(e.target.value)}/>
                    <TextField style={{marginTop: '2em'}} id="password" fullWidth label="Password" type="password" variant="outlined" value ={password} onChange={(e)=>setPassword(e.target.value)}/>
                    
                    { loginError ? <span>Login Failed</span> : null}
                    <Button variant="contained" color="primary" type="submit" fullWidth style={{marginTop: '2em'}}>LOGIN</Button>      
            </form>
            <Link to='/signup'>Don't Have An Account? Sign Up Here!</Link>
            <br></br>
            <Link to='/passwordReset' style={{marginTop: '1em'}}>Forgot Password?</Link>
                
            
            <style jsx>{`
                .login-form: {
                    width: '100%', // Fix IE 11 issue.
                    marginTop: 5em
                  }
            `}</style>
        </Container>
    )
}

export default Login