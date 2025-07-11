import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ProjectsSectionWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding-bottom: 80px;
  padding: ${({ theme }) => theme.spacings.large} ${({ theme }) => theme.spacings.medium};
  position: relative; // Tambahkan jika diperlukan untuk positioning children
  z-index: 1; // Tambahkan jika diperlukan untuk layering

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacings.medium} ${({ theme }) => theme.spacings.small};
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5
    }
  }
};

const ProjectsSection = ({ projects }) => {
  const topProjects = projects.slice(0, 3);
  const bottomProjects = projects.slice(3, 6);

  return (
    <ProjectsSectionWrapper
      id="projects-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {}
      <ProjectsGrid
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {topProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ProjectsGrid>

      {bottomProjects.length > 0 && (
        <ProjectsGrid
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {bottomProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </ProjectsGrid>
      )}
    </ProjectsSectionWrapper>
  );
};

export default ProjectsSection;