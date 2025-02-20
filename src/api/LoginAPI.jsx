import axios from 'axios';
const API_URL = "https://server-5zu8.onrender.com";

const LogInAPI = async (id, password) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, { id, password });

    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("nickname", response.data.nickname);
      return { success: true, nickname: response.data.nickname };
    }

    return { success: false, error: "로그인 실패" };
  } catch (error) {
    return { success: false, error: error.response?.data?.error || "서버 오류 발생" };
  }
};

export default LogInAPI;