import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import ContentBuilderPage from './ContentBuilderPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/content-builder" element={<ContentBuilderPage />} />
    </Routes>
  );
}

export default App;
