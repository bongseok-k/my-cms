import React from 'react';
import { FaPlayCircle, FaFileAlt, FaImage, FaCheck, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function LibraryList({
  paginatedFiles,
  selectedFile,
  setSelectedFile,
  getColorByExtension,
  isFileUsed,
  handleLibraryDragStart,
  handleFileMouseEnter,
  handleFileMouseLeave,
  currentPageNum,
  setCurrentPageNum,
  filteredLibraryFiles,
  filesPerPage,
  hoveredFile,
  hoverPos,
}) {
  return (
    <div className="builder-right-content">
      <div className="library-section full-width" style={{ width: '100%', marginBottom: '0' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
          <div style={{ flex: 8 }}>
            <div className="uploaded-files grid-layout">
              {paginatedFiles.map((file, i) => (
                <div
                  key={i}
                  className={`file-tag grid-item ${selectedFile === file ? 'selected' : ''}`}
                  style={{
                    borderBottom: `3px solid ${getColorByExtension(file.extension)}`,
                    fontWeight: isFileUsed(file) ? 'bold' : 'normal',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '4px 8px',
                  }}
                  draggable
                  onDragStart={(e) => handleLibraryDragStart(e, file)}
                  onClick={() => setSelectedFile(file)}
                  onMouseEnter={(e) => handleFileMouseEnter(e, file)}
                  onMouseLeave={handleFileMouseLeave}
                >
                  <div className="file-icon">
                    {file.type === 'video' && <FaPlayCircle />}
                    {file.type === 'image' && <FaImage />}
                    {file.type === 'audio' && <FaPlayCircle />}
                    {file.type === 'document' && <FaFileAlt />}
                    {file.type === 'unknown' && <FaFileAlt />}
                  </div>
                  <span className="file-name">{file.name}</span>
                  {isFileUsed(file) && <FaCheck className="used-icon" />}
                </div>
              ))}
            </div>
            <div className="pagination">
              <button onClick={() => setCurrentPageNum((p) => Math.max(p - 1, 1))} disabled={currentPageNum === 1}>
                <FaChevronLeft />
              </button>
              <span>
                페이지 {currentPageNum} / {Math.ceil(filteredLibraryFiles.length / filesPerPage)}
              </span>
              <button
                onClick={() =>
                  setCurrentPageNum((p) => Math.min(p + 1, Math.ceil(filteredLibraryFiles.length / filesPerPage)))
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
        </div>
      </div>
      {hoveredFile && (
        <div
          className="hover-preview-popup"
          style={{
            position: 'absolute',
            top: hoverPos.y,
            left: hoverPos.x,
            width: '400px',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
            padding: '10px',
            zIndex: 100,
          }}
        >
          <h4>{hoveredFile.name}</h4>
          <div style={{ width: '100%', height: '200px' }}>
            {hoveredFile.type === 'image' && (
              <img
                src={`https://vod.cdn.hunet.co.kr/Library/HCMS/kobongseok/PNG/${hoveredFile.name}`}
                alt={hoveredFile.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}
            {hoveredFile.type === 'video' && (
              <video
                src={`https://vod.cdn.hunet.co.kr/Library/HCMS/kobongseok/MP4/${hoveredFile.name}`}
                controls
                style={{ width: '100%', height: '100%' }}
              />
            )}
          </div>
          <div className="file-details" style={{ marginTop: '10px', fontSize: '0.9em', lineHeight: '1.4' }}>
            <p>파일명: {hoveredFile.name}</p>
            <p>파일 크기: {hoveredFile.size}</p>
            <p>확장자: {hoveredFile.extension}</p>
            <p>타입: {hoveredFile.type}</p>
            <p>업로드 날짜: {hoveredFile.date}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default LibraryList;
