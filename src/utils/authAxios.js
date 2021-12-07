import axios from "axios"

const authAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
})

export const setAuthHeader = (token) => {
  authAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`
  if (process.env.REACT_APP_ENVIROMENT === "development") {
    authAxios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
    authAxios.defaults.headers.common["Access-Control-Allow-Methods"] =
      "GET, PUT, POST, DELETE, OPTIONS"
  }
}

authAxios.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("accessToken")
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    config.headers["Content-Type"] = "application/json"
    return config
  },
  (error) => Promise.reject(error)
)

authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)

export default authAxios
