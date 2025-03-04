import React, { useState, useMemo } from "react";
import {
  FaBell,
  FaUserCircle,
  FaSearch,
  FaFolder,
  FaFolderOpen,
  FaFile,
  FaTable,
  FaTh,
  FaFilter
} from "react-icons/fa";
import "./LibraryMainPage.css"; // CSS 파일에서 세련된 스타일 적용

function LibraryMainPage() {
  // 탭 상태: "personal" (개인 라이브러리) 또는 "all" (전체 라이브러리)
  const [activeLibraryType, setActiveLibraryType] = useState("personal");
  // 선택된 폴더 (하위 폴더: 예, 비디오, 이미지, 문서, 오디오)
  const [selectedFolder, setSelectedFolder] = useState(null);
  // 검색어
  const [searchTerm, setSearchTerm] = useState("");
  // 파일 목록 (실제 서비스에서는 API 호출 등으로 가져올 데이터)
  const [files, setFiles] = useState([
    { name: "video1.mp4", size: "2.5MB", type: "video", date: "2025-03-10" },
    { name: "image1.png", size: "500KB", type: "image", date: "2025-03-20" },
    { name: "doc1.pdf", size: "800KB", type: "document", date: "2025-03-30" },
    { name: "audio1.mp3", size: "3MB", type: "audio", date: "2025-04-05" }
  ]);
  // 리스트 보기 모드: "grid" 또는 "table"
  const [viewMode, setViewMode] = useState("grid");
  // 드래그앤드랍 업로드 상태
  const [dragOver, setDragOver] = useState(false);

  // 폴더 구조 데이터
  const folderData = {
    personal: [
      { type: "video", name: "비디오" },
      { type: "image", name: "이미지" },
      { type: "document", name: "문서" },
      { type: "audio", name: "오디오" }
    ],
    all: [
      { type: "video", name: "비디오" },
      { type: "image", name: "이미지" },
      { type: "document", name: "문서" },
      { type: "audio", name: "오디오" }
    ]
  };

  // 파일 목록 필터링 (검색어 및 폴더 선택)
  const filteredFiles = useMemo(() => {
    let filtered = files;
    if (searchTerm) {
      filtered = filtered.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedFolder) {
      filtered = filtered.filter(file => file.type === selectedFolder.type);
    }
    return filtered;
  }, [files, searchTerm, selectedFolder]);

  // 드래그앤드랍 이벤트 핸들러
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    alert(`${droppedFiles.length} 개의 파일이 업로드되었습니다.`);
  };

  return (
    <div className="library-main-page" style={{ minHeight: "100vh" }}>
      {/* 상단 메뉴 - 기존 콘텐츠 빌더와 동일 */}
      <header className="top-menu">
        <div className="menu-left">
          <img
            src="http://hcms.hunet.co.kr/image/hunet_hcms_logo.png"
            alt="Company Logo"
            className="company-logo"
          />
          <div className="top-menu-item" onClick={() => window.location.href = "/course-list"}>
            과목
          </div>
          <div className="top-menu-item" onClick={() => window.location.href = "/library-list"}>
            라이브러리
          </div>
          <div className="top-menu-item" onClick={() => window.location.href = "/settings"}>
            설정
          </div>
        </div>
        <div className="menu-right">
          <FaBell className="icon" />
          <FaUserCircle className="icon" />
        </div>
      </header>

      {/* 메인 영역: 상단 메뉴 바로 아래에서 시작 */}
      <div className="main-container" style={{ display: "flex", alignItems: "flex-start", paddingTop: "20px", height: "calc(100vh - 60px)" }}>
        {/* 왼쪽 사이드바: 폴더 구조 */}
        <div className="sidebar" style={{ width: "250px", borderRight: "1px solid #ddd", padding: "10px", boxSizing: "border-box" }}>
          <h3 style={{ fontSize: "1.2em", marginBottom: "10px" }}>라이브러리</h3>
          {/* 개인 라이브러리 섹션 */}
          <div className="folder-section" style={{ marginBottom: "20px" }}>
            <h4 style={{ fontSize: "1em", borderBottom: "1px solid #ccc", paddingBottom: "5px" }}>개인 라이브러리</h4>
            {folderData.personal.map(folder => (
              <div
                key={folder.type}
                className="folder-item"
                style={{
                  padding: "5px 10px",
                  cursor: "pointer",
                  background: selectedFolder && selectedFolder.type === folder.type ? "#eaeaea" : "transparent",
                  borderRadius: "4px",
                  marginTop: "5px"
                }}
                onClick={() => setSelectedFolder(folder)}
              >
                <FaFolder style={{ marginRight: "5px" }} />
                {folder.name}
              </div>
            ))}
          </div>
          {/* 전체 라이브러리 섹션 */}
          <div className="folder-section">
            <h4 style={{ fontSize: "1em", borderBottom: "1px solid #ccc", paddingBottom: "5px" }}>전체 라이브러리</h4>
            {folderData.all.map(folder => (
              <div
                key={folder.type}
                className="folder-item"
                style={{
                  padding: "5px 10px",
                  cursor: "pointer",
                  background: selectedFolder && selectedFolder.type === folder.type ? "#eaeaea" : "transparent",
                  borderRadius: "4px",
                  marginTop: "5px"
                }}
                onClick={() => setSelectedFolder(folder)}
              >
                <FaFolder style={{ marginRight: "5px" }} />
                {folder.name}
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽 메인 컨텐츠 영역 */}
        <div className="content-area" style={{ flex: 1, padding: "10px", boxSizing: "border-box" }}>
          {/* 상단 도구 모음 */}
          <div className="toolbar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "200px", padding: "5px", fontSize: "0.9em" }}
            />
            <div className="view-mode-toggle" style={{ marginLeft: "10px" }}>
              <button onClick={() => setViewMode("table")} title="테이블 보기" style={{ marginRight: "5px" }}>
                <FaTable />
              </button>
              <button onClick={() => setViewMode("grid")} title="그리드 보기">
                <FaTh />
              </button>
            </div>
          </div>
          {/* 업로드 영역 (드래그앤드랍) */}
          <div
            className="upload-area"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              border: dragOver ? "2px dashed #4CAF50" : "2px dashed #ccc",
              padding: "20px",
              textAlign: "center",
              marginBottom: "10px",
              borderRadius: "4px",
              color: dragOver ? "#4CAF50" : "#777",
              fontSize: "0.9em"
            }}
          >
            파일을 드래그 앤 드랍하여 업로드하세요.
          </div>
          {/* 파일 목록 영역 */}
          <div className="file-list">
            {viewMode === "grid" ? (
              <div className="grid-view" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {filteredFiles.map(file => (
                  <div
                    key={file.name}
                    className="grid-item"
                    style={{
                      width: "150px",
                      border: "1px solid #ddd",
                      padding: "5px",
                      textAlign: "center",
                      borderRadius: "4px",
                      fontSize: "0.9em"
                    }}
                  >
                    <FaFile size={40} style={{ marginBottom: "5px" }} />
                    <div>{file.name}</div>
                  </div>
                ))}
              </div>
            ) : (
              <table className="table-view" style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9em" }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #ddd", padding: "5px" }}>파일명</th>
                    <th style={{ border: "1px solid #ddd", padding: "5px" }}>크기</th>
                    <th style={{ border: "1px solid #ddd", padding: "5px" }}>유형</th>
                    <th style={{ border: "1px solid #ddd", padding: "5px" }}>업로드 날짜</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.map(file => (
                    <tr key={file.name}>
                      <td style={{ border: "1px solid #ddd", padding: "5px" }}>{file.name}</td>
                      <td style={{ border: "1px solid #ddd", padding: "5px" }}>{file.size}</td>
                      <td style={{ border: "1px solid #ddd", padding: "5px" }}>{file.type}</td>
                      <td style={{ border: "1px solid #ddd", padding: "5px" }}>{file.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibraryMainPage;
