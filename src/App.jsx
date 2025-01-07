import './App.css'
import Home from './pages/Home'
import Login from './pages/login_related/Login.jsx'
import Register from './pages/Register'
import { Route, Routes } from 'react-router-dom'

import AllContributers from './pages/AllContributers'

import Layout from './pages/Layout'

import { Toaster } from 'sonner'

import ProtectedRoute from './components/ProtectedRoute.jsx'

import VoteResources from './pages/VoteResources'

// context related
import { AuthProvider } from './context/AuthContext.jsx'
import { UserContextProvider } from './context/UserContext.jsx'
import { WindowWidthProvider } from './context/WindowWidthContext.jsx'

// user profile related
import MyProfile from './pages/MyProfile'
import UpdateProfile from './pages/UpdateProfile.jsx'
import DashBoard from './pages/DashBoard.jsx'

// course related
import AllCourses from './pages/course_related/AllCourses'
import AddCoursePage from './pages/course_related/AddCoursePage.jsx'
import FullCoursePage from './pages/course_related/FullCoursePage.jsx'
import EnrolledUserOfACourse from './pages/course_related/EnrolledUserOfACourse.jsx'
import CourseDiscussionPage from './pages/course_related/CourseDiscussionPage.jsx'
import CoursesUploadedByUser from './pages/course_related/CoursesUploadedByUser.jsx'


//resource related
import VideoResourcePage from './pages/resource_realated/VideoResourcePage.jsx'


import PrivacyPolicy from './pages/footer_related/PrivacyPolicy.jsx'
import TermsOfService from './pages/footer_related/TermsOfService.jsx'

import ErrorPage from './pages/ErrorPage.jsx'
import GoogleCallback from './pages/GoogleCallback.jsx'
import AddVideoResource from './components/AddVideoResource.jsx'
import AddTextResource from './components/AddTextResource.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'


function App() {

  return (

    <AuthProvider>
      <ThemeProvider>
      <UserContextProvider>
        <WindowWidthProvider >
          <Toaster position='bottom-right' />

          <Routes>
            <Route path='/' element={<Layout />}>

              <Route path='' element={<Home />} />
              
              <Route path='/login' element={<Login />} />

              <Route path='/register' element={<Register />} />
              <Route path='/contributors' element={<AllContributers />} />



              <Route path='/vote-resources' element={<VoteResources />} />


              <Route path='/my-profile' element={
                <ProtectedRoute>
                  <MyProfile />
                </ProtectedRoute>
              } />

              <Route path='/user/:userId/uploaded-courses' element={<CoursesUploadedByUser />} />

              <Route path='*' element={<ErrorPage />} />

              <Route path='/profile/update' element={<UpdateProfile />} />



              <Route path='/dashboard' element={
                <ProtectedRoute >
                  <DashBoard />
                </ProtectedRoute>
              } />


              {/* ------------- course -------------------- */}


              <Route path='/all-courses' element={<AllCourses />} />

              <Route path='/course/:courseId' element={
                <ProtectedRoute>
                  <FullCoursePage />
                </ProtectedRoute>
              } />

              <Route path='/course/:courseId/enrolled-users' element={<EnrolledUserOfACourse />} />

              <Route path='/course/:courseId/discussions' element={<CourseDiscussionPage />} />



              <Route path='/resource/create' element={
                <ProtectedRoute>
                  <AddCoursePage />
                </ProtectedRoute>
              } />

              <Route path='/resource/create/text' element={
                <ProtectedRoute>
                  <AddTextResource />
                </ProtectedRoute>
              } />

              <Route path='resource/create/video' element={
                <ProtectedRoute>
                  <AddVideoResource />
                </ProtectedRoute>
              } />


              <Route path='/video-resource/:resourceId/:redirect' element={<ProtectedRoute>
                <VideoResourcePage />
              </ProtectedRoute>} />




              {/* ------------- footer ---------------- */}

              <Route path='/privacy-policy' element={<PrivacyPolicy />} />

              <Route path='/tos' element={<TermsOfService />} />

              <Route path='/auth/callback' element={<GoogleCallback />} />



            </Route>




            {/* -------- error ----------- */}
            <Route path='*' element={<ErrorPage />} />

          </Routes>

        </WindowWidthProvider>
      </UserContextProvider>
      </ThemeProvider>
    </AuthProvider>

  )
}

export default App
