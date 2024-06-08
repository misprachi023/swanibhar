import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseList = ({ courses, onSelectCourse, onDeleteCourse, isAdmin }) => {
  const navigate = useNavigate();

  const handleCourseClick = (course) => {
    onSelectCourse(course);
    navigate(`/courses/${course.id}`);
  };

  return (
    <div className="course-list-container">
      {courses.map(course => (
        <div key={course.id} className="course-item">
          <div className="course-info" onClick={() => handleCourseClick(course)}>
            <h3 className="course-title">{course.title}</h3>
            <p className="course-description">{course.description}</p>
            <p className="course-progress">Progress: <button className="progress-button">{course.progress}%</button></p>
          </div>
          {isAdmin && (
            <div className="admin-buttons">
              <button onClick={(e) => { e.stopPropagation(); onSelectCourse(course); navigate(`/courses/${course.id}/edit`); }} className="edit-button">Edit</button>
              <button onClick={(e) => { e.stopPropagation(); onDeleteCourse(course.id) }} className="delete-button">Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseList;
