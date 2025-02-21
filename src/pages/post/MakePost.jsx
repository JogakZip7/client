import React, { useState } from "react";
import "./MakePost.css";

const MakePost = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleTagsChange = (e) => {
    setFormData({
      ...formData,
      tags: e.target.value.split(",").map((tag) => tag.trim()),
    });
  };

  const handleToggle = () => {
    setFormData({ ...formData, isPublic: !formData.isPublic });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // 데이터 객체 출력 (서버 호출 부분)
    console.log("Sending post data:", formData);

    // 실제 API 호출 부분 
    // axios.post('YOUR_API_URL', formData)
    //   .then(response => {
    //     console.log("Server response:", response.data);
    //     alert("추억이 성공적으로 등록되었습니다!");
    //     navigate(`/groups/${groupId}`);
    //   })
    //   .catch(error => {
    //     console.error("Error creating post:", error);
    //     setErrorMessage("추억 등록에 실패했습니다.");
    //   })
    //   .finally(() => setLoading(false));

    // 로딩 상태와 에러 메시지 처리
    setLoading(false);
    alert("추억이 성공적으로 등록되었습니다!");
    // navigate(`/groups/${groupId}`);
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
              <div className="form-group">
              <input type="file" name="imageUrl" onChange={handleImageChange} />
              </div>
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

          {/* 비밀번호 입력 (항상 표시됨) */}
          <div className="form-group">
            <label>비밀번호</label>
            <input
              type="password"
              name="postPassword"
              value={formData.postPassword}
              onChange={handleChange}
              placeholder="비밀번호를 입력해 주세요"
            />
          </div>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* 버튼 컨테이너 추가 */}
        <div className="button-container">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "올리는 중..." : "올리기"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MakePost;
