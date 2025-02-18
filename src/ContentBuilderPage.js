import React, { useState } from 'react';
import { 
  FaFileVideo, FaFileAudio, FaFileImage, 
  FaQuestionCircle, FaFileAlt, FaFilePdf, FaTrashAlt 
} from 'react-icons/fa';
import './ContentBuilderPage.css';

function ContentBuilderPage() {
  // 과목 관리
  const [courseName, setCourseName] = useState("");
  const [savedCourseName, setSavedCourseName] = useState("");

  // 차시(레슨) 관리  
  // 각 차시는 id, name, pages 배열을 가지며, 각 페이지는 id, name, contentItems 배열을 가짐
  const [lessons, setLessons] = useState([
    { id: 1, name: "차시 1", pages: [ { id: 1, name: "페이지 1", contentItems: [] } ] }
  ]);
  const [newLessonName, setNewLessonName] = useState("");
  const [currentLessonId, setCurrentLessonId] = useState(1);

  // 페이지 관리 (현재 차시 내)
  const currentLesson = lessons.find(l => l.id === currentLessonId);
  const [newPageName, setNewPageName] = useState("");
  const [currentPageId, setCurrentPageId] = useState(1);
  const currentPage = currentLesson.pages.find(p => p.id === currentPageId);

  // 업로드된 파일 (예시)
  const [uploadedFiles, setUploadedFiles] = useState([
    { name: "intro.mp4", extension: "mp4" },
    { name: "lecture1.pdf", extension: "pdf" },
    { name: "image1.jpg", extension: "jpg" }
  ]);

  // === 파일 업로드 & 드래그앤드롭 관련 핸들러 ===
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const newFiles = files.map(file => {
      const parts = file.name.split('.');
      const extension = parts[parts.length - 1].toLowerCase();
      return { name: file.name, extension };
    });
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => {
      const parts = file.name.split('.');
      const extension = parts[parts.length - 1].toLowerCase();
      return { name: file.name, extension };
    });
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleFileDragStart = (e, file) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(file));
  };

  // 파일을 드래그하여 콘텐츠 영역에 추가 (현재 페이지에 추가)
  const handleContentDrop = (e) => {
    e.preventDefault();
    const fileData = JSON.parse(e.dataTransfer.getData("text/plain"));
    const updatedLessons = lessons.map(lesson => {
      if (lesson.id === currentLessonId) {
        const updatedPages = lesson.pages.map(page => {
          if (page.id === currentPageId) {
            return { ...page, contentItems: [...page.contentItems, fileData] };
          }
          return page;
        });
        return { ...lesson, pages: updatedPages };
      }
      return lesson;
    });
    setLessons(updatedLessons);
  };

  const handleContentDragOver = (e) => {
    e.preventDefault();
  };

  // 파일 태그 배경색 (확장자별)
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

  // === 관리 영역 액션 함수 ===
  // 과목 저장
  const saveCourseName = () => {
    setSavedCourseName(courseName);
  };

  // 차시(레슨) 저장: 입력한 차시명을 새로운 차시로 추가
  const saveLesson = () => {
    if (newLessonName.trim() === "") return;
    const newId = lessons.length + 1;
    const newLesson = { id: newId, name: newLessonName, pages: [ { id: 1, name: "페이지 1", contentItems: [] } ] };
    setLessons([...lessons, newLesson]);
    setCurrentLessonId(newId);
    setCurrentPageId(1);
    setNewLessonName("");
  };

  // 차시 삭제 (최소 1개 유지)
  const deleteLesson = (lessonId) => {
    if (lessons.length === 1) return;
    const filtered = lessons.filter(l => l.id !== lessonId);
    setLessons(filtered);
    if (currentLessonId === lessonId) {
      setCurrentLessonId(filtered[0].id);
      setCurrentPageId(filtered[0].pages[0].id);
    }
  };

  // 페이지 저장: 입력한 페이지명을 현재 차시에 추가
  const savePage = () => {
    if (newPageName.trim() === "") return;
    const updatedLessons = lessons.map(lesson => {
      if (lesson.id === currentLessonId) {
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

  // 페이지 삭제 (최소 1페이지 유지)
  const deletePage = (pageId) => {
    if (currentLesson.pages.length === 1) return;
    const updatedPages = currentLesson.pages.filter(p => p.id !== pageId);
    const updatedLessons = lessons.map(lesson => {
      if (lesson.id === currentLessonId) {
        return { ...lesson, pages: updatedPages };
      }
      return lesson;
    });
    setLessons(updatedLessons);
    if (currentPageId === pageId) {
      setCurrentPageId(updatedPages[0].id);
    }
  };

  // 전체 저장 (임시)
  const handleSave = () => {
    alert("전체 저장되었습니다!");
  };

  return (
    <div className="builder-page">
      {/* 좌측 패널: 툴바 + 관리 영역 */}
      <div className="left-panel">
        {/* 고정 툴바 */}
        <div className="library-toolbar">
          <div className="toolbar-item" title="MP4">
            <FaFileVideo size={24} />
          </div>
          <div className="toolbar-item" title="MP3">
            <FaFileAudio size={24} />
          </div>
          <div className="toolbar-item" title="Image">
            <FaFileImage size={24} />
          </div>
          <div className="toolbar-item" title="Quiz">
            <FaQuestionCircle size={24} />
          </div>
          <div className="toolbar-item" title="Article">
            <FaFileAlt size={24} />
          </div>
          <div className="toolbar-item" title="PDF">
            <FaFilePdf size={24} />
          </div>
        </div>

        {/* 관리 영역 */}
        <div className="management-panel">
          {/* 과목 관리 */}
          <div className="management-section">
            <label className="section-label">과목명:</label>
            <div className="management-row">
              <input
                type="text"
                placeholder="과목명을 입력하세요"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="management-input"
              />
              <button onClick={saveCourseName} className="management-save-button">저장</button>
            </div>
            {savedCourseName && <div className="saved-value">저장된 과목: {savedCourseName}</div>}
          </div>

          {/* 차시(레슨) 관리 */}
          <div className="management-section">
            <label className="section-label">차시명:</label>
            <div className="management-row">
              <input
                type="text"
                placeholder="차시명을 입력하세요"
                value={newLessonName}
                onChange={(e) => setNewLessonName(e.target.value)}
                className="management-input"
              />
              <button onClick={saveLesson} className="management-save-button">저장</button>
            </div>
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
                  <FaTrashAlt 
                    className="delete-icon" 
                    onClick={(e) => { e.stopPropagation(); deleteLesson(lesson.id); }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 페이지 관리 */}
          <div className="management-section">
            <label className="section-label">페이지명:</label>
            <div className="management-row">
              <input
                type="text"
                placeholder="페이지명을 입력하세요"
                value={newPageName}
                onChange={(e) => setNewPageName(e.target.value)}
                className="management-input"
              />
              <button onClick={savePage} className="management-save-button">저장</button>
            </div>
            <div className="tabs-container">
              {currentLesson.pages.map(page => (
                <div 
                  key={page.id} 
                  className={`tab-button ${currentPageId === page.id ? "active" : ""}`}
                  onClick={() => setCurrentPageId(page.id)}
                >
                  {page.name}
                  <FaTrashAlt 
                    className="delete-icon" 
                    onClick={(e) => { e.stopPropagation(); deletePage(page.id); }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 우측 패널: 빌더 영역 */}
      <div className="right-panel">
        {/* 파일 업로드 영역 */}
        <div 
          className="file-upload-area" 
          onDrop={handleDrop} 
          onDragOver={handleDragOver}
        >
          <p>파일을 드래그앤드롭하거나 아래 버튼을 눌러 선택하세요.</p>
          <input 
            type="file" 
            multiple 
            onChange={handleFileSelect} 
            id="fileInput" 
            style={{ display: 'none' }}
          />
          <label htmlFor="fileInput" className="upload-button">
            파일 선택
          </label>
        </div>

        {/* 업로드된 파일 미리보기 */}
        <div className="uploaded-files">
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="file-tag"
              style={{ backgroundColor: getColorByExtension(file.extension) }}
              draggable
              onDragStart={(e) => handleFileDragStart(e, file)}
            >
              {index + 1}. {file.name}
            </div>
          ))}
        </div>

        {/* 콘텐츠 빌더 영역 (좌우 분할) */}
        <div className="content-area-wrapper">
          <div
            className="drag-area"
            onDrop={handleContentDrop}
            onDragOver={handleContentDragOver}
          >
            {currentPage.contentItems.length === 0 ? (
              <p>파일을 드래그하여 콘텐츠에 추가하세요.</p>
            ) : (
              currentPage.contentItems.map((item, index) => (
                <div key={index} className="content-item">
                  {item.name}
                </div>
              ))
            )}
          </div>
          <div className="preview-area">
            {currentPage.contentItems.length === 0 ? (
              <p>드롭된 파일의 미리보기가 여기에 표시됩니다.</p>
            ) : (
              currentPage.contentItems.map((item, index) => (
                <div key={index} className="preview-item">
                  <strong>{item.name}</strong> - {item.extension.toUpperCase()} 미리보기
                </div>
              ))
            )}
          </div>
        </div>

        {/* 전체 저장 버튼 */}
        <div className="global-save">
          <button onClick={handleSave} className="global-save-button">전체 저장</button>
        </div>
      </div>
    </div>
  );
}

export default ContentBuilderPage;
