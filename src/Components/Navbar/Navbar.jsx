import { Link } from "react-router-dom";
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <nav>
        <Link to='/'><i className="fa-regular fa-user"></i></Link>
        <Link to='/recipes'><i className="fa-regular fa-pen-to-square"></i></Link>
        <Link to='/favorites'><i className="fa-regular fa-star"></i></Link>
      </nav>
    </div>
  )
}

export default Navbar;