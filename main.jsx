//최상위 컴포넌트
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './src/pages/home/HomePage';
import SignIn from './src/pages/admin/LoginPage';
import SignUp from './src/pages/admin/SignUpPage';
import PostPage from "../pages/post/PostPage";
import ErrorPage from "../pages/Error/ErrorPage";

function Main(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/Error" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}