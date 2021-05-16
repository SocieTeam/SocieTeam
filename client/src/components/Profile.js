import StateContext from './contexts/StateContext'
import { useState, useContext, useEffect } from 'react'

function Profile () {
    const { setLoggedUser, loggedUser, setNavbarLinks } = useContext(StateContext)
    
    const [usernameEdit, setUsernameEdit] = useState(false)
    const [zipCodeEdit, setZipCodeEdit] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [zip, setZip] = useState('')

    useEffect(() => {
        if (loggedUser) {
            setUsername(loggedUser.username)
            setEmail(loggedUser.email)
            setZip(loggedUser.zip)
        }
    }, [loggedUser])

    function editHandler (e) {
        switch (e.target.name) {
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
        switch (e.target.name) {
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
        const options = {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem('societeam-token')).token}`,
                'Content-Type': 'application/json'
            }
        }
        if (e.target.name === 'usernameSave') {
            options.body = JSON.stringify({username})
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
        } else if (e.target.name === 'zipSave') {
            options.body = JSON.stringify({zip})
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

    return (
        <div className="top-level">
            <div className="title-and-avatar">
                <div className="avatar"></div>
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
                                    <button name="usernameCancel" onClick={cancelHandler}>Cancel</button>
                                    <button name="usernameSave" onClick={saveHandler}>Save</button>
                                </div>
                                :
                                <div>
                                    <button name="usernameEdit" onClick={editHandler}>Edit</button>
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
                                    <button name="zipCancel" onClick={cancelHandler}>Cancel</button>
                                    <button name="zipSave" onClick={saveHandler}>Save</button>
                                </div>
                                :
                                <div>
                                    <button name="zipEdit" onClick={editHandler}>Edit</button>
                                </div>
                            }
                        </div>
                    </div>
                    <hr/>
                </div>
            </section>

            <section className="actions">
                <h2>Actions</h2>
                <button disabled>Reset Password</button>
                <button disabled>Delete Account</button>
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
                    font-size: 1.3em;
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