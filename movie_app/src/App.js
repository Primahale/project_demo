import axios from "axios";
import { useEffect, useState } from "react";
import './App.css';
import MovieDetails from './Componants/MovieDetails';

function App() {
  const [data, setData] = useState([]);
 

useEffect(()=>{
  axios({
    method:"get",
    url:"http://localhost:3000/movie_data",
    
  })
  .then(res=>{
    setData(res.data)
  })
  .catch(err=>{
    console.log(err)
  })
  
},[])
 
console.log(data)
  

  

  return (
    <div className="App">
     <h1>Movie app</h1>
     <div>
       {
         data?.map(item=>
          <MovieDetails key={item.id} {...item}/>
         )
       }
     
      </div>
    </div>
  );
}

export default App;
