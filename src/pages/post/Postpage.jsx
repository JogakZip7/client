import React, { useState } from 'react';
import styles from './PostPage.module.css';
import PenIcon from '../../assets/Pen.png';
import TrashIcon from '../../assets/Trash.png';
import FlowerIcon from '../../assets/Flower.png';
import ChatIcon from '../../assets/Chat.png';
import postsData from '../../mock/post.json';

// 첫 번째 게시글 데이터를 사용 (추후 라우팅이나 props로 선택 가능)
const postData = postsData[0];

function PostPage() {
  // 초기 공감 수를 JSON의 likeCount로 설정
  const [likes, setLikes] = useState(postData.likeCount);
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  const [showDeleteCommentPopup, setShowDeleteCommentPopup] = useState(false);  // 댓글 삭제 팝업 상태
  const [showDeletePostPopup, setShowDeletePostPopup] = useState(false);        // 게시글 삭제 팝업 상태
  const [commentToDelete, setCommentToDelete] = useState(null);                  // 삭제할 댓글

  // 댓글 입력 값이 없을 때 경고
  const handleCommentSubmit = () => {
    if (!commentContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    setComments([
      ...comments,
      { user: "사용자", date: new Date().toLocaleString(), content: commentContent }
    ]);
    setCommentContent("");
  };

  // 댓글 삭제 팝업 표시
  const handleDeleteComment = (index) => {
    setShowDeleteCommentPopup(true);
    setCommentToDelete(index);
  };

  // 댓글 삭제 확인
  const handleConfirmDeleteComment = () => {
    setComments(comments.filter((_, i) => i !== commentToDelete));
    setShowDeleteCommentPopup(false);
  };

  // 댓글 삭제 취소
  const handleCancelDeleteComment = () => {
    setShowDeleteCommentPopup(false);
  };

  // 게시글 삭제 팝업 표시
  const handleDeletePost = () => {
    setShowDeletePostPopup(true);
  };

  // 게시글 삭제 확인
  const handleConfirmDeletePost = () => {
    alert("게시글이 삭제되었습니다.");
    setShowDeletePostPopup(false);
  };

  // 게시글 삭제 취소
  const handleCancelDeletePost = () => {
    setShowDeletePostPopup(false);
  };

  const handleEditComment = (index) => {
    setEditingCommentIndex(index);
    setEditingCommentContent(comments[index].content);
  };

  // 공감 버튼 클릭 시 공감 수 증가
  const handleLikeClick = () => {
    setLikes(likes + 1);
  };

  const handleSaveEditedComment = () => {
    const updatedComments = [...comments];
    updatedComments[editingCommentIndex].content = editingCommentContent;
    setComments(updatedComments);
    setEditingCommentIndex(null);
    setEditingCommentContent("");
  };

  // 댓글 페이징 계산
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 뒤로가기 버튼 클릭 시 홈으로 이동
  const handleBackClick = () => {
    window.location.href = "/";
  };

  return (
    <div className={styles.container}>
      {/* 뒤로가기 버튼 */}
      <button onClick={handleBackClick} className={styles.backButton}>
        뒤로가기
      </button>

      {/* 게시글 헤더 */}
      <header className={styles.header}>
        <div className={styles.headerInfo}>
          <span>{postData.groupIdID}</span>
          <span> | {postData.isPublic}</span>
        </div>
        {/* 게시글 제목으로 title 사용 */}
        <h1 className={styles.title}>{postData.title}</h1>
        <div className={styles.headerInfo}>
          {/* userID 사용 */}
          <span>{postData.userID}</span>
          <span> · {postData.location}</span>
          <span> · {new Date(postData.createdAt).toLocaleString()}</span>
          <span>
            <img src={FlowerIcon} alt="공감" className={styles.flowerIcon} /> {likes}
          </span>
          <span>
            <img src={ChatIcon} alt="댓글" className={styles.chatIcon} /> {comments.length}
          </span>
        </div>
        {/* 공감하기 버튼 */}
        <button onClick={handleLikeClick} className={styles.likeButton}>
          <img src={FlowerIcon} alt="공감" className={styles.flowerIcon2} /> 공감 보내기
        </button>
        {/* 게시글 삭제 버튼 */}
        <button onClick={handleDeletePost} className={styles.deletePostButton}>
          추억 삭제하기
        </button>
        {/* 게시글 수정 버튼 */}
        <button onClick={() => alert("게시글 수정")} className={styles.editButton}>
          추억 수정하기
        </button>
      </header>

      {/* 게시글 내용 */}
      <section className={styles.contentSection}>
        {/* 이미지 중앙 정렬: CSS에서 .postImage에 display: block; margin: 0 auto; 적용 */}
        <img
          src={postData.imageUrl}
          alt={postData.title}
          className={styles.postImage}
        />
        {/* 본문 내용 */}
        <p className={styles.contentParagraph}>{postData.content}</p>
      </section>

      {/* 댓글 영역 */}
      <section className={styles.commentSection}>
        <p className={styles.commentTitle}>댓글 {comments.length}</p>
        <hr className={styles.divider} />
        <div>
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="댓글 작성해주세요"
            className={styles.commentTextarea}
          />
          <div className={styles.submitButtonContainer}>
            <button onClick={handleCommentSubmit} className={styles.submitButton}>
              등록
            </button>
          </div>
          <hr className={styles.divider} />
        </div>

        {/* 댓글 목록 */}
        <div className={styles.commentsList}>
          {currentComments.map((comment, index) => (
            <div key={index} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <span>{comment.user}</span>
                <span className={styles.commentDate}>{comment.date}</span>
              </div>
              {editingCommentIndex === index ? (
                <div>
                  <textarea
                    value={editingCommentContent}
                    onChange={(e) => setEditingCommentContent(e.target.value)}
                    className={styles.editingTextarea}
                  />
                  <div className={styles.editingSaveButtonContainer}>
                    <button onClick={handleSaveEditedComment} className={styles.editingSaveButton}>
                      저장
                    </button>
                  </div>
                </div>
              ) : (
                <p className={styles.commentContent}>{comment.content}</p>
              )}
              <div className={styles.commentButtons}>
                <button onClick={() => handleEditComment(index)} className={styles.editCommentButton}>
                  <img src={PenIcon} alt="수정" className={styles.icon} />
                </button>
                <button onClick={() => handleDeleteComment(index)} className={styles.deleteCommentButton}>
                  <img src={TrashIcon} alt="삭제" className={styles.icon} />
                </button>
              </div>
              <hr className={styles.divider} />
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={styles.pageButton}
          >
            이전
          </button>
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber + 1)}
              className={`${styles.pageButton} ${currentPage === pageNumber + 1 ? styles.activePage : ""}`}
            >
              {pageNumber + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className={styles.pageButton}
          >
            다음
          </button>
        </div>
      </section>

      {/* 댓글 삭제 팝업 */}
      {showDeleteCommentPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>정말 댓글을 삭제하실건가요? ㅜㅜ</h3>
            <button onClick={handleConfirmDeleteComment} className={styles.popupButton}>
              확인
            </button>
            <button onClick={handleCancelDeleteComment} className={styles.popupButton}>
              취소
            </button>
          </div>
        </div>
      )}

      {/* 게시글 삭제 팝업 */}
      {showDeletePostPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>정말 게시글을 삭제하실건가요? ㅜㅜ</h3>
            <button onClick={handleConfirmDeletePost} className={styles.popupButton}>
              확인
            </button>
            <button onClick={handleCancelDeletePost} className={styles.popupButton}>
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostPage;
