import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

function MainPage() {
  const navigate = useNavigate();

  const handleNewCreation = () => {
    // 신규 생성 버튼 클릭 시 콘텐츠 빌드 페이지로 이동
    navigate('/content-builder');
  };

  const handlePackagingRegistration = () => {
    // 패키징 등록은 추후 페이지로 연결하거나 임시 알림
    alert('패키징 등록 페이지는 준비 중입니다.');
  };

  return (
    <div className="main-container">
      <div className="main-content">
        <h2 className="welcome-text">Welcome to CMS</h2>
        {/* 기존 설명 텍스트는 삭제하고 버튼만 배치 */}
        <div className="button-group">
          <button className="main-button" onClick={handleNewCreation}>
            신규 생성
          </button>
          <button className="main-button" onClick={handlePackagingRegistration}>
            과목 리스트2
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
