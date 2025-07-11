import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { motion } from 'framer-motion';

const HeaderWrapper = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 5vw;
  background-color: ${({ theme }) => theme.colors.headerBackground};
  color: ${({ theme }) => theme.colors.headerText};
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 15px 5vw;
  }
`;

const Logo = styled(Link)`
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-family: 'JeanLucWeb-Bold', sans-serif;
  letter-spacing: 0.02em;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 30px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    gap: 15px;
  }
`;

const NavLink = styled(Link)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.headerText};
  text-decoration: none;
  position: relative;
  transition: color 0.3s ease;
  font-family: 'JeanLucWeb-Regular', sans-serif;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    display: block;
    margin-top: 5px;
    right: 0;
    background: ${({ theme }) => theme.colors.primary};
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
    left: 0;
    background: ${({ theme }) => theme.colors.primary};
  }
`;