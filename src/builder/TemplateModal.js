import React from 'react';

function TemplateModal({ onClose }) {
  return (
    <div className="import-modal-overlay">
      <div className="import-modal-content">
        <h3>템플릿 검색</h3>
        <p>템플릿을 검색할 수 있는 UI를 구성하세요.</p>
        <button className="close-button" onClick={onClose} style={{ marginTop: '10px' }}>
          닫기
        </button>
      </div>
    </div>
  );
}

export default TemplateModal;
