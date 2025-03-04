import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'; // URL에서 postId와 groupId 추출
import { updatePost, deletePost } from '../../api/PostApi'; // PostApi.jsx에서 작성한 updatePost와 deletePost 함수 import
import "./EditPost.css";

const EditPost = ({ postData = {} }) => {
  const { groupId, postId } = useParams(); // URL에서 groupId와 postId 추출
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
  const navigate = useNavigate(); // 페이지 이동을 위해 사용

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

      // 게시물 수정 API 호출 (PostApi.jsx의 updatePost 함수 사용)
      const response = await updatePost(postId, formDataToSend);

      console.log("Server response:", response);
      alert("추억이 수정되었습니다!");
      navigate(`/groups/${groupId}/posts`); // 수정된 게시물이 속한 그룹의 게시물 목록 페이지로 이동

    } catch (error) {
      console.error("Error updating post:", error);
      setErrorMessage("추억 수정에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      // 게시물 삭제 API 호출 (PostApi.jsx의 deletePost 함수 사용)
      const response = await deletePost(postId);

      console.log("Post deleted:", response);
      alert("추억이 삭제되었습니다!");
      navigate(`/groups/${groupId}/posts`); // 삭제된 게시물이 속한 그룹의 게시물 목록 페이지로 이동

    } catch (error) {
      console.error("Error deleting post:", error);
      setErrorMessage("추억 삭제에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-container">
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
