import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
    const history = useNavigate()
    const [keyword, setKeyword] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const buttonSearch = () => {
        console.log(keyword);
        setKeyword("")
        setCurrentPage(1)
        console.log("current page di search", currentPage);
        history(
            "/search",
            {state: {keyword, currentPage}}
        )
        window.scrollTo(0,0)
    }

    const pressEnterToSearch = (e) => {
        if (e.keyCode === 13 && e.key === "Enter") {
            buttonSearch()
        }
    }

    return(
        <>
            <input 
                className="form-control me-2" 
                type="search" 
                placeholder="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => pressEnterToSearch(e)}
            />
            <button className="btn btn-outline-success" type="submit" onClick={() => buttonSearch()}>Search</button>
        </>
    )
}

export default Search