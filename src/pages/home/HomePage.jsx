import items from "../../mock/group.json";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PostListItem({ item }) {
  return (
    <Link to={`/groups/${item.id}`}>
      <div className="PostListItem">
        <img src={item.imageUrl} />
        <div>
          <h1>{item.name}</h1>
          <p>{item.introduction}</p>
        </div>
      </div>
    </Link>
  );
}

function HomePage() {
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
        <div>
          <h2>환영합니다, {nickname}님! 🎉</h2>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <div>
          <h2>로그인이 필요합니다.</h2>
          <a href="/signin">
            <button>로그인 하러 가기</button>
          </a>
        </div>
      )}
        <div>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <PostListItem item={item} />
              </li>
            ))}
          </ul>
        </div>
    </div>

  );
}

export default HomePage;
