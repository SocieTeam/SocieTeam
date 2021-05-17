import {Route, Switch, useHistory} from 'react-router-dom'
import StateContext from './contexts/StateContext'
import { useContext, useEffect } from 'react'
import Login from './Login'
import SignUp from './SignUp'
import Navbar from './Navbar'
import Profile from './Profile'
import NewEvent from './NewEvent'
import Event from './Event'
import EventManager from './EventManager'

function App() {

  const history = useHistory()

  const { setNavbarLinks, setLoggedUser } = useContext(StateContext)

  useEffect(() => {
    setNavbarLinks(['login', 'signup'])
    let token = localStorage.getItem('societeam-token')
    if (token) {
      token = JSON.parse(token)
      const options = {
        headers: {
          authorization: `Bearer ${token.token}`
        }
      }
      fetch(`${process.env.REACT_APP_API_URL}/users/${token.userId}`, options)
      .then(res => {
        if (res.ok) {
          res.json().then(json => {
            setLoggedUser(json)
          })
        } else {
          history.push('/login')
        }
      })
    } else {
      history.push('/login')
    }
  }, [setNavbarLinks, setLoggedUser])

  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route path={['/login']}>
          <Login />
        </Route>
        <Route path={['/signup']}>
          <SignUp />
        </Route>
        <Route path={['/newEvent']}>
          <NewEvent />
        </Route>
        <Route path={['/account']}>
          <Profile />
        </Route>
        <Route exact path={['/event/:id']}>
          <Event />
        </Route>
        <Route path={['/event-manager']}>
          <EventManager />
        </Route>
      </Switch>
      <style jsx>{`
        .App {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}

export default App;
