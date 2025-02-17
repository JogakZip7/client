//최상위 컴포넌트
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SignIn from "./pages/admin/LoginPage";
import SignUp from "./pages/admin/SignUpPage";
import PostPage from "./pages/post/PostPage";
import ErrorPage from "./pages/Error/ErrorPage";
import MyGroupList from "./pages/group/GroupList"; //내가 속한 그룹
import Group from "./pages/group/GroupDetail"; //그룹페이지
import Navbar from "./components/Navbar";

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
        </Route>

        {/* 네비게이션 바 있는 페이지 */}
        <Route element={<LayoutWithNavbar />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/showgroups" element={<MyGroupList />} />
          <Route path="/groups/:id" element={<Group />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
