import React from 'react';
import LessonList from './LessonList';
import { useNavigate } from 'react-router-dom';

const CourseDetails = ({ course, onMarkLessonComplete }) => {
  const navigate = useNavigate();

  const handleMarkLesson = (lessonId, completed) => {
    onMarkLessonComplete(course.id, lessonId, completed);
  };

  return (
    <div className="course-details">
      <h2 className="course-details-title">{course.title}</h2>
      <p className="course-details-description">{course.description}</p>

      <div className="lesson-section">
        <h3 className="lesson-section-title">Lessons</h3>
        <ul className="lesson-list">
          {course.lessons.map(lesson => (
            <li key={lesson.id} className="lesson-item">
              <span className="lesson-title">{lesson.title}</span>
              <div className="lesson-actions">
                {lesson.completed ? (
                  <button className='completed' onClick={() => handleMarkLesson(lesson.id, false)}>Mark Incomplete</button>
                ) : (
                  <button className='incomplete' onClick={() => handleMarkLesson(lesson.id, true)}>Mark Complete</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="course-progress">
        <p>Progress: {course.progress}%</p>
      </div>
    </div>
  );
};

export default CourseDetails;
