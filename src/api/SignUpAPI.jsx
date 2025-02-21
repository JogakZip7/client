import api from "./axiosInstance";

const SignUpAPI = async (nickname, password) => {
  try {
    const response = await api.post(
      "/signup",
      { nickname, password }, 
      { withCredentials: true }
    );

    console.log("회원가입API:", response.data);

    if (response.data && response.data.token && response.data.nickname) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("nickname", response.data.nickname);
      return { success: true, nickname: response.data.nickname };
    }
    return { success: false, error: "회원가입 실패" };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || "서버 오류 발생",
    };
  }
};

export default SignUpAPI;