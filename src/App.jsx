import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Movie from './pages/home/Movie';
import SearchPage from './pages/search/SearchPage';
import MoviePlaylist from './pages/movie-playlist/MoviePlaylist';
import Login from './pages/login/Login';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  let location = useLocation()

  const [temp, setTemp] = useState();

  useEffect(() => {
    if (location.pathname === "/login") {
      setTemp(true)
    } else {
      setTemp(false)
    }
  },[location])

  return (
    <div className="container-fluid">
      <div className="navbox">
        <div hidden={temp}>
          <Header/>
        </div>
      </div>
      <div className="content" style={{minHeight: "80vh"}}>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Movie/>
            </ProtectedRoute>
          }/>

          <Route path="/search" element={
            <ProtectedRoute>
              <SearchPage/>
            </ProtectedRoute>
          }/>

          <Route path="/playlist" element={
            <ProtectedRoute>
              <MoviePlaylist/>
            </ProtectedRoute>
          }/>

          <Route path="/login" element={
          <Login/>
          }/>
        </Routes>
      </div>
      <div hidden={temp}>
        <hr />
        <Footer/>
      </div>
    </div>
  );
}

export default App;
