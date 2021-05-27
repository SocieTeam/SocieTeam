import {useState, useEffect, useContext} from 'react';
import {useHistory} from 'react-router-dom'
import StateContext from './contexts/StateContext'
import { Paper, Container, CardMedia, Card, CardContent, Button, TextField} from '@material-ui/core';
import NewEvent from './NewEvent';

function PasswordReset () {
    const history = useHistory();
    
    const { setNavbarLinks, setLoggedUser } = useContext(StateContext)
    useEffect(()=> {
        setNavbarLinks(['login', 'signup'])
    }, [setNavbarLinks])

    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [code, setCode] = useState('');
    const [codeVer, setVer] = useState('');
    const [good, setGood] = useState(false)

    const [newPass, setPass] = useState('');
    const [verifPass, setVerifPass] = useState('');

    const [success, setSuccess] = useState(false);

    function sendLogin() {
        history.push('/login')
    }

    function changePass(e) {
        e.preventDefault();
        if(newPass !== verifPass) {
            new alert('Passwords do not match');
        }
        else {
            fetch(`${process.env.REACT_APP_API_URL}/users/resetPassword`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, password: newPass})
            })
            .then(res=>res.json())
            .then(user=>setSuccess(true))
        }
    }


    function submitHandler(e) {
        e.preventDefault()
        fetch(`${process.env.REACT_APP_API_URL}/users/reset/${email}`)
        .then(res => res.json())
        .then(data => {
            setSent(true)
            setVer(data.code)
        })
    }

    function verifyCode(e) {
        e.preventDefault();
        if(code == codeVer) {
            setGood(true);
        }
    }

    return (
        <Container component="main" maxWidth="sm" style={{marginTop: '2em'}}>
            
            
                {
                    success ? 
                    <div>
                        <h1>Password Successfully Changed</h1>
                        <Button onClick={sendLogin} variant="contained" color="primary" type="submit" fullWidth style={{marginTop: '2em'}}>Login</Button>
                    </div>
                    :
                    !sent ? 
                    <form onSubmit={submitHandler}>
                        <h1>Reset Password</h1>
                        <TextField id="userName" label="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                        <Button variant="contained" color="primary" type="submit" fullWidth style={{marginTop: '2em'}}>Send Password Reset Code</Button>
                    </form>
                    : 
                    !good ?
                    <form onSubmit={verifyCode}>
                        <h1>Email sent to {email}</h1>
                        <TextField id="userName" label="Verification Code" value={code} onChange={(e)=>setCode(e.target.value)} required/>
                        <Button variant="contained" color="primary" type="submit" fullWidth style={{marginTop: '2em'}}>Reset Password</Button>
                    </form>
                    : 
                    <form onSubmit={changePass}>
                        <TextField id="userName" label="New Password" type = 'password' value={newPass} onChange={(e)=>setPass(e.target.value)} required/>
                        <br></br>
                        <TextField id="userName" label="Verify Password" type='password' value={verifPass} onChange={(e)=>setVerifPass(e.target.value)} required/>
                        <Button variant="contained" color="primary" type="submit" fullWidth style={{marginTop: '2em'}}>Change Password</Button>
                    </form>
                }
                          
            
        </Container>
    )
} 

export default PasswordReset