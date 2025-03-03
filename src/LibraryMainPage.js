import React, { useState, useMemo } from "react";
import {
  FaFolder,
  FaFolderOpen,
  FaFile,
  FaSearch,
  FaTable,
  FaTh
} from "react-icons/fa";
import "./LibraryMainPage.css"; // 별도 CSS 파일에서 스타일을 정의할 수 있습니다.

function LibraryMainPage() {
  // 탭 상태: "personal" (개인 라이브러리) 또는 "all" (전체 라이브러리)
  const [activeLibraryType, setActiveLibraryType] = useState("personal");
  // 좌측 폴더에서 현재 선택된 하위 폴더 (예: 비디오, 이미지, 문서, 오디오)
  const [selectedFolder, setSelectedFolder] = useState(null);
  // 검색어
  const [searchTerm, setSearchTerm] = useState("");
  // 파일 목록 (실제 서비스에서는 API 호출 등으로 가져올 데이터)
  const [files, setFiles] = useState([
    // 예시 데이터
    { name: "video1.mp4", size: "2.5MB", type: "video", date: "2025-03-10" },
    { name: "image1.png", size: "500KB", type: "image", date: "2025-03-20" },
    { name: "doc1.pdf", size: "800KB", type: "document", date: "2025-03-30" },
    { name: "audio1.mp3", size: "3MB", type: "audio", date: "2025-04-05" },
    // ... 추가 데이터
  ]);
  // 리스트 보기 모드: "grid" 또는 "table"
  const [viewMode, setViewMode] = useState("grid");

  // 폴더 구조 데이터 (개인 라이브러리와 전체 라이브러리 각각의 하위 폴더)
  const folderData = {
    personal: {
      name: "개인 라이브러리",
      subFolders: [
        { type: "video", name: "비디오" },
        { type: "image", name: "이미지" },
        { type: "document", name: "문서" },
        { type: "audio", name: "오디오" }
      ]
    },
    all: {
      name: "전체 라이브러리",
      subFolders: [
        { type: "video", name: "비디오" },
        { type: "image", name: "이미지" },
        { type: "document", name: "문서" },
        { type: "audio", name: "오디오" }
      ]
    }
  };

  // 필터링: 검색어 및 선택된 폴더에 따라 파일 목록을 필터링
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

  return (
    <div className="library-main-page" style={{ display: "flex", height: "100vh" }}>
      {/* 왼쪽 사이드바: 폴더 구조 */}
      <div className="sidebar" style={{ width: "250px", borderRight: "1px solid #ddd", padding: "10px", boxSizing: "border-box" }}>
        <h3>라이브러리</h3>
        <ul className="library-tabs" style={{ listStyle: "none", padding: 0, display: "flex", marginBottom: "10px" }}>
          <li
            style={{ marginRight: "10px", cursor: "pointer", fontWeight: activeLibraryType === "personal" ? "bold" : "normal" }}
            onClick={() => { setActiveLibraryType("personal"); setSelectedFolder(null); }}
          >
            개인 라이브러리
          </li>
          <li
            style={{ cursor: "pointer", fontWeight: activeLibraryType === "all" ? "bold" : "normal" }}
            onClick={() => { setActiveLibraryType("all"); setSelectedFolder(null); }}
          >
            전체 라이브러리
          </li>
        </ul>
        <div className="folder-structure">
          {folderData[activeLibraryType].subFolders.map(folder => (
            <div
              key={folder.type}
              className="folder-item"
              style={{
                padding: "5px 10px",
                cursor: "pointer",
                backgroundColor: selectedFolder && selectedFolder.type === folder.type ? "#eee" : "transparent"
              }}
              onClick={() => setSelectedFolder(folder)}
            >
              <FaFolder style={{ marginRight: "5px" }} />
              {folder.name}
            </div>
          ))}
        </div>
      </div>

      {/* 오른쪽 메인 영역: 검색, 업로드, 파일 목록 */}
      <div className="main-content" style={{ flex: 1, padding: "10px", boxSizing: "border-box" }}>
        {/* 상단 도구 모음 */}
        <div className="toolbar" style={{ marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="search-box" style={{ flex: 1 }}>
            <input
              type="text"
              placeholder="검색어 입력"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "100%", padding: "5px" }}
            />
          </div>
          <div className="view-mode-toggle" style={{ marginLeft: "10px" }}>
            <button onClick={() => setViewMode("table")} title="테이블 보기" style={{ marginRight: "5px" }}>
              <FaTable />
            </button>
            <button onClick={() => setViewMode("grid")} title="그리드 보기">
              <FaTh />
            </button>
          </div>
          <div className="upload-area" style={{ marginLeft: "10px" }}>
            <button>업로드</button>
            <input type="file" multiple style={{ display: "none" }} />
          </div>
        </div>

        {/* 파일 목록 영역: 테이블 또는 그리드 보기 */}
        <div className="file-list">
          {viewMode === "grid" ? (
            <div className="grid-view" style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {filteredFiles.map(file => (
                <div key={file.name} className="grid-item" style={{ width: "150px", border: "1px solid #ddd", padding: "5px", textAlign: "center" }}>
                  <FaFile size={40} style={{ marginBottom: "5px" }} />
                  <div>{file.name}</div>
                </div>
              ))}
            </div>
          ) : (
            <table className="table-view" style={{ width: "100%", borderCollapse: "collapse" }}>
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
  );
}

export default LibraryMainPage;
