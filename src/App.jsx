import './App.css';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import SearchPage from './pages/search/SearchPage';
import MoviePlaylist from './pages/movie-playlist/MoviePlaylist';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="container-fluid">
      <div className="navbox">
        <Navbar/>
      </div>
      <div className="content" style={{minHeight: "80vh"}}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/search" element={<SearchPage/>}/>
          <Route path="/playlist" element={<MoviePlaylist/>}/>
        </Routes>
      </div>
      <hr />
      <Footer/>
    </div>
  );
}

export default App;
