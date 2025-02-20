import React, { useState } from "react";
import "./EditGroup.css";
import { Route } from 'react-router-dom';

function EditGroup() {
  
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

  // 파일 업로드 핸들러
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
      imageURL: groupImage, // 이미지 파일 그대로 상태에서 처리
      isPublic: isPublic,
      introduction: groupIntro,
    };

    // 데이터 확인을 위해 console로 출력 (서버 연결 없는 상태)
    console.log("Sending group data:", JSON.stringify(groupData, null, 2));

    // 로딩 상태를 끄고, 폼 제출 후 알림 (화면 상에서만)
    setLoading(false); // 바로 로딩 상태 끄기
  }; 

  // 그룹 삭제 핸들러
  const handleDeleteGroupSubmit = () => {
    // 입력한 비밀번호와 그룹의 비밀번호가 일치하는지 확인 (실제로는 서버와 비교해야 함)
    const groupPassword = "1234";  // 실제 데이터베이스의 비밀번호를 넣어야 함
    
    if (password !== groupPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 비밀번호가 맞다면 삭제 처리 (여기서는 단순히 알림을 띄우는 것만 구현)
    alert("그룹이 삭제되었습니다.");
    
    // 삭제 후 폼 초기화
    setGroupName("");
    setGroupIntro("");
    setGroupImage(null);
    setIsPublic(true);
    setPassword("");  // 삭제 후 비밀번호 상태 초기화
  };

  return (
    <div className="create-group-page">
      <div className="header">
        <h2>그룹 수정 및 삭제하기</h2>
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
        <label>비밀번호 인증</label>
        <input
          type="password"
          placeholder="그룹 비밀번호를 입력해 주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="button-group">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "수정하는 중..." : "수정하기"}
          </button>
          <button
            type="button"
            onClick={handleDeleteGroupSubmit}
            className="delete-btn"
          >
            삭제하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditGroup;
