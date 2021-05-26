import StateContext from './contexts/StateContext'
import { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import {TextField, Container, Button} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

function SignUp () {

    const history = useHistory()

    const { setNavbarLinks, setLoggedUser } = useContext(StateContext)

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(()=> {
        setNavbarLinks(['login', 'signup'])
    }, [setNavbarLinks])

    function submitHandler (e) {
        e.preventDefault()
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, username, password})
        }
        fetch(`${process.env.REACT_APP_API_URL}/users/newUser`, options)
        .then(res => res.json())
        .then(json => {
            const verifiedUser = {user: json.user.username, token: json.token, userId: json.user.id}
            localStorage.setItem('societeam-token', JSON.stringify(verifiedUser))
            setLoggedUser(json.user)
            history.push('/account')
        })
    }

    // function changeHandler (e) {
    //     switch (e.target.name) {
    //         case 'email':
    //             setEmail(e.target.value)
    //             break;
    //         case 'username':
    //             setUsername(e.target.value)
    //             break;
    //         case 'password':
    //             setPassword(e.target.value)
    //             break;
    //         default:
    //     }
    // }

    const CssTextField = withStyles({
        root: {
            '& label.Mui-focused': {
                color: 'black',
              },
            '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                borderColor: 'black',
                }
            }
        },
      })(TextField);

    return (
        <Container component='main' maxWidth='sm'>
            <h1>Sign Up</h1>
                <form onSubmit={submitHandler} style={{width: '100%'}}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        id="email"
                        value = {email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                    <TextField 
                        style={{marginTop: '2em'}}
                        fullWidth
                        label="Username"
                        variant="outlined"
                        id='username'
                        value = {username}
                        onChange={(e)=>setUsername(e.target.value)}
                        autoComplete='username'
                    />
                    <TextField 
                        style={{marginTop: '2em'}}
                        id='password'
                        fullWidth
                        label='password'
                        variant='outlined'
                        type='password'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        autoComplete='current-password'
                    />
                    <Button fullWidth variant='contained' color='primary' style={{marginTop: '3em'}} type="submit">REGISTER</Button>
                </form>

            {/* <style jsx>{`
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
            `}</style> */}
        </Container>
    )
}

export default SignUp