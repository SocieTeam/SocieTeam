import {Route, Switch, Redirect} from 'react-router-dom'
import StateContext from './contexts/StateContext'
import { useContext, useEffect } from 'react'
import Login from './Login'
// import SignUp from './SignUp'
import Navbar from './Navbar'
import NewEvent from './NewEvent'
import Event from './Event'

function App() {

  const { setNavbarLinks } = useContext(StateContext)

  useEffect(() => {
    setNavbarLinks(['login', 'signup'])
  }, [setNavbarLinks])

  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route path={['/login']}>
          <Login />
        </Route>
        {/* <Route path={['/signup']}>
          <SignUp />
        </Route> */}
        <Route path={['/newEvent']}>
          <NewEvent />
        </Route>
        <Route exact path = {['/event/:id']}>
          <Event />
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
