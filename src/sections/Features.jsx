import CardSwap, { Card } from '../components/CardSwap';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const containerRef = useRef(null); 

  useGSAP(() => {
    gsap.fromTo(
      '.cardswap',
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
      style={{ height: '600px', position: 'relative' }}
      className="cardswap"
    >
      <CardSwap cardDistance={60} verticalDistance={70} delay={5000} pauseOnHover={true}>
  <Card>
    <h3>Reliable</h3>
    <p>Clean, scalable code with consistent delivery — every time. I take ownership of every project and ensure it runs smoothly from start to finish.</p>
  </Card>
  <Card>
    <h3>On-Time</h3>
    <p>Deadlines matter. I respect your time by delivering quality work on schedule without compromising performance or detail.</p>
  </Card>
  <Card>
    <h3>Modern & Responsive</h3>
    <p>Pixel-perfect design that adapts to every screen. I build fast, mobile-friendly web apps using the latest frontend and backend technologies.</p>
  </Card>
</CardSwap>

    </div>
  );
}
