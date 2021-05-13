import StateContext from './contexts/StateContext'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Login () {

    const { setNavbarLinks } = useContext(StateContext)

    useEffect(()=> {
        setNavbarLinks(['login', 'register'])
    }, [])

    function submitHandler (e) {
        e.preventDefault()
    }

    return (
        <div className="top-level">
            <div className="name-jumbotron">Login</div>
            <div className="login-form-background">
                <form className="login-form" onSubmit={submitHandler}>
                    <div className="input-group">
                        <span>Username OR Email</span>
                        <input name="username"></input>
                    </div>
                    <div style={{marginTop: '1em'}} className="input-group">
                        <span>Password</span>
                        <input name="password" type="password"></input>
                    </div>
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