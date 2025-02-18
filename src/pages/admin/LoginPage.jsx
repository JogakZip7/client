import axios from "axios";
import React, { useState, useEffect } from "react";
import Logo from "/imgs/logo.png";
import styles from "./LoginPage.module.css";

function SignIn() {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleId = (e) => setId(e.target.value);
  const handlePw = (e) => setPassword(e.target.value);

  useEffect(() => {
    axios
      .get("/login.json")
      .then((res) => {
        if (res.data && res.data.users) {
          setUsers(res.data.users);
        } else {
          console.error("유효한 유저 데이터가 없습니다.");
          setUsers([]);
        }
      })
      .catch((error) => {
        console.error("데이터 로드 실패:", error);
        setUsers([]);
      });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const user = users.find((u) => u.id === id);
    if (!user) {
      setError("아이디가 존재하지 않습니다. 회원가입을 진행해주세요.");
      return;
    }

    if (user.password !== password) {
      setError("비밀번호가 올바르지 않습니다.");
      return;
    }

    console.log("로그인 성공!");
    const fakeToken = `fake-jwt-token-${user.id}-${Date.now()}`;
    localStorage.setItem("token", fakeToken);
    localStorage.setItem("id", user.id);
    localStorage.setItem("nickname", user.nickname);

    alert(`${user.nickname}님 기다리고 있었어요🎉`);
    window.location.href = "/";
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <img src={Logo} alt="Logo" className={styles.logo} />
      </div>

      <h2 className={styles.title}>로그인</h2>

      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>아이디:</label>
          <input
            type="text"
            value={id}
            onChange={handleId}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>비밀번호:</label>
          <input
            type="password"
            value={password}
            onChange={handlePw}
            className={styles.input}
            required
          />
        </div>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <button type="submit" className={styles.loginButton}>
          로그인
        </button>

        <a href="/signup">
          <button type="button" className={styles.signupButton}>
            회원가입
          </button>
        </a>
      </form>
    </div>
  );
}

export default SignIn;