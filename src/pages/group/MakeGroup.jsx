<<<<<<<< HEAD:src/pages/group/MakeGroup.jsx
import React, { useState } from "react";
import "./MakeGroup.css";

function MakeGroup() {
  
  // 상태 변수들 (화면 출력만 확인)
  const [groupName, setGroupName] = useState("");
  const [groupIntro, setGroupIntro] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 그룹 공개 여부를 토글하는 함수
  const handleToggle = () => {
    setIsPublic(!isPublic);
  };

  // 파일 업로드 핸들러 (백엔드 연결 없이 테스트용)
  const handleImageChange = (e) => {
    setGroupImage(e.target.files[0]);
  };

  // 폼 제출 시 데이터 전송 (백엔드 연결 없이 화면 출력만 확인)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 화면 출력만 위한 데이터 객체 생성
    const groupData = {
      name: groupName,
      password: password,
      imageURL: groupImage, // 이미지 URL은 화면에서만 확인
      isPublic: isPublic,
      introduction: groupIntro,
    };

    // 데이터 확인을 위해 console로 출력 (서버 연결 없는 상태)
    console.log("Sending group data:", JSON.stringify(groupData, null, 2));

    // 로딩 상태를 끄고, 폼 제출 후 알림 (화면 상에서만)
    setLoading(false); // 바로 로딩 상태 끄기
  }; 

  return (
    <div className="create-group-page">
      <div className="header">
        <h2>그룹 만들기</h2>
      </div>

      <form className="create-group-form" onSubmit={handleSubmit}>
        <label>그룹명</label>
        <input
          type="text"
          placeholder="그룹명을 입력하세요"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
        />

        <label>대표 이미지</label>
        <input type="file" onChange={handleImageChange} />

        <label>그룹 소개</label>
        <textarea
          placeholder="그룹을 소개해 주세요"
          value={groupIntro}
          onChange={(e) => setGroupIntro(e.target.value)}
        />

        <label>그룹 공개 선택</label>
        <div className="toggle">
          <span>{isPublic ? "공개" : "비공개"}</span>
          <label className="switch">
            <input type="checkbox" checked={isPublic} onChange={handleToggle} />
            <span className="slider"></span>
          </label>
        </div>

        {/* 비밀번호 입력 */}
        <label>비밀번호 생성</label>
        <input
          type="password"
          placeholder="그룹 비밀번호를 생성해 주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "만드는 중..." : "만들기"}
        </button>
      </form>
    </div>
  );
}

export default MakeGroup;
========
import React, { useState } from "react";
import "./MakeGroup.css";

function MakeGroup() {
  
  // 상태 변수들 (화면 출력만 확인)
  const [groupName, setGroupName] = useState("");
  const [groupIntro, setGroupIntro] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // 그룹 공개 여부를 토글하는 함수
  const handleToggle = () => {
    setIsPublic(!isPublic);
  };

  // 파일 업로드 핸들러 (백엔드 연결 없이 테스트용)
  const handleImageChange = (e) => {
    setGroupImage(e.target.files[0]);
  };

  // 폼 제출 시 데이터 전송 (백엔드 연결 없이 화면 출력만 확인)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 화면 출력만 위한 데이터 객체 생성
    const groupData = {
      name: groupName,
      password: password,
      imageURL: groupImage, // 이미지 URL은 화면에서만 확인
      isPublic: isPublic,
      introduction: groupIntro,
    };

    // 데이터 확인을 위해 console로 출력 (서버 연결 없는 상태)
    console.log("Sending group data:", JSON.stringify(groupData, null, 2));

    // 로딩 상태를 끄고, 폼 제출 후 알림 (화면 상에서만)
    setLoading(false); // 바로 로딩 상태 끄기
  }; 

  return (
    <div className="create-group-page">
      <div className="header">
      <img 
          src="/imgs/logo.png" 
          alt="Logo" 
          className="logo" 
        />
        <h2>그룹 만들기</h2>
      </div>

      <form className="create-group-form" onSubmit={handleSubmit}>
        <label>그룹명</label>
        <input
          type="text"
          placeholder="그룹명을 입력하세요"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          required
        />

        <label>대표 이미지</label>
        <input type="file" onChange={handleImageChange} />

        <label>그룹 소개</label>
        <textarea
          placeholder="그룹을 소개해 주세요"
          value={groupIntro}
          onChange={(e) => setGroupIntro(e.target.value)}
        />

        <label>그룹 공개 선택</label>
        <div className="toggle">
          <span>{isPublic ? "공개" : "비공개"}</span>
          <label className="switch">
            <input type="checkbox" checked={isPublic} onChange={handleToggle} />
            <span className="slider"></span>
          </label>
        </div>

        {/* 비밀번호 입력 */}
        <label>비밀번호 생성</label>
        <input
          type="password"
          placeholder="그룹 비밀번호를 생성해 주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "만드는 중..." : "만들기"}
        </button>
      </form>
    </div>
  );
}

export default MakeGroup;
>>>>>>>> origin/MakePost:src/Group/MakeGroup.jsx
