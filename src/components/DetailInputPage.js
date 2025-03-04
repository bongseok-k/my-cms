import React, { useState } from 'react';
import './DetailInputPage.css';

function DetailInputPage({ onSaveDetail, onBack }) {
  const [category, setCategory] = useState("");
  const [courseIntro, setCourseIntro] = useState("");
  const [keywords, setKeywords] = useState("");
  const [instructor, setInstructor] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [previewOption, setPreviewOption] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleDetailSave = () => {
    onSaveDetail({
      category,
      courseIntro,
      keywords,
      instructor,
      thumbnail,
      previewOption,
      subtitle,
      difficulty,
      duration,
      price,
      additionalInfo
    });
  };

  return (
    <div className="detail-page">
      <div className="detail-header">
        <div className="detail-menu">
          <div className="top-menu-item">과목</div>
          <div className="top-menu-item">라이브러리</div>
          <div className="top-menu-item">설정</div>
        </div>
        <div className="detail-actions">
          <button className="back-button" onClick={onBack}>뒤로가기</button>
          <button className="save-button" onClick={handleDetailSave}>저장</button>
        </div>
      </div>
      <div className="detail-form">
        <div className="detail-field">
          <label>카테고리:</label>
          <input 
            type="text" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            placeholder="카테고리 입력" 
          />
        </div>
        <div className="detail-field">
          <label>과목 소개:</label>
          <textarea 
            value={courseIntro} 
            onChange={(e) => setCourseIntro(e.target.value)} 
            placeholder="과목 소개 입력" 
          />
        </div>
        <div className="detail-field">
          <label>키워드:</label>
          <input 
            type="text" 
            value={keywords} 
            onChange={(e) => setKeywords(e.target.value)} 
            placeholder="키워드 입력" 
          />
        </div>
        <div className="detail-field">
          <label>강사:</label>
          <input 
            type="text" 
            value={instructor} 
            onChange={(e) => setInstructor(e.target.value)} 
            placeholder="강사 입력" 
          />
        </div>
        <div className="detail-field">
          <label>썸네일 등록 (URL):</label>
          <input 
            type="text" 
            value={thumbnail} 
            onChange={(e) => setThumbnail(e.target.value)} 
            placeholder="썸네일 URL 입력" 
          />
        </div>
        <div className="detail-field">
          <label>맛보기 선택:</label>
          <input 
            type="text" 
            value={previewOption} 
            onChange={(e) => setPreviewOption(e.target.value)} 
            placeholder="맛보기 옵션 입력" 
          />
        </div>
        <div className="detail-field">
          <label>자막 기능:</label>
          <input 
            type="text" 
            value={subtitle} 
            onChange={(e) => setSubtitle(e.target.value)} 
            placeholder="자막 정보 입력" 
          />
        </div>
        <div className="detail-field">
          <label>난이도:</label>
          <input 
            type="text" 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)} 
            placeholder="예: 초급, 중급, 고급" 
          />
        </div>
        <div className="detail-field">
          <label>수강 기간:</label>
          <input 
            type="text" 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)} 
            placeholder="수강 기간 입력" 
          />
        </div>
        <div className="detail-field">
          <label>가격:</label>
          <input 
            type="text" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            placeholder="가격 입력" 
          />
        </div>
        <div className="detail-field">
          <label>추가 정보:</label>
          <textarea 
            value={additionalInfo} 
            onChange={(e) => setAdditionalInfo(e.target.value)} 
            placeholder="추가 정보 입력" 
          />
        </div>
      </div>
    </div>
  );
}

export default DetailInputPage;
