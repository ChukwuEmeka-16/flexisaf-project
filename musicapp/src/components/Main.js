import {useState , useRef ,useEffect} from 'react'
import Home from './Home'
import  Search  from './Search'
import Library from './Library'
import Sidebar from './minicomponents/Sidebar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Main = () => {
  // page toggler state
  const [page, setPage] = useState('home')
  const [windowWidth , setWindowWidth] = useState(window.innerWidth)
   
  // get the current screen width
  window.addEventListener('resize',()=>{
   setWindowWidth(window.innerWidth)
  })
  // nav refs
  const homeRef = useRef();
  const searchRef = useRef();
  const libraryRef = useRef();
   
  // sidebar ref
  const sideRef = useRef();


  // responsive useeffect refs
  const webNavRef = useRef();
  const mobileNavRef = useRef();

  // responsive useeffect 
  useEffect(()=>{

    if (windowWidth < 720) {
      webNavRef.current.classList.add('dispayNone')
      mobileNavRef.current.classList.remove('dispayNone')
    }else{
      webNavRef.current.classList.remove('dispayNone')
      mobileNavRef.current.classList.add('dispayNone')
    }
  },[windowWidth])



  // navigation feedback dom manipulation
  useEffect(()=>{
   if (!localStorage.getItem('token')) {
    window.location.href = '/auth'
   }

   if(page ==='home'){
    homeRef.current.classList.add('activeTwo')
    searchRef.current.classList.remove('activeTwo')
    libraryRef.current.classList.remove('activeTwo')

   }
   else if(page ==='search'){
    homeRef.current.classList.remove('activeTwo')
    searchRef.current.classList.add('activeTwo')
    libraryRef.current.classList.remove('activeTwo')

   }
   else if(page ==='library'){
    homeRef.current.classList.remove('activeTwo')
    searchRef.current.classList.remove('activeTwo')
    libraryRef.current.classList.add('activeTwo')

   }

  },[page])
  
  // logout function
  const logOut = () =>{
    localStorage.removeItem('token')
    window.location.href = 'auth'
  }
  // open sidebar function
  const openSideBar = () =>{
     sideRef.current.classList.remove('dismissSidebar')
  }

return (
  <div className='main-app'>
 <Sidebar logOut={logOut} setPage={setPage} reference={sideRef} page={page}/>
    <header className='app-header'>
      <h2>Private Penpal </h2>
      <ul className='' ref={webNavRef}>
       <li className='activeTwo' ref={homeRef} onClick={()=>setPage('home')}>Home</li>
       <li ref={searchRef} onClick={()=>setPage('search')}>Search</li>
       <li ref={libraryRef} onClick={()=>setPage('library')}>Library</li>
       <li onClick={logOut}>Log Out</li>
      </ul>

      <div className='dispayNone' ref={mobileNavRef}>
      <FontAwesomeIcon  ref={mobileNavRef} icon='bars' size='xl' onClick={openSideBar}/>
      </div>
    </header>

    <div className='app-container'>
    {page ==='home' && <Home/>}
    {page === 'search' && <Search/>}
    {page ==='library' && <Library/>}
    </div>
  </div>
  )
}

export default Main