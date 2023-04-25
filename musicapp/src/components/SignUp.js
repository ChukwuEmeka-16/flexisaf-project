import {useState} from 'react'
import axios from 'axios'



const SignUp = ({setPage}) => {

const [username,setUserName] = useState('')
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')

const data = {
    username:username,
    email:email,
    password:password
}
//njibhuc@gmail.com onpcvfibou
const uploadData = async (e) =>{
e.preventDefault()
await axios.post('http://localhost:3100/auth/signup',data)

.then((res)=>{


 if(res.data.success){

 alert('Account created successfully, Please log in');
 setPage('login');
 }
 else{
    alert(res.data.message);
 }

})

.catch((err)=>alert(err))
}

return (
   <form onSubmit={(e)=>uploadData(e)} >
    <div>
        <label>Username :</label>
        <input type="text" onChange={(e)=>setUserName(e.target.value)} required/>
    </div>
     
    <div>
        <label>Email :</label>
        <input type="email" onChange={(e)=>setEmail(e.target.value)}  required/>
    </div>
    <div>
       <label>Password :</label>
       <input type="text" onChange={(e)=>setPassword(e.target.value)} required />
    </div>
      <button>Sign Up</button>
   </form>
  )
}

export default SignUp