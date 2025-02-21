import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'; // useParams를 import
import { createPost } from '../../api/PostApi'; // PostApi.jsx에서 작성한 createPost 함수 import
import "./MakePost.css";

const MakePost = () => {
  const { groupId } = useParams(); // URL에서 groupId 추출
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    tags: [],
    location: "",
    moment: "",
    postPassword: "",
    isPublic: false,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // 페이지 이동을 위해 useNavigate 사용

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // handleTagsChange가 실제로 사용되도록 연결
  const handleTagsChange = (e) => {
    setFormData({
      ...formData,
      tags: e.target.value.split(",").map((tag) => tag.trim()), // 콤마로 구분된 태그 배열로 변환
    });
  };

  const handleToggle = () => {
    setFormData({ ...formData, isPublic: !formData.isPublic });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      // FormData 객체를 사용해 데이터를 전송 (이미지 포함)
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('image', formData.image);
      formDataToSend.append('tags', formData.tags.join(','));
      formDataToSend.append('location', formData.location);
      formDataToSend.append('moment', formData.moment);
      formDataToSend.append('postPassword', formData.postPassword);
      formDataToSend.append('isPublic', formData.isPublic);

      // 실제 API 호출 부분 (PostApi.jsx의 createPost 함수 사용)
      const response = await createPost(groupId, formDataToSend);

      console.log("Server response:", response);
      alert("추억이 성공적으로 등록되었습니다!");
      navigate(`/groups/${groupId}/posts`); // 게시물이 등록된 그룹 페이지로 이동

    } catch (error) {
      console.error("Error creating post:", error);
      setErrorMessage("추억 등록에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-container">
      <h1 className="create-post-title">추억 올리기</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-left">
          <div className="form-group">
            <label>제목</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="제목을 입력해 주세요"
            />
          </div>
          <div className="form-group">
            <label>본문</label>
            <input type="file" name="image" onChange={handleImageChange} />
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="본문 내용을 입력해 주세요"
            />
          </div>
        </div>

        <div className="form-right">
          <div className="form-group">
            <label>장소</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="장소를 입력해 주세요"
            />
          </div>
          <div className="form-group">
            <label>추억의 순간</label>
            <input
              type="date"
              name="moment"
              value={formData.moment}
              onChange={handleChange}
            />
          </div>

          {/* 공개 여부 토글 */}
          <div className="form-group">
            <label>공개 여부</label>
            <div className="toggle">
              <span>{formData.isPublic ? "공개" : "비공개"}</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={formData.isPublic}
                  onChange={handleToggle}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* 버튼 컨테이너 추가 */}
          <div className="button-container">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "올리는 중..." : "올리기"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MakePost;
