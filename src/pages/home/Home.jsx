import { useEffect, useState } from 'react';
import { url_omdb_home, url_omdb_favourite, url_omdb_detail } from '../../api/api';

function Home() {
  
  const [movies, setMovies] = useState([])
  const [movieDetail, setMovieDetail] = useState([])

//   useEffect(() => {
//     fetch(url_omdb_home)
//     .then(response => response.json())
//     .then((data) => {
//       setMovies(data.Search)
//       setTheArray([...theArray, newElement])
//       console.log(data.Search);
//     })
//   },[])

  useEffect(() => {
    fetch(`${url_omdb_favourite}batman begins`)
    .then(response => response.json())
    .then((data) => {
      setMovies(movies => [...movies, data])
    })

    fetch(`${url_omdb_favourite}the dark knight`)
    .then(response => response.json())
    .then((data) => {
      setMovies(movies => [...movies, data])
    })

    fetch(`${url_omdb_favourite}the dark knight rises`)
    .then(response => response.json())
    .then((data) => {
      setMovies(movies => [...movies, data])
    })

    fetch(`${url_omdb_favourite}the batman`)
    .then(response => response.json())
    .then((data) => {
      setMovies(movies => [...movies, data])
    })

    fetch(`${url_omdb_favourite}man of steel`)
    .then(response => response.json())
    .then((data) => {
      setMovies(movies => [...movies, data])
    })

    fetch(`${url_omdb_favourite}Batman v Superman: Dawn of Justice`)
    .then(response => response.json())
    .then((data) => {
      setMovies(movies => [...movies, data])
    })

    fetch(`${url_omdb_favourite}iron man`)
    .then(response => response.json())
    .then((data) => {
      setMovies(movies => [...movies, data])
    })

    fetch(`${url_omdb_favourite}black adam`)
    .then(response => response.json())
    .then((data) => {
      setMovies(movies => [...movies, data])
    })
  },[])

  const getMovieDetail = (title) => {
    console.log("test", title);
    var movieDetailUrl = `${url_omdb_detail}${title}`
    fetch(movieDetailUrl)
    .then(response => response.json())
    .then((data) => {
      setMovieDetail(data)
      console.log(data);
        console.log("test2", movieDetail);
    })
  }

  return (
    <>
        <h2 className="page-section-heading text-center text-uppercase text-secondary mt-4">MOVIE FAVORITE</h2>
        <div className="row align-items-center">
            {movies.map((data, index) => (
                <div className="col-md-3 mt-3 d-flex justify-content-center" key={index}>
                    <div className="card" style={{width: "25rem", objectFit: "cover"}}>
                    <img src={data.Poster} className="card-img-top" alt="" srcSet="" />
                        <div className="card-body">
                            <h5 className="card-title" style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", maxWidth: "250px"}}>{data.Title}</h5>
                            <p className="card-text">Year &emsp;&ensp;&nbsp;&nbsp;: {data.Year}</p>
                            <p className="card-text">Imdb ID&nbsp;&nbsp;: {data.imdbID}</p>
                            <p className="card-text">Type &emsp;&ensp;&nbsp;: {data.Type}</p>
                            <a href="/#" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#detailMovie" onClick={() => getMovieDetail(data.Title)}>Details</a>
                        </div>
                    </div>
                </div>
            ))}
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
    </>
  );
}

export default Home;