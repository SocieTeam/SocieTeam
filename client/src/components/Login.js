import StateContext from './contexts/StateContext'
import { useState, useContext, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

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
        .then(res => res.json())
        .then(json => {
            if (json.responseType !== 'error') {
                const verifiedUser = {user: json.username, token: json.token}
                localStorage.setItem('societeam-token', JSON.stringify(verifiedUser));
                setLoggedUser(verifiedUser)
               history.push('/')
            } else {
                setLoginError(true)
            }
        })
    }

    function changeHandler (e) {
        switch (e.target.name) {
            case 'identity':
                setIdentity(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
            default:
        }
    }

    return (
        <div className="top-level">
            <div className="name-jumbotron">Login</div>
            <div className="login-form-background">
                <form onChange={ changeHandler } className="login-form" onSubmit={submitHandler}>
                    <div className="input-group">
                        <span>Username OR Email</span>
                        <input name="identity"></input>
                    </div>
                    <div style={{marginTop: '1em'}} className="input-group">
                        <span>Password</span>
                        <input name="password" type="password"></input>
                    </div>
                    { loginError ? <span>Login Failed</span> : null}
                    <button style={{marginTop: '3em'}} type="submit">LOGIN</button>
                </form>
                <div style={{marginTop: '2em'}} className='register-link'>
                    <Link to='/register'>Don't Have An Account?<br/>Sign Up Here!</Link>
                </div>
            </div>

            <style jsx>{`
                .top-level {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }
                .name-jumbotron {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 15%;
                    font-size: 2em;
                }
                .login-form-background {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    flex: 1;
                    background-color: black;
                }
                .login-form {
                    margin-top: 3em;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 10%;
                    height: 40%;
                    background-color: white;
                    width: 60%;
                    border-radius: 15px;
                }
                .login-form input {
                    background-color: lightgrey;
                    height: 2em;
                    border-radius: 5px;
                }
                .login-form button {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: black;
                    color: white;
                    height: 2.5em;
                    border-radius: 5px;
                }
                .register-link {
                    text-align: center;
                }
                .register-link a {
                    color: white;
                }
                .input-group {
                    display: flex;
                    flex-direction: column;
                }
            `}</style>
        </div>
    )
}

export default Login