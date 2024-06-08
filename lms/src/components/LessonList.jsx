import React from 'react';

const LessonList = ({ lessons, onMarkLessonComplete }) => {
  return (
    <div className="lesson-list">
      <h3>Lessons</h3>
      <div className="lesson-cards">
        {lessons.map(lesson => (
          <div key={lesson.id} className={`lesson-card ${lesson.completed ? 'completed' : ''}`}>
            <div className="lesson-title">{lesson.title}</div>
            <button onClick={() => onMarkLessonComplete(lesson.id)}>
              {lesson.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LessonList;
