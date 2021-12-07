import { useEffect } from "react"
import {
  BrowserRouter as Router,
  Routes,
  useLocation,
  Navigate,
  Route,
  Link,
  Outlet,
} from "react-router-dom"
import "App.css"
import Welcome from "views/Welcome"
import Home from "views/user/Home"
import Login from "views/Login"

import { useSelector, useDispatch } from "react-redux"
import { change } from "store/modules/loading"
import { validate } from "store/modules/authentication"

const Loading = () => {
  return <div>Loading ...</div>
}

const RequireAuth = ({ children }) => {
  const authenticated = useSelector(
    (state) => state.authentication.authenticated
  )

  let location = useLocation()

  if (!authenticated) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return children
}

const Layout = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/protected">Protected Page</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  )
}

const App = () => {
  const loading = useSelector((state) => state.loading.loading)
  const accessToken = useSelector((state) => state.authentication.accessToken)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(change(true))
    dispatch(validate(accessToken)).finally(() => {
      dispatch(change(false))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken])

  if (loading) {
    return <Loading />
  }

  return (
    <Router>
      <Routes element={<Layout />}>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
