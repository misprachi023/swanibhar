import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import './styles/styles.scss';
import Header from './components/Header';
import CourseList from './components/CourseList';
import CourseDetails from './components/CourseDetails';
import CourseUploadForm from './components/CourseUploadForm';
import EditCourseForm from './components/EditCourseForm';
import UserProfile from './components/UserProfile';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import './App.scss';
// A PrivateRoute component to protect routes
const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};
const App = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <Router>
        <div className="app">
          <Header />
          <UserProfile />
          <div className="content">
            <Routes>
            <Route path="/" element={!isAuthenticated ? <Navigate to="/courses" />: <CourseList />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/courses" element={!isAuthenticated ? <LoginForm/>: <CourseList />} />
              <Route path="/courses/:courseId" element={<CourseDetails />} />
              <Route
                path="/admin/upload"
                element={isAdmin ? <CourseUploadForm /> : <p>You are not authorized.</p>}
              />
              <Route
                path="/courses/:courseId/edit"
                element={<PrivateRoute element={EditCourseForm} />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
};
export default App;