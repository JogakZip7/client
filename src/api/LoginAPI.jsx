import api from "./axiosInstance";

const LogInAPI = async (nickname, password) => {
  try {
    const response = await api.post(`/signin`, { nickname, password });
    console.log("로그인 API 응답:", response);
    if (response.data && response.data.token && response.data.nickname) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("nickname", response.data.nickname);
      return { success: true, nickname: response.data.nickname };
    }
    return { success: false, error: "로그인 실패(토큰 없음)" };
  } catch (error) {
    console.error("로그인 요청 실패:", error.response?.data || error);
    return {
      success: false,
      error: error.response?.data?.error || "서버 오류 발생",
    };
  }
};

export default LogInAPI;
