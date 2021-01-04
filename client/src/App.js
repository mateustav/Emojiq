import { BrowserRouter, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Link to="/">Home</Link>
        <Link to="/about/">About</Link>
        <Link to="/privacy/">Privacy</Link>
      </BrowserRouter>
    </div>
  );
}

export default App;
