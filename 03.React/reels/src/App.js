import './App.css';
import Signup from './components/Signup';
import AuthProvider from './context/AuthProvider';
import Login from './components/Login';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Feed from './components/Feed'
function App() {
  return (
   <Router>
     <AuthProvider>
     <Switch>
       <PrivateRoute exact path='/' component={Feed}/>
       <Route path='/login' component={Login}/>
       <Route path='/signup' component={Signup}/>
     </Switch>
     </AuthProvider>
   </Router>
  );
}

export default App;
