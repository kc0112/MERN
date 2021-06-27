import Movies from './Components/Movies';
import About from './Components/About';
import Home from './Components/Home';
import Nav from './Nav';
// for routing diff pages
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'

function App() {
  return (
    // capabilty of routing
    <Router>
      {/* navbar component hr page pr chahie to route ni kia */}
      <Nav />
      {/* pli br jo match hua fr age check ni krta */}
      <Switch>
        {/* Route -> builds route for paths */}
        <Route path='/' exact component={Home} />
        <Route path='/movies' component={Movies} />
        {/* method to send args */}
                                {/* render me internal props(keys,location,history) bhjne rte*/}
        <Route path='/about' render={(props) => (
          // component {...internal props} args
          <About {...props} isAuth={true}/>
        )} />
      </Switch>
    </Router>
  );
}

export default App;