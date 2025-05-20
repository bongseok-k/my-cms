import React from 'react';

function PropModal({ value, onChange, onSave, onClose }) {
  return (
    <div className="import-modal-overlay">
      <div className="import-modal-content">
        <h3>UI 요소 속성 편집</h3>
        <p>이름(버튼명, 체크박스라벨 등)을 수정할 수 있습니다.</p>
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
        <div style={{ marginTop: '10px', textAlign: 'right' }}>
          <button className="save-button" onClick={onSave}>
            저장
          </button>
          <button className="close-button" onClick={onClose} style={{ marginLeft: '10px' }}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropModal;
