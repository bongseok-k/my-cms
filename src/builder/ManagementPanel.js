import React from 'react';
import { FaSearch, FaFilter } from 'react-icons/fa';

function ManagementPanel({
  courseName,
  setCourseName,
  handleSaveCourse,
  newLessonName,
  setNewLessonName,
  handleSaveLesson,
  newPageName,
  setPageName,
  handleSavePage,
  lessons,
  currentLessonId,
  setCurrentLessonId,
  currentPageId,
  setCurrentPageId,
  currentLesson,
  librarySearchTerm,
  setLibrarySearchTerm,
  libraryCategoryFilter,
  setLibraryCategoryFilter,
  getAutocompleteSuggestions,
  handleLibraryFileSelect,
}) {
  return (
    <div className="builder-left-area">
      <div className="management-area">
        <div className="management-panel single-line">
          <label className="section-label">과목명:</label>
          <input
            type="text"
            placeholder="과목명 입력"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="management-input long-input"
          />
          <button
            onClick={handleSaveCourse}
            className="management-save-button red-button"
          >
            저장
          </button>
        </div>
        <div className="management-panel single-line">
          <label className="section-label">차시명:</label>
          <input
            type="text"
            placeholder="차시명 입력 (미입력 시 자동생성)"
            value={newLessonName}
            onChange={(e) => setNewLessonName(e.target.value)}
            className="management-input long-input"
          />
          <button
            onClick={handleSaveLesson}
            className="management-save-button red-button"
          >
            저장
          </button>
        </div>
        <div className="management-panel single-line">
          <label className="section-label">페이지명:</label>
          <input
            type="text"
            placeholder="페이지명 입력 (미입력 시 자동생성)"
            value={newPageName}
            onChange={(e) => setPageName(e.target.value)}
            className="management-input long-input"
          />
          <button
            onClick={handleSavePage}
            className="management-save-button red-button"
          >
            저장
          </button>
        </div>
        <div className="management-panel saved-info-panel" style={{ marginBottom: '0' }}>
          <div className="saved-lessons">
            <div className="saved-row">
              <label>차시:</label>
              <div className="tabs-container">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`tab-button ${currentLessonId === lesson.id ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentLessonId(lesson.id);
                      setCurrentPageId(lesson.pages[0].id);
                    }}
                  >
                    {lesson.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="saved-row">
              <label>페이지:</label>
              <div className="tabs-container">
                {currentLesson.pages.map((page) => (
                  <div
                    key={page.id}
                    className={`tab-button ${currentPageId === page.id ? 'active' : ''}`}
                    onClick={() => setCurrentPageId(page.id)}
                  >
                    {page.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="section-header">통합 라이브러리</div>
          <div className="search-row">
            <div className="search-input-group">
              <input
                type="text"
                placeholder="검색어 입력"
                className="search-input"
                value={librarySearchTerm}
                onChange={(e) => setLibrarySearchTerm(e.target.value)}
                list="autocomplete-suggestions"
              />
              <datalist id="autocomplete-suggestions">
                {getAutocompleteSuggestions.map((suggestion, index) => (
                  <option key={index} value={suggestion} />
                ))}
              </datalist>
              <FaSearch className="search-icon" />
              <button className="search-button">
                <FaFilter /> 필터
              </button>
            </div>
          </div>
          <div className="category-filter">
            <button
              className={`category-button ${libraryCategoryFilter === 'all' ? 'active' : ''}`}
              onClick={() => setLibraryCategoryFilter('all')}
            >
              전체
            </button>
            <button
              className={`category-button ${libraryCategoryFilter === 'video' ? 'active' : ''}`}
              onClick={() => setLibraryCategoryFilter('video')}
            >
              비디오
            </button>
            <button
              className={`category-button ${libraryCategoryFilter === 'image' ? 'active' : ''}`}
              onClick={() => setLibraryCategoryFilter('image')}
            >
              이미지
            </button>
            <button
              className={`category-button ${libraryCategoryFilter === 'document' ? 'active' : ''}`}
              onClick={() => setLibraryCategoryFilter('document')}
            >
              문서
            </button>
            <button
              className={`category-button ${libraryCategoryFilter === 'audio' ? 'active' : ''}`}
              onClick={() => setLibraryCategoryFilter('audio')}
            >
              오디오
            </button>
          </div>
          <div className="upload-area">
            <p>
              업로드: 드래그앤드롭 또는{' '}
              <label htmlFor="libraryFileInput" className="upload-button">
                파일 선택
              </label>
            </p>
            <input
              type="file"
              multiple
              onChange={handleLibraryFileSelect}
              id="libraryFileInput"
              style={{ display: 'none' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagementPanel;
