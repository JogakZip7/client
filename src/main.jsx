//최상위 컴포넌트
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SignIn from "./pages/admin/LoginPage";
import SignUp from "./pages/admin/SignUpPage";
import PostPage from "./pages/post/PostPage";
import ErrorPage from "./pages/error/ErrorPage.jsx";
import MyGroupList from "./pages/group/GroupList"; //내가 속한 그룹
import GroupDetail from "./pages/group/GroupDetail"; //그룹페이지
import ScrapPage from "./pages/admin/ScrapPage.jsx";
import Navbar from "./components/Navbar";
import MakeGroup from './MakeGroup';
import EditGroup from './EditGroup';
import MakePost from './MakePost';
import EditPost from './EditPost';

function LayoutWithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

// 네비게이션 바 없는 레이아웃 (로그인 & 회원가입 페이지)
function LayoutWithoutNavbar() {
  return <Outlet />;
}

function Main() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 네비게이션 바 없는 페이지 (로그인 & 회원가입) */}
        <Route element={<LayoutWithoutNavbar />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/error" element={<ErrorPage />} />
        </Route>

        {/* 네비게이션 바 있는 페이지 */}
        <Route element={<LayoutWithNavbar />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/showgroups" element={<MyGroupList />} />
          <Route path="/groups/:groupId" element={<GroupDetail />} />
          <Route path="/post/:postId" element={<PostPage/>}/>
          <Route path="/myscraps" element={<ScrapPage/>}/>
          <Route path="/make-group" element={<MakeGroup />} />
          <Route path="/edit-group/:id" element={<EditGroup />} />  
          <Route path="/make-post" element={<MakePost />} />
          <Route path="/edit-post/:id" element={<EditPost />} />  

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
