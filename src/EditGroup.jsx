import React, { useState } from "react";
import './EditGroup.css';

const EditGroup = () => {
  // 상태 변수들
  const [editGroupData, setEditGroupData] = useState({
    name: "",
    imageUrl: "",
    introduction: "",
    isPublic: false,
    password: "", // 수정 권한 인증을 위한 비밀번호 상태 추가
  });

  const [modalState, setModalState] = useState({
    isEditModalOpen: false,
    isDeleteModalOpen: false,
  });

  // 그룹 공개 여부를 토글하는 함수
  const handleToggle = () => {
    setEditGroupData({ ...editGroupData, isPublic: !editGroupData.isPublic });
  };

  // 이미지 업로드 핸들러
  const handleImageChange = (e) => {
    setEditGroupData({ ...editGroupData, imageUrl: e.target.files[0] });
  };

  // 수정 작업을 위한 폼 제출 핸들러
  const handleEditGroupSubmit = (e) => {
    e.preventDefault();
    // 수정 작업은 주석 처리
  };

  // 그룹 삭제 핸들러 (삭제 버튼은 그대로 유지)
  const handleDeleteGroupSubmit = () => {
    // 그룹 삭제 시 비밀번호를 묻지 않고 바로 삭제 처리

    // 이 부분은 나중에 API를 통해 데이터베이스에 저장된 비밀번호와 비교하여 검증하는 방식으로 구현해야 합니다.
    // 아래는 API 연결 전에 주석 처리된 상태입니다.

    // if (editGroupData.password !== /* 실제 데이터베이스의 비밀번호 */) {
    //   alert("비밀번호가 일치하지 않습니다.");
    //   return;
    // }
    // 비밀번호가 맞다면 삭제 처리
  };

  return (
    <div className="edit-group-container">
      <h2>그룹 정보 수정</h2>

      <form onSubmit={handleEditGroupSubmit}>
        <label>그룹명</label>
        <input
          type="text"
          placeholder="그룹명을 입력하세요"
          value={editGroupData.name}
          onChange={(e) =>
            setEditGroupData({ ...editGroupData, name: e.target.value })
          }
        />

        <label>대표 이미지</label>
        <input type="file" onChange={handleImageChange} />

        <label>그룹 소개</label>
        <textarea
          placeholder="그룹을 소개해 주세요"
          value={editGroupData.introduction}
          onChange={(e) =>
            setEditGroupData({ ...editGroupData, introduction: e.target.value })
          }
        />

        <label>그룹 공개 선택</label>
        <div className="toggle">
          <span>{editGroupData.isPublic ? "공개" : "비공개"}</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={editGroupData.isPublic}
              onChange={handleToggle}
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* 수정 권한 인증을 위한 비밀번호 입력란 */}
        <label>수정 권한 인증 (비밀번호 입력)</label>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={editGroupData.password}
          onChange={(e) =>
            setEditGroupData({ ...editGroupData, password: e.target.value })
          }
        />

        <div className="button-group">
          <button type="submit">수정하기</button>
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
};

export default EditGroup;
