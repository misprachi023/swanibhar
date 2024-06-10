// src/components/CourseList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectCourse, deleteCourse } from '../slices/courseSlice';

const CourseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector((state) => state.courses.courses);
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  console.log(isAdmin)
  console.log(courses)

  const handleCourseClick = (course) => {
    dispatch(selectCourse(course));
    navigate(`/courses/${course.id}`);
  };

  return (
    <div className="course-list-container">
      {courses.map((course) => (
        <div key={course.id} className="course-item">
          <div className="course-info" onClick={() => handleCourseClick(course)}>
            <h3 className="course-title">{course.title}</h3>
            <p className="course-description">{course.description}</p>
            <p className="course-progress">Progress: <button className="progress-button">{course.progress}%</button></p>
          </div>
          {isAdmin && (
            <div className="admin-buttons">
              <button onClick={(e) => { e.stopPropagation(); dispatch(selectCourse(course)); navigate(`/courses/${course.id}/edit`); }} className="edit-button">Edit</button>
              <button onClick={(e) => { e.stopPropagation(); dispatch(deleteCourse(course.id)) }} className="delete-button">Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseList;
