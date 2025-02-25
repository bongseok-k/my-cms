import React, { useState } from 'react';
import './ContentBuilderPage.css';

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
    onSaveDetail?.({
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
    <div className="detail-content">
      {/* 상단 메뉴/탭/버튼은 ContentBuilderPage에서 유지,
          여기선 중앙 폼만 보여줌 */}
      <div className="detail-form-container">
        <h2 className="detail-title">상세정보 입력</h2>

        <div className="detail-field">
          <label>카테고리</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="카테고리 입력"
          />
        </div>

        <div className="detail-field">
          <label>과목 소개</label>
          <textarea
            value={courseIntro}
            onChange={(e) => setCourseIntro(e.target.value)}
            placeholder="과목 소개 입력"
          />
        </div>

        <div className="detail-field">
          <label>키워드</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="키워드 입력"
          />
        </div>

        <div className="detail-field">
          <label>강사</label>
          <input
            type="text"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            placeholder="강사 입력"
          />
        </div>

        <div className="detail-field">
          <label>썸네일(URL)</label>
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="썸네일 URL 입력"
          />
        </div>

        <div className="detail-field">
          <label>맛보기 선택</label>
          <input
            type="text"
            value={previewOption}
            onChange={(e) => setPreviewOption(e.target.value)}
            placeholder="맛보기 선택 정보 입력"
          />
        </div>

        <div className="detail-field">
          <label>자막 기능</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="자막 관련 정보 입력"
          />
        </div>

        <div className="detail-field">
          <label>난이도</label>
          <input
            type="text"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            placeholder="예: 초급, 중급, 고급"
          />
        </div>

        <div className="detail-field">
          <label>수강 기간</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="수강 기간 입력"
          />
        </div>

        <div className="detail-field">
          <label>가격</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="가격 입력"
          />
        </div>

        <div className="detail-field">
          <label>추가 정보</label>
          <textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="추가 정보 입력"
          />
        </div>

        {/* 저장 or 뒤로가기 버튼 (선택적으로 표시)
            상단 탭에서 이미 '저장' 버튼이 있을 경우, 아래 버튼은 숨겨도 됨 */}
        <div style={{ textAlign: 'right', marginTop: '10px' }}>
          <button className="red-button" onClick={handleDetailSave}>
            저장하기
          </button>
          <button 
            className="red-button"
            style={{ marginLeft: '8px', backgroundColor: '#aaa' }}
            onClick={onBack}
          >
            뒤로가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailInputPage;
