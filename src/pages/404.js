import * as React from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { motion } from "framer-motion";

const NotFoundContainer = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacings.large};
`;

const StatusCode = styled(motion.h1)`
  font-size: ${({ theme }) => theme.typography.h1};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacings.medium};
`;

const Message = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.h2};
  margin-bottom: ${({ theme }) => theme.spacings.large};
  color: ${({ theme }) => theme.colors.text};
`;

const BackHomeButton = styled(motion(Link))`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 1rem 2.5rem;
  font-size: ${({ theme }) => theme.typography.body};
  font-weight: 700;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  transition: transform ${({ theme }) => theme.transition}, box-shadow ${({ theme }) => theme.transition};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <StatusCode
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, type: 'spring', stiffness: 120 }}
      >
        404
      </StatusCode>
      <Message
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8, type: 'spring', stiffness: 120 }}
      >
        Oops, these page cant found
      </Message>
      <BackHomeButton
        to="/"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5, type: 'spring', stiffness: 150 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Back to Home
      </BackHomeButton>
    </NotFoundContainer>
  );
};

export default NotFoundPage;