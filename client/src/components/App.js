import {Route, Switch, useHistory} from 'react-router-dom'
import StateContext from './contexts/StateContext'
import { useContext, useEffect } from 'react'
import Login from './Login'
import SignUp from './SignUp'
import Navbar from './Navbar'
import Profile from './Profile'
import NewEvent from './NewEvent'
import Event from './Event'
import Home from './Home'
import EditEvent from './EditEvent'
import EventManager from './EventManager'
import EventFeed from './EventsFeed';

function App() {

   const history = useHistory()

   const { setNavbarLinks, setLoggedUser } = useContext(StateContext)

  useEffect(() => {
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
          history.push('/')
        }
      })
    } else {
      history.push('/')
    }
  }, [setNavbarLinks, setLoggedUser])

  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route exact path={['/']}>
          <Home />
        </Route>
        <Route path={['/login']}>
          <Login />
        </Route>
        <Route path={['/signup']}>
          <SignUp />
        </Route>
        <Route path={['/newEvent']}>
          <NewEvent />
        </Route>
        <Route exact path={['/event/:id/edit']}>
          <EditEvent />
        </Route>
        <Route path={['/account']}>
          <Profile />
        </Route>
        <Route path={['/eventsfeed']}>
          <EventFeed />
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
