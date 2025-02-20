import React, { useState, useEffect } from "react";
import "./EditPost.css";

const EditPost = ({ postData = {} }) => {
  const [formData, setFormData] = useState({
    title: postData.title || "",
    content: postData.content || "",
    image: postData.image || null,
    tags: postData.tags || [],
    location: postData.location || "",
    moment: postData.moment || "",
    postPassword: postData.postPassword || "",
    isPublic: postData.isPublic || false,
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 폼 데이터 변경 처리
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

    // 데이터 출력 (서버 호출 부분)
    console.log("Sending updated post data:", formData);

    // 실제 API 호출 부분 
    // axios.put('YOUR_API_URL', formData)
    //   .then(response => {
    //     console.log("Server response:", response.data);
    //     alert("추억이 수정되었습니다!");
    //   })
    //   .catch(error => {
    //     console.error("Error updating post:", error);
    //     setErrorMessage("추억 수정에 실패했습니다.");
    //   })
    //   .finally(() => setLoading(false));

    // 로딩 상태 처리
    setLoading(false);
    alert("추억이 수정되었습니다!");
  };

  const handleDelete = () => {
    setLoading(true);
    setErrorMessage("");

    // 실제 API 호출 부분 
    // axios.delete('YOUR_API_URL', { data: { id: postData.id } })
    //   .then(response => {
    //     console.log("Post deleted:", response.data);
    //     alert("추억이 삭제되었습니다!");
    //   })
    //   .catch(error => {
    //     console.error("Error deleting post:", error);
    //     setErrorMessage("추억 삭제에 실패했습니다.");
    //   })
    //   .finally(() => setLoading(false));

    // 삭제 후 알림
    setLoading(false);
    alert("추억이 삭제되었습니다!");
  };

  return (
    <div className="create-post-container">
      <img src="/imgs/logo.png" alt="Logo" className="logo" />
      <h1 className="create-post-title">추억 수정 및 삭제하기</h1>
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
            <label>태그</label>
            <input
              type="text"
              name="tags"
              value={formData.tags.join(",")}
              onChange={handleTagsChange}
              placeholder="태그를 입력해 주세요 (콤마로 구분)"
            />
          </div>
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

        {/* 수정하기 버튼과 삭제하기 버튼 */}
        <div className="button-group">
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? "수정하는 중..." : "수정하기"}
          </button>
          <button
            type="button"
            className="delete-btn"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "삭제하는 중..." : "삭제하기"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
