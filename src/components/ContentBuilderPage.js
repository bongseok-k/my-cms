// src/components/ContentBuilderPage.js
import React, { useState } from 'react';
import DetailInputPage from './DetailInputPage';
import CourseListPage from './CourseListPage';
import Layout from './Layout';
import '../styles/common.css';
import { 
  FaFileVideo, FaFileAudio, FaFileImage, 
  FaQuestionCircle, FaFileAlt, FaFilePdf, 
  FaTrashAlt, FaCheck 
} from 'react-icons/fa';

function ContentBuilderPage() {
  // 뷰 상태: "builder", "detail", "list"
  const [view, setView] = useState("builder");

  // 과목 관리
  const [courseName, setCourseName] = useState("");
  const [savedCourseName, setSavedCourseName] = useState("");

  // 차시/페이지 관리
  const [lessons, setLessons] = useState([
    { id: 1, name: "차시 1", pages: [ { id: 1, name: "페이지 1", contentItems: [] } ] }
  ]);
  const [newLessonName, setNewLessonName] = useState("");
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const currentLesson = lessons.find(l => l.id === currentLessonId);
  const [newPageName, setNewPageName] = useState("");
  const [currentPageId, setCurrentPageId] = useState(1);
  const currentPage = currentLesson.pages.find(p => p.id === currentPageId);

  // 라이브러리 파일 목록: 공통(차시)과 페이지 전용
  const [lessonLibraryFiles, setLessonLibraryFiles] = useState([
    { name: "common_intro.mp4", extension: "mp4" },
    { name: "common_guide.pdf", extension: "pdf" }
  ]);
  const [pageLibraryFiles, setPageLibraryFiles] = useState([
    { name: "page_image1.jpg", extension: "jpg" },
    { name: "page_audio1.mp3", extension: "mp3" }
  ]);

  // 미리보기 영역 (D 영역) 콘텐츠
  const [previewItems, setPreviewItems] = useState([]);

  // 라이브러리 드래그 시작
  const handleLibraryDragStart = (e, file) => {
    e.dataTransfer.setData("application/json", JSON.stringify(file));
  };

  // 파일 선택: 차시 라이브러리
  const handleLessonFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => {
      const parts = file.name.split('.');
      const extension = parts[parts.length - 1].toLowerCase();
      return { name: file.name, extension };
    });
    setLessonLibraryFiles(prev => [...prev, ...newFiles]);
  };

  // 파일 선택: 페이지 라이브러리
  const handlePageFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => {
      const parts = file.name.split('.');
      const extension = parts[parts.length - 1].toLowerCase();
      return { name: file.name, extension };
    });
    setPageLibraryFiles(prev => [...prev, ...newFiles]);
  };

  // 관리 영역 액션 함수
  const saveCourseName = () => {
    setSavedCourseName(courseName);
  };

  const saveLesson = () => {
    if(newLessonName.trim() === "") return;
    const newId = lessons.length + 1;
    const newLesson = { id: newId, name: newLessonName, pages: [ { id: 1, name: "페이지 1", contentItems: [] } ] };
    setLessons([...lessons, newLesson]);
    setCurrentLessonId(newId);
    setCurrentPageId(1);
    setNewLessonName("");
  };

  const savePage = () => {
    if(newPageName.trim() === "") return;
    const updatedLessons = lessons.map(lesson => {
      if(lesson.id === currentLessonId) {
        const newPageId = lesson.pages.length + 1;
        const newPage = { id: newPageId, name: newPageName, contentItems: [] };
        return { ...lesson, pages: [...lesson.pages, newPage] };
      }
      return lesson;
    });
    setLessons(updatedLessons);
    setCurrentPageId(currentLesson.pages.length + 1);
    setNewPageName("");
  };

  // 미리보기 영역 드래그앤드롭 처리 (D 영역)
  const [isPreviewDragOver, setIsPreviewDragOver] = useState(false);
  const handlePreviewDragOver = (e) => {
    e.preventDefault();
    setIsPreviewDragOver(true);
  };
  const handlePreviewDragLeave = (e) => {
    e.preventDefault();
    setIsPreviewDragOver(false);
  };
  const handlePreviewDrop = (e) => {
    e.preventDefault();
    setIsPreviewDragOver(false);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const fileData = JSON.parse(e.dataTransfer.getData("application/json"));
    if (!previewItems.find(item => item.name === fileData.name)) {
      setPreviewItems([...previewItems, { ...fileData, x, y }]);
    }
  };

  const isFileUsed = (file, type) => {
    return previewItems.some(item => item.name === file.name);
  };

  const getColorByExtension = (extension) => {
    const mapping = {
      mp4: "#DC143C",
      mp3: "#2E8B57",
      jpg: "#4682B4",
      jpeg: "#4682B4",
      png: "#4682B4",
      gif: "#4682B4",
      quiz: "#6f42c1",
      article: "#fd7e14",
      pdf: "#696969"
    };
    return mapping[extension] || "#777";
  };

  // 전체 저장 버튼 클릭 -> 상세 입력 페이지로 이동
  const handleSave = () => {
    setView("detail");
  };

  // 상세 입력 페이지 저장 후 -> CourseListPage로 이동
  const handleDetailSave = (detailData) => {
    setView("list");
  };

  const handleDetailBack = () => {
    setView("builder");
  };

  if(view === "detail") {
    return <DetailInputPage onSaveDetail={handleDetailSave} onBack={handleDetailBack} />;
  }
  if(view === "list") {
    return <CourseListPage courses={lessons} onNewCourse={() => setView("builder")} />;
  }

  return (
    <Layout>
      {/* builder view */}
      <div className="main-content">
        {/* 상단 행: 영역 A & B */}
        <div className="top-row">
          {/* 영역 A: 입력/저장 영역 */}
          <div className="section-A">
            <div className="management-panel single-line">
              <label className="section-label">과목명:</label>
              <input
                type="text"
                placeholder="과목명 입력"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="management-input long-input"
              />
              <button onClick={saveCourseName} className="management-save-button">저장</button>
            </div>
            <div className="management-panel single-line">
              <label className="section-label">차시명:</label>
              <input
                type="text"
                placeholder="차시명 입력"
                value={newLessonName}
                onChange={(e) => setNewLessonName(e.target.value)}
                className="management-input long-input"
              />
              <button onClick={saveLesson} className="management-save-button">저장</button>
            </div>
            <div className="management-panel single-line">
              <label className="section-label">페이지명:</label>
              <input
                type="text"
                placeholder="페이지명 입력"
                value={newPageName}
                onChange={(e) => setNewPageName(e.target.value)}
                className="management-input long-input"
              />
              <button onClick={savePage} className="management-save-button">저장</button>
            </div>
          </div>
          {/* 영역 B: 저장된 리스트 영역 */}
          <div className="section-B">
            <div className="saved-list">
              <div className="saved-row">
                <span className="saved-label">과목명:</span>
                <span className="saved-value">{savedCourseName}</span>
              </div>
              <div className="saved-row">
                <span className="saved-label">차시:</span>
                <div className="tabs-container">
                  {lessons.map(lesson => (
                    <div 
                      key={lesson.id}
                      className={`tab-button ${currentLessonId === lesson.id ? "active" : ""}`}
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
                <span className="saved-label">페이지:</span>
                <div className="tabs-container">
                  {currentLesson.pages.map(page => (
                    <div 
                      key={page.id}
                      className={`tab-button ${currentPageId === page.id ? "active" : ""}`}
                      onClick={() => setCurrentPageId(page.id)}
                    >
                      {page.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 하단 행: 영역 C & D */}
        <div className="bottom-row">
          {/* 영역 C: 라이브러리 영역 (공통 라이브러리) */}
          <div className="section-C">
            <div className="library-section">
              <div className="section-header">공통 라이브러리</div>
              <div className="search-row">
                <input type="text" placeholder="검색어 입력" className="search-input" />
                <button className="search-button">검색</button>
              </div>
              <div className="upload-area">
                <p>업로드: 드래그앤드롭 또는 <label htmlFor="lessonFileInput" className="upload-button">파일 선택</label></p>
                <input 
                  type="file"
                  multiple
                  onChange={handleLessonFileSelect}
                  id="lessonFileInput"
                  style={{ display: 'none' }}
                />
              </div>
              <div className="uploaded-files">
                {lessonLibraryFiles.map((file, index) => (
                  <div 
                    key={index}
                    className="file-tag"
                    style={{ backgroundColor: getColorByExtension(file.extension), fontWeight: isFileUsed(file, 'lesson') ? 'bold' : 'normal' }}
                    draggable
                    onDragStart={(e) => handleLibraryDragStart(e, file)}
                  >
                    {file.name}
                    {isFileUsed(file, 'lesson') && <FaCheck title="사용됨" className="used-icon" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* 영역 D: 페이지 라이브러리 */}
          <div className="section-D">
            <div className="library-section">
              <div className="section-header">페이지 라이브러리</div>
              <div className="search-row">
                <input type="text" placeholder="검색어 입력" className="search-input" />
                <button className="search-button">검색</button>
              </div>
              <div className="upload-area">
                <p>업로드: 드래그앤드롭 또는 <label htmlFor="pageFileInput" className="upload-button">파일 선택</label></p>
                <input 
                  type="file"
                  multiple
                  onChange={handlePageFileSelect}
                  id="pageFileInput"
                  style={{ display: 'none' }}
                />
              </div>
              <div className="uploaded-files">
                {pageLibraryFiles.map((file, index) => (
                  <div 
                    key={index}
                    className="file-tag"
                    style={{ backgroundColor: getColorByExtension(file.extension), fontWeight: isFileUsed(file, 'page') ? 'bold' : 'normal' }}
                    draggable
                    onDragStart={(e) => handleLibraryDragStart(e, file)}
                  >
                    {file.name}
                    {isFileUsed(file, 'page') && <FaCheck title="사용됨" className="used-icon" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ContentBuilderPage;
