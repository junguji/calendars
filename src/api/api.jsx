import axios from "axios";

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
customAxios.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.log(error)
      if (
          error.response &&
          error.response.status === 401 &&
          !error.config._retry
      ) {
        if (!localStorage.getItem("token")) {
          window.alert("로그인이 필요한 페이지입니다.");
          localStorage.removeItem("token");
          window.location.href = "/";
        } else if (!localStorage.getItem("refresh_token")) {
          window.alert("로그인이 필요한 페이지입니다.");
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/";
        } else {
          const {
            data: {
              data: { access_token, refresh_token },
            },
          } = await customAxios.post("/refresh/token", {
            refresh_token: localStorage.getItem("refresh_token"),
          });
          localStorage.setItem("token", access_token);
          localStorage.setItem("refresh_token", refresh_token);
        }
      }
      return Promise.reject(error);
    }
)
const useAxios = () => {
  return customAxios;
};

export default useAxios;
