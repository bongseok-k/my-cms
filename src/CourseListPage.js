import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaPlus, FaShareSquare, FaBell, FaUserCircle, 
  FaThLarge, FaList, FaFilter 
} from 'react-icons/fa';
import './CourseListPage.css';

// 더미 데이터: 8개의 과목 (썸네일, 과목명, 작성자 정보, 날짜)
const dummyCourses = [
  { id: 1, name: "안녕, 소중한 사람", thumbnail: "https://hunetdown.cdn.hunet.co.kr/Resources/B2B/Hyundai/Thumbnail/HLSP47799.jpg", author: "ALEN", date: "2025-02-01" },
  { id: 2, name: "나를 위한 커리어 코칭, 발가벗은 힘", thumbnail: "https://hunetdown.cdn.hunet.co.kr/Resources/B2B/Hyundai/Thumbnail/HLSP49085.jpg", author: "ALEN", date: "2025-02-03" },
  { id: 3, name: "나에게는 꿈이 있습니다.", thumbnail: "https://hunetdown.cdn.hunet.co.kr/Resources/B2B/Hyundai/Thumbnail/HLSP49086.jpg", author: "ALEN", date: "2025-02-05" },
  { id: 4, name: "넥스트 노멀 리질리언스", thumbnail: "https://hunetdown.cdn.hunet.co.kr/Resources/B2B/Hyundai/Thumbnail/HLSP49087.jpg", author: "ALEN", date: "2025-02-07" },
  { id: 5, name: "더 해빙 부와 행운을 끌어당기는 힘", thumbnail: "https://hunetdown.cdn.hunet.co.kr/Resources/B2B/Hyundai/Thumbnail/HLSP49090.jpg", author: "ALEN", date: "2025-02-09" },
  { id: 6, name: "디지털마케터로 일하고 있습니다", thumbnail: "https://hunetdown.cdn.hunet.co.kr/Resources/B2B/Hyundai/Thumbnail/HLSP49091.jpg", author: "ALEN", date: "2025-02-11" },
  { id: 7, name: "말습관을 바꾸니 인정받기 시작했다", thumbnail: "https://hunetdown.cdn.hunet.co.kr/Resources/B2B/Hyundai/Thumbnail/HLSP49093.jpg", author: "ALEN", date: "2025-02-13" },
  { id: 8, name: "트렌드를 넘는 마케팅이 온다", thumbnail: "https://hunetdown.cdn.hunet.co.kr/Resources/B2B/Hyundai/Thumbnail/HLSP49094.png", author: "ALEN", date: "2025-02-15" }
];

function CourseListPage() {
  // 기존 props: onNewCourse → 삭제하고 여기서 직접 navigate
  const navigate = useNavigate();

  // 뷰 전환 상태
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("latest");

  // 검색/필터 로직
  const filteredCourses = dummyCourses.filter(course =>
    course.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // "과목생성" 버튼 클릭 → content-builder 화면 이동
  const handleCreateCourse = () => {
    navigate("/content-builder");
  };

  return (
    <div className="course-list-page">
      {/* 최상단 공통 메뉴 */}
      <header className="top-menu">
        <div className="menu-left">
          {/* 로고 삽입 */}
          <img 
            src="http://hcms.hunet.co.kr/image/hunet_hcms_logo.png" 
            alt="Company Logo" 
            className="company-logo"
          />
          <div className="top-menu-item">과목</div>
          <div className="top-menu-item">라이브러리</div>
          <div className="top-menu-item">설정</div>
        </div>
        <div className="menu-right">
          <FaBell className="icon" title="알림" />
          <FaUserCircle className="icon" title="로그인" />
        </div>
      </header>

      {/* 서브헤더: 검색/필터 / 정렬 / 뷰 전환 / 과목생성 */}
      <div className="sub-header">
        <div className="sub-left">
          <input 
            type="text" 
            className="search-input" 
            placeholder="검색어 입력" 
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="filter-button">
            <FaFilter /> 필터
          </button>
        </div>

        <div className="sub-right">
          <select className="sort-select" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="latest">최신순</option>
            <option value="popular">인기순</option>
          </select>

          {/* 뷰 전환 버튼 */}
          <button 
            className={`view-button ${viewMode === "grid" ? "active" : ""}`} 
            onClick={() => setViewMode("grid")}
            title="그리드 뷰"
          >
            <FaThLarge />
          </button>
          <button 
            className={`view-button ${viewMode === "list" ? "active" : ""}`} 
            onClick={() => setViewMode("list")}
            title="리스트 뷰"
          >
            <FaList />
          </button>

          {/* 과목생성 버튼 */}
          <button className="new-course-button" onClick={handleCreateCourse}>
            <FaPlus /> 과목생성
          </button>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      {viewMode === "grid" ? (
        <div className="course-grid">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card">
              <div className="thumbnail-wrapper">
                <Link to={`/content-builder?courseId=${course.id}`} className="thumbnail-link">
                  <img src={course.thumbnail} alt={course.name} className="course-thumbnail" />
                </Link>
                <button className="card-export">
                  <FaShareSquare />
                </button>
              </div>
              <div className="course-info">
                <h3 className="course-title">{course.name}</h3>
                <p className="course-author">작성자: {course.author}</p>
                <p className="course-date">{course.date}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="course-list-view">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-list-item">
              <Link to={`/content-builder?courseId=${course.id}`} className="list-thumbnail-link">
                <img src={course.thumbnail} alt={course.name} className="list-thumbnail" />
              </Link>
              <div className="list-info">
                <h3>{course.name}</h3>
                <p>작성자: {course.author}</p>
                <p className="course-date">{course.date}</p>
              </div>
              <button className="export-button list-export">
                <FaShareSquare />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseListPage;
