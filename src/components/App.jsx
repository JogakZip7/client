//우리 사이트에서 공통된 디자인을 렌더링 하는 컴포넌트
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import PostPage from "../pages/post/PostPage";
import ErrorPage from "../pages/Error/ErrorPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post" element={<PostPage />} />
        <Route path="/Error" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;

