import React, { useState } from 'react';
import { 
  FaFileVideo, FaFileAudio, FaFileImage, 
  FaQuestionCircle, FaFileAlt, FaFilePdf, 
  FaTrashAlt, FaCheck 
} from 'react-icons/fa';
import './ContentBuilderPage.css';

function ContentBuilderPage() {
  // 상단 메뉴 (예: 과목, 라이브러리, 설정)
  const mainMenus = ['과목', '라이브러리', '설정'];

  // 과목 관리 (기본 입력 기능, 실제로는 추가 기능 등 추후 구현)
  const [courseName, setCourseName] = useState("");
  const [savedCourseName, setSavedCourseName] = useState("");

  // 차시/페이지 관리 (간단한 탭 형식, 실제 작업 환경에 맞게 확장 가능)
  const [lessons, setLessons] = useState([
    { id: 1, name: "차시 1", pages: [ { id: 1, name: "페이지 1", contentItems: [] } ] }
  ]);
  const [newLessonName, setNewLessonName] = useState("");
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const currentLesson = lessons.find(l => l.id === currentLessonId);
  const [newPageName, setNewPageName] = useState("");
  const [currentPageId, setCurrentPageId] = useState(1);
  const currentPage = currentLesson.pages.find(p => p.id === currentPageId);

  // 라이브러리 파일 목록 (예시 데이터)
  const [libraryFiles, setLibraryFiles] = useState([
    { name: "intro.mp4", extension: "mp4" },
    { name: "lecture1.pdf", extension: "pdf" },
    { name: "image1.jpg", extension: "jpg" },
    { name: "audio1.mp3", extension: "mp3" },
    { name: "quiz1", extension: "quiz" }
  ]);

  // 미리보기 영역에 추가된 콘텐츠 항목 (파일 + 위치 정보)
  const [previewItems, setPreviewItems] = useState([]);

  // 드래그앤드롭: 라이브러리 파일 드래그 시 데이터 설정
  const handleDragStart = (e, file) => {
    e.dataTransfer.setData("application/json", JSON.stringify(file));
  };

  // 라이브러리 파일 선택 (파일 업로드 기능)
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => {
      const parts = file.name.split('.');
      const extension = parts[parts.length - 1].toLowerCase();
      return { name: file.name, extension };
    });
    setLibraryFiles(prev => [...prev, ...newFiles]);
  };

  // 미리보기 영역: 드래그 오버 및 드래그 리브 처리 (시각적 효과)
  const [isPreviewDragOver, setIsPreviewDragOver] = useState(false);

  const handlePreviewDragOver = (e) => {
    e.preventDefault();
    setIsPreviewDragOver(true);
  };

  const handlePreviewDragLeave = (e) => {
    e.preventDefault();
    setIsPreviewDragOver(false);
  };

  // 미리보기 영역에 파일을 드랍하여 콘텐츠 항목으로 추가 (드랍 위치에 따라 좌표 기록)
  const handlePreviewDrop = (e) => {
    e.preventDefault();
    setIsPreviewDragOver(false);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const fileData = JSON.parse(e.dataTransfer.getData("application/json"));
    // Prevent duplicate insertion
    if (!previewItems.find(item => item.name === fileData.name)) {
      setPreviewItems([...previewItems, { ...fileData, x, y }]);
    }
  };

  // Helper: 파일 사용 여부 (미리보기에 추가된 파일은 "사용됨" 상태)
  const isFileUsed = (file) => {
    return previewItems.some(item => item.name === file.name);
  };

  // 파일 태그의 배경색 (확장자별)
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

  // 예시: 과목 저장 버튼 (기본 기능)
  const saveCourseName = () => {
    setSavedCourseName(courseName);
  };

  // 예시: 차시 저장
  const saveLesson = () => {
    if (newLessonName.trim() === "") return;
    const newId = lessons.length + 1;
    const newLesson = { id: newId, name: newLessonName, pages: [ { id: 1, name: "페이지 1", contentItems: [] } ] };
    setLessons([...lessons, newLesson]);
    setCurrentLessonId(newId);
    setCurrentPageId(1);
    setNewLessonName("");
  };

  // 예시: 페이지 저장
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

  // 전체 저장 (예시)
  const handleSave = () => {
    alert("전체 저장되었습니다!");
  };

  return (
    <div className="builder-page">
      {/* 상단 대메뉴 */}
      <div className="top-menu">
        {mainMenus.map((menu, index) => (
          <div key={index} className="top-menu-item">{menu}</div>
        ))}
      </div>

      {/* 메인 영역: 좌측 툴바와 우측 빌더 화면 */}
      <div className="main-container">
        {/* 좌측 패널: 툴바 */}
        <div className="left-panel">
          <div className="library-toolbar">
            <div className="toolbar-item" title="MP4"><FaFileVideo size={24} /></div>
            <div className="toolbar-item" title="MP3"><FaFileAudio size={24} /></div>
            <div className="toolbar-item" title="Image"><FaFileImage size={24} /></div>
            <div className="toolbar-item" title="Quiz"><FaQuestionCircle size={24} /></div>
            <div className="toolbar-item" title="Article"><FaFileAlt size={24} /></div>
            <div className="toolbar-item" title="PDF"><FaFilePdf size={24} /></div>
          </div>
        </div>

        {/* 우측 패널: 빌더 화면 */}
        <div className="right-panel">
          {/* 관리 영역: 과목, 차시, 페이지 입력 및 저장 */}
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
            {/* 차시 관리 */}
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
                      onClick={(e) => { e.stopPropagation(); /* 삭제 기능 추가 */ }}
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
                      onClick={(e) => { e.stopPropagation(); /* 삭제 기능 추가 */ }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 라이브러리 업로드 영역 */}
          <div className="library-upload-area">
            <p>파일 업로드: 드래그앤드롭 또는 <label htmlFor="fileInput" className="upload-button">파일 선택</label></p>
            <input 
              type="file" 
              multiple 
              onChange={handleFileSelect} 
              id="fileInput" 
              style={{ display: 'none' }}
            />
            <div className="uploaded-files">
              {libraryFiles.map((file, index) => (
                <div
                  key={index}
                  className="file-tag"
                  style={{ backgroundColor: getColorByExtension(file.extension), fontWeight: isFileUsed(file) ? 'bold' : 'normal' }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, file)}
                >
                  {file.name}
                  {isFileUsed(file) && <FaCheck title="사용됨" className="used-icon" />}
                </div>
              ))}
            </div>
          </div>

          {/* 미리보기 영역: 사용자가 드래그앤드롭으로 콘텐츠 배치 */}
          <div 
            className="preview-area"
            onDrop={handlePreviewDrop}
            onDragOver={handlePreviewDragOver}
            onDragLeave={handlePreviewDragLeave}
          >
            <p className="preview-placeholder">여기에 파일을 드래그하면 콘텐츠 미리보기가 나타납니다.</p>
            {previewItems.map((item, index) => (
              <div 
                key={index} 
                className="preview-item" 
                style={{ left: item.x, top: item.y }}
              >
                {item.name}
              </div>
            ))}
          </div>

          {/* 전체 저장 버튼 */}
          <div className="global-save">
            <button onClick={handleSave} className="global-save-button">전체 저장</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentBuilderPage;
