//최상위 컴포넌트
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SignIn from "./pages/admin/LoginPage";
import SignUp from "./pages/admin/SignUpPage";
import PostPage from "./pages/post/PostPage";
import ErrorPage from "./pages/Error/ErrorPage";
import MyGroup from "./pages/group/GroupDetail";

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/groups/{groupId}" element={<MyGroup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
