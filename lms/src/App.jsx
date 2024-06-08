import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './styles/styles.scss';
import Header from './components/Header';
import CourseList from './components/CourseList';
import CourseDetails from './components/CourseDetails';
import CourseUploadForm from './components/CourseUploadForm';
import EditCourseForm from './components/EditCourseForm';
import UserProfile from './components/UserProfile';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import { AuthContext } from './contexts/AuthContext';
import './App.scss';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [signupCredentials, setSignupCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showLogin, setShowLogin] = useState(false);
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Course 1',
      description: 'Description for Course 1',
      progress: 20,
      lessons: [
        { id: 1, title: 'Lesson 1', completed: false },
        { id: 2, title: 'Lesson 2', completed: true },
      ],
    },
    {
      id: 2,
      title: 'Course 2',
      description: 'Description for Course 2',
      progress: 50,
      lessons: [
        { id: 1, title: 'Lesson 1', completed: true },
        { id: 2, title: 'Lesson 2', completed: true },
      ],
    },
    {
      id: 3,
      title: 'Course 3',
      description: 'Description for Course 3',
      progress: 50,
      lessons: [
        { id: 1, title: 'Lesson 1', completed: false },
        { id: 2, title: 'Lesson 2', completed: true },
      ],
    },
    {
      id: 4,
      title: 'Course 4',
      description: 'Description for Course 4',
      progress: 20,
      lessons: [
        { id: 1, title: 'Lesson 1', completed: false },
        { id: 2, title: 'Lesson 2', completed: true },
      ],
    },
    {
      id: 5,
      title: 'Course 5',
      description: 'Description for Course 5',
      progress: 80,
      lessons: [
        { id: 1, title: 'Lesson 1', completed: false },
        { id: 2, title: 'Lesson 2', completed: true },
      ],
    },
    {
      id: 6,
      title: 'Course 6',
      description: 'Description for Course 1',
      progress: 50,
      lessons: [
        { id: 1, title: 'Lesson 1', completed: false },
        { id: 2, title: 'Lesson 2', completed: true },
      ],
    },
    {
      id: 7,
      title: 'Course 8',
      description: 'Description for Course 1',
      progress: 30,
      lessons: [
        { id: 1, title: 'Lesson 1', completed: false },
        { id: 2, title: 'Lesson 2', completed: true },
      ],
    },
    {
      id: 8,
      title: 'Course 8',
      description: 'Description for Course 8',
      progress: 20,
      lessons: [
        { id: 1, title: 'Lesson 1', completed: false },
        { id: 2, title: 'Lesson 2', completed: true },
      ],
    },
    {
      id: 9,
      title: 'Course 9',
      description: 'Description for Course 9',
      progress: 20,
      lessons: [
        { id: 1, title: 'Lesson 1', completed: false },
        { id: 2, title: 'Lesson 2', completed: true },
      ],
    },
  ]);

  const handleSignup = (signupData) => {
    setSignupCredentials(signupData);
    setShowLogin(true);
  };

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === 'admin') {
      setIsAdmin(true);
      setIsAuthenticated(true);
      return true;
    } else if (username === signupCredentials.name && password === signupCredentials.password) {
      setIsAuthenticated(true);
      return true;
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setSelectedCourse(null);
    setIsAdmin(false);
  };

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
  };

  const addCourse = (course) => {
    setCourses([...courses, { ...course, id: courses.length + 1 }]);
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const markLessonComplete = (courseId, lessonId) => {
    const updatedCourses = courses.map((course) => {
      if (course.id === courseId) {
        const updatedLessons = course.lessons.map((lesson) =>
          lesson.id === lessonId ? { ...lesson, completed: !lesson.completed } : lesson
        );
        const completedLessons = updatedLessons.filter((lesson) => lesson.completed).length;
        const totalLessons = updatedLessons.length;
        const progress = (completedLessons / totalLessons) * 100;

        return { ...course, lessons: updatedLessons, progress };
      }
      return course;
    });

    setCourses(updatedCourses);
    if (selectedCourse && selectedCourse.id === courseId) {
      setSelectedCourse(updatedCourses.find((course) => course.id === courseId));
    }
    const course = courses.find((c) => c.id === courseId);
    if (course) {
      course.lessons = updatedCourses
        .find((c) => c.id === courseId)
        .lessons.map((l) => ({ ...l, completed: l.completed }));
    }
  };
  const handleSave=(course)=> {
    const index = courses.findIndex((c) => c.id === course.id);
    if (index !== -1) {
      courses[index] = course;
    } 
    
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, handleLogout }}>
      <Router>
        <div className="app">
          <Header />
          <UserProfile isLoggedIn={isAuthenticated} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/courses" />} />
              <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
              <Route path="/signup" element={<SignupForm onSignup={handleSignup} />} />
              <Route
                path="/courses"
                element={
                  isAuthenticated ? (
                    <CourseList
                      courses={courses}
                      onSelectCourse={handleCourseSelect}
                      onDeleteCourse={deleteCourse}
                      isAdmin={isAdmin}
                    />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/courses/:courseId"
                element={
                  isAuthenticated && selectedCourse ? (
                    <CourseDetails course={selectedCourse} onMarkLessonComplete={markLessonComplete} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                path="/admin/upload"
                element={
                  isAdmin ? (
                    <CourseUploadForm addCourse={addCourse} />
                  ) : (
                    <p style={{ textAlign: 'center', color: 'red', fontWeight: 'bold', fontSize: '30px' }}>You are not an admin</p>
                  )
                }
              />
              <Route
                path='/courses/:courseId/edit'
                element={
                  isAdmin ? (
                    <EditCourseForm course={selectedCourse} onSave={handleSave} />
                  ) : (
                    <p style={{ textAlign: 'center' }}>You are not an admin</p>
                  )

                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;


