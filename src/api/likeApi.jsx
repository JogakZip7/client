import api from "./axiosInstance";

export const likeApi = {
  /**
   * ✅ 게시물 공감 (좋아요 추가/취소 토글)
   * @param {string} postId - 공감할 게시물 ID
   * @returns {Promise<Object>} - 업데이트된 공감 데이터 (현재 공감 수 포함)
   */
  toggleLike: async (postId) => {
    try {
      const response = await api.post(`/posts/${postId}/like`); // ✅ POST 요청 한 번으로 공감 토글
      console.log("✅ 공감 토글 성공:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ 공감 토글 실패:", error.response ? error.response.data : error.message);
      throw error;
    }
  },
};