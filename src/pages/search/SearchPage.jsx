import { useState } from "react"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { url_omdb_search } from "../../api/api"
import { url_omdb_detail } from "../../api/api"
import noImage from "../../assets/image/noimage.png"
import notFound from "../../assets/image/notfound.jpg"
import "./pagination.css"


function SearchPage() {
    let location = useLocation()
    const [result, setResult] = useState("")

    const [movieList, setMovieList] = useState([])
    const [movieDetail, setMovieDetail] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    // const [pageNumberLimit, setpageNumberLimit] = useState(5);
    const pageNumberLimit = 5
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
    let totalPage = Math.ceil(Number(result) / 10)

    const pages = []
    for (let index = 1; index <= totalPage; index++) {
        pages.push(index)
    }

    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    }

    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    
        if (currentPage + 1 > maxPageNumberLimit) {
          setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
          setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
    };

    const handlePrev = () => {
        setCurrentPage(currentPage - 1);
    
        if ((currentPage - 1) % pageNumberLimit === 0) {
          setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
          setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    }

    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return(
                <li className={currentPage === number ? "page-link active" : "page-link"} key={number} id={number} onClick={handleClick}>
                    {number}
                </li>
            )
        } else {
            return null;
        }
    })

    var temp = JSON.parse(localStorage.getItem('playlist'))
    var playlist = []

    const addToPlaylist = (title) =>{
        var moviePlaylistUrl = `${url_omdb_detail}${title}`
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

    const getMovieDetail = (title) => {
        var movieDetailUrl = `${url_omdb_detail}${title}`
        fetch(movieDetailUrl)
        .then(response => response.json())
        .then((data) => {
          setMovieDetail(data)
        })
    }

    useEffect(() => {
        console.log(`${url_omdb_search}${location.state.keyword}&page=${currentPage}`);
        fetch(`${url_omdb_search}${location.state.keyword}&page=${currentPage}`)
        .then(response => response.json())
        .then((data) => {
            setMovieList(data.Search)
            setResult(data.totalResults)
    })
    },[location, currentPage])

    return(
        <>
            <h2 className="page-section-heading text-center text-uppercase text-secondary mt-4">SEARCH PAGE</h2>
            <div className="row">
                {movieList === undefined ? 
                    <div className="card">
                        <div className="card-body">
                        <h5 className="card-title text-center">Not Found!</h5>
                        <p className="card-text text-center"><small className="text-muted">Try another movie title</small></p>
                        </div>
                        <img src={notFound} className="crad-img-bottom" alt=""/>
                    </div>
                    : 
                    <div className="row align-items-center">
                        {movieList.map((data, index) => (
                            <div className="col-md-3 mt-3 d-flex justify-content-center" key={index}>
                                <div className="card" style={{width: "20rem", objectFit: "cover"}}>
                                    <img src={data.Poster === "N/A" ? noImage : data.Poster} className="card-img-top" alt="" srcSet="" style={{height: "30rem"}}/>
                                    <div className="card-body">
                                        <h5 className="card-title" style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", maxWidth: "250px"}}>{data.Title}</h5>
                                        <p className="card-text">Year &emsp;&ensp;&nbsp;&nbsp;: {data.Year}</p>
                                        <p className="card-text">Imdb ID&nbsp;&nbsp;: {data.imdbID}</p>
                                        <p className="card-text">Type &emsp;&ensp;&nbsp;: {data.Type}</p>
                                        <button className="btn btn-outline-secondary me-2" data-bs-toggle="modal" data-bs-target="#detailMovie" onClick={() => getMovieDetail(data.Title)}>Details</button>
                                        <button className="btn btn-outline-dark" onClick={() => addToPlaylist(data.Title)} data-bs-toggle="modal" data-bs-target="#modalNotif">Add to Playlist</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>

            <div className="row mt-5 mb-5 justify-content-center">
                <div className="col-8 d-flex justify-content-center"> 
                    <div className="pagination">
                        <button onClick={handlePrev} disabled={currentPage === pages[0] ? true : false}>&laquo;</button>
                            {renderPageNumbers}
                        <button onClick={handleNext} disabled={currentPage === pages[pages.length - 1] ? true : false}>&raquo;</button>
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
                        {/* <div class="card mb-3 w-100" style={{maxWidth: "540px"}}> */}
                            <div className="row justify-content between">
                                <div className="col-md-5">
                                    <img src={movieDetail.Poster} className="img-fluid rounded-start h-100 w-100" alt="" srcSet="" />
                                </div>
                                <div className="col-md-7">
                                    <div className="card-body">
                                        <h5 className="card-title mt-2 mb-2"><u>{movieDetail.Title}</u></h5>
                                        <p className="card-text"> Year &ensp;&ensp;&ensp;&ensp;&nbsp;: {movieDetail.Year}</p>
                                        <p className="card-text"> Rated &ensp;&ensp;&ensp;: {movieDetail.Rated}</p>
                                        <p className="card-text">Release &ensp;&nbsp;: {movieDetail.Released}</p>
                                        <p className="card-text">Runtime &ensp;: {movieDetail.Runtime}</p>
                                        <p className="card-text">Genre &ensp;&ensp;&ensp;: {movieDetail.Genre}</p>
                                        <p className="card-text"><small className="text-muted">{movieDetail.Plot}</small></p>
                                    </div>
                                </div>
                            </div>
                        {/* </div> */}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        {/* <button type="button" class="btn btn-primary">Save changes</button> */}
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
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Done</button>
                        {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchPage