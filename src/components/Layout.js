// src/components/Layout.js
import React from 'react';
import '../styles/common.css';

const Layout = ({ children }) => {
  const mainMenus = ['과목', '라이브러리', '설정'];

  return (
    <div className="layout">
      <header className="top-menu">
        {mainMenus.map((menu, index) => (
          <div key={index} className="top-menu-item">{menu}</div>
        ))}
      </header>
      <main className="content-area">
        {children}
      </main>
    </div>
  );
};

export default Layout;
