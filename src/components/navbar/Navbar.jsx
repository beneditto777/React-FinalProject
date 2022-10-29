import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
    let location = useLocation()
    const history = useNavigate()
    const [keyword, setKeyword] = useState("")
    const buttonSearch = () => {
        console.log(keyword);
        history(
            "/search",
            {state: {keyword}}
        )
        setKeyword("")
    }

    const pressEnterToSearch = (e) => {
        if (e.keyCode === 13 && e.key === "Enter") {
            buttonSearch()
        }
    }


  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
            
                <Link to="/" className="navbar-brand">
                    <i className="fa-solid fa-clapperboard"></i>
                    &thinsp;
                    Movie
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
                            {/* <Link to="/playlist" className="nav-link">
                                Movie Playlist
                            </Link> */}
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
                        <li className="nav-item">
                            <a className="nav-link" href="/#">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/#">About</a>
                        </li>
                    </ul>
                    <div className="d-flex">
                        <input 
                            className="form-control me-2" 
                            type="search" 
                            placeholder="Search"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={(e) => pressEnterToSearch(e)}
                        />
                        <button className="btn btn-outline-success" type="submit" onClick={() => buttonSearch()}>Search</button>
                    </div>
                </div>
            </div>
        </nav>
    </>
    
  );
}

export default Navbar;
