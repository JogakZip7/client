import axios from "axios";

const SignUpAPI = async (userid, password, nickname) => {
  let token = "";

  await axios
    .post(
      "/login.json",
      {
        userid: userid,
        password: password,
        nickname: nickname,
      },
      { withCredentials: true }
    )
    .then((response) => {
      token = response.data.Token;
      sessionStorage.setItem("token", JSON.stringify(token));
    })
    .catch(function (error) {
      console.log(error);
    });
  return token;
};

export default SignUpAPI;
