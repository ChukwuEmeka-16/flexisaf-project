import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Sidebar = ({logOut , setPage , reference, page}) => {
    
  
  const dismissSide = () =>{
    reference.current.classList.add('dismissSidebar')
  }



  return (
    <div className='app-nav-sidebar dismissSidebar' ref={reference}>

      <header className='sidebar-header'>

       <h1 className='title'>Menu</h1>
       <FontAwesomeIcon icon='x' className='cross-icon'  onClick={dismissSide}/>

      </header>

      <section className='sidebar-body'>
      <li  onClick={()=>setPage('home')}>Home</li>
      <li  onClick={()=>setPage('search')}>Search</li>
      <li  onClick={()=>setPage('library')}>Library</li>
      <li onClick={logOut}>Log out</li>
      </section>
      
    </div>
  )
}

export default Sidebar