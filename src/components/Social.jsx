import InfiniteMenu from './InfiniteMenu.jsx';
import ScrollReveal from './ScrollReveal.jsx';
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
      image: './public/images/linkedin.jpg',
      link: 'https://www.linkedin.com/in/amitesh-sonwani-141376341/',
      title: 'Linkedin',
      description: 'Professional Profile'
    },
    {
      image: './public/images/github.jpg', link: 'https://github.com/eyescratcher22', title: 'Github', description: 'get my project repos here!'
    },
    {
      image: './public/images/instagram.jpg',
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
          start: 'top 50%',
          toggleActions: 'play none none reverse',
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
        overflow: 'hidden',
      }}
      className='infinitemenu'
    >
      <InfiniteMenu items={items} />
    </div>
  );
}
