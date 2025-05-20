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
import ManagementPanel from "./builder/ManagementPanel";
import LibraryList from "./builder/LibraryList";
import PreviewArea from "./builder/PreviewArea";
import TemplateModal from "./builder/TemplateModal";
import ImportModal from "./builder/ImportModal";
import PropModal from "./builder/PropModal";


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
          src="https://img.hunet.co.kr/hunet/main_v3/layout_header.svg"
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
        <ManagementPanel
          courseName={courseName}
          setCourseName={setCourseName}
          handleSaveCourse={handleSaveCourse}
          newLessonName={newLessonName}
          setNewLessonName={setNewLessonName}
          handleSaveLesson={handleSaveLesson}
          newPageName={newPageName}
          setPageName={setPageName}
          handleSavePage={handleSavePage}
          lessons={lessons}
          currentLessonId={currentLessonId}
          setCurrentLessonId={setCurrentLessonId}
          currentPageId={currentPageId}
          setCurrentPageId={setCurrentPageId}
          currentLesson={currentLesson}
          librarySearchTerm={librarySearchTerm}
          setLibrarySearchTerm={setLibrarySearchTerm}
          libraryCategoryFilter={libraryCategoryFilter}
          setLibraryCategoryFilter={setLibraryCategoryFilter}
          getAutocompleteSuggestions={getAutocompleteSuggestions}
          handleLibraryFileSelect={handleLibraryFileSelect}
        />
        <div className="builder-right-content">
          <LibraryList
            paginatedFiles={paginatedFiles}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            getColorByExtension={getColorByExtension}
            isFileUsed={isFileUsed}
            handleLibraryDragStart={handleLibraryDragStart}
            handleFileMouseEnter={handleFileMouseEnter}
            handleFileMouseLeave={handleFileMouseLeave}
            currentPageNum={currentPageNum}
            setCurrentPageNum={setCurrentPageNum}
            filteredLibraryFiles={filteredLibraryFiles}
            filesPerPage={filesPerPage}
            hoveredFile={hoveredFile}
            hoverPos={hoverPos}
          />
          <PreviewArea
            previewMode={previewMode}
            setPreviewMode={setPreviewMode}
            savedCourseName={savedCourseName}
            lessons={lessons}
            previewItems={previewItems}
            bgUrl={bgUrl}
            handlePreviewDrop={handlePreviewDrop}
            handlePreviewDragOver={handlePreviewDragOver}
            handlePreviewDragLeave={handlePreviewDragLeave}
            handlePreviewMouseMove={handlePreviewMouseMove}
            handlePreviewMouseUp={handlePreviewMouseUp}
            handleMouseDownItem={handleMouseDownItem}
            renderPreviewItem={renderPreviewItem}
            uiElements={uiElements}
            handleUiElementDragStart={handleUiElementDragStart}
          />
        </div>
    
    
        {/* 템플릿 검색 모달 (현재 미구현) */}
                {showTemplateModal && (
          <TemplateModal onClose={handleCloseTemplateModal} />
        )}
    
        {/* Import 모달 (현재 미구현) */}
                {showImportModal && (
          <ImportModal onClose={handleCloseImportModal} onImport={handleImportFile} />
        )}
    
        {/* 속성 편집 모달 */}
                {showPropModal && (
          <PropModal value={editValue} onChange={setEditValue} onSave={handlePropSave} onClose={closePropModal} />
        )}
      </div>
    );    
}

export default ContentBuilderPage;