import React, { useState } from 'react';
import styles from './PostPage.module.css';

function PostPage() {
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 10;

  const handleCommentSubmit = () => {
    if (!commentContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    setComments([
      ...comments,
      { user: "새로운 사용자", date: new Date().toLocaleString(), content: commentContent }
    ]);
    setCommentContent("");
  };

  const handleDeleteComment = (index) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      setComments(comments.filter((_, i) => i !== index));
    }
  };

  const handleEditComment = (index) => {
    setEditingCommentIndex(index);
    setEditingCommentContent(comments[index].content);
  };

  const handleSaveEditedComment = () => {
    const updatedComments = [...comments];
    updatedComments[editingCommentIndex].content = editingCommentContent;
    setComments(updatedComments);
    setEditingCommentIndex(null);
    setEditingCommentContent("");
  };

  const handleDeletePost = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      alert("게시글이 삭제되었습니다.");
    }
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

  return (
    <div className={styles.container}>
      {/* Post Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>제목</h1>
        <div className={styles.headerInfo}>
          <span>날짜</span> <span>· 공감수</span> <span>· 댓글수</span>
        </div>
        {/* Delete Post Button */}
        <button onClick={handleDeletePost} className={styles.deletePostButton}>
          글 삭제하기
        </button>
      </header>

      {/* Post Content */}
      <section className={styles.contentSection}>
        <p className={styles.contentParagraph}>본문!</p>
        <hr className={styles.divider} />
      </section>

      {/* Comment Section */}
      <section className={styles.commentSection}>
        <p className={styles.commentTitle}>댓글</p>
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

              {/* Edit and Delete Buttons */}
              <div className={styles.commentButtons}>
                <button onClick={() => handleEditComment(index)} className={styles.editButton}>
                  수정
                </button>
                <button onClick={() => handleDeleteComment(index)} className={styles.deleteCommentButton}>
                  삭제
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
    </div>
  );
}

export default PostPage;
