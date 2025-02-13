import React, { useState } from 'react';

function PostPage() {
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editingCommentContent, setEditingCommentContent] = useState("");

  const handleCommentSubmit = () => {
    setComments([...comments, { user: "새로운 사용자", date: new Date().toLocaleString(), content: commentContent }]);
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
      // 게시글 삭제 로직을 여기에 추가하면 됩니다.
      alert("게시글이 삭제되었습니다.");
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "1000px", margin: "0 auto", backgroundColor: "#FAFAFA", padding: "20px" }}>
      {/* Post Header */}
      <header style={{ marginBottom: "20px", borderBottom: "1px solid #DDD", paddingBottom: "20px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>제목</h1>
        <div style={{ color: "#B8B8B8", fontSize: "14px" }}>
          <span>#태그</span> <span>· 날짜</span> <span>· 공감수</span> <span>· 댓글수</span>
        </div>
        {/* Delete Post Button */}
        <button
          onClick={handleDeletePost}
          style={{
            position: "absolute",
            right: "20px",
            top: "20px",
            padding: "10px 20px",
            backgroundColor: "#E74C3C",
            color: "#fff",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer"
          }}
        > 
        글 삭제하기
        </button>
      </header>

      {/* Post Content */}
      <section style={{ marginBottom: "20px" }}>
        <p style={{ fontSize: "16px", lineHeight: "1.5", color: "#282828" }}>
          본문!
        </p>
        <hr style={{ border: "1px solid #DDD", marginTop: "10px" }} />
      </section>
      
      {/* Comment Section */}
      <section>
        <p style={{ fontSize: "16px", lineHeight: "1.5", color: "#000000" }}>
          댓글
        </p>
        <div>
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="댓글 작성해주세요"
            style={{ width: "100%", height: "60px", padding: "10px", borderRadius: "6px", border: "1px solid #DDD", marginBottom: "10px" }}
          />
          
          {/* Right-aligned Submit Button */}
          <div style={{ textAlign: "right" }}>
            <button
              onClick={handleCommentSubmit}
              style={{
                padding: "10px 20px",
                backgroundColor: "#282828",
                color: "#fff",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer"
              }}
            >
              등록
            </button>
          </div>
          
          {/* Divider Line */}
          <hr style={{ border: "1px solid #DDD", marginTop: "10px" }} />
        </div>

        {/* Comments List */}
        <div style={{ marginTop: "20px" }}>
          {comments.map((comment, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              {/* Comment Header with Name */}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: "bold" }}>
                <span>{comment.user}</span>
                <span style={{ fontSize: "12px", color: "#B8B8B8" }}>{comment.date}</span>
              </div>

              {/* Comment Content */}
              {editingCommentIndex === index ? (
               <div>
               <textarea
                 value={editingCommentContent}
                 onChange={(e) => setEditingCommentContent(e.target.value)}
                 style={{
                   width: "100%",
                   height: "60px",
                   padding: "10px",
                   borderRadius: "6px",
                   border: "1px solid #DDD",
                   marginBottom: "10px"
                 }}
               />
               <div style={{ display: "flex", justifyContent: "flex-end" }}>
                 <button
                   onClick={handleSaveEditedComment}
                   style={{
                     padding: "10px 20px",
                     backgroundColor: "#282828",
                     color: "#fff",
                     borderRadius: "6px",
                     border: "none",
                     cursor: "pointer"
                   }}
                 >
                   저장
                 </button>
               </div>
             </div>
             
              ) : (
                <p style={{ fontSize: "14px", color: "#282828" }}>{comment.content}</p>
              )}

              {/* Edit and Delete Buttons */}
              <div>
                <button
                  onClick={() => handleEditComment(index)}
                  style={{
                    backgroundColor: "#F4D13D",
                    border: "none",
                    color: "#fff",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    marginRight: "5px",
                    cursor: "pointer"
                  }}
                >
                  수정
                </button>
                <button
                  onClick={() => handleDeleteComment(index)}
                  style={{
                    backgroundColor: "#E74C3C",
                    border: "none",
                    color: "#fff",
                    borderRadius: "4px",
                    padding: "5px 10px",
                    cursor: "pointer"
                  }}
                >
                  삭제
                </button>
              </div>

              {/* Divider Line */}
              <hr style={{ border: "1px solid #DDD", marginTop: "10px" }} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PostPage;
