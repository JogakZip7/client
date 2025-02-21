import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/imgs/logo.png";
import styles from "./LoginPage.module.css";
import LogInAPI from "../../api/LoginAPI";

function SignIn() {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleNickname = (e) => setNickname(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const result = await LogInAPI(nickname, password);
    if (result.success) {
      alert(`${result.nickname}님 기다리고 있었어요🎉`);
      window.location.href = "/";
    } else {
      setError(result.error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <Link to="/">
          <img src={Logo} alt="Logo" className={styles.logo} />
        </Link>
      </div>

      <h2 className={styles.title}>로그인</h2>

      <form onSubmit={handleLogin} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>닉네임:</label>
          <input
            type="text"
            value={nickname}
            onChange={handleNickname}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>비밀번호:</label>
          <input
            type="password"
            value={password}
            onChange={handlePassword}
            className={styles.input}
            required
          />
        </div>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button type="submit" className={styles.loginButton}>
          로그인
        </button>
        <Link to="/signup">
          <button type="button" className={styles.signupButton}>
            회원가입
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SignIn;
