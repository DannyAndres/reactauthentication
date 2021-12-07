import authAxios from "utils/authAxios"
import axios from "axios"

const service = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.REACT_APP_BACKEND_URL + "/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  register: (
    names,
    lastnames,
    rut,
    phone,
    email,
    password,
    password_confirmation
  ) => {
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.REACT_APP_BACKEND_URL + "/register", {
          names: names,
          lastnames: lastnames,
          rut: rut,
          phone: phone,
          email: email,
          password: password,
          password_confirmation: password_confirmation,
        })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  logout: () => {
    return new Promise((resolve, reject) => {
      authAxios
        .post(process.env.REACT_APP_BACKEND_URL + "/logout", {})
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  validate: () => {
    return new Promise((resolve, reject) => {
      authAxios
        .post(process.env.REACT_APP_BACKEND_URL + "/validate", {})
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          console.log("test", error)
          reject(error)
        })
    })
  },
}

export default service
