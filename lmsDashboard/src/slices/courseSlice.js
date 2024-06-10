// src/slices/courseSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  courses: [
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
  ],
  selectedCourse: null,
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    addCourse(state, action) {
      state.courses.push({ ...action.payload, id: state.courses.length + 1 });
    },
    deleteCourse(state, action) {
      const courseId = action.payload;
      state.courses = state.courses.filter(course => course.id !== courseId);
    },
    editCourse(state, action) {
      const { id, title, description } = action.payload;
      const courseToEdit = state.courses.find(course => course.id === id);
      if (courseToEdit) {
        courseToEdit.title = title;
        courseToEdit.description = description;
      }
    },
    markLessonComplete(state, action) {
      const { courseId, lessonId, completed } = action.payload;
      const course = state.courses.find(course => course.id === courseId);
      if (course) {
        const lesson = course.lessons.find(lesson => lesson.id === lessonId);
        if (lesson) {
          lesson.completed = completed;
          const completedLessons = course.lessons.filter(lesson => lesson.completed).length;
          course.progress = (completedLessons / course.lessons.length) * 100;
        }
      }
    },
    selectCourse(state, action) {
      state.selectedCourse = action.payload;
    },
  },
});

export const { addCourse, deleteCourse, editCourse, markLessonComplete, selectCourse } = courseSlice.actions;
export default courseSlice.reducer;
