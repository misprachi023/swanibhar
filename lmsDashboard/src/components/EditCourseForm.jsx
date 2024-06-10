import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editCourse } from '../slices/courseSlice';
import { useNavigate, useParams } from 'react-router-dom';

const EditCourseForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams(); // Extract courseId from URL parameters

  // Access the course from Redux state using useSelector
  const course = useSelector((state) => state.courses.courses.find(course => course.id === parseInt(courseId)));

  // If the course is not found, display a message
  if (!course) return <p>Course not found</p>;

  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch the editCourse action with the updated course details
    dispatch(editCourse({ id: course.id, title, description }));

    // Navigate back to the course details page
    navigate(`/courses/${course.id}`);
  };

  const handleCancel = () => {
    // Navigate back to the previous page
    navigate(-1);
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
      <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
    </form>
  );
};

export default EditCourseForm;
