import React, { useState } from 'react';
import { FaBell, FaUserCircle, FaCheck, FaFilter } from 'react-icons/fa';
import DetailInputPage from './DetailInputPage';
import CourseListPage from './CourseListPage';
import './ContentBuilderPage.css';

function ContentBuilderPage() {
  // 전체 뷰 상태 ("builder" | "detail" | "list")
  const [view, setView] = useState("builder");

  // 빌더/상세정보 탭만 제어할 때도 동일하게 view만 사용하거나 별도 상태로 제어 가능
  const [viewTab, setViewTab] = useState("builder");

  // 과목, 차시, 페이지 상태
  const [courseName, setCourseName] = useState("");
  const [savedCourseName, setSavedCourseName] = useState("");

  const [lessons, setLessons] = useState([
    {
      id: 1,
      name: "1차시",
      pages: [{ id: 1, name: "1페이지", contentItems: [] }]
    }
  ]);
  const [currentLessonId, setCurrentLessonId] = useState(1);
  const [newLessonName, setNewLessonName] = useState("");
  const [newPageName, setNewPageName] = useState("");

  // 현재 선택된 차시, 페이지
  const currentLesson = lessons.find(l => l.id === currentLessonId) || lessons[0];
  const [currentPageId, setCurrentPageId] = useState(1);
  const currentPage =
    currentLesson.pages.find(p => p.id === currentPageId) || currentLesson.pages[0];

  // 라이브러리: 공통, 페이지 파일
  const [lessonLibraryFiles, setLessonLibraryFiles] = useState([
    { name: "common_intro.mp4", extension: "mp4" },
    { name: "common_guide.pdf", extension: "pdf" }
  ]);
  const [pageLibraryFiles, setPageLibraryFiles] = useState([
    { name: "page_image1.jpg", extension: "jpg" },
    { name: "page_audio1.mp3", extension: "mp3" }
  ]);

  // **새롭게 추가할 UI 요소 라이브러리**
  const [uiElements] = useState([
    { type: "input", name: "텍스트입력" },
    { type: "button", name: "버튼" },
    { type: "checkbox", name: "체크박스" },
    { type: "select", name: "드롭다운" }
  ]);

  // 프리뷰 아이템
  const [previewItems, setPreviewItems] = useState([]);
  const [isPreviewDragOver, setIsPreviewDragOver] = useState(false);

  // ---------------------------
  // 파일 / UI 요소 드래그핸들러
  // ---------------------------
  const handleLibraryDragStart = (e, file) => {
    // 파일 정보를 JSON에 담아 전송
    e.dataTransfer.setData("application/json", JSON.stringify(file));
  };

  // UI 요소 드래그
  const handleUiElementDragStart = (e, elem) => {
    // elem = { type: "button", name: "버튼" }, 등등
    e.dataTransfer.setData("application/json", JSON.stringify(elem));
  };

  // 파일 업로드
  const handleLessonFileSelect = e => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => {
      const parts = file.name.split(".");
      const extension = parts[parts.length - 1].toLowerCase();
      return { name: file.name, extension };
    });
    setLessonLibraryFiles(prev => [...prev, ...newFiles]);
  };
  const handlePageFileSelect = e => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => {
      const parts = file.name.split(".");
      const extension = parts[parts.length - 1].toLowerCase();
      return { name: file.name, extension };
    });
    setPageLibraryFiles(prev => [...prev, ...newFiles]);
  };

  // ---------------------------
  // 프리뷰 드래그앤드롭
  // ---------------------------
  const handlePreviewDragOver = e => {
    e.preventDefault();
    setIsPreviewDragOver(true);
  };
  const handlePreviewDragLeave = e => {
    e.preventDefault();
    setIsPreviewDragOver(false);
  };
  const handlePreviewDrop = e => {
    e.preventDefault();
    setIsPreviewDragOver(false);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const data = JSON.parse(e.dataTransfer.getData("application/json"));
    // 중복 체크
    if (!previewItems.some(item => item.name === data.name)) {
      setPreviewItems([...previewItems, { ...data, x, y }]);
    }
  };

  // 미리보기에서 파일/요소 구분 렌더
  const renderPreviewItem = item => {
    // 파일인 경우: { name, extension }
    if (item.extension) {
      return item.name;
    }
    // UI 요소인 경우: { type, name }
    switch (item.type) {
      case "input":
        return <input placeholder={item.name} style={{ width: "120px" }} />;
      case "button":
        return <button>{item.name}</button>;
      case "checkbox":
        return (
          <label style={{ display: "inline-flex", alignItems: "center" }}>
            <input type="checkbox" />
            <span style={{ marginLeft: 5 }}>{item.name}</span>
          </label>
        );
      case "select":
        return (
          <select>
            <option>{item.name}</option>
            <option>옵션1</option>
            <option>옵션2</option>
          </select>
        );
      default:
        return item.name;
    }
  };

  // 이미 미리보기로 추가된 파일인지 확인
  const isFileUsed = file => previewItems.some(item => item.name === file.name);

  // 확장자 색
  const getColorByExtension = extension => {
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

  // ---------------------------
  // 과목/차시/페이지 저장
  // ---------------------------
  const handleSaveCourse = () => setSavedCourseName(courseName);

  const handleSaveLesson = () => {
    const newId = lessons.length + 1;
    const generatedName = newLessonName.trim() ? newLessonName : `${newId}차시`;
    const newLesson = {
      id: newId,
      name: generatedName,
      pages: [{ id: 1, name: "1페이지", contentItems: [] }]
    };
    setLessons([...lessons, newLesson]);
    setCurrentLessonId(newId);
    setCurrentPageId(1);
    setNewLessonName("");
  };

  const handleSavePage = () => {
    if (!currentLesson) return;
    setLessons(prev =>
      prev.map(lesson => {
        if (lesson.id === currentLessonId) {
          const newPageId = lesson.pages.length + 1;
          const generatedName = newPageName.trim()
            ? newPageName
            : `${newPageId}페이지`;
          const newPage = { id: newPageId, name: generatedName, contentItems: [] };
          return { ...lesson, pages: [...lesson.pages, newPage] };
        }
        return lesson;
      })
    );
    setCurrentPageId(currentLesson.pages.length + 1);
    setNewPageName("");
  };

  // ---------------------------
  // 빌더/상세정보 탭 전환
  // ---------------------------
  const handleBuilderTab = () => {
    setViewTab("builder");
    setView("builder"); // 전체 뷰도 builder
  };
  const handleDetailTab = () => {
    setViewTab("detail");
    setView("detail"); // 전체 뷰도 detail
  };

  // ---------------------------
  // 전체 저장
  // ---------------------------
  const handleSaveAll = () => {
    // 템플릿 문자열에 backtick(`) 사용
    alert(`전체 저장 되었습니다!\n과목명: ${savedCourseName}`);
  };

  // ---------------------------
  // 상세 페이지: 저장/뒤로가기
  // ---------------------------
  const handleDetailSave = detailData => {
    // detailData 처리 (필요 시)
    setView("builder");
    setViewTab("builder");
  };
  const handleDetailBack = () => {
    setView("builder");
    setViewTab("builder");
  };

  // ---------------------------
  // 라우팅 분기(또는 탭 분기)
  // ---------------------------
  if (view === "list") {
    return <CourseListPage />;
  }
  if (view === "detail") {
    // 상세정보 화면
    return (
      <div className="builder-page">
        {/* 상단 메뉴 */}
        <header className="top-menu">
          <div className="menu-left">
            <img
              src="http://hcms.hunet.co.kr/image/hunet_hcms_logo.png"
              alt="Company Logo"
              className="company-logo"
            />
            {/* 과목을 누르면 setView("list")를 호출 */}
            <div className="top-menu-item" onClick={() => setView("list")}>
              과목
            </div>
            <div className="top-menu-item">라이브러리</div>
            <div className="top-menu-item">설정</div>
          </div>
          <div className="menu-right">
            <FaBell className="icon" title="알림" />
            <FaUserCircle className="icon" title="로그인" />
          </div>
        </header>

        {/* 서브헤더 */}
        <div className="sub-header builder-subheader">
          <div className="sub-left builder-tabs">
            <button
              className={`tab-btn ${viewTab === "builder" ? "active" : ""}`}
              onClick={handleBuilderTab}
            >
              빌더
            </button>
            <button
              className={`tab-btn ${viewTab === "detail" ? "active" : ""}`}
              onClick={handleDetailTab}
            >
              상세정보
            </button>
          </div>
          <div className="sub-right">
            <button className="save-button" onClick={handleSaveAll}>
              저장
            </button>
          </div>
        </div>

        {/* 메인: DetailInputPage */}
        <div className="builder-main-container">
          <DetailInputPage onSaveDetail={handleDetailSave} onBack={handleDetailBack} />
        </div>
      </div>
    );
  }

  // 기본( builder ) 뷰
  return (
    <div className="builder-page">
      {/* 상단 메뉴 */}
      <header className="top-menu">
        <div className="menu-left">
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

      {/* 서브헤더: 빌더/상세정보 탭 + 저장 버튼 */}
      <div className="sub-header builder-subheader">
        <div className="sub-left builder-tabs">
          <button
            className={`tab-btn ${viewTab === "builder" ? "active" : ""}`}
            onClick={handleBuilderTab}
          >
            빌더
          </button>
          <button
            className={`tab-btn ${viewTab === "detail" ? "active" : ""}`}
            onClick={handleDetailTab}
          >
            상세정보
          </button>
        </div>
        <div className="sub-right">
          <button className="save-button" onClick={handleSaveAll}>
            저장
          </button>
        </div>
      </div>

      {/* 메인 컨테이너: 왼쪽(과목/차시/페이지), 오른쪽(3행 구조) */}
      <div className="builder-main-container">
        {/* 왼쪽 영역 */}
        <div className="builder-left-side">
          {/* 과목명/차시/페이지 입력 */}
          <div className="management-panel single-line">
            <label className="section-label">과목명:</label>
            <input
              type="text"
              placeholder="과목명 입력"
              value={courseName}
              onChange={e => setCourseName(e.target.value)}
              className="management-input long-input"
            />
            <button onClick={handleSaveCourse} className="management-save-button red-button">
              저장
            </button>
          </div>
          <div className="management-panel single-line">
            <label className="section-label">차시명:</label>
            <input
              type="text"
              placeholder="차시명 입력 (미입력 시 자동생성)"
              value={newLessonName}
              onChange={e => setNewLessonName(e.target.value)}
              className="management-input long-input"
            />
            <button onClick={handleSaveLesson} className="management-save-button red-button">
              저장
            </button>
          </div>
          <div className="management-panel single-line">
            <label className="section-label">페이지명:</label>
            <input
              type="text"
              placeholder="페이지명 입력 (미입력 시 자동생성)"
              value={newPageName}
              onChange={e => setNewPageName(e.target.value)}
              className="management-input long-input"
            />
            <button onClick={handleSavePage} className="management-save-button red-button">
              저장
            </button>
          </div>

          {/* 저장된 정보 목록 */}
          <div className="management-panel saved-info-panel">
            <h4 className="saved-course-name">
              {savedCourseName ? `과목명: ${savedCourseName}` : "과목명이 없습니다."}
            </h4>
            <div className="saved-lessons">
              <div className="saved-row">
                <label>차시:</label>
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
                <label>페이지:</label>
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

        {/* 오른쪽 영역: 3행 구조 */}
        <div className="builder-right-side">
          {/* Row1: 공통 라이브러리(왼) + 페이지 라이브러리(오) */}
          <div className="row-libraries">
            <div className="library-section half-width">
              <div className="section-header">공통 라이브러리</div>
              <div className="search-row">
                <input type="text" placeholder="검색어 입력" className="search-input" />
                <button className="search-button">
                  <FaFilter /> 필터
                </button>
              </div>
              <div className="upload-area">
                <p>
                  업로드: 드래그앤드롭 또는{" "}
                  <label htmlFor="lessonFileInput" className="upload-button">
                    파일 선택
                  </label>
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleLessonFileSelect}
                  id="lessonFileInput"
                  style={{ display: "none" }}
                />
              </div>
              <div className="uploaded-files">
                {lessonLibraryFiles.map((file, i) => (
                  <div
                    key={i}
                    className="file-tag"
                    style={{
                      backgroundColor: getColorByExtension(file.extension),
                      fontWeight: isFileUsed(file) ? "bold" : "normal"
                    }}
                    draggable
                    onDragStart={e => handleLibraryDragStart(e, file)}
                  >
                    {file.name}
                    {isFileUsed(file) && <FaCheck className="used-icon" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="library-section half-width">
              <div className="section-header">페이지 라이브러리</div>
              <div className="search-row">
                <input type="text" placeholder="검색어 입력" className="search-input" />
                <button className="search-button">
                  <FaFilter /> 필터
                </button>
              </div>
              <div className="upload-area">
                <p>
                  업로드: 드래그앤드롭 또는{" "}
                  <label htmlFor="pageFileInput" className="upload-button">
                    파일 선택
                  </label>
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handlePageFileSelect}
                  id="pageFileInput"
                  style={{ display: "none" }}
                />
              </div>
              <div className="uploaded-files">
                {pageLibraryFiles.map((file, i) => (
                  <div
                    key={i}
                    className="file-tag"
                    style={{
                      backgroundColor: getColorByExtension(file.extension),
                      fontWeight: isFileUsed(file) ? "bold" : "normal"
                    }}
                    draggable
                    onDragStart={e => handleLibraryDragStart(e, file)}
                  >
                    {file.name}
                    {isFileUsed(file) && <FaCheck className="used-icon" />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row2: UI 라이브러리 (전체 폭) */}
          <div className="row-libraries">
            <div className="ui-library-section library-section full-width">
              <div className="section-header">UI 라이브러리</div>
              <p style={{ fontSize: "0.9em", marginBottom: 5 }}>
                드래그하여 미리보기 화면에 배치하세요.
              </p>
              <div className="ui-elements-container">
                {uiElements.map((elem, idx) => (
                  <div
                    key={idx}
                    className="ui-element-tag"
                    draggable
                    onDragStart={e => handleUiElementDragStart(e, elem)}
                  >
                    {elem.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row3: PREVIEW (전체 폭) */}
          <div className="row-libraries">
            <div className="preview-section full-width">
              <div
                className={`preview-area ${isPreviewDragOver ? "drag-over" : ""}`}
                onDrop={handlePreviewDrop}
                onDragOver={handlePreviewDragOver}
                onDragLeave={handlePreviewDragLeave}
              >
                {previewItems.length === 0 ? (
                  <p className="preview-placeholder">
                    파일 또는 UI요소를 드래그하세요.
                  </p>
                ) : (
                  previewItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="preview-item"
                      style={{ left: item.x, top: item.y }}
                    >
                      {renderPreviewItem(item)}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        {/* end builder-right-side */}
      </div>
      {/* end builder-main-container */}
    </div>
  );
}

export default ContentBuilderPage;
