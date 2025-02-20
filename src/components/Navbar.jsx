import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Logo from "/imgs/logo.png";

function Dropdown({ handleLogout }) {
  return (
    <ul className={styles.dropdownMenu}>
      <li>
        <Link to="/showgroups">참여하고 있는 그룹</Link>
      </li>
      <li>
      <Link to="/myscraps">추억 모음집</Link>
      </li>
      <li>
        <Link to="/groups">그룹 만들기</Link>
      </li>
      <li onClick={handleLogout}>
        로그아웃
      </li>
    </ul>
  );
}

function Nav() {
  const [isLogin, setIsLogin] = useState(false);
  const [nickname, setNickname] = useState("");
  const [id, setID] = useState("");
  const [view, setView] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nickname");
    localStorage.removeItem("id");
    setIsLogin(false);
    setNickname("");
    setID("");
    alert("로그아웃 되었습니다.");
    window.location.href = "/";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedNickname = localStorage.getItem("nickname");
    const storedId = localStorage.getItem("id");

    if (token) {
      setIsLogin(true);
      setNickname(storedNickname);
      setID(storedId);
    } else {
      setIsLogin(false);
      setNickname("");
      setID("");
    }
  }, []);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/">
          <img src={Logo} alt="Logo" className={styles.logo} />
        </Link>

        {isLogin ? (
          <div className={styles.userSection}>
            <button onClick={() => setView(!view)} className={styles.userButton}>
              환영합니다, {nickname}님! 🎉
              <span className={styles.arrow}>{view ? "▲" : "▼"}</span>
            </button>
            {view && <Dropdown handleLogout={handleLogout} />}
          </div>
        ) : (
          <div className={styles.authButtons}>
            <Link to="/signin">
              <button className={styles.loginButton}>로그인</button>
            </Link>
            <Link to="/signup">
              <button className={styles.signupButton}>회원가입</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Nav;
