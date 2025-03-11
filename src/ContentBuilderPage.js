// ContentBuilderPage.js

import React, { useState, useMemo } from 'react';
import {
    FaBell,
    FaUserCircle,
    FaCheck,
    FaFilter,
    FaChevronLeft,
    FaChevronRight,
    FaSearch, // 검색 아이콘
    FaPlayCircle, // 비디오 아이콘
    FaFileAlt, // 파일 아이콘
    FaFont, // 텍스트 입력 아이콘
    FaRegSquare, // 체크박스 아이콘
    FaMousePointer, // 버튼 아이콘
    FaCaretSquareDown // 드롭다운 아이콘
} from 'react-icons/fa';
import { FaImage } from 'react-icons/fa';
import DetailInputPage from './DetailInputPage';
import CourseListPage from './CourseListPage';
import LibraryMainPage from './LibraryMainPage'; // LibraryMainPage 임포트
import './ContentBuilderPage.css'; // CSS import


// UI 요소 아이콘 매핑
const uiElementIcons = {
    "input": FaFont,
    "button": FaMousePointer,
    "checkbox": FaRegSquare,
    "select": FaCaretSquareDown
};

function ContentBuilderPage() {
    // 전체 뷰 상태 ("builder" | "detail" | "list")
    const [view, setView] = useState("builder");
    // 탭 상태 ("builder" 또는 "detail")
    const [viewTab, setViewTab] = useState("builder");

    // 과목, 차시, 페이지 상태
    const [courseName, setCourseName] = useState("");
    const [savedCourseName, setSavedCourseName] = useState("");
    const [lessons, setLessons] = useState([
        { id: 1, name: "1차시", pages: [{ id: 1, name: "1페이지", contentItems: [] }] }
    ]);
    const [currentLessonId, setCurrentLessonId] = useState(1);
    const [currentPageId, setCurrentPageId] = useState(1);
    const [newLessonName, setNewLessonName] = useState("");
    const [newPageName, setPageName] = useState("");

    const currentLesson = lessons.find(l => l.id === currentLessonId) || lessons[0];
    const currentPage = currentLesson.pages.find(p => p.id === currentPageId) || currentLesson.pages[0];

    // 라이브러리 파일 (초기 파일 목록, 실제 서비스에서는 API 호출 등으로 가져올 수 있습니다.)
    const initialLessonLibraryFiles = [
        { name: "common_intro.mp4", extension: "mp4", type: "video", size: "2.5MB", date: "2025-03-10" },
        { name: "15767.mp4", extension: "mp4", type: "video", size: "1.8MB", date: "2025-03-15" },
        { name: "15759.png", extension: "png", type: "image", size: "500KB", date: "2025-03-20" },
        { name: "bg.png", extension: "png", type: "image", size: "1.2MB", date: "2025-03-25" },
        { name: "common_guide.pdf", extension: "pdf", type: "document", size: "800KB", date: "2025-03-30" },
        { name: "page_image1.jpg", extension: "jpg", type: "image", size: "700KB", date: "2025-04-01" },
        { name: "page_audio1.mp3", extension: "mp3", type: "audio", size: "3MB", date: "2025-04-05" },
        { name: "sample1.mp4", extension: "mp4", type: "video", size: "2.0MB", date: "2025-04-10" },
        { name: "sample2.png", extension: "png", type: "image", size: "600KB", date: "2025-04-15" },
        { name: "document1.pdf", extension: "pdf", type: "document", size: "900KB", date: "2025-04-20" },
        { name: "audio2.mp3", extension: "mp3", type: "audio", size: "3.5MB", date: "2025-04-25" },
        { name: "image3.jpg", extension: "jpg", type: "image", size: "750KB", date: "2025-05-01" },
        { name: "video4.mp4", extension: "mp4", type: "video", size: "2.2MB", date: "2025-05-05" },
        { name: "pdf_guide2.pdf", extension: "pdf", type: "document", size: "1MB", date: "2025-05-10" },
        { name: "audio_sample3.mp3", extension: "mp3", type: "audio", size: "2.8MB", date: "2025-05-15" },
        { name: "page_image2.jpeg", extension: "jpeg", type: "image", size: "680KB", date: "2025-05-20" },
        { name: "video_intro2.mp4", extension: "mp4", type: "video", size: "1.9MB", date: "2025-05-25" },
        { name: "document_sample2.pdf", extension: "pdf", type: "document", size: "850KB", date: "2025-05-30" },
        { name: "audio_guide2.mp3", extension: "mp3", type: "audio", size: "3.2MB", date: "2025-06-01" },
        { name: "image4.gif", extension: "gif", type: "image", size: "720KB", date: "2025-06-05" },
        { name: "video_sample2.mp4", extension: "mp4", type: "video", size: "2.1MB", date: "2025-06-10" },
        { name: "pdf_report2.pdf", extension: "pdf", type: "document", size: "950KB", date: "2025-06-15" },
        { name: "audio_file4.mp3", extension: "mp3", type: "audio", size: "3.3MB", date: "2025-06-20" },
        { name: "page_image5.png", extension: "png", type: "image", size: "780KB", date: "2025-06-25" },
        { name: "video_tutorial2.mp4", extension: "mp4", type: "video", size: "2.3MB", date: "2025-06-30" },
        { name: "document_v2.pdf", extension: "pdf", type: "document", size: "1.1MB", date: "2025-07-01" },
        { name: "audio_sample5.mp3", extension: "mp3", type: "audio", size: "3.7MB", date: "2025-07-05" },
        { name: "image6.jpeg", extension: "jpeg", type: "image", size: "820KB", date: "2025-07-10" },
        { name: "video_demo2.mp4", extension: "mp4", type: "video", size: "2.4MB", date: "2025-07-15" },
        { name: "report_v3.pdf", extension: "pdf", type: "document", size: "1.2MB", date: "2025-07-20" },
        { name: "audio_file6.mp3", extension: "mp3", type: "audio", size: "3.8MB", date: "2025-07-25" },
    ];


    const [libraryFiles, setLibraryFiles] = useState(initialLessonLibraryFiles); // 통합 라이브러리 파일 (공통 + 페이지)
    const [librarySearchTerm, setLibrarySearchTerm] = useState(""); // 검색어 상태
    const [libraryCategoryFilter, setLibraryCategoryFilter] = useState("all"); // 카테고리 필터 상태 ("all" | "video" | "image" | "document" | "audio")
    const [selectedFile, setSelectedFile] = useState(null); // 선택된 파일 상태
    const [currentPageNum, setCurrentPageNum] = useState(1); // 현재 페이지 번호
    const filesPerPage = 20; // 페이지당 파일 수      
    const [hoveredFile, setHoveredFile] = useState(null);
    const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 });
      // 파일 항목에 마우스 엔터/리브 핸들러
    const handleFileMouseEnter = (e, file) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setHoverPos({ x: rect.right + 10, y: rect.top });
      setHoveredFile(file);
    };
    const handleFileMouseLeave = () => {
      setHoveredFile(null);
    };

    // 상태 변수 추가 (컴포넌트 상단 부분)
    const [previewMode, setPreviewMode] = useState("uiCustom"); // 기본값: "uiCustom"

    // UI 라이브러리 (아이콘으로 변경)
    const [uiElements] = useState([
        { type: "input", icon: FaFont, name: "텍스트입력" },
        { type: "button", icon: FaMousePointer, name: "버튼" },
        { type: "checkbox", icon: FaRegSquare, name: "체크박스" },
        { type: "select", icon: FaCaretSquareDown, name: "드롭다운" }
    ]);

    // Preview 아이템 및 배경 URL
    const [previewItems, setPreviewItems] = useState([]);
    const [isPreviewDragOver, setIsPreviewDragOver] = useState(false);
    const [bgUrl, setBgUrl] = useState("");

    // 템플릿 검색 모달 상태 (현재 미구현)
    const [showTemplateModal, setShowTemplateModal] = useState(false);
    const handleOpenTemplateModal = () => setShowTemplateModal(true);
    const handleAIGenerate = () => setShowTemplateModal(false);
    const handleCloseTemplateModal = () => setShowTemplateModal(false);    

  
    // Import 모달 상태 (현재 미구현)
    const [showImportModal, setShowImportModal] = useState(false);
    const handleOpenImportModal = () => setShowImportModal(true);
    const handleCloseImportModal = () => setShowImportModal(false);
    const handleImportFile = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            alert(`압축파일 업로드: ${file.name}`);
            // 실제 업로드 로직 or parsing
            setShowImportModal(false);
        }
    };

    // 속성 편집 모달 상태
    const [showPropModal, setShowPropModal] = useState(false);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editValue, setEditValue] = useState("");
    const openPropModal = (idx) => {
        setEditingIndex(idx);
        const item = previewItems[idx];
        if (item) { // Check if item exists
          setEditValue(item.name || "");
          setShowPropModal(true);
      }
    };
    const closePropModal = () => {
        setShowPropModal(false);
        setEditingIndex(-1);
    };
    const handlePropSave = () => {
        setPreviewItems(prev => {
            const copy = [...prev];
            copy[editingIndex] = { ...copy[editingIndex], name: editValue };
            return copy;
        });
        closePropModal();
    };

    // 드래그/드롭 핸들러
    const handleLibraryDragStart = (e, file) => {
        e.dataTransfer.setData("application/json", JSON.stringify(file));
        setSelectedFile(file); // 드래그 시작 시 선택된 파일 업데이트 (미리보기 위해)
    };
    const handleUiElementDragStart = (e, elem) => {
      // **NEW: Set the data in the dataTransfer object**
      e.dataTransfer.setData("application/json", JSON.stringify(elem));

      // UI 요소 드래그 시, 바로 Preview에 추가하고 속성 편집 모달을 열도록 함.
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newItem = { ...elem, x, y };
      setPreviewItems(prev => [...prev, newItem]);
      // Open property modal for the newly dropped UI element
      openPropModal(previewItems.length); // new item's index
  };

    const handleLibraryFileSelect = e => {
        const files = Array.from(e.target.files);
        const newFiles = files.map(file => {
            const parts = file.name.split(".");
            const extension = parts[parts.length - 1].toLowerCase();
            const type = getFileTypeFromExtension(extension); // 확장자 기반 파일 타입 결정
            return { name: file.name, extension, type, size: calculateFileSize(file.size), date: getCurrentDate() };
        });
        setLibraryFiles(prev => [...prev, ...newFiles]);
    };


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
      // **Now this line should work correctly**
      const data = JSON.parse(e.dataTransfer.getData("application/json"));

      // 배경 파일(bg.png)인 경우
      if (data.extension === "png" && data.name === "bg.png") {
          const bgFullUrl = `https://vod.cdn.hunet.co.kr/Library/HCMS/kobongseok/PNG/${data.name}`;
          setBgUrl(bgFullUrl);
          return;
      }

      // 중복 체크
      if (!previewItems.some(item => item.name === data.name)) {
          // 만약 UI 요소라면 바로 속성 모달 열기
          if (data.type) {
              const newIndex = previewItems.length;
               // UI 요소의 경우, 이미 handleUiElementDragStart에서 Preview에 추가되어있기 때문에 여기서는 위치만 수정
              setPreviewItems(prev => {
                  const copy = [...prev];
                  copy[copy.length-1] = { ...data, x, y }; // 복사본 생성
                  return copy;
              });
              openPropModal(newIndex);
          } else {
              setPreviewItems(prev => [...prev, { ...data, x, y }]);
          }
      }
  };

    // Preview 아이템 이동
    const [draggingIndex, setDraggingIndex] = useState(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const handleMouseDownItem = (e, idx) => {
        e.stopPropagation();
        e.preventDefault();
        setDraggingIndex(idx);
        const item = previewItems[idx];
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        setOffset({ x: mouseX - item.x, y: mouseY - item.y });
    };
    const handlePreviewMouseMove = (e) => {
        if (draggingIndex === null) return;
        e.preventDefault();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        setPreviewItems(prev => {
            const copy = [...prev];
            const item = { ...copy[draggingIndex] };
            item.x = mouseX - offset.x;
            item.y = mouseY - offset.y;
            copy[draggingIndex] = item;
            return copy;
        });
    };
    const handlePreviewMouseUp = () => {
        setDraggingIndex(null);
    };

    // 렌더링 함수: Preview 아이템
    const renderPreviewItem = (item, idx) => {
        if (item.extension) {
            if (item.extension === "mp4") {
                return (
                    <video width="200" controls>
                        <source
                            src={`https://vod.cdn.hunet.co.kr/Library/HCMS/kobongseok/MP4/${item.name}`}
                            type="video/mp4"
                        />
                        브라우저가 영상을 지원하지 않습니다.
                    </video>
                );
            }
            if (["jpg", "jpeg", "png", "gif"].includes(item.extension)) {
                return (
                    <img
                        src={`https://vod.cdn.hunet.co.kr/Library/HCMS/kobongseok/PNG/${item.name}`}
                        alt={item.name}
                        width="150"
                        style={{ borderRadius: "5px" }}
                    />
                );
            }
            return <span>{item.name}</span>;
        }
        // UI 요소
        switch (item.type) {
            case "input":
                return <input placeholder={item.name} style={{ width: "120px" }} />;
            case "button":
                return <button onDoubleClick={() => openPropModal(idx)}>{item.name}</button>;
            case "checkbox":
                return (
                    <label style={{ display: "inline-flex", alignItems: "center" }} onDoubleClick={() => openPropModal(idx)}>
                        <input type="checkbox" />
                        <span style={{ marginLeft: 5 }}>{item.name}</span>
                    </label>
                );
            case "select":
                return (
                    <select onDoubleClick={() => openPropModal(idx)}>
                        <option>{item.name}</option>
                        <option>옵션1</option>
                        <option>옵션2</option>
                    </select>
                );
            default:
                return <span onDoubleClick={() => openPropModal(idx)}>{item.name}</span>;
        }
    };

    // 중복 체크
    const isFileUsed = file => previewItems.some(item => item.name === file.name);
    // 확장자별 색상
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


    // 과목/차시/페이지 저장
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
                    const generatedName = newPageName.trim() ? newPageName : `${newPageId}페이지`;
                    const newPage = { id: newPageId, name: generatedName, contentItems: [] };
                    return { ...lesson, pages: [...lesson.pages, newPage] };
                }
                return lesson;
            })
        );
        setCurrentPageId(currentLesson.pages.length + 1);
        setPageName("");
    };


    // 탭 전환
    const handleBuilderTab = () => {
        setViewTab("builder");
        setView("builder");
    };
    const handleDetailTab = () => {
        setViewTab("detail");
        setView("detail");
    };

    // 전체 저장
    const handleSaveAll = () => {
        alert(`전체 저장 되었습니다!\n과목명: ${savedCourseName}`);
    };


    // 상세 페이지 처리 (현재 미구현)
    const handleDetailSave = detailData => {
        setView("builder");
        setViewTab("builder");
    };
    const handleDetailBack = () => {
        setView("builder");
        setViewTab("builder");
    };

    // 네비게이션 버튼 (예시: 프리뷰 좌우 이동)
    const handlePreviewNavLeft = () => {
        alert("Preview 좌측 이동");
    };
    const handlePreviewNavRight = () => {
        alert("Preview 우측 이동");
    };


    // 검색 자동완성 (client-side, demo 용)
    const getAutocompleteSuggestions = useMemo(() => {
        if (!librarySearchTerm) return [];
        const searchTermLower = librarySearchTerm.toLowerCase();
        return libraryFiles
            .filter(file => file.name.toLowerCase().includes(searchTermLower))
            .map(file => file.name)
            .slice(0, 5); // 최대 5개 추천
    }, [librarySearchTerm, libraryFiles]);


    // 라이브러리 파일 필터링 (검색 + 카테고리)
    const filteredLibraryFiles = useMemo(() => {
        let filtered = libraryFiles;

        // 검색어 필터
        if (librarySearchTerm) {
            const searchTermLower = librarySearchTerm.toLowerCase();
            filtered = filtered.filter(file => file.name.toLowerCase().includes(searchTermLower));
        }

        // 카테고리 필터
        if (libraryCategoryFilter !== "all") {
            filtered = filtered.filter(file => file.type === libraryCategoryFilter);
        }
        return filtered;
    }, [libraryFiles, librarySearchTerm, libraryCategoryFilter]);


    // 페이지네이션된 파일 목록
    const paginatedFiles = useMemo(() => {
        const start = (currentPageNum - 1) * filesPerPage;
        const end = start + filesPerPage;
        return filteredLibraryFiles.slice(start, end);
    }, [filteredLibraryFiles, currentPageNum, filesPerPage]);


    // 파일 확장자로부터 파일 타입 결정
    const getFileTypeFromExtension = (extension) => {
        const videoExtensions = ["mp4", "avi", "mov"];
        const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
        const audioExtensions = ["mp3", "wav", "ogg"];
        const documentExtensions = ["pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx"];

        if (videoExtensions.includes(extension)) return "video";
        if (imageExtensions.includes(extension)) return "image";
        if (audioExtensions.includes(extension)) return "audio";
        if (documentExtensions.includes(extension)) return "document";
        return "unknown";
    };

    // 파일 크기 계산 (bytes -> KB, MB, GB)
    const calculateFileSize = (bytes) => {
        if (bytes < 1024) return bytes + " Bytes";
        else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
        else if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + " MB";
        else return (bytes / 1073741824).toFixed(2) + " GB";
    };

    // 현재 날짜 가져오기 (YYYY-MM-DD 형식)
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    // 라우팅 분기 (현재 "list", "detail" 뷰는 미구현)
    if (view === "list") {
        return <CourseListPage />;
    }
    if (view === "detail") {
        return (
            <div className="builder-page">
                {/* ... (상세 정보 페이지 UI, 현재 미구현) */}
                <DetailInputPage onSaveDetail={handleDetailSave} onBack={handleDetailBack} />
            </div>
        );
    }
    if (view === "library") {
      return <LibraryMainPage />;
  }


    // 기본 빌더 뷰 (메인 UI)
    return (
      <div className="builder-page">
      <header className="top-menu">
        <div className="menu-left">
        <img
          src="http://hcms.hunet.co.kr/image/hunet_hcms_logo.png"
          alt="Company Logo"
          className="company-logo"
        />
        <div className="top-menu-item" onClick={() => setView("list")}>과목</div>
        <div className="top-menu-item" onClick={() => setView("library")}>라이브러리</div>
        <div className="top-menu-item" onClick={() => alert("설정 클릭!")}>설정</div>
        </div>
        <div className="menu-right">
        <FaBell className="icon" title="알림" />
        <FaUserCircle className="icon" title="로그인" />
        </div>
      </header>
    
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
  <button className="template-button" onClick={handleOpenTemplateModal}>
    템플릿
  </button>
  <button className="import-button" onClick={handleOpenImportModal}>
    Import
  </button>
  <button className="ai-button" onClick={handleAIGenerate}>
    AI 생성
  </button>
  <button className="save-button" onClick={handleSaveAll}>
    저장
  </button>
</div>

      </div>
    
      <div className="builder-main-container">
        {/* 좌측 영역 (과목/차시/페이지 관리) */}
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
          <div className="management-panel saved-info-panel" style={{ marginBottom: "0" }}>
          <h4 className="saved-course-name">
            {savedCourseName ? `과목명: ${savedCourseName}` : "과목명이 없습니다."}
          </h4>
          <div className="saved-lessons">
            <div className="saved-row">
            <label>차시:</label>
            <div className="tabs-container">
              {lessons.map((lesson) => (
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
              {currentLesson.pages.map((page) => (
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
        </div>
    
        {/* 우측 영역: 라이브러리 리스트 (노출 부분) */}
        <div className="builder-right-content">
        <div
          className="library-section full-width"
          style={{ width: "100%", marginBottom: "0" }}
        >
          <div className="section-header">통합 라이브러리</div>
    
          {/* 전체 영역을 좌우로 나누는 flex 컨테이너 */}
          <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          {/* 좌측 영역 (80%) - 파일 목록 등 */}
          <div style={{ flex: 8 }}>
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
    
            {/* 카테고리 필터 */}
            <div className="category-filter">
            <button
              className={`category-button ${libraryCategoryFilter === "all" ? "active" : ""}`}
              onClick={() => setLibraryCategoryFilter("all")}
            >
              전체
            </button>
            <button
              className={`category-button ${libraryCategoryFilter === "video" ? "active" : ""}`}
              onClick={() => setLibraryCategoryFilter("video")}
            >
              비디오
            </button>
            <button
              className={`category-button ${libraryCategoryFilter === "image" ? "active" : ""}`}
              onClick={() => setLibraryCategoryFilter("image")}
            >
              이미지
            </button>
            <button
              className={`category-button ${libraryCategoryFilter === "document" ? "active" : ""}`}
              onClick={() => setLibraryCategoryFilter("document")}
            >
              문서
            </button>
            <button
              className={`category-button ${libraryCategoryFilter === "audio" ? "active" : ""}`}
              onClick={() => setLibraryCategoryFilter("audio")}
            >
              오디오
            </button>
            </div>
    
            <div className="upload-area">
            <p>
              업로드: 드래그앤드롭 또는{" "}
              <label htmlFor="libraryFileInput" className="upload-button">
              파일 선택
              </label>
            </p>
            <input
              type="file"
              multiple
              onChange={handleLibraryFileSelect}
              id="libraryFileInput"
              style={{ display: "none" }}
            />
            </div>
    
            {/* 파일 목록 (Grid Layout) */}
            <div className="uploaded-files grid-layout">
            {paginatedFiles.map((file, i) => (
              <div
              key={i}
              className={`file-tag grid-item ${selectedFile === file ? "selected" : ""}`}
              style={{
                backgroundColor: getColorByExtension(file.extension),
                fontWeight: isFileUsed(file) ? "bold" : "normal",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "4px 8px",
              }}
              draggable
              onDragStart={(e) => handleLibraryDragStart(e, file)}
              onClick={() => setSelectedFile(file)}
              onMouseEnter={(e) => handleFileMouseEnter(e, file)}
              onMouseLeave={handleFileMouseLeave}
              >
              <div className="file-icon">
                {file.type === "video" && <FaPlayCircle />}
                {file.type === "image" && <FaImage />}
                {file.type === "audio" && <FaPlayCircle />}
                {file.type === "document" && <FaFileAlt />}
                {file.type === "unknown" && <FaFileAlt />}
              </div>
              <span className="file-name">{file.name}</span>
              {isFileUsed(file) && <FaCheck className="used-icon" />}
              </div>
            ))}
            </div>
    
            {/* 페이지 네이션 */}
            <div className="pagination">
            <button
              onClick={() =>
              setCurrentPageNum((pageNum) => Math.max(pageNum - 1, 1))
              }
              disabled={currentPageNum === 1}
            >
              <FaChevronLeft />
            </button>
            <span>
              페이지 {currentPageNum} /{" "}
              {Math.ceil(filteredLibraryFiles.length / filesPerPage)}
            </span>
            <button
              onClick={() =>
              setCurrentPageNum((pageNum) =>
                Math.min(
                pageNum + 1,
                Math.ceil(filteredLibraryFiles.length / filesPerPage)
                )
              )
              }
              disabled={
              currentPageNum === Math.ceil(filteredLibraryFiles.length / filesPerPage) ||
              Math.ceil(filteredLibraryFiles.length / filesPerPage) === 0
              }
            >
              <FaChevronRight />
            </button>
            </div>
          </div>
    
          {/* 우측 영역 (20%) - 선택된 파일 미리보기는 제거하고, hover 미리보기 팝업만 유지 */}
          </div>
        </div>
    
        {/* 상세 미리보기 팝업 (마우스 오버 시) */}
        {hoveredFile && (
          <div
          className="hover-preview-popup"
          style={{
            position: "absolute",
            top: hoverPos.y,
            left: hoverPos.x,
            width: "400px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            padding: "10px",
            zIndex: 100,
          }}
          >
          <h4>{hoveredFile.name}</h4>
          <div style={{ width: "100%", height: "200px" }}>
            {hoveredFile.type === "image" && (
            <img
              src={`https://vod.cdn.hunet.co.kr/Library/HCMS/kobongseok/PNG/${hoveredFile.name}`}
              alt={hoveredFile.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            )}
            {hoveredFile.type === "video" && (
            <video
                      src={`https://vod.cdn.hunet.co.kr/Library/HCMS/kobongseok/MP4/${hoveredFile.name}`}
                      controls
                      style={{ width: "100%", height: "100%" }}
                    />
                  )}
                  {/* 다른 파일 타입에 대한 미리보기 처리 추가 가능 */}
                </div>
                <div
                  className="file-details"
                  style={{ marginTop: "10px", fontSize: "0.9em", lineHeight: "1.4" }}
                >
                  <p>파일명: {hoveredFile.name}</p>
                  <p>파일 크기: {hoveredFile.size}</p>
                  <p>확장자: {hoveredFile.extension}</p>
                  <p>타입: {hoveredFile.type}</p>
                  <p>업로드 날짜: {hoveredFile.date}</p>
                </div>
              </div>
            )}

    
            {/* 하단 영역: 모드 선택 및 UI 툴바 / PREVIEW 영역 */}
            <div className="builder-combined-area" style={{ display: "flex", flexDirection: "row" }}>
              {/* 모드 선택 버튼 (미리보기 영역 상단 중앙) */}
              <div style={{ position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)", zIndex: 20 }}>
                <button 
                  onClick={() => setPreviewMode("general")}
                  style={{ padding: "5px 10px", marginRight: "5px", background: previewMode === "general" ? "#0072ff" : "#ccc", color: "#fff", border: "none", borderRadius: "4px" }}
                >
                  일반
                </button>
                <button 
                  onClick={() => setPreviewMode("uiCustom")}
                  style={{ padding: "5px 10px", background: previewMode === "uiCustom" ? "#0072ff" : "#ccc", color: "#fff", border: "none", borderRadius: "4px" }}
                >
                  UI 커스텀
                </button>
              </div>

              {/* 좌측: UI 툴바 – previewMode가 "uiCustom"인 경우에만 표시 */}
              {previewMode === "uiCustom" && (
                <div className="builder-ui-toolbar" style={{ width: "80px" }}>
                  <div
                    className="ui-library-section library-section"
                    style={{ border: "none", padding: "0", backgroundColor: "transparent" }}
                  >
                    <div
                      className="ui-elements-container"
                      style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "0" }}
                    >
                      {uiElements.map((elem, idx) => (
                        <div
                          key={idx}
                          className="ui-element-tag"
                          draggable
                          onDragStart={(e) => handleUiElementDragStart(e, elem)}
                          title={elem.name}
                        >
                          <elem.icon className="ui-element-icon" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 우측: PREVIEW 영역 */}
              <div
                className="preview-section full-width"
                style={{
                  position: "relative",
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* 좌측 이동 버튼 */}
                <button
                  className="preview-nav left"
                  onClick={handlePreviewNavLeft}
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "2em",
                    width: "40px",
                    height: "40px",
                    zIndex: 10,
                  }}
                >
                  <FaChevronLeft />
                </button>

                {/* 미리보기 영역 */}
                <div
                  className={`preview-area ${isPreviewDragOver ? "drag-over" : ""}`}
                  style={{
                    width: "970px",
                    height: "546px",
                    position: "relative",
                    overflow: "hidden",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: bgUrl ? `url(${bgUrl})` : "none",
                  }}
                  onDrop={handlePreviewDrop}
                  onDragOver={handlePreviewDragOver}
                  onDragLeave={handlePreviewDragLeave}
                  onMouseMove={handlePreviewMouseMove}
                  onMouseUp={handlePreviewMouseUp}
                >
                  {previewItems.length === 0 && (
                    <p className="preview-placeholder">
                      파일 또는 UI요소를 드래그하세요.
                    </p>
                  )}
                  {previewItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="preview-item"
                      style={{ left: item.x, top: item.y, cursor: "move" }}
                      onMouseDown={(e) => handleMouseDownItem(e, idx)}
                    >
                      {renderPreviewItem(item, idx)}
                    </div>
                  ))}
                </div>

                {/* 우측 이동 버튼 */}
                <button
                  className="preview-nav right"
                  onClick={handlePreviewNavRight}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "2em",
                    width: "40px",
                    height: "40px",
                    zIndex: 10,
                  }}
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>


          </div>
        </div>
    
        {/* 템플릿 검색 모달 (현재 미구현) */}
        {showTemplateModal && (
          <div className="import-modal-overlay">
            <div className="import-modal-content">
              <h3>템플릿 검색</h3>
              <p>템플릿을 검색할 수 있는 UI를 구성하세요.</p>
              <button className="close-button" onClick={handleCloseTemplateModal} style={{ marginTop: "10px" }}>
                닫기
              </button>
            </div>
          </div>
        )}
    
        {/* Import 모달 (현재 미구현) */}
        {showImportModal && (
          <div className="import-modal-overlay">
            <div className="import-modal-content">
              <h3>압축파일 Import</h3>
              <input type="file" accept=".zip,.rar,.7z" onChange={handleImportFile} />
              <button className="close-button" onClick={handleCloseImportModal}>
                닫기
              </button>
            </div>
          </div>
        )}
    
        {/* 속성 편집 모달 */}
        {showPropModal && (
          <div className="import-modal-overlay">
            <div className="import-modal-content">
              <h3>UI 요소 속성 편집</h3>
              <p>이름(버튼명, 체크박스라벨 등)을 수정할 수 있습니다.</p>
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
              <div style={{ marginTop: "10px", textAlign: "right" }}>
                <button className="save-button" onClick={handlePropSave}>
                  저장
                </button>
                <button className="close-button" onClick={closePropModal} style={{ marginLeft: "10px" }}>
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );    
}

export default ContentBuilderPage;