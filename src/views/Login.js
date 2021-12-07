import React from "react"

import { useSelector, useDispatch } from "react-redux"
import { change } from "store/modules/loading"

const Login = () => {
  const loading = useSelector((state) => state.loading.loading)
  const dispatch = useDispatch()

  return (
    <div>
      <div>LOGIN</div>
      <button className="App-link" onClick={() => dispatch(change(!loading))}>
        Change Loading: {loading ? "ok" : "no"}
      </button>
    </div>
  )
}

export default Login
