import React, { useState } from 'react';
import { FaCloudUploadAlt, FaSearch } from 'react-icons/fa';
import {
  FaBell,
  FaUserCircle,
  FaFolder,
  FaFolderOpen,
  FaFile,
  FaTable,
  FaTh,
  FaFilter
} from "react-icons/fa";
import './ContentBuilderPage.css';

function DetailInputPage({
  courseTitle = "CMS 솔루션 , 과목명 없음", // 상단 볼드체로 표시할 과목명(예시)
  onSaveDetail,
  onBack
}) {
  const [thumbnail, setThumbnail] = useState("");
  const [courseIntro, setCourseIntro] = useState("");

  // 기타 정보들
  const [category, setCategory] = useState("");
  const [keywords, setKeywords] = useState("");
  const [instructor, setInstructor] = useState("");
  const [sampleLesson, setSampleLesson] = useState(""); // 샘플(차시선택)
  const [difficulty, setDifficulty] = useState("");
  const [subtitleFile, setSubtitleFile] = useState(""); // 자막 업로드
  const [price, setPrice] = useState("");

  // 저장
  const handleDetailSave = () => {
    onSaveDetail?.({
      thumbnail,
      courseIntro,
      category,
      keywords,
      instructor,
      sampleLesson,
      difficulty,
      subtitleFile,
      price
    });
  };

  return (
    <div className="library-main-page">
      {/* 상단 메뉴 - 기존 콘텐츠 빌더와 동일 */}
      <header className="top-menu">
        <div className="menu-left">
          <img
            src="http://hcms.hunet.co.kr/image/hunet_hcms_logo.png"
            alt="Company Logo"
            className="company-logo"
          />
          <div className="top-menu-item" onClick={() => window.location.href = "/course-list"}>과목</div>
          <div className="top-menu-item" onClick={() => window.location.href = "/libraru-list"}>라이브러리</div>
          <div className="top-menu-item">설정</div>
        </div>
        <div className="menu-right">
          <FaBell className="icon" />
          <FaUserCircle className="icon" />
        </div>

        
      </header>
      {/* 하단 버튼 (저장 / 뒤로가기) */}
      <div className="detail-button-row">
        <button
          className="gray-button"
          style={{ marginLeft: '8px' }}
          onClick={onBack}
        >
          뒤로가기
        </button>
        <button className="red-button" onClick={handleDetailSave}>
          저장
        </button>        
      </div>
    <div className="detail-content">
      <div className="detail-header-row">
        <h2 className="detail-course-title">{courseTitle}</h2>
      </div>
      <hr className="detail-divider" />

        <div className="detail-top-section-horizontal">
          {thumbnail ? (
            // 썸네일이 있으면 이미지 노출
            <div className="thumbnail-container">
          <img
            src={thumbnail}
            alt="과목썸네일"
            className="course-thumbnail"
          />
            </div>
          ) : (
            // 썸네일이 없으면 업로드/검색 아이콘 노출
            <div className="thumbnail-placeholder">
          <FaCloudUploadAlt size={32} style={{ marginRight: '10px' }} />
          <FaSearch size={32} />
            </div>
          )}

          <div className="intro-text-container-horizontal">
            <label className="intro-label">과정소개</label>
            <textarea
          className="intro-textarea"
          value={courseIntro}
          onChange={(e) => setCourseIntro(e.target.value)}
          placeholder="과정 소개를 입력하세요"
            />
          </div>
        </div>

        <hr className="detail-divider" />

        {/* 아래쪽: 좌측 label(bold), 우측 input 형식의 2열 레이아웃 */}
      <div className="detail-form-grid">
        {/* 1) 카테고리 */}
        <div className="detail-row">
          <div className="detail-label bold">카테고리</div>
          <div className="detail-input">
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="카테고리 입력"
            />
          </div>
        </div>

        {/* 2) 키워드 */}
        <div className="detail-row">
          <div className="detail-label bold">키워드</div>
          <div className="detail-input">
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="키워드 입력"
            />
          </div>
        </div>

        {/* 3) 강사 */}
        <div className="detail-row">
          <div className="detail-label bold">강사</div>
          <div className="detail-input">
            <input
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              placeholder="강사명 입력"
            />
          </div>
        </div>

        {/* 4) 샘플(차시선택) */}
        <div className="detail-row">
          <div className="detail-label bold">샘플</div>
          <div className="detail-input">
            <select
              value={sampleLesson}
              onChange={(e) => setSampleLesson(e.target.value)}
            >
              <option value="">차시 선택</option>
              <option value="1차시">1차시</option>
              <option value="2차시">2차시</option>
              {/* 필요하면 동적으로 차시 목록 가져오기 */}
            </select>
          </div>
        </div>

        {/* 5) 난이도 (초급, 중급, 고급) */}
        <div className="detail-row">
          <div className="detail-label bold">난이도</div>
          <div className="detail-input">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">선택</option>
              <option value="초급">초급</option>
              <option value="중급">중급</option>
              <option value="고급">고급</option>
            </select>
          </div>
        </div>

        {/* 6) 자막 */}
        <div className="detail-row">
          <div className="detail-label bold">자막</div>
          <div className="detail-input">
            {/* 업로드 버튼 + 라이브러리 검색버튼 (예시) */}
            <button className="gray-button" style={{ marginRight: '6px' }}>
              자막 업로드
            </button>
            <button className="gray-button">라이브러리 검색</button>
          </div>
        </div>

        {/* 7) 가격 */}
        <div className="detail-row">
          <div className="detail-label bold">가격</div>
          <div className="detail-input">
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="가격 입력"
            />
          </div>
        </div>
      </div>
    </div>
  </div>  
  );
}

export default DetailInputPage;
