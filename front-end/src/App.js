import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SingleTour from './pages/SingleTour'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { AddUser } from './redux/features/authSlice'
import AddEditTour from './pages/AddEditTour'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './pages/PrivateRoute'
import NotFound from './pages/NotFound'
import TagTours from './pages/TagTours'
import LoadingToRedirect from './components/LoadingToRedirect'


function App() {
  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(AddUser(user))
  }, [user, dispatch])

  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tours/search' element={<Home /> } />
          <Route path='/tours/tag/:tag' element={<TagTours />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/addTour' element={<PrivateRoute><AddEditTour /></PrivateRoute>} />
          <Route path='/editTour/:id' element={<PrivateRoute><AddEditTour /></PrivateRoute>} />
          <Route path='/tour/:id' element={<SingleTour />} />
          <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path='/404' element={<NotFound />} />
          <Route path='/redirect' element={<LoadingToRedirect />} />
        </Routes>
      </div>

    </Router>
  );
}

export default App;
