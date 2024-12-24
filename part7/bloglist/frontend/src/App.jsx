import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import Login from './pages/Login'
import User from './pages/User'
import Users from './pages/Users'
import blogService from './services/blogs'
import storageService from './services/storage'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { logIn } from './reducers/loginReducer'
import Layout from './components/Layout'

const App = () => {
  const dispatch = useDispatch()
  const isUserLoggedIn = useSelector((state) => Boolean(state.login))

  useEffect(() => {
    const user = storageService.loadUser()
    if (user) {
      blogService.setToken(user.token)
      dispatch(logIn(user))
    }
  }, [dispatch])

  useEffect(() => {
    if (isUserLoggedIn) {
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
  }, [isUserLoggedIn, dispatch])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={isUserLoggedIn ? <Blogs /> : <Login />} />
        {isUserLoggedIn && (
          <>
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
          </>
        )}
        <Route path="*" element={<h3>404 Page Not Found</h3>} />
      </Routes>
    </Layout>
  )
}

export default App
