import React from 'react';

function ImportModal({ onClose, onImport }) {
  return (
    <div className="import-modal-overlay">
      <div className="import-modal-content">
        <h3>압축파일 Import</h3>
        <input type="file" accept=".zip,.rar,.7z" onChange={onImport} />
        <button className="close-button" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default ImportModal;
