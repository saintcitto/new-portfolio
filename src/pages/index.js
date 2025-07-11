// src/pages/index.js

import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { motion } from 'framer-motion'; 

import Layout from '../components/Layout';
import HeroSection from '../components/HeroSection';
import ProjectsSection from '../components/ProjectsSection';

const OurWorkHeader = styled(motion.h2)`
  font-size: clamp(3rem, 8vw, 6rem);
  color: ${({ theme }) => theme.colors.primary};
  text-align: center;
  margin-bottom: 4rem;
  text-transform: uppercase;
  font-family: 'JeanLucWeb-Bold', sans-serif;
  letter-spacing: 0.05em;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-bottom: 2rem;
  }
`;

const SectionWrapper = styled(motion.section)` // <<< UBAH DARI styled.section MENJADI styled(motion.section)
  padding: 80px 5vw;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  position: relative;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 60px 5vw;
  }
`;

const IndexPage = ({ data }) => {
  const projects = data.allProjectsJson.nodes;

  return (
    <Layout>
      <HeroSection />

      <SectionWrapper 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.5 }}
      >
        <OurWorkHeader
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          My Work
        </OurWorkHeader>
        <ProjectsSection projects={projects} />
      </SectionWrapper>
    </Layout>
  );
};

export const query = graphql`
  query ProjectQuery {
    allProjectsJson {
      nodes {
        id
        title
        slug
        description
        category
        type
        year
        externalImageUrl
        githubUrl
      }
    }
  }
`;

export default IndexPage;