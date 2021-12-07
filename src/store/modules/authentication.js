import AuthService from "services/authService"

// consts
const LOGOUT = "reactauthentication/auth/logout"
const VALIDATE = "reactauthentication/auth/validate"
const ADD_TOKEN = "reactauthentication/auth/add_token"

// store
const initialState = {
  authenticated: false,
  accessToken: localStorage.getItem("accessToken") || "",
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {},
}

// action
const add_token_action = (response) => ({
  type: ADD_TOKEN,
  payload: response,
})

const logout_action = (credentials) => ({
  type: LOGOUT,
  payload: credentials,
})

const validate_action = (user) => ({
  type: VALIDATE,
  payload: user,
})

// api calls
export const login = (credentials) => {
  return (dispatch) => {
    dispatch(logout_action())
    return new Promise((resolve, reject) => {
      AuthService.login(credentials.email, credentials.password)
        .then((response) => {
          dispatch(add_token_action(response.data))
          resolve({
            data: {
              status: "ok",
              response: response.data,
            },
          })
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export const register = (credentials) => {
  return (dispatch) => {
    dispatch(logout_action())
    return new Promise((resolve, reject) => {
      AuthService.login(
        credentials.names,
        credentials.lastnames,
        credentials.rut,
        credentials.phone,
        credentials.email,
        credentials.password,
        credentials.password_confirmation
      )
        .then((response) => {
          dispatch(add_token_action(response.data))
          resolve({
            data: {
              status: "ok",
              response: response.data,
            },
          })
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export const logout = (credentials) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      AuthService.login(
        credentials.names,
        credentials.lastnames,
        credentials.rut,
        credentials.phone,
        credentials.email,
        credentials.password,
        credentials.password_confirmation
      )
        .then(() => {
          dispatch(logout_action())
          resolve({
            data: {
              status: "ok",
            },
          })
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

export const validate = (token) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      AuthService.validate(token)
        .then((response) => {
          dispatch(validate_action(response.data.user))
          resolve({
            data: {
              status: "ok",
              response: response.data,
            },
          })
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
}

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT:
      localStorage.removeItem("accessToken")
      state = { ...state, accessToken: "", authenticated: false }
      return state
    case ADD_TOKEN:
      state = {
        ...state,
        authenticated: true,
        accessToken: action.payload.token,
        user: action.payload.user,
      }
      localStorage.setItem("accessToken", action.payload.token)
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      return state
    case VALIDATE:
      state = { ...state, authenticated: true, user: action.payload }
      localStorage.setItem("user", JSON.stringify(action.payload))
      return state
    default:
      return state
  }
}

export default reducer
