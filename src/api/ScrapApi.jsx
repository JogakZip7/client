import api from "./axiosInstance";

// 스크랩한 게시글 가져오기
export const getMyScrapPosts = async () => {
  try {
    const token = localStorage.getItem("token"); // 🔹 토큰 가져오기
    if (!token) {
      throw new Error("User token not found in localStorage");
    }

    // 토큰을 Authorization 헤더에 포함하여 요청
    const response = await api.get("/myscraps", {
      headers: {
        Authorization: `Bearer ${token}`, // 🔹 토큰 추가
      },
    });
    const posts =response.data;
    console.log(posts);
    return posts; // 🔹 백엔드가 반환한 스크랩한 게시글 목록
  } catch (error) {
    console.error("Error fetching scrap posts:", error.response?.data || error.message);
    return [];
  }
};
