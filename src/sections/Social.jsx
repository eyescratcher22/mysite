import InfiniteMenu from '../components/InfiniteMenu.jsx';
import ScrollReveal from '../components/ScrollReveal.jsx';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function NavBar() {
  const containerRef = useRef();

  const items = [
    {
      image: './images/linkedin.jpg',
      link: 'https://www.linkedin.com/in/amitesh-sonwani-141376341/',
      title: 'Linkedin',
      description: 'Professional Profile'
    },
    {
      image: './images/github.jpg', 
      link: 'https://github.com/eyescratcher22', 
      title: 'Github', 
      description: 'get my project repos here!'
    },
    {
      image: './images/instagram.jpg',
      link: 'https://www.instagram.com/_._amitesh_._/',
      title: 'Instagram',
      description: 'Personal Profile'
    },
  ];

  useGSAP(() => {
    gsap.fromTo(
      '.infinitemenu',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.inOut',
        stagger: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          refreshPriority: 1,
          invalidateOnRefresh: true,
        },
      }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        // Allow normal page scrolling
        overflowY: 'visible',
        overflowX: 'hidden',
      }}
      className='infinitemenu'
    >
      <InfiniteMenu items={items} />
    </div>
  );
}
