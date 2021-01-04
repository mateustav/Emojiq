import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="nav">
      <Link to="/">Home</Link>
      <Link to="/about/">About</Link>
      <Link to="/privacy/">Privacy</Link>
    </div>
  );
}

export default Footer;
