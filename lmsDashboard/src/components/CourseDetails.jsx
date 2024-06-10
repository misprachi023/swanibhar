// src/components/CourseDetails.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { markLessonComplete } from '../slices/courseSlice';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CourseDetails = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.courses.courses.find(course => course.id === parseInt(courseId)));
 
  const handleMarkLesson = (lessonId, completed) => {
    dispatch(markLessonComplete({ courseId: course.id, lessonId, completed }));
  };

  if (!course) return <p>Course not found</p>;

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
