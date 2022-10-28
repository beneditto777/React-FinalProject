var url_omdb_home, url_omdb_detail, url_omdb_favourite
var api_key = "263e0950"

url_omdb_home = `http://www.omdbapi.com/?apikey=${api_key}&s=batman&type=movie`
url_omdb_favourite = `http://www.omdbapi.com/?apikey=${api_key}&t=`
url_omdb_detail = `http://www.omdbapi.com/?apikey=${api_key}&t=`

export{ url_omdb_home, url_omdb_detail, url_omdb_favourite }