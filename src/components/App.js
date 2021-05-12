import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './Login'
import Navbar from './Navbar'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route path={['/login']}>
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
