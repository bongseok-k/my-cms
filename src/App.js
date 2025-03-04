import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import ContentBuilderPage from './ContentBuilderPage';
import CourseListPage from './CourseListPage';
import LibraryMainPage from './LibraryMainPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/content-builder" element={<ContentBuilderPage />} />
      <Route path="/course-list" element={<CourseListPage />} />
      <Route path="/library-list" element={<LibraryMainPage />} />
    </Routes>
  );
}

export default App;
