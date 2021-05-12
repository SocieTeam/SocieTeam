import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './Login'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path={['/login']}>
          <Login />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
