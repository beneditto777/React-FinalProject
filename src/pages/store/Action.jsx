import { url_omdb_favourite, url_omdb_search } from "../../api/api"

export const fetchMovies = () => {
    return async (dispatch) => {
        dispatch({
            type: "SET_LOADER",
        })

        let temp = []
        const res1 = await fetch(`${url_omdb_favourite}batman begins`)
        const res2 = await fetch(`${url_omdb_favourite}the dark knight`)
        const res3 = await fetch(`${url_omdb_favourite}the dark knight rises`)
        const res4 = await fetch(`${url_omdb_favourite}the batman`)
        const res5 = await fetch(`${url_omdb_favourite}man of steel`)
        const res6 = await fetch(`${url_omdb_favourite}Batman v Superman: Dawn of Justice`)
        const res7 = await fetch(`${url_omdb_favourite}iron man`)
        const res8 = await fetch(`${url_omdb_favourite}black adam`)

        const movies1 = await res1.json()
        const movies2 = await res2.json()
        const movies3 = await res3.json()
        const movies4 = await res4.json()
        const movies5 = await res5.json()
        const movies6 = await res6.json()
        const movies7 = await res7.json()
        const movies8 = await res8.json()

        // console.log(movies1);

        temp.push(movies1)
        temp.push(movies2)
        temp.push(movies3)
        temp.push(movies4)
        temp.push(movies5)
        temp.push(movies6)
        temp.push(movies7)
        temp.push(movies8)

        dispatch({
            type: "SET_MOVIES",
            payload: temp,
            loader: false
        })
    }
}


export const fetchSearchPage = (keyword, currentPage) => {
    return async (dispatch) => {
        dispatch({
            type: "SET_LOADER",
        })
        if (keyword === null) {
            keyword = ""
        }

        let temp = []
        let result = ""
        const res1 = await fetch(`${url_omdb_search}${keyword}&page=${currentPage}`)
        console.log(res1);
        const search = await res1.json()

        temp = search.Search
        result = search.totalResults
        
        if (temp !== undefined) {
            await Promise.all(temp.map(async element =>(
                await fetch(`https://www.omdbapi.com/?i=${element.imdbID}&apikey=6d6b67c`)
                .then(response => response.json())
                .then(data => element.Rating = data.imdbRating)
                )))
        }
            
        console.log("search", result);
        dispatch({
            type: "SET_MOVIES_SEARCH",
            payload: temp,
            result: result,
            loader: false
        })
    }
}