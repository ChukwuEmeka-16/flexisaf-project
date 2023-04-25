import {useEffect, useState} from 'react'
import axios from 'axios';
import TileCard from './minicomponents/TileCard';


const Search = () => {
  const [search , setSearch] = useState('')
  const [results,setResults] = useState([])
  const [searchResults,setSearchResults] = useState([])

  
  useEffect(()=>{
   if (results.length > 0) {

    let filtered =  results.filter((item)=>{
      return  item.title.includes(search)
    })
    setSearchResults(filtered)
   

   } 
  },[search])

  
   
  const getNotes = async () =>{
    await axios.post('http://localhost:3100/notes/',{token:localStorage.getItem('token')})
    .then((response)=>{
      if (response.data.success) {
        
        setResults(response.data.notes)
       }
    })
    .catch((error)=>alert(error))
  }
  return (
    
    <div className='search-container'> 
      <input type="search" value={search} onClick={getNotes} onChange={(e)=>setSearch(e.target.value)} placeholder='Enter the title of your desired note?' className='search-bar'/>

      <div className='search-results'>
       {
          searchResults.length < 1 ? <h1 style={{textAlign:'center'}}>No items found</h1>:searchResults.map((item,index)=>{
            return <TileCard key={index} id={item.id} title={item.title} note={item.note} date={item.created} />
          })
       }
       

      </div>
    </div>
    
  )
}

export default Search