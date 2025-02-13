import React, { useState } from "react";
import SignUpAPI from "../../api/SignUpAPI";

function SignUpPage({token, setToken}){
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [passwordToConfirm, setPasswordToConfirm] = useState("");

  const signUp = () => {
    // signUpAPI 실행
    // input: userid, password, nickname
    // return: 성공 시, Token 값(문자열), 실패 시, ''
    if (password !== passwordToConfirm) {
      alert("비밀번호와 비밀번호 확인이 다릅니다.");
    } else if (userid === "") {
      alert("아이디는 필수항목입니다.");
    } else if (password === "") {
      alert("비밀번호는 필수항목입니다.");
    } else if (passwordToConfirm === "") {
      alert("비밀번호 확인은 필수항목입니다.");
    } else if (nickname === "") {
      alert("닉네임은 필수항목입니다.");
    } else {
      SignUpAPI(userid, password,nickname).then((response) => {
        if (response !== "") {
          alert("회원가입 성공!!!"); 
          setUserid("");
          setPassword("");
          setPasswordToConfirm("");
          setNickname("");
          setToken(response);
        } else {
         
          alert(
            "회원가입 실패!!! - 원인으로는 서버 문제 or 아이디 중복 등의 원인이 있을 수 있습니다."
          );
        }
      });
    }
  };
  const useridHandler = (e) => {
    setUserid(e.currentTarget.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const nicknameHandler = (e) => {
    setNickname(e.target.value);
  };
  const passwordToConfirmHandler = (e) => {
    setPasswordToConfirm(e.currentTarget.value);
  };
  
  return(
    <div className="page">
      <div className="joinMain fullsize">
        {" "}
        <div className="titleWrap">조각집 회원가입</div>
        <div className="subText grey">
          서비스 가입을 하면 조각집의 이용약관, 개인정보취급방침 및 개인정보
          3자 제공에 동의하게 됩니다.
          <br /> 이미 계정이 있는 경우 로그인하여 주세요
        </div>
        <div className="contentWrap">
          <div className="inputTitle">
            {" "}
            아이디{" "}
            <div className="inputWrap">
              <input
                type="text"
                className="input"
                placeholder="아이디를 입력해주세요"
                value={userid}
                onChange={useridHandler}
              />{" "}
            </div>
          </div>
          <div>
          <button className="bottomButton">
              중복확인
            </button>
          </div>
          <div className="inputTitle">
           닉네임{" "}
            <div className="inputWrap">
              <input
                type="text"
                className="input"
                placeholder="닉네임을 입력해주세요"
                value={nickname}
                onChange={nicknameHandler}
              />{" "}
            </div>
          </div>
          <div className="inputTitle">
            {" "}
            비밀번호
            <div className="inputWrap">
              <input
                type="password"
                className="input"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={passwordHandler}
              />
            </div>
          </div>
          <div className="inputTitle">
            {" "}
            비밀번호확인
            <div className="subText">
              *입력하신 비밀번호를 다시 입력해주세요.
            </div>
            <div className="inputWrap">
              <input
                type="password"
                className="input"
                placeholder="입력하신 비밀번호를 다시 입력해주세요"
                value={passwordToConfirm}
                onChange={passwordToConfirmHandler}
              />
            </div>
          </div>
          <div>
            {" "}
            <button className="bottomButton" onClick={signUp}>
              가입하기
            </button>
          </div>
        </div>
      </div>
    </div>);
}

export default SignUpPage