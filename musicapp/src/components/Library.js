import {useState,useEffect} from 'react'
import TileCard from './minicomponents/TileCard'
import axios from 'axios'

const Library = () => {
 const [result,setResult] = useState([])

  useEffect(()=>{

    (async function getNotes () {
   await axios.post('http://localhost:3100/notes/library',{token:localStorage.getItem('token')})
   .then((reponse)=>{
    if (reponse?.data?.success) {
      setResult(reponse?.data?.notes)
      
    } 
   })
   .catch(error=>alert(error))

   })()


  },[])

  return (
    <div className='library-container'>
   {
    result.length ===0? <h1 style={{textAlign:'center'}}>No items found</h1>:result.map((item,index)=>{
      
    return <TileCard key={index} title={item.title} id={item.id} note={item.note} date={item.created}/>
  
    })
   }
    
    </div>
  )
}

export default Library