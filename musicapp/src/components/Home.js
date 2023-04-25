import {useEffect,useState , useRef} from 'react'
import MiniCard from './minicomponents/MiniCard';
import {v4 as uuid} from 'uuid'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Home = () => {
// modal states

const [title,setTitle] = useState('')
const [note,setNote] = useState('')

// previos state
const [recent,setRecent] = useState([])




const modalRef = useRef();

const dismissModal = (e) =>{
  e.preventDefault();
  modalRef.current.classList.add('dismissModal');

}
const openModal = () =>{
  modalRef.current.classList.remove('dismissModal');

}

const noteData = {
  id:uuid(),
  title:title,
  note:note,
  token:localStorage.getItem('token')
}

const addNote = (e) =>{
  e.preventDefault()
  axios.post('http://localhost:3100/notes/create',noteData)
  .then((res)=>{
  if(res.data.success){
    alert(res.data.message)
    window.location.reload()
  }
  })
  .catch(error=>alert(error))
}


// get recent notes

useEffect(()=>{

(async function getRecent() {
  await axios.post('http://localhost:3100/notes/recent',{token:localStorage.getItem('token')})
  .then((response)=>{
    if (response.data.success) {
      setRecent(response.data.notes)
    }
  }).catch(error=>alert(error))
})()

},[])

  return (
    <>
    <div className='home-container'>
    
    <div className='previous-container-main'>
      <h2>Recent notes </h2>

      <div className='previous-container'>
       {
        recent.map((item,index)=>{
          return <MiniCard key={index} title={item.title} note={item.note}/>
        })
       }
      </div>
    
    </div>
     <h1 className='new-note-heading'> New note</h1>
    <div className='add-new-note' onClick={openModal}>

     <FontAwesomeIcon icon='plus' className='plus-icon'/>
    
    </div>


    </div>

     
     <form className='new-note-modal dismissModal' ref={modalRef}>

        <header className='note-modal-header'>
          <h2 className='title'>Add a new note</h2>
          <FontAwesomeIcon icon='x' size='xl' className='cross-icon' onClick={(e)=>dismissModal(e)} />
        </header>

        <section className='note-modal-body'>
         <input type="text" onChange={(e)=>setTitle(e.target.value)} placeholder='title?'/>
         <textarea placeholder='Note?' onChange={(e)=>setNote(e.target.value)}></textarea>
        </section>

        <footer className='note-modal-footer'> 
          <button onClick={(e)=>dismissModal(e)}>Cancel</button>
          <button onClick={(e)=>addNote(e)} >Add</button>
        </footer>
     </form>
    </>
  )
}

export default Home