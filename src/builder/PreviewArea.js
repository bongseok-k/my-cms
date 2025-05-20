import React from 'react';

function PreviewArea({
  previewMode,
  setPreviewMode,
  savedCourseName,
  lessons,
  previewItems,
  bgUrl,
  handlePreviewDrop,
  handlePreviewDragOver,
  handlePreviewDragLeave,
  handlePreviewMouseMove,
  handlePreviewMouseUp,
  handleMouseDownItem,
  renderPreviewItem,
  uiElements,
  handleUiElementDragStart,
}) {
  return (
    <div className="builder-combined-area" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', width: '100%' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setPreviewMode('general')}
          style={{
            padding: '5px 10px',
            background: previewMode === 'general' ? '#0072ff' : '#ccc',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          일반
        </button>
        <button
          onClick={() => setPreviewMode('uiCustom')}
          style={{
            padding: '5px 10px',
            background: previewMode === 'uiCustom' ? '#0072ff' : '#ccc',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          UI 커스텀
        </button>
      </div>
      <h2 style={{ fontWeight: 'bold', fontSize: '1.2em', margin: '0' }}>
        {savedCourseName ? `과목명: ${savedCourseName}` : '과목명을 입력해주세요.'}
      </h2>
      <div style={{ width: '1280px', height: '546px', border: '1px solid #ccc', display: 'flex' }}>
        <div
          style={{
            width: '25%',
            height: '100%',
            borderRight: '2px solid #ccc',
            padding: '10px',
            boxSizing: 'border-box',
            backgroundColor: '#f9f9f9',
          }}
        >
          <ul style={{ listStyle: 'none', paddingLeft: '0', margin: '0' }}>
            {lessons.map((lesson) => (
              <li key={lesson.id} style={{ marginBottom: '15px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.2em', marginBottom: '5px' }}>{lesson.name}</div>
                {lesson.pages && lesson.pages.length > 0 && (
                  <ul style={{ listStyle: 'disc', paddingLeft: '20px', margin: '0' }}>
                    {lesson.pages.map((page) => (
                      <li key={page.id} style={{ fontSize: '1em', marginBottom: '3px' }}>
                        {page.name}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="preview-section"
          style={{
            width: '75%',
            height: '100%',
            position: 'relative',
            overflow: 'hidden',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: bgUrl ? `url(${bgUrl})` : 'none',
          }}
          onDrop={handlePreviewDrop}
          onDragOver={handlePreviewDragOver}
          onDragLeave={handlePreviewDragLeave}
          onMouseMove={handlePreviewMouseMove}
          onMouseUp={handlePreviewMouseUp}
        >
          {previewItems.length === 0 ? (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#999',
              }}
            >
              라이브러리 또는 UI요소를 드래그하세요.
            </div>
          ) : (
            previewItems.map((item, idx) => (
              <div
                key={idx}
                className="preview-item"
                style={{ position: 'absolute', left: item.x, top: item.y, cursor: 'move' }}
                onMouseDown={(e) => handleMouseDownItem(e, idx)}
              >
                {renderPreviewItem(item, idx)}
              </div>
            ))
          )}
        </div>
      </div>
      {previewMode === 'uiCustom' && (
        <div
          className="ui-elements-container"
          style={{ display: 'flex', flexDirection: 'row', gap: '10px', justifyContent: 'center' }}
        >
          {uiElements.map((elem, idx) => (
            <div
              key={idx}
              className="ui-element-tag"
              draggable
              onDragStart={(e) => handleUiElementDragStart(e, elem)}
              title={elem.name}
              style={{ cursor: 'move' }}
            >
              <elem.icon style={{ fontSize: '1.5em' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PreviewArea;
