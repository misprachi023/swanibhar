import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const EditCourseForm = ({ course, onSave, onCancel }) => {
  const Navigate = useNavigate();
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  useEffect(() => {
    setTitle(course.title);
    setDescription(course.description);
  }, [course]);
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...course, title, description });
    Navigate('/courses');

  };

  return (
    <form className="edit-course-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Edit Course</h2>
      <div className="form-group">
        <label className='form-label'>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label className='form-label'>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className="save-button" >Save</button>
      <button type="button" className="cancel-button" onClick={() => Navigate('/courses')}>Cancel</button>
    </form>
  );
};
export default EditCourseForm;