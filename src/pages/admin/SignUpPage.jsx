import React, { useState } from "react";
import SignUpAPI from "../../api/SignUpAPI";
import styles from "./SignUpPage.module.css"; // CSS 모듈 추가
import Logo from "/imgs/logo.png";
import { Link } from "react-router-dom";

function SignUpPage() {
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [passwordToConfirm, setPasswordToConfirm] = useState("");
  const [token, setToken] = useState("");

  const signUp = async (e) => {
    e.preventDefault();

    // 비밀번호 확인 체크
    if (password !== passwordToConfirm) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    if (!nickname || !password) {
      alert("닉네임과 비밀번호를 모두 입력해주세요.");
      return;
    }

    const result = await SignUpAPI(nickname, password);

    if (result.success) {
      setToken(result.token); // 🔥 토큰 저장
      alert("회원가입 성공! 🎉");
      window.location.href = "/"; // 로그인 페이지로 리디렉트 가능
    } else {
      alert(result.error);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.joinMain}>
        <Link to="/">
          <img src={Logo} alt="Logo" className={styles.logo} />
        </Link>
        <div className={styles.titleWrap}>회원가입</div>
        <div className={styles.subText}>
          조각집에서 더 많은 경험을 하고 싶다면 회원 가입을 해주세요.
          <br />
          <br />
        </div>

        <div className={styles.contentWrap}>
          {/* 닉네임 입력 */}
          <div className={styles.inputTitle}>닉네임</div>
          <div className={styles.inputWrap}>
            <input
              type="text"
              className={styles.input}
              placeholder="닉네임을 입력하세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className={styles.inputTitle}>비밀번호</div>
          <div className={styles.inputWrap}>
            <input
              type="password"
              className={styles.input}
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* 비밀번호 확인 */}
          <div className={styles.inputTitle}>비밀번호 확인</div>
          <div className={styles.subText}>
            * 입력하신 비밀번호를 다시 입력해주세요.
          </div>
          <div className={styles.inputWrap}>
            <input
              type="password"
              className={styles.input}
              placeholder="비밀번호를 다시 입력하세요"
              value={passwordToConfirm}
              onChange={(e) => setPasswordToConfirm(e.target.value)}
            />
          </div>

          {/* 가입하기 버튼 */}
          <p className={styles.terms}>
            가입을 하면 조각집의 이용약관, 개인정보 취급방침 및 개인정보 3자
            제공에 동의하게 됩니다.
          </p>
          <button className={styles.bottomButton} onClick={signUp}>
            가입하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;