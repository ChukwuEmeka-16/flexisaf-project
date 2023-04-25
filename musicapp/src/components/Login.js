import {useState} from 'react'
import axios from 'axios'
const Login = () => {
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')

const data = {
    email:email,
    password:password
    
}
const Login = async (e) =>{
    e.preventDefault()
    await axios.post('http://localhost:3100/auth/login',data)
    .then((res)=>{
    alert(res.data.message)
    if (res.data.success) {
        localStorage.setItem('token',res.data.token);
        window.location.href='/'
    }
    })
    .catch((err)=>alert(err))
   
 }


return (

  <form onSubmit={(e)=>Login(e)}>
    <div>
        <label> Email :</label>
        <input type="email" onChange={(e)=>setEmail(e.target.value)} required />
    </div>

    <div>
       <label>Password :</label>
       <input type="text" onChange={(e)=>setPassword(e.target.value)} required/>
    </div>
      <button>Log in</button>   
    </form>
  )
}

export default Login