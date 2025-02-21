import api from "./axiosInstance"; // axiosInstance를 가져와야 의미 있음

/**
 * 인증 토큰 가져오기 (없으면 null 반환)
 */
const getAuthToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("🚨 토큰이 없습니다. 로그인 상태를 확인해주세요.");
    return null;
  }
  return token;
};

export const commentApi = {
  /**
   * 댓글 목록 조회
   * @param {string} postId - 게시물 ID
   * @returns {Promise<Array>} - 댓글 목록
   */
    getComments: async (postId, page = 1, pageSize = 5) => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error("🔑 인증이 필요합니다.");

      const numericPostId = Number(postId);
      if (isNaN(numericPostId)) throw new Error("❌ 유효하지 않은 postId입니다.");

      console.log(`📌 댓글 목록 요청: postId=${numericPostId}, page=${page}, pageSize=${pageSize}`);

      const response = await api.get(`/posts/${numericPostId}/comments`, {
        params: { page, pageSize },
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ 댓글 목록 조회 성공:", response.data);

      return {
        comments: response.data.data,  // ✅ `data` 배열을 `comments`로 변환
        totalPages: response.data.totalPages,
        totalItems: response.data.totalItemCount,
        currentPage: response.data.currentPage,
      };
    } catch (error) {
      console.error("❌ 댓글 목록 조회 실패:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  /**
   * ✅ 댓글 등록
   * @param {string} postId - 게시물 ID
   * @param {string} commentContent - 댓글 내용
   * @returns {Promise<Object>} - 추가된 댓글 데이터
   */
  addComment: async (postId, commentContent) => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error("🔑 인증이 필요합니다.");
      if (!commentContent || commentContent.trim() === "") {
        throw new Error("❌ 댓글 내용을 입력해주세요.");
      }

      console.log("📌 댓글 추가 요청:", { postId, content: commentContent });

      const response = await api.post(
        `/posts/${postId}/comments`,
        { content: commentContent.trim() }, // ✅ content 필드만 전달
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ 댓글 등록 성공:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ 댓글 등록 실패:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  /**
   * ✅ 댓글 삭제
   * @param {string} commentId - 삭제할 댓글 ID
   * @returns {Promise<Object>} - 삭제 결과
   */
  deleteComment: async (commentId) => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error("인증이 필요합니다. 로그인 후 이용해주세요.");
      if (!commentId) throw new Error("삭제할 댓글 ID가 없습니다.");

      const response = await api.delete(`/comments/${commentId}`, { // ✅ axiosInstance 사용
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(`✅ 댓글 삭제 성공 (ID: ${commentId})`);
      return response.data;
    } catch (error) {
      console.error("❌ 댓글 삭제 실패:", error.response ? error.response.data : error.message);
      throw error;
    }
  },

  /**
   * ✅ 댓글 수정
   * @param {string} commentId - 수정할 댓글 ID
   * @param {string} updatedContent - 수정할 내용
   * @returns {Promise<Object>} - 수정된 댓글 데이터
   */
  updateComment: async (commentId, updatedContent) => {
    try {
      const token = getAuthToken();
      if (!token) throw new Error("인증이 필요합니다. 로그인 후 이용해주세요.");
      if (!updatedContent || updatedContent.trim() === "") {
        throw new Error("수정할 내용을 입력해주세요.");
      }

      const response = await api.put(`/comments/${commentId}`, { content: updatedContent.trim() }, { // ✅ axiosInstance 사용
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ 댓글 수정 성공:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ 댓글 수정 실패:", error.response ? error.response.data : error.message);
      throw error;
    }
  },
};