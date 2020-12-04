import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import About from './pages/About';
import Privacy from './pages/Privacy';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/about/' component={About}/>
          <Route path='/privacy/' component={Privacy}/>
        </Switch>
        <Link to="/">Home</Link>
        <Link to="/about/">About</Link>
        <Link to="/privacy/">Privacy</Link>
      </BrowserRouter>
    </div>
  );
}

export default App;
