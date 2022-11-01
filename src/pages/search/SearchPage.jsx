import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { url_omdb_detail } from "../../api/api"
import noImage from "../../assets/image/noimage.png"
import notFound from "../../assets/image/notfound.jpg"
import "./pagination.css"
import { fetchSearchPage } from "../store/Action"


function SearchPage() {
    const state = useSelector((state) => state)
    let location = useLocation()
    var keyword = location.state.keyword
    
    const [loaderDetail, setLoaderDetail] = useState(false)
    const [movieDetail, setMovieDetail] = useState([])
    
    const [currentPage, setCurrentPage] = useState(location.state.currentPage)
 
    const pageNumberLimit = 5
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)
    let totalPage = Math.ceil(Number(state.totalResults) / 10)

    const pages = []
    for (let index = 1; index <= totalPage; index++) {
        pages.push(index)
    }

    const handleClick = (event) => {
        location.state.currentPage = Number(event.target.id)
        setCurrentPage(Number(event.target.id));
        console.log("Test",currentPage);
        dispatch(fetchSearchPage(keyword, location.state.currentPage));
        window.scrollTo(0,0)
    }

    const handleNext = () => {
        location.state.currentPage = location.state.currentPage + 1
        console.log("Next Test", currentPage);
        dispatch(fetchSearchPage(keyword, location.state.currentPage));
    
        if (location.state.currentPage > maxPageNumberLimit) {
          setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
          setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
        window.scrollTo(0,0)
    }

    const handlePrev = () => {
        location.state.currentPage = location.state.currentPage - 1
        dispatch(fetchSearchPage(keyword, location.state.currentPage));
    
        if ((location.state.currentPage) % pageNumberLimit === 0) {
          setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
          setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
        window.scrollTo(0,0)
    }

    const handleNextbtn = () => {
        location.state.currentPage = location.state.currentPage + 1
        dispatch(fetchSearchPage(keyword, location.state.currentPage));
    
        if ((location.state.currentPage) > maxPageNumberLimit) {
          setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
          setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
        window.scrollTo(0,0)
      };
    
      const handlePrevbtn = () => {
        location.state.currentPage = location.state.currentPage - 1
        dispatch(fetchSearchPage(keyword, location.state.currentPage));
    
        if ((location.state.currentPage) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
        window.scrollTo(0,0)
      };

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
      pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
    }
  
    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
      pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
    }

    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return(
                <li className={location.state.currentPage === number ? "page-link active" : "page-link"} key={number} id={number} onClick={handleClick}>
                    {number}
                </li>
            )
        } else {
            return null;
        }
    })

    var temp = JSON.parse(localStorage.getItem('playlist'))
    var playlist = []

    const addToPlaylist = (imdbID) =>{
        var moviePlaylistUrl = `${url_omdb_detail}${imdbID}`
        fetch(moviePlaylistUrl)
        .then(response => response.json())
        .then((data) => {
        if (temp != null) {
            playlist = temp
        }
        JSON.parse(localStorage.getItem(('playlist') || '[]'))
        playlist.push(data)
        localStorage.setItem('playlist', JSON.stringify(playlist))
        })
    }

    const getMovieDetail = (imdbID) => {
        setLoaderDetail(true)
        var movieDetailUrl = `${url_omdb_detail}${imdbID}`
        fetch(movieDetailUrl)
        .then(response => response.json())
        .then((data) => {
          setMovieDetail(data)
          setLoaderDetail(false)
        })
    }

    const dispatch = useDispatch()

    const handleCardSearch = () => {
        if (state.searchPage !== undefined) {
            return(
                <div className="row align-items-center">
                    {state.searchPage.map((data, index) => (
                        <div className="col-md-3 mt-3 d-flex justify-content-center" key={index}>
                            <div className="card zoom" style={{width: "20rem", objectFit: "cover"}} data-bs-toggle="modal" data-bs-target="#detailMovie" onClick={() => getMovieDetail(data.imdbID)}>
                                <img src={data.Poster === "N/A" ? noImage : data.Poster} className="card-img-top" alt="" srcSet="" style={{height: "30rem"}}/>
                                <div className="card-body">
                                    <h5 className="card-title" style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", maxWidth: "250px"}}>{data.Title}</h5>
                                    <p className="card-text">Year &emsp;&ensp;&nbsp;&nbsp;: {data.Year}</p>
                                    <p className="card-text">Rating&nbsp;&emsp;: {data.Rating} (IMDb)</p>
                                    <p className="card-text">Type &emsp;&ensp;&nbsp;: {data.Type}</p>
                                    <button className="btn btn-outline-secondary me-2" data-bs-toggle="modal" data-bs-target="#detailMovie" onClick={() => getMovieDetail(data.imdbID)}>Details</button>
                                    <button className="btn btn-outline-dark" onClick={() => addToPlaylist(data.imdbID)} data-bs-toggle="modal" data-bs-target="#modalNotif">Add to Playlist</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        } else if (state.searchPage === undefined) {
            return(
                <div className="card">
                    <div className="card-body">
                    <h5 className="card-title text-center">Not Found!</h5>
                    <p className="card-text text-center"><small className="text-muted">Try another movie title</small></p>
                    </div>
                    <img src={notFound} className="crad-img-bottom" alt=""/>
                </div>
            )
        }
    }


    useEffect(() => {
        dispatch(fetchSearchPage(keyword, location.state.currentPage));
        setMaxPageNumberLimit(5)
        setMinPageNumberLimit(0)
        
    },[dispatch, keyword, location])


    return(
        <>
            <h2 className="page-section-heading text-center text-uppercase text-secondary mt-4">SEARCH PAGE <i className="fa-solid fa-magnifying-glass"></i></h2>
            {state.loader === true ? 
                <div className="d-flex justify-content-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                :
                <>
                    {handleCardSearch()}
                </>
            }

            <div className="row mt-5 mb-5 justify-content-center">
                <div className="col-8 d-flex justify-content-center"> 
                    <div className="pagination">
                        <button onClick={handlePrev} disabled={location.state.currentPage === pages[0] ? true : false}>&laquo;</button>
                            {pageDecrementBtn}
                            {renderPageNumbers}
                            {pageIncrementBtn}
                        <button onClick={handleNext} disabled={location.state.currentPage === pages[pages.length - 1] ? true : false}>&raquo;</button>
                    </div>
                </div>
            </div>

            {/* Modal Movie Detail */}
            <div className="modal fade" id="detailMovie" tabIndex="-1" aria-labelledby="detailMovieModal" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Movie Detail</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body d-flex justify-content-center">
                        <div className="row justify-content between">
                            {loaderDetail === true ?
                                <div className="d-flex justify-content-center mt-5">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                :
                                <>
                                    <div className="col-md-5">
                                        <img src={movieDetail.Poster === "N/A" ? noImage : movieDetail.Poster} className="img-fluid rounded-start h-100 w-100" alt="" srcSet="" />
                                    </div>
                                    <div className="col-md-7">
                                        <div className="card-body">
                                            <h5 className="card-title mt-2 mb-2"><u>{movieDetail.Title}</u></h5>
                                            <p className="card-text"> Year &ensp;&ensp;&ensp;&ensp;&nbsp;: {movieDetail.Year}</p>
                                            <p className="card-text"> Rated &ensp;&ensp;&ensp;: {movieDetail.Rated}</p>
                                            <p className="card-text"> Rating &ensp;&ensp;&thinsp;: {movieDetail.imdbRating} (IMDb)</p>
                                            <p className="card-text">Release &ensp;&nbsp;: {movieDetail.Released}</p>
                                            <p className="card-text">Runtime &ensp;: {movieDetail.Runtime}</p>
                                            <p className="card-text">Genre &ensp;&ensp;&ensp;: {movieDetail.Genre}</p>
                                            <p className="card-text"><small className="text-muted">{movieDetail.Plot}</small></p>
                                        </div>
                                    </div>
                                </>
                            }
                            
                        </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>

            {/* Modal Notif */}
            <div className="modal fade" id="modalNotif" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Movie Playlist</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Successfully Add Movie Playlist!
                    </div>
                    <div className="modal-footer d-flex justify-content-center">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Done</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchPage