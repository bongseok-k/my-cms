import React, { useState, useMemo } from "react";
import {
  FaBell,
  FaUserCircle,
  FaSearch,
  FaFolder,
  FaFile,
  FaTable,
  FaTh,
  FaFilter,
  FaCloudUploadAlt
} from "react-icons/fa";
import "./LibraryMainPage.css"; // 별도 CSS 파일에서 세련된 스타일 적용

function LibraryMainPage() {
  // 탭 상태: "personal" 또는 "all"
  const [activeLibraryType, setActiveLibraryType] = useState("personal");
  // 좌측 폴더에서 현재 선택된 하위 폴더
  const [selectedFolder, setSelectedFolder] = useState(null);
  // 검색어
  const [searchTerm, setSearchTerm] = useState("");
  // 파일 목록 (예시 데이터에 순번(seq) 및 추가 메타데이터 추가)
  const [files, setFiles] = useState([
    { seq: 1, name: "video1.mp4", size: "2.5MB", type: "video", date: "2025-03-10", meta: "Duration: 05:20" },
    { seq: 2, name: "image1.png", size: "500KB", type: "image", date: "2025-03-20", meta: "Resolution: 1920x1080" },
    { seq: 3, name: "doc1.pdf", size: "800KB", type: "document", date: "2025-03-30", meta: "Pages: 12" },
    { seq: 4, name: "audio1.mp3", size: "3MB", type: "audio", date: "2025-04-05", meta: "Duration: 03:45" }
    // ... 추가 데이터
  ]);
  // 리스트 보기 모드: "grid" 또는 "table"
  const [viewMode, setViewMode] = useState("grid");
  // 드래그앤드랍 업로드 상태
  const [dragOver, setDragOver] = useState(false);

  // 좌측 폴더 구조 데이터 (각 탭별 하위 폴더)
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

  // 파일 목록 필터링
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
    // 실제 업로드 로직을 구현하세요.
    alert(`${droppedFiles.length} 개의 파일이 업로드되었습니다.`);
  };

  return (
    <div className="library-main-page" style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
      {/* 상단 메뉴 (콘텐츠 빌더와 동일) */}
      <header className="top-menu">
        <div className="menu-left">
          <img
            src="https://img.hunet.co.kr/hunet/main_v3/layout_header.svg"
            alt="Company Logo"
            className="company-logo"
          />
          <div className="top-menu-item" onClick={() => window.location.href = "/course-list"}>과목</div>
          <div className="top-menu-item" onClick={() => window.location.href = "/library-list"}>라이브러리</div>
          <div className="top-menu-item" onClick={() => window.location.href = "/settings"}>설정</div>
        </div>
        <div className="menu-right">
          <FaBell className="icon" />
          <FaUserCircle className="icon" />
        </div>
      </header>

      {/* 메인 영역 */}
      <div className="main-container" style={{ display: "flex", alignItems: "flex-start", paddingTop: "20px", height: "calc(100vh - 60px)" }}>
        {/* 좌측 사이드바: 폴더 구조 탭 */}
        <div className="sidebar" style={{ width: "250px", borderRight: "1px solid #ddd", padding: "10px", boxSizing: "border-box" }}>
          <h3 style={{ fontSize: "1.2em", marginBottom: "10px" }}>라이브러리</h3>
          {/* 탭 버튼 */}
          <div className="library-tabs" style={{ display: "flex", marginBottom: "10px" }}>
            <button
              onClick={() => { setActiveLibraryType("personal"); setSelectedFolder(null); }}
              style={{
                flex: 1,
                padding: "8px",
                background: activeLibraryType === "personal" ? "#eaeaea" : "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px 0 0 4px"
              }}
            >
              개인 라이브러리
            </button>
            <button
              onClick={() => { setActiveLibraryType("all"); setSelectedFolder(null); }}
              style={{
                flex: 1,
                padding: "8px",
                background: activeLibraryType === "all" ? "#eaeaea" : "#fff",
                border: "1px solid #ccc",
                borderLeft: "none",
                borderRadius: "0 4px 4px 0"
              }}
            >
              전체 라이브러리
            </button>
          </div>
          {/* 해당 탭의 폴더 목록 */}
          <div className="folder-structure">
            {folderData[activeLibraryType].map(folder => (
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
          {/* 상단 도구 모음: 검색과 업로드 아이콘 */}
          <div className="toolbar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaSearch style={{ marginRight: "5px", color: "#666" }} />
              <input
                type="text"
                placeholder="검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "150px", padding: "5px", fontSize: "0.9em" }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                onClick={() => setViewMode("table")}
                title="테이블 보기"
                style={{ marginRight: "5px", padding: "5px" }}
              >
                <FaTable />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                title="그리드 보기"
                style={{ padding: "5px" }}
              >
                <FaTh />
              </button>
              {/* 업로드 영역은 아이콘으로 표시 */}
              <button
                onClick={() => alert("파일 업로드 기능 구현 필요")}
                style={{ marginLeft: "10px", padding: "5px", display: "flex", alignItems: "center" }}
                title="업로드"
              >
                <FaCloudUploadAlt size={20} style={{ marginRight: "5px" }} />
                업로드
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
                {filteredFiles.map((file, idx) => (
                  <div
                    key={file.name + idx}
                    className="grid-item"
                    style={{
                      width: "150px",
                      border: "1px solid #ddd",
                      padding: "5px",
                      textAlign: "center",
                      borderRadius: "4px",
                      fontSize: "0.9em",
                      background: "#fff",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                    }}
                  >
                    <div style={{ fontWeight: "bold" }}>{idx + 1}. {file.name}</div>
                    <div style={{ fontSize: "0.8em", color: "#666" }}>
                      {file.size} / {file.date}
                    </div>
                    <div style={{ fontSize: "0.8em", color: "#666" }}>
                      유형: {file.type}
                    </div>
                    <div style={{ fontSize: "0.8em", color: "#666" }}>
                      {file.meta}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <table className="table-view" style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9em", background: "#fff" }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #ddd", padding: "5px" }}>순번</th>
                    <th style={{ border: "1px solid #ddd", padding: "5px" }}>파일명</th>
                    <th style={{ border: "1px solid #ddd", padding: "5px" }}>크기</th>
                    <th style={{ border: "1px solid #ddd", padding: "5px" }}>유형</th>
                    <th style={{ border: "1px solid #ddd", padding: "5px" }}>업로드 날짜</th>
                    <th style={{ border: "1px solid #ddd", padding: "5px" }}>메타데이터</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.map((file, idx) => (
                    <tr key={file.name + idx}>
                      <td style={{ border: "1px solid #ddd", padding: "5px" }}>{idx + 1}</td>
                      <td style={{ border: "1px solid #ddd", padding: "5px" }}>{file.name}</td>
                      <td style={{ border: "1px solid #ddd", padding: "5px" }}>{file.size}</td>
                      <td style={{ border: "1px solid #ddd", padding: "5px" }}>{file.type}</td>
                      <td style={{ border: "1px solid #ddd", padding: "5px" }}>{file.date}</td>
                      <td style={{ border: "1px solid #ddd", padding: "5px" }}>{file.meta}</td>
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
