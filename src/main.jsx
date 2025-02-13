//최상위 컴포넌트
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import SignIn from './pages/admin/LoginPage';
import SignUp from './pages/admin/SignUpPage';
function Main(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Main;