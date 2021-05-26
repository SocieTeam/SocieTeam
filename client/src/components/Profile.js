import StateContext from './contexts/StateContext'
import { useState, useContext, useEffect } from 'react'
import Progress from './ProgressPerc';
import { Avatar, makeStyles, Button } from '@material-ui/core';

function Profile () {

    const { setLoggedUser, loggedUser, setNavbarLinks } = useContext(StateContext)
    
    const [usernameEdit, setUsernameEdit] = useState(false)
    const [zipCodeEdit, setZipCodeEdit] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [zip, setZip] = useState('')
    
    const [profilePic, setPic] = useState('');

    const [image, setImage] = useState(profilePic);

    const [file, setFile] = useState(null);
    const [fileError, setError] = useState(null);

    useEffect(() => {

        setNavbarLinks(['eventManager', 'eventsFeed'])

        if (loggedUser) {
            console.log(loggedUser)
            setImage(loggedUser.profile_pic)
            setUsername(loggedUser.username)
            setEmail(loggedUser.email)
            setZip(loggedUser.zip)
        }
    }, [loggedUser])

    function imageChoose (e) {
        const file = e.target.files[0];
        
        const types = ['image/png', 'image/jpeg'];

        if(file && types.includes(file.type)) {
            setFile(file);
            setError(null);
        }
        else {
            setFile(null);
            setError('Please Select an image file (png or jpeg)');
        }
    }

    function editHandler (e) {
        switch (e.target.parentNode.name) {
            case 'usernameEdit':
                setUsernameEdit(true)
                setTimeout(() => {document.querySelector("input[name='username']").focus()}, 1)
                break;
            case 'zipEdit':
                setZipCodeEdit(true)
                setTimeout(() => {document.querySelector("input[name='zip']").focus()}, 1)
                break;
            default:
        }
    }

    function changeHandler (e) {
        switch (e.target.name) {
            case 'username':
                setUsername(e.target.value)
                break;
            case 'zip':
                setZip(e.target.value)
                break;
            default:
        }
    }

    function cancelHandler (e) {
        switch (e.target.parentNode.name) {
            case 'usernameCancel':
                setUsername(loggedUser.username)
                setUsernameEdit(false)
                break;
            case 'zipCancel':
                setZip(loggedUser.zip ? loggedUser.zip : '')
                setZipCodeEdit(false)
                break;
            default:
        }
    }

    function saveHandler (e) {
        console.log(e.target.parentNode.name);
        const options = {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('societeam-token')).token}`,
                'Content-Type': 'application/json'
            }
        }
        if (e.target.parentNode.name === 'usernameSave') {
            options.body = JSON.stringify({username, email, zip})
            fetch(`${process.env.REACT_APP_API_URL}/users/${loggedUser.id}`, options)
            .then(res => {
                if (res.ok) {
                    res.json().then(json => {
                        setLoggedUser(json.user)
                        setUsername(json.user.username)
                        setUsernameEdit(false)
                    })
                } else {
                    console.log('username already taken')
                }
            })
        } else if (e.target.parentNode.name === 'zipSave') {
            options.body = JSON.stringify({zip, profile_pic: image})
            fetch(`${process.env.REACT_APP_API_URL}/users/${loggedUser.id}`, options)
            .then(res => {
                if (res.ok) {
                    res.json().then(json => {
                        setLoggedUser(json.user)
                        setZip(json.user.zip)
                        setZipCodeEdit(false)
                    })
                } else {
                    console.log('something went wrong with the zip')
                }
            })
        }
        else if (e.target.innerText === 'SAVE PROFILE IMAGE') {
            options.body = JSON.stringify({zip, profile_pic: image})
            fetch(`${process.env.REACT_APP_API_URL}/users/${loggedUser.id}`, options)
            .then(res => {
                if (res.ok) {
                    res.json().then(json => {
                        setLoggedUser(json.user)
                        setZip(json.user.zip)
                        setZipCodeEdit(false)
                    })
                } else {
                    console.log('something went wrong with the zip')
                }
            })
        }
    }

    function logoutHandler () {
        localStorage.removeItem('societeam-token')
        window.location.reload()
    }

    const useStyles = makeStyles((theme) => ({
        small: {
          width: theme.spacing(3),
          height: theme.spacing(3),
        },
        large: {
          width: theme.spacing(7),
          height: theme.spacing(7),
        },
    }));
    const classes = useStyles();
    return (
        <div className="top-level">
            <div className="title-and-avatar">
                    <Avatar src={image} className={classes.large}/>
                <br></br>
                <input type = 'file' accept = 'image/*' onChange = {imageChoose} id="contained-button-file" style={{display: 'none'}}></input>
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span" style={{background: 'black'}}>
                        Upload
                    </Button>
                </label>
                { fileError && <div> {fileError} </div>}
                { file && <Progress file = {file} setFile = {setFile} setFileURL = {setImage}/>}
                {loggedUser ? image === loggedUser.profile_pic ? null : <Button name="zipSave" onClick={saveHandler} style={{background: 'gray', color: 'white'}}>Save Profile Image</Button> : null}
                <div className="title">
                    <h1>Account Management</h1>
                    <hr/>
                </div>
            </div>
         
            <section className="user-info">
                <div className="account-input-group">
                    <span className="account-input-label">Email</span>
                    <div className="account-input-wrapper">
                        <input value={email} disabled name="email" className="account-input-field"/>
                    </div>
                    <hr/>
                </div>
                <div className="account-input-group">
                    <span className="account-input-label">Username</span>
                    <div className="account-input-wrapper">
                        <input onChange={changeHandler} value={username} disabled={!usernameEdit} name="username" className="account-input-field"/>
                        <div className="account-input-options">
                            {
                                usernameEdit ? 
                                <div>
                                    <Button name="usernameCancel" onClick={cancelHandler} style={{background: 'gray', color: 'white'}}>Cancel</Button>
                                    <Button name="usernameSave" onClick={saveHandler} style={{background: 'gray', color: 'white'}}>Save</Button>
                                </div>
                                :
                                <div>
                                    <Button name="usernameEdit" onClick={editHandler} style={{background: 'gray', color: 'white'}}>Edit</Button>
                                </div>
                            }
                        </div>
                    </div>
                    <hr/>
                </div>
                <div className="account-input-group">
                    <span className="account-input-label">Zip Code</span>
                    <div className="account-input-wrapper">
                        <input onChange={changeHandler} value={zip ? zip : ''} disabled={!zipCodeEdit} name="zip" className="account-input-field"/>
                        <div className="account-input-options">
                            {
                                zipCodeEdit ? 
                                <div>
                                    <Button name="zipCancel" onClick={cancelHandler} style={{background: 'gray', color: 'white'}}>Cancel</Button>
                                    <Button name="zipSave" onClick={saveHandler} style={{background: 'gray', color: 'white'}}>Save</Button>
                                </div>
                                :
                                <div>
                                    <Button name="zipEdit" onClick={editHandler} style={{background: 'gray', color: 'white'}}>Edit</Button>
                                </div>
                            }
                        </div>
                    </div>
                    <hr/>
                </div>
            </section>

            <section className="actions">
                <h2>Actions</h2>
                <Button onClick={logoutHandler} color='primary' variant='contained' style={{background: 'red'}}>Logout</Button>
                {/* <button disabled>Reset Password</button>
                <button disabled>Delete Account</button> */}
            </section>
            <style jsx>{`
                .top-level {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    height: 100%;
                    padding: 5% 10%;
                }
                .title-and-avatar {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                }
                .title {
                    margin-left: 1em;
                    flex: 1;
                }
                .title h1 {
                    margin: 0;
                    font-size: 1.2em;
                }
                .avatar {
                    width: 4em;
                    height: 4em;
                    background-color: lightgrey;
                    border-radius: 2em;
                }
                .user-info, .actions {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    margin-top: 2em;
                }
                .account-input-group {
                    width: 100%;
                }
                .account-input-group hr {
                    margin-top: 0;
                }
                .account-input-wrapper {
                    display: flex;
                    margin-top: 0.5em;
                }
                .account-input-field {
                    flex: 1;
                    border-width: 0px;
                }
            `}</style>
        </div>
    )
}

export default Profile