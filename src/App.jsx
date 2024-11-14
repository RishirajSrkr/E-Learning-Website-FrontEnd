import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { Route, Routes } from 'react-router-dom'
import AllContributers from './pages/AllContributers'
import AllCourses from './pages/AllCourses'
import AddCoursePage from './pages/AddCoursePage'
import FullCoursePage from './pages/FullCoursePage'
import Layout from './pages/Layout'
import About from './pages/About'
import VoteResources from './pages/VoteResources'
import MyProfile from './pages/MyProfile'
import { AuthProvider } from './context/AuthContext.jsx'
import { UserContextProvider } from './context/UserContext.jsx'
import { WindowWidthProvider } from './context/WindowWidthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { Toaster } from 'react-hot-toast'
import CoursesUploadedByUser from './pages/CoursesUploadedByUser.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import UpdateProfile from './pages/UpdateProfile.jsx'
import DashBoard from './pages/DashBoard.jsx'
import EnrolledUserOfACourse from './pages/EnrolledUserOfACourse.jsx'
import { ToastContainer } from 'react-toastify';
function App() {

  return (
  
    <AuthProvider>
      <UserContextProvider>
        <WindowWidthProvider >
          <Toaster />
          <ToastContainer />

          <Routes>
            <Route path='/' element={<Layout />}>

              <Route path='' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/contributors' element={<AllContributers />} />

              <Route path='/course/create' element={
                <ProtectedRoute>
                  <AddCoursePage />
                </ProtectedRoute>
              } />

              <Route path='/all-courses' element={<AllCourses />} />

              <Route path='/course/:courseId' element={
                <ProtectedRoute>
                  <FullCoursePage />
                </ProtectedRoute>
              } />


              <Route path='/about' element={<About />} />
              <Route path='/vote-resources' element={<VoteResources />} />


              <Route path='/my-profile' element={
                <ProtectedRoute>
                  <MyProfile />
                </ProtectedRoute>
              } />

              <Route path='/user/:userId/uploaded-courses' element={<CoursesUploadedByUser />} />

              <Route path='*' element={<ErrorPage />} />


              {/* <Route path='/profile/update' element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              } /> */}

              <Route path='/profile/update' element={<UpdateProfile />} />

              <Route path='/dashboard' element={<DashBoard />}/>

              <Route path='/course/:courseId/enrolled-users'  element={<EnrolledUserOfACourse />}/>

            </Route>



          </Routes>

        </WindowWidthProvider>
      </UserContextProvider>
    </AuthProvider>

  )
}

export default App
