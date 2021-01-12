import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <div className="nav">
        <Link to="/">Home</Link>
        <Link to="/privacy/">Privacy</Link>
        <br />
        <p>
          Made with ❤️ by <a href="https://matttt.ca/">Mateus</a>
        </p>
      </div>
    </>
  );
}

export default Footer;
