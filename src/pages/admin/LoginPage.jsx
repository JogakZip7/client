import axios from "axios";
import React, { useState, useEffect } from "react";
import Logo from "/imgs/logo.png"

function SignIn() {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  // input data 의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePw = (e) => {
    setPassword(e.target.value);
  };

  // 페이지 렌더링 후 가장 처음 호출되는 함수
  useEffect(() => {
    axios
      .get("/login.json")
      .then((res) => {
        //console.log("유저 데이터:", res.data);
        if (res.data && res.data.users) {
          setUsers(res.data.users); // users 데이터가 있는지 확인 후 설정
        } else {
          console.error("유효한 유저 데이터가 없습니다.");
          setUsers([]); // 만약 JSON 구조가 다르면 빈 배열로 설정
        }
      })
      .catch((error) => {
        console.error("데이터 로드 실패:", error);
        setUsers([]); // 에러 발생 시 빈 배열 설정
      });
  }, []); //페이지 처음 로드될 때만 실행

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    
    // 입력한 ID가 유저리스트에 있는지 확인
    const user = users.find((u) => u.id === id);

    if (!user) {
      setError("아이디가 존재하지 않습니다. 회원가입을 진행해주세요.");
      return;
    }

    // 비밀번호 확인
    if (user.password !== password) {
      setError("비밀번호가 올바르지 않습니다.");
      return;
    }

    // 로그인 성공
    console.log("로그인 성공!");
    const fakeToken = `fake-jwt-token-${user.id}-${Date.now()}`;
    localStorage.setItem("token", fakeToken);
    localStorage.setItem("id", user.id);
    localStorage.setItem("nickname", user.nickname);

    alert(`${user.nickname}님 기다리고 있었어요🎉`);
    window.location.href = "/"; // 메인화면 이동
  };

  return (
    <div>
      <span><img src={Logo}/></span>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>아이디:</label>
          <input type="text" value={id} onChange={handleId} required />
        </div>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            value={password}
            onChange={handlePw}
            required
          />
        </div>
        <button type="submit">로그인</button>
        <a href="/signup"><button>회원가입</button></a>
      </form>
      <div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default SignIn;
