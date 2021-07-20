import './App.css';
import Signup from './components/Signup';
import AuthProvider from './context/AuthProvider';
// import Main from './MaterialUI/Main';
// import Login from './Components/Login';
// import Ioa from './Components/Ioa';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          {/* <Route path='/login' component={Login} /> */}
          <Route path='/signup' component={Signup} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;