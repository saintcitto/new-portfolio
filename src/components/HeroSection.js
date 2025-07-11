import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'gatsby'; // Penting: Pastikan Link diimpor jika menggunakan motion(Link)

const HeroSectionContainer = styled(motion.section)`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: 0 ${({ theme }) => theme.spacings.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const ParallaxBackground = styled(motion.img)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120%; /* Lebih tinggi dari viewport untuk efek parallax */
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: -1;
`;

const BackgroundOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3); /* Overlay gelap */
  z-index: 0;
`;

const ContentWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const MainTitle = styled(motion.h1)`
  font-size: ${({ theme }) => theme.typography.h1};
  line-height: 0.8;
  color: ${({ theme }) => theme.colors.text};
  text-shadow: 4px 4px 15px rgba(0, 0, 0, 0.7);
  letter-spacing: 0.1em;
  margin-top: -10vh;
  position: relative;
  z-index: 20;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: clamp(3rem, 12vw, 8rem);
    margin-top: -5vh;
  }
`;

const TopLeftText = styled(motion.p)`
  position: absolute;
  top: 5vh;
  left: 5vw;
  font-size: ${({ theme }) => theme.typography.body};
  font-weight: 300;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  z-index: 20;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.small};
    top: 3vh;
    left: 3vw;
  }
`;

const TopRightText = styled(motion.p)`
  position: absolute;
  top: 5vh;
  right: 5vw;
  font-size: ${({ theme }) => theme.typography.body};
  font-weight: 300;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  z-index: 20;
  text-transform: uppercase;
  letter-spacing: 0.1em;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.typography.small};
    top: 3vh;
    right: 3vw;
  }
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

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.7rem;
    bottom: 3vh;
    right: 3vw;
  }
`;

const HomepageFooter = styled(motion.div)`
  position: absolute;
  bottom: 2vh;
  width: 100%;
  text-align: center;
  font-size: ${({ theme }) => theme.typography.small};
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
  z-index: 20;
  letter-spacing: 0.05em;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 0.7rem;
    bottom: 1.5vh;
  }
`;

const SmallTextLeft = styled(motion.span)`
  font-size: 0.8em;
  font-weight: 400;
  text-transform: lowercase;
  letter-spacing: 0.02em;
  margin-right: 1.5rem;
  color: inherit;
  font-family: 'JeanLucWeb-Bold', sans-serif;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-right: 0.8rem;
    font-size: 0.7em;
  }
`;

const MainButtonText = styled(motion.span)`
  font-size: 1.5em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: inherit;
  font-family: 'JeanLucWeb-Bold', sans-serif;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 1.2em;
    letter-spacing: 0.08em;
  }
`;

const SmallTextRight = styled(motion.span)`
  font-size: 0.8em;
  font-weight: 400;
  text-transform: lowercase;
  letter-spacing: 0.02em;
  margin-left: 1.5rem;
  color: inherit;
  font-family: 'JeanLucWeb-Bold', sans-serif;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin-left: 0.8rem;
    font-size: 0.7em;
  }
`;

const CallToActionButton = styled(motion(Link))` /* Menggunakan Link Gatsby */
  background-color: transparent;
  border: 1px solid rgb(252, 248, 201);
  color: rgb(252, 248, 201);
  padding: 1.2rem 3rem;
  font-weight: 700;
  border-radius: 999px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  transition: background-color 0.4s ease-in-out, color 0.4s ease-in-out, transform 0.4s ease-in-out, box-shadow 0.4s ease-in-out;
  margin-top: 5vh;
  z-index: 20;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'JeanLucWeb-Bold', sans-serif;

  &:hover {
    background-color: rgb(252, 248, 201);
    color: #1a1a1a;
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.7);
  }

  &:active {
    transform: translateY(-2px) scale(0.98);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 1rem 2rem;
    font-size: ${({ theme }) => theme.typography.small};
    margin-top: 3vh;
  }
`;

// Komponen baru untuk garis vertikal
const VerticalLine = styled(motion.div)`
  position: absolute;
  top: 0;
  height: 100%;
  width: 1px; /* Lebar garis */
  background-color: rgba(255, 255, 255, 0.1); /* Warna garis, semi-transparan */
  z-index: 1; /* Pastikan di atas background overlay tapi di bawah konten */

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none; /* Sembunyikan garis di tablet dan mobile jika terlalu ramai */
  }
`;

const HeroSection = ({ bgImage }) => {
  const parallaxRef = useRef(null);
  const [offsetY, setOffsetY] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isGifLoaded, setIsGifLoaded] = useState(false);

  const updateDateTime = () => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options).toUpperCase());
  };

  const handleScroll = () => {
    if (parallaxRef.current) {
      setOffsetY(window.pageYOffset * 0.3);
    }
  };

  const handleGifLoad = () => {
    setIsGifLoaded(true);
    console.log("GIF loaded successfully!");
  };

  const handleGifError = (e) => {
    setIsGifLoaded(false);
    e.target.onerror = null;
    e.target.src = '/cinematic-bg.jpg';
    console.error("Failed to load GIF, falling back to JPG.", e);
  };

  useEffect(() => {
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const cornerTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  // Varian animasi baru untuk garis vertikal (dari atas ke bawah)
  const lineVariants = {
    hidden: { y: -500, opacity: 0 }, // Mulai jauh di atas, sepenuhnya transparan
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
  };

  const gifUrl = '/cinematic.gif';

  return (
    <HeroSectionContainer
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.50, // Jeda antar animasi anak
            delayChildren: 0.20, // Tunda animasi anak agar elemen utama muncul lebih dulu
          },
        },
        hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
      }}
    >
      <ParallaxBackground
        ref={parallaxRef}
        src={gifUrl}
        alt="Cinematic Background GIF"
        style={{ transform: `translateY(${offsetY}px)` }}
        onLoad={handleGifLoad}
        onError={handleGifError}
      />
      <BackgroundOverlay
        initial={{ opacity: 2}}
        animate={{ opacity: isGifLoaded ? 10 : 1 }}
        transition={{ duration: 0.8 }}
      />

      {/* Menambahkan 5 garis vertikal dengan animasi */}
      <VerticalLine style={{ left: '10%' }} variants={lineVariants} />
      <VerticalLine style={{ left: '30%' }} variants={lineVariants} />
      <VerticalLine style={{ left: '50%' }} variants={lineVariants} />
      <VerticalLine style={{ left: '70%' }} variants={lineVariants} />
      <VerticalLine style={{ left: '90%' }} variants={lineVariants} />

      <ContentWrapper>
        <TopLeftText
          variants={cornerTextVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
        >
          Deus Vult
        </TopLeftText>

        <MainTitle
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, type: 'spring', stiffness: 120 }}
        >
          VIM
          </MainTitle>

        <BottomLeftText
          variants={cornerTextVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.0 }}
        >
          {currentTime}
        </BottomLeftText>
        <BottomRightText
          variants={cornerTextVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.0 }}
        >
          {currentDate}
        </BottomRightText>

        <HomepageFooter
          variants={cornerTextVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.2 }}
        >
          © {new Date().getFullYear()} Made by Me (ryanshahteja@gmail.com)
        </HomepageFooter>

      </ContentWrapper>
    </HeroSectionContainer>
  );
};

export default HeroSection;