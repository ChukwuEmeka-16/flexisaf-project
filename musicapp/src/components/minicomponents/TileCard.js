import {useRef , useState} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TileCard = ({id,title,note,date}) => {
// text area state
const [textContent,setText] = useState(note)

const modalRef = useRef();

const dismissModal = () =>{
  modalRef.current.classList.add('dismissModal');

}
const openModal = () =>{
  modalRef.current.classList.remove('dismissModal');

}
const updateData ={
    id:id,
    newNote:textContent,
  
}

const updateNote = async () =>{
  await axios.post('http://localhost:3100/notes/update',updateData)
  .then((response)=>{
    if (response.data.success) {
      alert(response.data.message)
      window.location.reload()
    }
  })
  .catch(error=>alert(error))
  
}

const delteNote = async () =>{
  await axios.post('http://localhost:3100/notes/delete',{id:id})
  .then((response)=>{
    if (response.data.success) {
      alert(response.data.message)
      window.location.reload()
    }
  })
  .catch(error=>alert(error))
}

  return (
    <>
    <div className='tile-card-container' onClick={openModal}>
      <h2>{`${title}.....`}</h2>
    </div>
     
    <div className='tile-card-modal dismissModal' ref={modalRef}>

     <header className='title-card-header'>
     <h2 className='title'>{title}</h2>
     <FontAwesomeIcon icon='x' size='xl' className='cross-icon' onClick={dismissModal}/>
     </header>

     <section  className='title-card-modal-body'>
        <textarea onChange={(e)=>setText(e.target.value)}>
        {textContent}
        </textarea>
     </section>

     <footer className='title-card-modal-footer'>

         <aside className='footer-date'>
             Created :{date}
         </aside>

         <aside className='footer-btn-group'>
             <button onClick={updateNote}>Update</button>
             <button onClick={delteNote}>Delete</button>
         </aside>
       
     </footer>
    </div>

    </>
  )
}

export default TileCard