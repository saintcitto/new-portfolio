import React, { useState, useEffect } from 'react';
import { graphql, navigate } from 'gatsby';
import styled from 'styled-components';
import { motion } from 'framer-motion';
// Tidak perlu lagi GatsbyImage atau getImage di sini

const ProjectDetailContainer = styled(motion.div)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 3vh;
  right: 3vw;
  background-color: transparent;
  border: 1px solid rgb(252, 248, 201);
  color: rgb(252, 248, 201);
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  z-index: 99999;
  border-radius: 5px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.3s ease-in-out;
  opacity: 1;
  filter: none;
  pointer-events: auto;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  font-family: 'JeanLucWeb-Bold', sans-serif;

  &:hover {
    background-color: rgb(252, 248, 201);
    color: ${({ theme }) => theme.colors.background};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    top: 2vh;
    right: 2vw;
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const ContentArea = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
  padding-top: 8vh;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    padding-top: 6vh;
  }
`;

const LeftColumn = styled(motion.div)`
  flex: 1;
  padding: 5vw;
  display: flex;
  flex-direction: column;
  text-align: left;
  position: relative;
  z-index: 20;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 5vw 5vw 2vw;
    text-align: center;
    align-items: center;
  }
`;

const RightColumn = styled(motion.div)`
  flex: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3vw;
  position: relative;
  z-index: 20;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 2vw 5vw 5vw;
  }
`;

const ProjectHeaderLeft = styled(motion.div)`
  margin-bottom: ${({ theme }) => theme.spacings.large};
  width: 100%;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: ${({ theme }) => theme.spacings.medium};
  }
`;

const ProjectTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 10vw, 8rem);
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  line-height: 1;
  text-transform: uppercase;
  font-family: 'JeanLucWeb-Bold', sans-serif;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: clamp(1.8rem, 7vw, 3.5rem);
  }
`;

const ProjectType = styled(motion.p)`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  margin-bottom: ${({ theme }) => theme.spacings.medium};
  text-transform: uppercase;
  font-family: 'JeanLucWeb-Bold', sans-serif;
`;

const ProjectDescriptionContent = styled(motion.p)`
  font-size: 0.9rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacings.xl};
  max-width: 800px;
  text-align: left;
  font-family: 'JeanLucWeb-Bold', sans-serif;
`;

const ProjectDetailsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem 2rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  margin-top: ${({ theme }) => theme.spacings.large};
  width: 100%;
  font-family: 'JeanLucWeb-Bold', sans-serif;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 0.5rem;
  }
`;

const DetailItem = styled.div`
  display: contents;
`;

const DetailLabel = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const DetailValue = styled.span`
  font-weight: 300;
`;

const MainMediaWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  /* Hapus padding-bottom dan height: 0 untuk membiarkan gambar menentukan tinggi */
  /* padding-bottom: 56.25%; */
  /* height: 0; */
  overflow: hidden; /* Pertahankan hidden untuk clipping jika GIF terlalu besar */
  border-radius: 12px;
  
  background-color: ${({ theme }) => theme.colors.cardBackground};
  /* Ganti dari position: absolute ke flexbox untuk centering konten */
  display: flex; 
  justify-content: center;
  align-items: center;

  /* --- HAPUS BLOCK IMG INI --- */
  /* Karena ini yang memaksa gambar untuk fill 100% dari wrapper */
  /*
  img { 
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: black;
  }
  */

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 100%;
    height: auto;
  }
`;

const StyledExternalDetailImage = styled.img`
  /* --- PERUBAHAN DI SINI --- */
  width: auto; /* Biarkan gambar menggunakan lebar aslinya */
  height: auto; /* Biarkan gambar menggunakan tinggi aslinya */
  /* Hapus object-fit karena tidak lagi relevan */
  /* object-fit: contain; */
  display: block; /* Pastikan gambar berperilaku sebagai blok */
  margin: 0 auto; /* Untuk memusatkan gambar secara horizontal */
  background-color: black; /* Pertahankan jika ingin background hitam di belakang GIF */
`;

const BottomLeftText = styled(motion.p)`
  position: absolute;
  bottom: 5vh;
  left: 5vw;
  font-size: ${({ theme }) => theme.typography.small};
  font-weight: 300;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
  z-index: 20;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: 'JeanLucWeb-Bold', sans-serif;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.7rem;
    bottom: 3vh;
    left: 3vw;
  }
`;

const BottomRightText = styled(motion.p)`
  position: absolute;
  bottom: 5vh;
  right: 5vw;
  font-size: ${({ theme }) => theme.typography.small};
  font-weight: 300;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
  z-index: 20;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: right;
  font-family: 'JeanLucWeb-Bold', sans-serif;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.7rem;
    bottom: 3vh;
    right: 3vw;
  }
`;

const ProjectDetail = ({ data }) => {
  const project = data.projectsJson;
  
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  const updateDateTime = () => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options).toUpperCase());
  };

  useEffect(() => {
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <ProjectDetailContainer
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <CloseButton onClick={() => { console.log("Close button clicked!"); navigate('/'); }}>CLOSE</CloseButton>

      <ContentArea>
        <LeftColumn>
          <ProjectHeaderLeft>
            <ProjectTitle
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              {project.title}
            </ProjectTitle>
            {project.type && (
              <ProjectType
                variants={itemVariants}
                initial="hidden"
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                ({project.type})
              </ProjectType>
            )}
            <ProjectDescriptionContent
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
            >
              {project.longDescription}
            </ProjectDescriptionContent>
          </ProjectHeaderLeft>

          <ProjectDetailsGrid
            variants={{
              visible: { transition: { staggerChildren: 0.05, delayChildren: 0.8 } },
              hidden: {},
            }}
            initial="hidden"
            animate="visible"
          >
          {project.year && <DetailItem><DetailLabel>Year</DetailLabel><DetailValue>{project.year}</DetailValue></DetailItem>}
          {project.githubUrl && (
            <DetailItem>
              <DetailLabel>GitHub</DetailLabel>
              <DetailValue><a href={project.githubUrl} target="_blank" rel="noopener noreferrer">View Code</a></DetailValue>
            </DetailItem>
          )}
          </ProjectDetailsGrid>
        </LeftColumn>

        <RightColumn>
          <MainMediaWrapper
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            {project.externalImageUrl ? (
              <StyledExternalDetailImage
                src={project.externalImageUrl}
                alt={project.title}
              />
            ) : (
              <div>No Media Available</div>
            )}
          </MainMediaWrapper>
        </RightColumn>
      </ContentArea>

      <BottomLeftText
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        {currentTime}
      </BottomLeftText>
      <BottomRightText
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        {currentDate}
      </BottomRightText>
    </ProjectDetailContainer>
  );
};

export const query = graphql`
  query ProjectDetailQuery($slug: String!) {
    projectsJson(slug: { eq: $slug }) {
      title
      description
      longDescription
      category
      year
      type
      externalImageUrl
      githubUrl
    }
  }
`;

export default ProjectDetail;