import { createStore, combineReducers, applyMiddleware } from "redux"
import { createLogger } from "redux-logger"
import authentication from "./modules/authentication"
import loading from "./modules/loading"
import thunk from "redux-thunk"

const loggerMiddleware = createLogger({})

let middleware = []
if (process.env.NODE_ENV !== "production") {
  middleware = [...middleware, loggerMiddleware]
}

const reducer = combineReducers({
  authentication,
  loading,
})

const store = createStore(reducer, {}, applyMiddleware(thunk, ...middleware))

export default store
