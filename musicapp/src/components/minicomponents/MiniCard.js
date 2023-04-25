import {useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MiniCard = ({title='New note',note}) => {

const modalRef = useRef();

const dismissModal = () =>{
modalRef.current.classList.add('dismissModal');
}
const openModal = () =>{
    modalRef.current.classList.remove('dismissModal');
}


 return (
  <>
    <div className='mini-card-container' onClick={openModal}>
       <h2> {`${title}.....`}</h2>
    </div>
    
    <div className='mini-card-modal dismissModal' ref={modalRef}>

       <header className='modal-header'>

        <h2 id='title'>{title}</h2>
        <FontAwesomeIcon icon='x' size='xl' className='cross-icon' onClick={dismissModal}/>
       </header>
       
       <section className='modal-body'>
        {note}
       </section>
       
       <button className='modal-footer-btn' onClick={dismissModal}>
        Close
       </button>
    </div>
  </>
  )
}

export default MiniCard