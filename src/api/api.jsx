var url_omdb_home, url_omdb_detail, url_omdb_favourite, url_omdb_search
var api_key = "6d6b67c"

url_omdb_home = `https://www.omdbapi.com/?apikey=${api_key}&s=batman&type=movie`
url_omdb_favourite = `https://www.omdbapi.com/?apikey=${api_key}&t=`
url_omdb_detail = `https://www.omdbapi.com/?apikey=${api_key}&i=`
url_omdb_search = `https://www.omdbapi.com/?apikey=${api_key}&s=`

export{ url_omdb_home, url_omdb_detail, url_omdb_favourite, url_omdb_search }