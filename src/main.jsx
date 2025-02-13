//최상위 컴포넌트
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SignIn from "./pages/admin/LoginPage";
import SignUp from "./pages/admin/SignUpPage";
import PostPage from "./pages/post/PostPage";
import ErrorPage from "./pages/Error/ErrorPage";
import MyGroupList from "./pages/group/GroupList"; //내가 속한 그룹
import Group from "./pages/group/GroupDetail"; //그룹페이지

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/showgroups" element = {<MyGroupList/>} />
        <Route path="/groups/:id" element={<Group />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;