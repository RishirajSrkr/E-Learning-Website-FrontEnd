import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
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

import PrivacyPolicy from './pages/footer_related/PrivacyPolicy.jsx'
import TermsOfService from './pages/footer_related/TermsOfService.jsx'

import ErrorPage from './pages/ErrorPage.jsx'


function App() {

  return (

    <AuthProvider>
      <UserContextProvider>
        <WindowWidthProvider >
          <Toaster position='bottom-right' />

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

              <Route path='/course/:courseId/enrolled-users' element={<EnrolledUserOfACourse />} />

              <Route path='/course/:courseId/discussions' element={<CourseDiscussionPage />} />



              {/* ------------- footer ---------------- */}

              <Route path='/privacy-policy' element={<PrivacyPolicy />} />

              <Route path='/tos' element={<TermsOfService/>}/>

            </Route>


            {/* -------- error ----------- */}
            <Route path='*' element={<ErrorPage />} />

          </Routes>

        </WindowWidthProvider>
      </UserContextProvider>
    </AuthProvider>

  )
}

export default App
