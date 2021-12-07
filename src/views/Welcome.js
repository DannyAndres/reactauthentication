import React from "react"
import { useNavigate } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"
import { change } from "store/modules/loading"

const Welcome = () => {
  const navigate = useNavigate()
  const loading = useSelector((state) => state.loading.loading)
  const dispatch = useDispatch()

  return (
    <div>
      <div>WELCOME PAGE</div>
      <button className="App-link" onClick={() => dispatch(change(!loading))}>
        Change Loading: {loading ? "ok" : "no"}
      </button>
      <button
        onClick={() => {
          navigate("/login")
        }}
      >
        login
      </button>
    </div>
  )
}

export default Welcome
