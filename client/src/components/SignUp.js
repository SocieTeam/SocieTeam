import StateContext from './contexts/StateContext'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Login () {

    const { setNavbarLinks } = useContext(StateContext)

    useEffect(()=> {
        setNavbarLinks(['login', 'signup'])
    }, [])

    function submitHandler (e) {
        e.preventDefault()
    }

    return (
        <div className="top-level">
            <div className="name-jumbotron">Sign Up</div>
            <div className="signup-form-background">
                <form className="signup-form" onSubmit={submitHandler}>
                    <div className="input-group">
                        <span>Email</span>
                        <input name="username"></input>
                    </div>
                    <div style={{marginTop: '1em'}} className="input-group">
                        <span>Username</span>
                        <input name="username"></input>
                    </div>
                    <div style={{marginTop: '1em'}} className="input-group">
                        <span>Password</span>
                        <input name="password" type="password"></input>
                    </div>
                    <button style={{marginTop: '3em'}} type="submit">REGISTER</button>
                </form>
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
                .signup-form-background {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    flex: 1;
                    background-color: black;
                }
                .signup-form {
                    margin-top: 3em;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 10%;
                    height: 45%;
                    background-color: white;
                    width: 60%;
                    border-radius: 15px;
                }
                .signup-form input {
                    background-color: lightgrey;
                    height: 2em;
                    border-radius: 5px;
                }
                .signup-form button {
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