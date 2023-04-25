import { Routes , Route  } from 'react-router-dom';
import './css/App.scss';
import Auth from './components/Auth';
import Main from './components/Main';


function App() {

 return (
  <>
     <Routes>
       <Route path='/auth' element={<Auth/>}/>
       <Route path='/' element={<Main/>} />
     </Routes>
    </>
  );
}


export default App;
