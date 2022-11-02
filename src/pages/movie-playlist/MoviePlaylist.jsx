import { useState } from "react"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

function MoviePlaylist() {
    let location = useLocation()
    const [list, setList] = useState([])
    const [tempIndex, setTempIndex] = useState()
    const [tempTitle, setTempTitle] = useState("")
    const [currentPage, setCurrentPage] = useState(1);

    const renderList = () => {
        if (JSON.parse(localStorage.getItem('playlist')) === null) {
            setList([])
        } else {
            setList(JSON.parse(localStorage.getItem('playlist')))
        }
    }

    useEffect(() => {
        console.log(location);
        console.log(JSON.parse(localStorage.getItem('playlist')));
        // console.log("Curr", pages);
        renderList()
    },[location, currentPage])

    const removeList = (index) => {
        var temp = JSON.parse(localStorage.getItem('playlist'))
        temp.splice(index, 1)
        localStorage.setItem('playlist', JSON.stringify(temp))
        setList(JSON.parse(localStorage.getItem('playlist')))
        if (currentItems.length === 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const itemsPerPage = 5
    const pageNumberLimit = 5
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

    const pages = []
    for (let index = 1; index <= Math.ceil(list.length / itemsPerPage); index++) {
        pages.push(index)
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    }

    const handleNext = () => {
        setCurrentPage(currentPage + 1)
        
        if (currentPage + 1 > maxPageNumberLimit) {
          setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
          setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
    }

    const handlePrev = () => {
        setCurrentPage(currentPage - 1)
    
        if ((currentPage - 1) % pageNumberLimit === 0) {
          setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
          setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    }

    const temp = (index, title) => {
        if (currentPage === 1) {
            setTempIndex(index)
            setTempTitle(title)
        } else {
            setTempIndex((5 * (currentPage - 1)) + (index))
            setTempTitle(title)
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

    const playlistMovie = () => {
        if (JSON.parse(localStorage.getItem('playlist')) === null) {
            return(
                <tr>
                    <th colSpan="9" style={{textAlign: "center", color: "red", height: "50vh"}}>There is no movie playlist yet!</th>
                </tr>
            )
        } else if (list.length === 0) {
            return(
                <tr>
                    <th colSpan="9" style={{textAlign: "center", color: "red", height: "50vh"}}>There is no movie playlist yet!</th>
                </tr>
            )
        } else {
            return(
                <>
                    {currentItems.map((data, index) => (
                        <tr key={index}>
                            <th scope="row" style={{textAlign: "center"}}>{currentPage === 1 ? (index + 1) : ((5 * (currentPage - 1)) + (index + 1))}</th>
                            <td style={{textAlign: "center"}}><img src={data.Poster} className="card-img-top" style={{height: "200px", width: "auto"}} alt="" srcSet="" /></td>
                            <td style={{textAlign: "center"}}>{data.Title}</td>
                            <td style={{textAlign: "center"}}>{data.Year}</td>
                            <td style={{textAlign: "center"}}>{data.Genre}</td>
                            <td style={{textAlign: "center"}}>{data.Runtime}</td>
                            <td style={{textAlign: "justify"}}>{data.Plot}</td>
                            <td style={{textAlign: "center", color: Number(data.imdbRating) > 7.5 ? "#54B435" : Number(data.imdbRating) > 5 && Number(data.imdbRating) < 7.5 ? "#FFDE00"  : "red"}}>{data.imdbRating} (IMDb)</td>
                            <td style={{textAlign: "justify"}}><button type="button" className="btn btn-outline-danger" onClick={() => temp(index, data.Title)} data-bs-toggle="modal" data-bs-target="#modalNotif">Delete</button></td>
                        </tr>
                    ))}
                </>
            )
        }
    }
    
    return(
        <>
            <div className="row">
                <h2 className="page-section-heading text-center text-uppercase text-secondary mt-4">MOVIE PLAYLIST <i className="fa-solid fa-rectangle-list"></i></h2>
            </div>

            <div className="row mt-3 justify-content-center">
                <div className="col-10 d-flex justify-content-center">
                    <table className="table table-bordered table-dark table-hover w-auto border border-2 border-secondary">
                        <thead>
                            <tr>
                                <th scope="col" style={{textAlign: "center"}}>No.</th>
                                <th scope="col" style={{textAlign: "center"}}>Poster</th>
                                <th scope="col" style={{textAlign: "center"}}>Title</th>
                                <th scope="col" style={{textAlign: "center"}}>Year</th>
                                <th scope="col" style={{textAlign: "center"}}>Genre</th>
                                <th scope="col" style={{textAlign: "center"}}>Runtime</th>
                                <th scope="col" style={{textAlign: "center"}}>Plot</th>
                                <th scope="col" style={{textAlign: "center"}}>Rating</th>
                                <th scope="col" style={{textAlign: "center"}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playlistMovie()}
                        </tbody>
                    </table>
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
                    Are you sure you want to delete <b>{tempTitle}</b> from your playlist?
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => removeList(tempIndex)}>Delete</button>
                </div>
                </div>
            </div>
            </div>

            <div className="row mt-5 mb-5 justify-content-center">
                <div className="col-8 d-flex justify-content-center"> 
                    <div className="pagination">
                        <button disabled={currentPage === pages[0] ? true : false} onClick={handlePrev}>&laquo;</button>
                            {renderPageNumbers}
                        <button disabled={currentPage === pages[pages.length - 1] ? true : false} onClick={handleNext}>&raquo;</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MoviePlaylist