import React, { useState } from 'react';
import { FaPlus, FaShareSquare } from 'react-icons/fa';
import './CourseListPage.css';

// 더미 데이터: 8개의 과목 (썸네일, 과목명, 작성자 정보)
const dummyCourses = [
  { id: 1, name: "과목 1", thumbnail: "https://hunetdown.cdn.hunet.co.kr/Resources/B2B/Hyundai/Thumbnail/HLSP47799.jpg", author: "관리자" },
  { id: 2, name: "과목 2", thumbnail: "https://hunetdown.cdn.hunet.co.kr/Resources/B2B/Hyundai/Thumbnail/HLSP49085.jpg", author: "관리자" },
  { id: 3, name: "과목 3", thumbnail: "https://hunetdown.cdn.hunet.co.kr/Resources/B2B/Hyundai/Thumbnail/HLSP49086.jpg", author: "관리자" },
  { id: 4, name: "과목 4", thumbnail: "https://hunetdown.cdn.hunet.co.kr/Resources/B2B/Hyundai/Thumbnail/HLSP49087.jpg", author: "관리자" },
  { id: 5, name: "과목 5", thumbnail: "https://hunetdown.cdn.hunet.co.kr/Resources/B2B/Hyundai/Thumbnail/HLSP49090.jpg", author: "관리자" },
  { id: 6, name: "과목 6", thumbnail: "https://hunetdown.cdn.hunet.co.kr/Resources/B2B/Hyundai/Thumbnail/HLSP49091.jpg", author: "관리자" },
  { id: 7, name: "과목 7", thumbnail: "https://hunetdown.cdn.hunet.co.kr/Resources/B2B/Hyundai/Thumbnail/HLSP49093.jpg", author: "관리자" },
  { id: 8, name: "과목 8", thumbnail: "https://hunetdown.cdn.hunet.co.kr/Resources/B2B/Hyundai/Thumbnail/HLSP49094.png", author: "관리자" }
];

function CourseListPage({ onNewCourse }) {
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

  return (
    <div className="course-list-page">
      <div className="top-menu">
        {["과목", "라이브러리", "설정"].map((menu, index) => (
          <div key={index} className="top-menu-item">{menu}</div>
        ))}
        <div className="view-options">
          <button 
            className={`view-button ${viewMode === "grid" ? "active" : ""}`} 
            onClick={() => setViewMode("grid")}
          >
            그리드
          </button>
          <button 
            className={`view-button ${viewMode === "list" ? "active" : ""}`} 
            onClick={() => setViewMode("list")}
          >
            리스트
          </button>
        </div>
        <button className="new-course-button" onClick={onNewCourse}>
          <FaPlus /> 신규 생성
        </button>
      </div>
      {viewMode === "grid" ? (
        <div className="course-grid">
          {dummyCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-thumbnail">
                <img src={course.thumbnail} alt={course.name} />
              </div>
              <div className="course-info">
                <h3 className="course-title">{course.name}</h3>
                <p className="course-author">작성자: {course.author}</p>
              </div>
              <button className="export-button">
                <FaShareSquare /> Export
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="course-list-view">
          {dummyCourses.map(course => (
            <div key={course.id} className="course-list-item">
              <img src={course.thumbnail} alt={course.name} className="list-thumbnail" />
              <div className="list-info">
                <h3>{course.name}</h3>
                <p>작성자: {course.author}</p>
              </div>
              <button className="export-button list-export">
                <FaShareSquare /> Export
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseListPage;
