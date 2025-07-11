import React from 'react';
import styled from 'styled-components';
import SEO from './SEO';
// import Header from './Header'; // Baris ini tidak lagi diperlukan jika Header tidak digunakan
import { useLocation } from '@reach/router';

const MainContent = styled.main`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 1;
`;

const Layout = ({ children, pageContext }) => {
  const location = useLocation();

  const seoTitle = pageContext?.frontmatter?.title || pageContext?.title || "My Cinematic Portfolio";
  const seoDescription = pageContext?.frontmatter?.description || pageContext?.description || "Crafting Cinematic Experiences.";

  const seoPathname = location.pathname || null;

  // const isHomePage = location.pathname === '/'; // Baris ini tidak lagi diperlukan jika tidak ada kondisi untuk Header

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} pathname={seoPathname} />
      {/* {!isHomePage && <Header />} <-- Bagian ini telah dihapus */}
      <MainContent>
        {children}
      </MainContent>
    </>
  );
};

export default Layout;