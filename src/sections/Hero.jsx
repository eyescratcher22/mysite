import React from 'react';
import { words } from '../constants/index.js';
import Button from '../components/Button.jsx';
import HeroExperience from '../components/HeroModels/HeroExperience.jsx';
import RotatingText from '../components/RotatingText.jsx';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Aurora from '../components/Aurora.jsx';
import Dock from '../components/Dock.jsx';
import { FaHome, FaUserFriends, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo('.hero-text , .hero-3d-layout', {
      y: 50, opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
      stagger: 0.2
    });
  });

const items = [
    {
    icon: <FaHome size={20} />,
    label: 'Home',
    onClick: () => (window.location.href = '/')
  },
  {
    icon: <FaUserFriends size={20} />,
    label: 'Social',
    onClick: () => (window.location.href = '/social')
  },
  {
    icon: <FaProjectDiagram size={20} />,
    label: 'Projects',
    onClick: () => (window.location.href = '/projects')
  },
{
    icon: <FaEnvelope size={20} />,
    label: 'Contact',
    onClick: () => (window.location.href = '/contact')
  }
];


  return (
    <section id='hero' className='relative w-screen h-screen overflow-hidden'>

    
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
      <h1 style={{}}>Amitesh</h1>
        <Dock
          items={items}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
        />
      </div>

      {/* Aurora Background */}
      <div className='absolute inset-0 w-full h-full z-0'>
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* Hero Content */}
      <div className='hero-layout relative z-10'>
        <header className='flex flex-col justify-center md:w-full w-screen md:px-20 px-5 h-full'>
          <figure>
            <div className='hero-3d-layout'>
              <HeroExperience />
            </div>
          </figure>
          <div className='flex flex-col gap-7'>
            <div className='hero-text'>
              <div>
                <RotatingText
                  texts={['नमस्ते!', 'Hello!', 'Bonjour!', 'Hola!']}
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 150 }}
                  rotationInterval={3500}
                />
                <h1 style={{ fontSize: "3rem" }}>AMITESH's ROOM</h1>
              </div>
              <h1>
                Engineering <span className='slide'>
                  <span className='wrapper'>
                    {words.map((word) => (
                      <span key={word.text} className='flex items-center md:gap-3 gap-1 pb-2'>
                        <img
                          src={word.imgPath}
                          alt={word.text}
                          className='xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50'
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
            </div>
            <p className='text-white-50 md:text-xl relative z-10 pointer-events-none'>IITRoorkee</p>
            <p className='text-white-50 md:text-xl relative z-10 pointer-events-none'>Freelancing. Developer. Designer.</p>
            <Button
              className='md:w-80 md:h-16 w-60 h-12'
              id='button'
              text='Explore Projects'
            />
          </div>
        </header>
      </div>

    </section>
  );
};

export default Hero;
