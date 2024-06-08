import React, { useState } from 'react';

const CourseUploadForm = ({ addCourse }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [lessons, setLessons] = useState([{ id: 1, title: '', completed: false }]);

  const handleLessonChange = (index, field, value) => {
    const newLessons = lessons.map((lesson, i) => (
      i === index ? { ...lesson, [field]: value } : lesson
    ));
    setLessons(newLessons);
  };

  const addLessonField = () => {
    setLessons([...lessons, { id: lessons.length + 1, title: '', completed: false }]);
  };

  const removeLessonField = (index) => {
    const newLessons = [...lessons];
    newLessons.splice(index, 1);
    setLessons(newLessons);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCourse({ title, description, lessons, progress: 0 });
    setTitle('');
    setDescription('');
    setLessons([{ id: 1, title: '', completed: false }]);
  };

  return (
    <div className="course-upload-form">
      <h2>Upload New Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Course Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {lessons.map((lesson, index) => (
          <div key={lesson.id} className="form-group lesson-group">
            <label>Lesson {index + 1}</label>
            <input
              type="text"
              value={lesson.title}
              onChange={(e) => handleLessonChange(index, 'title', e.target.value)}
              required
            />
            {index > 0 && (
              <button type="button" className="remove-lesson-button" onClick={() => removeLessonField(index)}>
                Remove
              </button>
            )}
          </div>
        ))}
        <button type="button" className="add-lesson-button" onClick={addLessonField}>Add Lesson</button>
        <button type="submit" className="submit-button">Upload Course</button>
      </form>
    </div>
  );
};

export default CourseUploadForm;
