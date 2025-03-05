import React, { useRef, useState } from "react";

function ThumbnailGenerator() {
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const generateThumbnail = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    
    // 3초 지점의 프레임을 캡처 (원하는 시간으로 조절)
    video.currentTime = 3;
    
    video.addEventListener("seeked", function capture() {
      // 캔버스에 비디오 프레임 그리기
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      // Data URL로 변환
      const dataUrl = canvas.toDataURL("image/jpeg");
      setThumbnail(dataUrl);
      video.removeEventListener("seeked", capture);
    });
  };

  const handleLoadVideo = () => {
    // 비디오 로드 후 썸네일 생성 호출
    generateThumbnail();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="비디오 URL 입력"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <button onClick={handleLoadVideo}>썸네일 생성</button>
      
      {/* 비디오 요소 (숨김 처리) */}
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          onLoadedData={generateThumbnail}
          style={{ display: "none" }}
          crossOrigin="anonymous"
        />
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {thumbnail && (
        <div>
          <h3>생성된 썸네일:</h3>
          <img src={thumbnail} alt="썸네일" />
        </div>
      )}
    </div>
  );
}

export default ThumbnailGenerator;
