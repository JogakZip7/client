import React, { useState } from 'react';
import styles from './PostPage.module.css';
import PenIcon from '../../assets/Pen.png';
import TrashIcon from '../../assets/Trash.png';
import FlowerIcon from '../../assets/Flower.png';
import ChatIcon from '../../assets/Chat.png';

function PostPage() {
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [likes, setLikes] = useState(0);
  const commentsPerPage = 5;

  const [showDeleteCommentPopup, setShowDeleteCommentPopup] = useState(false);  // 댓글 삭제 팝업 상태
  const [showDeletePostPopup, setShowDeletePostPopup] = useState(false);  // 게시글 삭제 팝업 상태
  const [commentToDelete, setCommentToDelete] = useState(null);  // 삭제할 댓글

  // 댓글에 아무것도 안쳤을 시에 내용 입력해달라고 경고
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
    setShowDeleteCommentPopup(true);  // 팝업 열기
    setCommentToDelete(index);  // 삭제할 댓글 지정
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
    setShowDeletePostPopup(true);  // 팝업 열기
  };

  // 게시글 삭제 확인
  const handleConfirmDeletePost = () => {
    alert("게시글이 삭제되었습니다.");
    setShowDeletePostPopup(false);  // 팝업 닫기
  };

  // 게시글 삭제 취소
  const handleCancelDeletePost = () => {
    setShowDeletePostPopup(false);  // 팝업 닫기
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

  // 댓글 페이징
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const totalPages = Math.ceil(comments.length / commentsPerPage);

  // 페이지네이션 버튼 클릭
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 뒤로가기 버튼 클릭 시 홈페이지로 이동
  const handleBackClick = () => {
    window.location.href = "/"; // 홈페이지로 이동
  };

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <button onClick={handleBackClick} className={styles.backButton}>
        뒤로가기
      </button>

      {/* Post Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>제목</h1>
        <div className={styles.headerInfo}>
          <span>닉네임</span>
          <span>· 날짜 </span>
          <span><img src={FlowerIcon} alt="Delete" className={styles.flowerIcon} /> {likes}</span>
          <span><img src={ChatIcon} alt="Delete" className={styles.chatIcon} />  {comments.length}</span>
        </div>
        {/* 공감하기 버튼 */}
        <button onClick={handleLikeClick} className={styles.likeButton}>
          <img src={FlowerIcon} alt="Delete" className={styles.flowerIcon2} /> 공감 보내기
        </button>
        {/* Delete Post Button */}
        <button onClick={handleDeletePost} className={styles.deletePostButton}>
          추억 삭제하기
        </button>
        {/* Edit Post Button */}
        <button onClick={() => alert("게시글 수정")} className={styles.editButton}>
            추억 수정하기
        </button>
      </header>

      {/*게시글 */}
      <section className={styles.contentSection}>
        <p className={styles.contentParagraph}>본문!</p>
        
      </section>

      {/* 댓글 */}
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
          
          {/* Right-aligned Submit Button */}
          <div className={styles.submitButtonContainer}>
            <button onClick={handleCommentSubmit} className={styles.submitButton}>
              등록
            </button>
          </div>
          
          {/* Divider Line */}
          <hr className={styles.divider} />
        </div>

        {/* Comments List */}
        <div className={styles.commentsList}>
          {currentComments.map((comment, index) => (
            <div key={index} className={styles.commentItem}>
              {/* Comment Header with Name */}
              <div className={styles.commentHeader}>
                <span>{comment.user}</span>
                <span className={styles.commentDate}>{comment.date}</span>
              </div>

              {/* Comment Content */}
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
                {/* 댓글 수정 */}
                <button onClick={() => handleEditComment(index)} className={styles.editCommentButton}>
                  <img src={PenIcon} alt="Edit" className={styles.icon} />
                </button>

                {/* 댓글 삭제 */}
                <button onClick={() => handleDeleteComment(index)} className={styles.deleteCommentButton}>
                  <img src={TrashIcon} alt="Delete" className={styles.icon} />
                </button>
              </div>

              {/* Divider Line */}
              <hr className={styles.divider} />
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
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

      {/* 커스텀 댓글 삭제 팝업 */}
      {showDeleteCommentPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>정말 댓글을 삭제하실건가요?ㅜㅜ</h3>
            <button onClick={handleConfirmDeleteComment} className={styles.popupButton}>확인</button>
            <button onClick={handleCancelDeleteComment} className={styles.popupButton}>취소</button>
          </div>
        </div>
      )}

      {/* 게시글 삭제 팝업 */}
      {showDeletePostPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>정말 게시글을 삭제하실건가요?ㅜㅜ</h3>
            <button onClick={handleConfirmDeletePost} className={styles.popupButton}>확인</button>
            <button onClick={handleCancelDeletePost} className={styles.popupButton}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostPage;
