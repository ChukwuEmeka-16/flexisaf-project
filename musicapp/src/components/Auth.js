import {useState , useRef ,useEffect} from 'react'
import writer from './assets/writer.jpeg'
import Login from './Login'
import SignUp from './SignUp'


const Auth = () => {

const [page,setPage] = useState('login')

const loginRef = useRef()
const signupRef = useRef()

useEffect(()=>{
   if (localStorage.getItem('token')) {
    window.location.href = '/'
   }
  if (page === 'login') {
    loginRef.current.classList.add('active')
    signupRef.current.classList.remove('active')
   }else if(page ==='signup'){
    loginRef.current.classList.remove('active')
    signupRef.current.classList.add('active')
   }

},[page])


return (
<div className='auth-container'>

  <img src={writer} alt="" />

  <div className='form-container'>

    <div className='form-container-header'>

      <h2>
      <li ref={loginRef} className='active' onClick={()=>setPage('login')}>Login</li>
      </h2>

      <h2>
      <li ref={signupRef} onClick={()=>setPage('signup')}>Sign up</li>
      </h2>

    </div>
     
    { 
      page ==='login'?<Login />:<SignUp setPage={setPage}/>
    }
  </div>
</div>
)
}

export default Auth