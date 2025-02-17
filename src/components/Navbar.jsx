import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Navbar.module.css';
import Logo from "/imgs/logo.png";

function Dropdown({handleLogout}){
  return(
    <>
      <li>
        <Link to="/showgroups">참여하고 있는 그룹</Link>
      </li>
      <li>
        <button onClick={handleLogout}>로그아웃</button>
      </li>

    </> 
  );
}

//로그인 여부에 따른 변화
function Nav() {
  const [isLogin, setIsLogin] = useState(false);
  const [nickname, setNickname] = useState("");
  const [id, setID] = useState("");
  const [view, setView] = useState(false);

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
 
  return (
    <div>
      <span><img src={Logo}/></span>
      {isLogin ? (
        <div className="navbar">
          <ul onClick={()=> {setView(!(view))}}>
            환영합니다, {nickname}님! 🎉{" "}
            {view?'OFF': 'ON'}
            {view && <Dropdown handleLogout={handleLogout} />}
          </ul>
        </div>
      ) : (
        <div>
          <a href="/signin">
            <button>로그인</button>
          </a>
          <a href="/signup">
            <button>회원가입</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default Nav;