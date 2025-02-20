import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import styles from './PostPage.module.css';
import PenIcon from '../../assets/Pen.png';
import TrashIcon from '../../assets/Trash.png';
import FlowerIcon from '../../assets/Flower.png';
import ChatIcon from '../../assets/Chat.png';
import postsData from '../../mock/post.json';
import groupData from "../../mock/group.json";

function PostPage() {
  const { postId } = useParams(); // URL에서 postId 가져오기
  const navigate = useNavigate();

  // postId에 해당하는 게시글 찾기
  const postData = postsData.find((post) => String(post.id) === postId);

  // 페이지 로드 시, 사용자가 이 게시글에 공감했는지 확인
  useEffect(() => {
  const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {};
  setLikeClicked(!!likedPosts[postId]); // 공감 여부 확인
}, [postId]);
  //postData가 없으면 에러 페이지로 이동
  useEffect(() => {
    if (!postData) {
      navigate("/error");
    }
  }, [postData, navigate]);
  
  // postData가 없을 때 로딩 방지
  if (!postData) return null;
  const group = groupData.find((group) => group.id === postData.groupId);
  const groupName = group ? group.name : "알 수 없는 그룹";

  // 초기 공감 수를 JSON의 likeCount로 설정
  const [likes, setLikes] = useState(postData.likeCount);
  const [likeClicked, setLikeClicked] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 5;

  const [showDeleteCommentPopup, setShowDeleteCommentPopup] = useState(false);  // 댓글 삭제 팝업 상태
  const [showDeletePostPopup, setShowDeletePostPopup] = useState(false);        // 게시글 삭제 팝업 상태
  const [commentToDelete, setCommentToDelete] = useState(null);                  // 삭제할 댓글

  const loggedInUser = localStorage.getItem("id");
  const nickname = localStorage.getItem("nickname") || "익명";
  const loggedInUserNickname = localStorage.getItem("nickname");

  // 댓글 입력 값이 없을 때 경고
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 기본 Enter 동작(줄바꿈) 방지
      handleCommentSubmit(); // 댓글 등록 함수 실행
    }
  };
  const handleCommentSubmit = (e) => {
    if (e && e.key === "Enter" && !e.shiftKey) {
      if (!commentContent.trim()) return; // 빈 댓글 방지
    } else if (!e || e.type !== "keydown") {
      if (!commentContent.trim()) {
        alert("댓글 내용을 입력해주세요.");
        return;
      }
    }
  
    if (!loggedInUser) {
      alert("로그인 후 댓글을 작성할 수 있습니다.");
      return;
    }
  
    // 닉네임을 로컬스토리지에서 가져와서 댓글 정보에 포함시킴
    const newComment = {
      user: loggedInUser, // 현재 로그인한 사용자 ID
      nickname: nickname, // 닉네임 추가
      date: `${new Date().toLocaleDateString("ko-KR")} ${new Date().toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      })}`,
      content: commentContent
    };
  
    setComments([...comments, newComment]); // 상태 업데이트
    setCommentContent(""); // 입력 필드 초기화
  };
  

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {};
    if (likedPosts[postId]) {
      setLikeClicked(true);
    }
  }, [postId]);
  
  // 댓글 삭제 팝업 표시
  const handleDeleteComment = (index) => {
    if (comments[index].user !== loggedInUser) {
      alert("본인이 작성한 댓글만 삭제할 수 있습니다.");
      return;
    }
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

  // 게시글 삭제 취소
  const handleCancelDeletePost = () => {
    setShowDeletePostPopup(false);
  };
  // 게시글 수정
  const handleEditPost = () => {
    if (postData.nickname !== loggedInUserNickname) {
      alert("본인이 작성한 게시글만 수정할 수 있습니다.");
      return;
    }
    navigate(`/edit-post/${postId}`); // 📌 postId 포함해서 이동
  };
  // 댓글 수정
  const handleEditComment = (index) => {
    if (comments[index].user !== loggedInUser) {
      alert("본인이 작성한 댓글만 수정할 수 있습니다.");
      return;
    }
    setEditingCommentIndex(index);
    setEditingCommentContent(comments[index].content);
  };

  // 공감 버튼 클릭 시 공감 수 증가
  const handleLikeClick = () => {
    if (!loggedInUser) {
      alert("로그인 후 공감을 보낼 수 있습니다.");
      return;
    }
  
  // 현재 공감 상태를 확인
  const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {};

  if (likeClicked) {
    // 이미 공감한 경우 → 공감 취소
    setLikes(likes - 1);
    setLikeClicked(false);
    delete likedPosts[postId]; // 로컬 스토리지에서 삭제
  } else {
    // 공감하지 않은 경우 → 공감 추가
    setLikes(likes + 1);
    setLikeClicked(true);
    likedPosts[postId] = true; // 로컬 스토리지에 저장
  }

  localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
};
  

  const handleSaveEditedComment = () => {
    if (!editingCommentContent.trim()) {
      alert("댓글 내용을 입력해주세요."); // 경고 메시지 추가
      return;
    }
  
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
    navigate(-1); // 바로 이전 페이지로 이동
  };
  

  return (
    <div className={styles.container}>
      {/* 뒤로가기 버튼 */}
      <button onClick={handleBackClick} className={styles.backButton}>
        ◀︎
      </button>

      {/* 게시글 헤더 */}
      <header className={styles.header}>
        {/* 그룹 ID와 공개 여부 표시 */}
        <div className={styles.headerInfo}>
          <button onClick={() => navigate(`/groups/${postData.groupId}`)} className={styles.groupButton}>
            {groupName}
          </button>
          <span> | {postData.isPublic ? "공개" : "비공개"}</span>
        </div>
          
        {/* 게시글 제목으로 title 사용 */}
        <h1 className={styles.title}>{postData.title}</h1>
        <div className={styles.headerInfo}>
          {/* 닉네임 사용 */}
          <span>{postData.nickname}</span>

          <span> · {postData.location} </span>
          <span>
             · {new Date(postData.createdAt).toLocaleString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false, // 24시간 형식 사용
            })}
          </span>
          <span>
            <img src={FlowerIcon} alt="공감" className={styles.flowerIcon} /> {likes}
          </span>
          <span>
            <img src={ChatIcon} alt="댓글" className={styles.chatIcon} /> {comments.length}
          </span>
        </div>
        {/* 공감하기 버튼 */}
        <button onClick={handleLikeClick} className={styles.likeButton}>
          <img src={FlowerIcon} alt="공감" className={styles.flowerIcon2} />
          {likeClicked ? " 공감 취소" : " 공감 보내기"}
        </button>
        {/* 게시글 수정 버튼 */}
        <button onClick={handleEditPost} className={styles.editButton}>
          추억 수정 / 삭제
        </button>
      </header>

      {/* 게시글 내용 */}
      <section className={styles.contentSection}>
        {/* 이미지 중앙 정렬*/}
        <img
          src={postData.imageUrl}
          alt={postData.title}
          className={styles.postImage}
        />
        {/* 본문 내용 */}
        <p className={styles.contentParagraph}>
          {postData.content.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
</section>

      {/* 댓글 영역 */}
      <section className={styles.commentSection}>
        <p className={styles.commentTitle}>댓글 {comments.length}</p>
        <hr className={styles.divider} />
        <div>
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          onKeyDown={handleKeyDown} // Enter 키 이벤트 추가
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
                <span>{comment.nickname}</span>
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
