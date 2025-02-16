import { React, useState, useEffect } from "react";
import './Navbar.module.css';

//로그인 여부에 따른 변화
function Nav() {
  const [isLogin, setIsLogin] = useState(false);
  const [nickname, setNickname] = useState("")
  const [id, setID] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedNickname = localStorage.getItem("nickname");
    const storedId = localStorage.getItem("id")

    if (token) {
      setIsLogin(true);
      setNickname(storedNickname);
      setID(storedId)
    } else{
      setIsLogin(false);
      setNickname("")
      setID("")
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // 토큰 삭제
    localStorage.removeItem("nickname"); // 닉네임 삭제
    localStorage.removeItem("id"); //아이디 삭제
    setIsLogin(false);
    setNickname("");
    setID("")
    alert("로그아웃 되었습니다.");
    window.location.href = "/"; // 메인페이지 머물러있기
  };

  return (
    <div>
      <h1>메인 페이지</h1>
      {isLogin ? (
        <div className="navbar">
          <h2>환영합니다, {nickname}님! 🎉</h2>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <div>
          <a href="/signin">
            <button>로그인</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default Nav;