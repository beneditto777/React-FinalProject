import { useState } from "react"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

function MoviePlaylist() {
    let location = useLocation()
    const [list, setList] = useState([])
    const [tempIndex, setTempIndex] = useState()

    useEffect(() => {
        console.log(location);
        console.log(JSON.parse(localStorage.getItem('playlist')));
        setList(JSON.parse(localStorage.getItem('playlist')))
    },[location])

    const removeList = (index) => {
        var temp = JSON.parse(localStorage.getItem('playlist'))
        temp.splice(index, 1)
        localStorage.setItem('playlist', JSON.stringify(temp))
        setList(JSON.parse(localStorage.getItem('playlist')))
    }

    const playlistMovie = () => {
        if (JSON.parse(localStorage.getItem('playlist')) === null) {
            return(
                <tr>
                    <th colSpan="8" style={{textAlign: "center", color: "red", height: "50vh"}}>There is no movie playlist yet!</th>
                </tr>
            )
        } else if (list.length === 0) {
            return(
                <tr>
                    <th colSpan="8" style={{textAlign: "center", color: "red", height: "50vh"}}>There is no movie playlist yet!</th>
                </tr>
            )
        } else {
            return(
                <>
                    {list.map((data, index) => (
                        <tr key={index}>
                            <th scope="row" style={{textAlign: "center"}}>{index + 1}</th>
                            <td><img src={data.Poster} className="card-img-top" style={{height: "200px", width: "auto"}} alt="" srcSet="" /></td>
                            <td>{data.Title}</td>
                            <td>{data.Year}</td>
                            <td>{data.Genre}</td>
                            <td style={{textAlign: "center"}}>{data.Runtime}</td>
                            <td style={{textAlign: "justify"}}>{data.Plot}</td>
                            <td><button type="button" className="btn btn-outline-danger" onClick={() => setTempIndex(index)} data-bs-toggle="modal" data-bs-target="#modalNotif">Delete</button></td>
                        </tr>
                    ))}
                </>
            )
        }
    }
    
    return(
        <>
            <div className="row">
                <h2 className="page-section-heading text-center text-uppercase text-secondary mt-4">MOVIE PLAYLIST</h2>
            </div>

            <div className="row mt-3 justify-content-center">
                <div className="col-10 d-flex justify-content-center">
                    <table className="table table-bordered w-auto">
                        <thead>
                            <tr>
                                <th scope="col" style={{textAlign: "center"}}>No.</th>
                                <th scope="col" style={{textAlign: "center"}}>Poster</th>
                                <th scope="col" style={{textAlign: "center"}}>Title</th>
                                <th scope="col" style={{textAlign: "center"}}>Year</th>
                                <th scope="col" style={{textAlign: "center"}}>Genre</th>
                                <th scope="col" style={{textAlign: "center"}}>Runtime</th>
                                <th scope="col" style={{textAlign: "center"}}>Plot</th>
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
                    Are you sure you want to delete this movie?
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => removeList(tempIndex)}>Delete</button>
                </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default MoviePlaylist