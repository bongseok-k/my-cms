import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import ContentBuilderPage from './ContentBuilderPage';
import CourseListPage from './CourseListPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/content-builder" element={<ContentBuilderPage />} />
      <Route path="/course-list" element={<CourseListPage />} />
    </Routes>
  );
}

export default App;
