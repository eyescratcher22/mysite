import React from 'react';
import Particles from '../components/Particles';

const About = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, width: '100%', height: '100%' }}>
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '10rem', color: 'white' }}>
        <h1>About Section</h1>
      </div>
    </div>
  );
};

export default About;
