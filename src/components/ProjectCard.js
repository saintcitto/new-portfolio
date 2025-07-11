// src/components/ProjectCard.js
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, navigate } from 'gatsby'; // Import navigate
import { FaGithub } from 'react-icons/fa'; // Import ikon GitHub

// Varian Animasi untuk setiap kartu proyek
const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// --- DEFINISI STYLED COMPONENTS ---
// Ubah CardContainer dari Link menjadi div
const CardContainer = styled(motion.div)` 
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 350px; /* Tinggi tetap untuk kartu */
  cursor: pointer; /* Tetap beri kursor pointer untuk menunjukkan bisa diklik */
  text-decoration: none;
  color: inherit;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 300px;
  }
`;

const CardImageWrapper = styled.div`
  width: 100%;
  height: 60%; /* Sesuaikan tinggi gambar dalam kartu */
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid rgba(252, 248, 201, 0.2);
`;

const StyledExternalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Pastikan gambar mengisi area dengan rapi */
  transition: transform 0.3s ease;

  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 40%; /* Sisa tinggi untuk konten */
  position: relative; /* Untuk positioning GitHubLink */
`;

const ProjectTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.2rem;
  color: ${({ theme }) => theme.colors.primary};
  font-family: 'JeanLucWeb-Bold', sans-serif;
`;

const ProjectCategory = styled.p`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.8;
  font-family: 'JeanLucWeb-Bold', sans-serif;
`;

const GitHubLink = styled.a`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.3s ease;
  z-index: 1; /* Pastikan ikon di atas konten */

  &:hover {
    transform: translateY(-2px) scale(1.1);
    color: ${({ theme }) => theme.colors.primary}; /* Warna hover */
  }
`;

// --- KOMPONEN UTAMA ProjectCard ---
const ProjectCard = ({ project }) => {
  const handleCardClick = () => {
    navigate(`/projects/${project.slug}`); // Navigasi programatis
  };

  return (
    <CardContainer
      onClick={handleCardClick} // Tambahkan onClick handler
      variants={itemVariants}
    >
      <CardImageWrapper>
        {project.externalImageUrl ? (
          <StyledExternalImage
            src={project.externalImageUrl}
            alt={project.alt || project.title}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#eee',
            fontSize: '1.2em',
            textAlign: 'center'
          }}>
            No Image Available
          </div>
        )}
      </CardImageWrapper>
      <CardContent>
        <div>
          <ProjectTitle>{project.title}</ProjectTitle>
          <ProjectCategory>{project.category}</ProjectCategory>
        </div>
        {project.githubUrl && ( // Tampilkan ikon hanya jika githubUrl ada
          <GitHubLink
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} // Mencegah navigasi kartu saat mengklik ikon
          >
            <FaGithub />
          </GitHubLink>
        )}
      </CardContent>
    </CardContainer>
  );
};

export default ProjectCard;