

function MovieDetails({
    image:image,
    movie_name,
    rating,
    released_data
}){
    return(
        <div className="movie" style={{display:"flex",margin:"20px",boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",backgroundColor:"black",color:"white",width:"500px",height:"150px",alignItems:"center",marginLeft:"500px"}}>
            <img style={{width:"120px",height:"120px",margin:"10px"}} src={image} alt="movieImage" />
            <h3>Name: {movie_name}</h3>
            <div style={{marginLeft:"20px",marginRight:"20px"}}>
            <p style={{backgroundColor:"green",width:"40px",height:"20px"}}>★{rating}</p>
            <p>Date: {released_data}</p>
            </div>
            
        </div>
    )
}

export default MovieDetails