import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './Login'
// import SignUp from './SignUp'
import Navbar from './Navbar'
import NewEvent from './NewEvent'

function App() {
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
