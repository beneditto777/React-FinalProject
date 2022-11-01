import { Link, useLocation, useNavigate } from "react-router-dom";
import Search from "../search/Search";

function Header() {
    let location = useLocation()
    let navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

  return (
    <>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid p-3">
                <Link to="/" className="navbar-brand">
                    <i className="fa-solid fa-clapperboard"></i>
                    &thinsp;
                    LK22
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto mt-1 mb-2 mb-lg-0">
                        <li className="nav-item">
                            {location.pathname === '/' ? 
                                <Link to="/" className="nav-link active">
                                    Home
                                </Link>
                                :
                                <Link to="/" className="nav-link">
                                    Home
                                </Link>
                            }
                        </li>
                        <li className="nav-item">
                            {location.pathname === '/playlist' ? 
                                <Link to="/playlist" className="nav-link active">
                                    Movie Playlist
                                </Link>
                                :
                                <Link to="/playlist" className="nav-link">
                                    Movie Playlist
                                </Link>
                            }
                        </li>
                        {localStorage.getItem("token") && 
                            <button 
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handleLogout()}
                                >
                                Logout
                            </button>
                        }
                    </ul>
                    <div className="d-flex">
                        <Search/>
                    </div>
                </div>
            </div>
        </nav>
    </>
    
  );
}

export default Header;
