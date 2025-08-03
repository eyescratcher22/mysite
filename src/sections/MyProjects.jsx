import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Monitor, Cpu, HardDrive, Gamepad2, Music, Film, Code, Github, ExternalLink, Star, Zap, Settings, Play, Pause, Volume2, Wifi, Terminal, Folder, Lock, Shield } from 'lucide-react';

// Loading Screen Component
const LoadingScreen = ({ onLoadingComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [loadingText, setLoadingText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [progress, setProgress] = useState(0);
  const [systemStatus, setSystemStatus] = useState({
    firewall: false,
    encryption: false,
    authentication: false,
    database: false
  });

  const loadingSteps = [
    { text: "Initializing secure connection...", duration: 800 },
    { text: "Accessing Amiteesh's encrypted files...", duration: 1000 },
    { text: "Authenticating user permissions...", duration: 700 },
    { text: "Decrypting project database...", duration: 900 },
    { text: "Loading portfolio modules...", duration: 800 },
    { text: "Establishing secure tunnel...", duration: 600 },
    { text: "Finalizing system handshake...", duration: 700 }
  ];

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentStep < loadingSteps.length) {
      const step = loadingSteps[currentStep];
      let charIndex = 0;
      
      const typeText = () => {
        if (charIndex <= step.text.length) {
          setLoadingText(step.text.substring(0, charIndex));
          charIndex++;
          setTimeout(typeText, 30);
        } else {
          // Update system status based on step
          if (currentStep === 1) setSystemStatus(prev => ({ ...prev, firewall: true }));
          if (currentStep === 2) setSystemStatus(prev => ({ ...prev, encryption: true }));
          if (currentStep === 3) setSystemStatus(prev => ({ ...prev, authentication: true }));
          if (currentStep === 4) setSystemStatus(prev => ({ ...prev, database: true }));
          
          setTimeout(() => {
            setCurrentStep(prev => prev + 1);
          }, step.duration - (step.text.length * 30));
        }
      };
      
      typeText();
    } else {
      setTimeout(() => {
        onLoadingComplete();
      }, 500);
    }
  }, [currentStep, onLoadingComplete]);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const targetProgress = ((currentStep + 1) / loadingSteps.length) * 100;
        if (prev < targetProgress) {
          return Math.min(prev + 2, targetProgress);
        }
        return prev;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [currentStep]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <div
              key={i}
              className="border border-blue-500/20 animate-pulse"
              style={{
                animationDelay: `${(i * 100)}ms`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-2xl w-full mx-4">
        {/* Main Terminal Window */}
        <div className="bg-gray-900 rounded-lg border-2 border-blue-500/30 shadow-2xl overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
                </div>
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-blue-400" />
                  <span className="text-blue-400 font-mono text-sm">SecurePortfolio Terminal v3.1.4</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-xs font-mono text-green-400">ENCRYPTED</span>
              </div>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 bg-black/50">
            {/* Header Info */}
            <div className="mb-6">
              <div className="text-green-400 font-mono text-sm mb-2">
                root@amiteesh-portfolio:~$
              </div>
              <div className="text-blue-400 font-mono text-lg mb-4">
                SECURE ACCESS PROTOCOL INITIATED
              </div>
            </div>

            {/* System Status Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className={`bg-gray-800 rounded p-3 border transition-colors duration-500 ${
                systemStatus.firewall ? 'border-green-500/50 bg-green-500/10' : 'border-gray-600'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className={`w-4 h-4 ${systemStatus.firewall ? 'text-green-400' : 'text-gray-400'}`} />
                  <span className="text-xs font-mono text-gray-300">FIREWALL</span>
                </div>
                <div className={`text-sm font-bold font-mono ${
                  systemStatus.firewall ? 'text-green-400' : 'text-gray-400'
                }`}>
                  {systemStatus.firewall ? 'ACTIVE' : 'PENDING'}
                </div>
              </div>

              <div className={`bg-gray-800 rounded p-3 border transition-colors duration-500 ${
                systemStatus.encryption ? 'border-blue-500/50 bg-blue-500/10' : 'border-gray-600'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Lock className={`w-4 h-4 ${systemStatus.encryption ? 'text-blue-400' : 'text-gray-400'}`} />
                  <span className="text-xs font-mono text-gray-300">ENCRYPTION</span>
                </div>
                <div className={`text-sm font-bold font-mono ${
                  systemStatus.encryption ? 'text-blue-400' : 'text-gray-400'
                }`}>
                  {systemStatus.encryption ? 'AES-256' : 'PENDING'}
                </div>
              </div>

              <div className={`bg-gray-800 rounded p-3 border transition-colors duration-500 ${
                systemStatus.authentication ? 'border-purple-500/50 bg-purple-500/10' : 'border-gray-600'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className={`w-4 h-4 ${systemStatus.authentication ? 'text-purple-400' : 'text-gray-400'}`} />
                  <span className="text-xs font-mono text-gray-300">AUTH</span>
                </div>
                <div className={`text-sm font-bold font-mono ${
                  systemStatus.authentication ? 'text-purple-400' : 'text-gray-400'
                }`}>
                  {systemStatus.authentication ? 'VERIFIED' : 'PENDING'}
                </div>
              </div>

              <div className={`bg-gray-800 rounded p-3 border transition-colors duration-500 ${
                systemStatus.database ? 'border-yellow-500/50 bg-yellow-500/10' : 'border-gray-600'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Folder className={`w-4 h-4 ${systemStatus.database ? 'text-yellow-400' : 'text-gray-400'}`} />
                  <span className="text-xs font-mono text-gray-300">DATABASE</span>
                </div>
                <div className={`text-sm font-bold font-mono ${
                  systemStatus.database ? 'text-yellow-400' : 'text-gray-400'
                }`}>
                  {systemStatus.database ? 'LOADED' : 'PENDING'}
                </div>
              </div>
            </div>

            {/* Loading Text */}
            <div className="mb-6">
              <div className="text-green-400 font-mono text-sm mb-2">
                $ secure_access --user=visitor --target=portfolio
              </div>
              <div className="text-cyan-400 font-mono text-sm min-h-[20px]">
                {loadingText}
                {showCursor && <span className="animate-pulse">|</span>}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-gray-400">LOADING PROGRESS</span>
                <span className="text-xs font-mono text-blue-400">{Math.round(Math.min(100, Math.max(0, progress)))}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full transition-all duration-300 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Matrix-style animation */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-green-400 font-mono text-xs">
                <span>ESTABLISHING CONNECTION</span>
                <div className="flex gap-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 h-1 bg-green-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Status */}
        <div className="mt-4 text-center">
          <div className="inline-block bg-gray-900/80 backdrop-blur-sm rounded px-4 py-2 border border-gray-700">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-mono">
              <Wifi className="w-3 h-3" />
              <span>Secure connection established</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Animated System Heading Component
const AnimatedProjectsHeading = () => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [systemStats, setSystemStats] = useState({
    cpu: 0,
    gpu: 0,
    ram: 0
  });
  
  const fullText = 'MY_PROJECTS';
  
  useEffect(() => {
    let index = 0;
    const typeText = () => {
      if (index <= fullText.length) {
        setDisplayText(fullText.substring(0, index));
        index++;
        setTimeout(typeText, 120);
      } else {
        setIsComplete(true);
      }
    };
    
    const timer = setTimeout(typeText, 300);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  // Animate system stats
  useEffect(() => {
    if (isComplete) {
      const interval = setInterval(() => {
        setSystemStats({
          cpu: Math.floor(Math.random() * 30) + 60,
          gpu: Math.floor(Math.random() * 40) + 50,
          ram: Math.floor(Math.random() * 20) + 70
        });
      }, 2000);
      
      return () => clearInterval(interval);
    }
  }, [isComplete]);
  
  return (
    <div className="text-center mb-8">
      <div className="inline-block bg-gray-900 rounded-lg border border-gray-700 px-8 py-6 shadow-2xl">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-mono text-sm">System Portfolio</span>
          </div>
        </div>
        
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-mono font-bold text-white mb-4">
            {displayText}
            {showCursor && (
              <span className="text-blue-400 animate-pulse">|</span>
            )}
          </h1>
          
          {isComplete && (
            <div className="grid grid-cols-3 gap-4 mt-6 animate-fade-in">
              <div className="bg-black/50 rounded p-3 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-mono text-gray-400">CPU</span>
                </div>
                <div className="text-lg font-bold text-blue-400 font-mono">{systemStats.cpu}%</div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                  <div 
                    className="bg-blue-400 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${systemStats.cpu}%` }}
                  />
                </div>
              </div>
              
              <div className="bg-black/50 rounded p-3 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <Monitor className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-mono text-gray-400">GPU</span>
                </div>
                <div className="text-lg font-bold text-green-400 font-mono">{systemStats.gpu}%</div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                  <div 
                    className="bg-green-400 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${systemStats.gpu}%` }}
                  />
                </div>
              </div>
              
              <div className="bg-black/50 rounded p-3 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <HardDrive className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-mono text-gray-400">RAM</span>
                </div>
                <div className="text-lg font-bold text-purple-400 font-mono">{systemStats.ram}%</div>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                  <div 
                    className="bg-purple-400 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${systemStats.ram}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {isComplete && (
        <div className="mt-4 text-gray-400 text-sm font-mono animate-fade-in">
          Portfolio loaded successfully • 6 applications running
        </div>
      )}
    </div>
  );
};

// Get category icon and color
const getCategoryConfig = (category) => {
  const configs = {
    'WEB_APP': { icon: Monitor, color: 'blue', bg: 'bg-blue-500/20', border: 'border-blue-500/30' },
    'GAME': { icon: Gamepad2, color: 'green', bg: 'bg-green-500/20', border: 'border-green-500/30' },
    'MUSIC': { icon: Music, color: 'purple', bg: 'bg-purple-500/20', border: 'border-purple-500/30' },
    'MEDIA': { icon: Film, color: 'red', bg: 'bg-red-500/20', border: 'border-red-500/30' },
    'TOOL': { icon: Settings, color: 'yellow', bg: 'bg-yellow-500/20', border: 'border-yellow-500/30' },
    'API': { icon: Wifi, color: 'cyan', bg: 'bg-cyan-500/20', border: 'border-cyan-500/30' }
  };
  return configs[category] || configs['WEB_APP'];
};

// Individual Project Card Component
const ProjectCard = ({ project, index, isVisible }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [processOutput, setProcessOutput] = useState([]);
  const [systemLoad, setSystemLoad] = useState({ cpu: 0, gpu: 0, ram: 0 });
  
  const config = getCategoryConfig(project.category);
  const IconComponent = config.icon;

  const handleRun = useCallback(() => {
    if (isRunning) return;
    
    setIsRunning(true);
    setProcessOutput([]);
    
    const processLines = [
      '◐ Initializing application...',
      `◑ Loading ${project.name.toLowerCase()} modules...`,
      `◒ Allocating system resources...`,
      `◓ Starting ${project.category.toLowerCase()} process...`,
      `✓ ${project.name} is now running successfully`
    ];
    
    // Simulate system load
    setSystemLoad({
      cpu: Math.floor(Math.random() * 40) + 30,
      gpu: Math.floor(Math.random() * 60) + 20,
      ram: Math.floor(Math.random() * 30) + 40
    });
    
    let currentIndex = 0;
    const displayNextLine = () => {
      if (currentIndex < processLines.length) {
        setProcessOutput(prev => [...prev, processLines[currentIndex]]);
        currentIndex++;
        setTimeout(displayNextLine, 400);
      } else {
        setTimeout(() => {
          setIsRunning(false);
          setProcessOutput([]);
          setSystemLoad({ cpu: 0, gpu: 0, ram: 0 });
        }, 2000);
      }
    };
    
    displayNextLine();
  }, [project, isRunning]);

  return (
    <div 
      className={`bg-gray-900 rounded-lg border border-gray-700 shadow-xl overflow-hidden transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      } hover:shadow-2xl group ${config.bg} ${config.border}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Application Header */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            </div>
            <div className="flex items-center gap-2">
              <IconComponent className={`w-4 h-4 text-${config.color}-400`} />
              <span className={`text-${config.color}-400 font-mono text-sm`}>{project.name}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-xs font-mono text-gray-400">{isRunning ? 'RUNNING' : 'IDLE'}</span>
          </div>
        </div>
      </div>

      {/* Application Content */}
      <div className="p-4">
        {/* Project Info */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-white font-mono font-bold text-lg">{project.name}</h3>
            <span className={`text-xs bg-${config.color}-600 text-white px-2 py-1 rounded font-mono`}>
              {project.category}
            </span>
          </div>
          
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1 mb-3">
            {project.tech.map((tech, i) => (
              <span key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-600 font-mono">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* System Resources (when running) */}
        {isRunning && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-black/50 rounded p-2 border border-gray-700">
              <div className="flex items-center gap-1 mb-1">
                <Cpu className="w-3 h-3 text-blue-400" />
                <span className="text-xs text-blue-400 font-mono">CPU</span>
              </div>
              <div className="text-sm font-bold text-blue-400 font-mono">{systemLoad.cpu}%</div>
            </div>
            <div className="bg-black/50 rounded p-2 border border-gray-700">
              <div className="flex items-center gap-1 mb-1">
                <Monitor className="w-3 h-3 text-green-400" />
                <span className="text-xs text-green-400 font-mono">GPU</span>
              </div>
              <div className="text-sm font-bold text-green-400 font-mono">{systemLoad.gpu}%</div>
            </div>
            <div className="bg-black/50 rounded p-2 border border-gray-700">
              <div className="flex items-center gap-1 mb-1">
                <HardDrive className="w-3 h-3 text-purple-400" />
                <span className="text-xs text-purple-400 font-mono">RAM</span>
              </div>
              <div className="text-sm font-bold text-purple-400 font-mono">{systemLoad.ram}%</div>
            </div>
          </div>
        )}

        {/* Process Output */}
        {processOutput.length > 0 && (
          <div className="bg-black/50 rounded p-3 border border-gray-700 mb-4 min-h-[100px]">
            {processOutput.map((line, i) => (
              <div key={i} className={`text-${config.color}-400 text-xs font-mono mb-1`}>
                {line}
              </div>
            ))}
            {isRunning && (
              <div className="flex items-center gap-2 text-gray-400 mt-2">
                <span className="text-xs font-mono">Processing</span>
                <div className="flex gap-1">
                  <div className={`w-1 h-1 bg-${config.color}-400 rounded-full animate-bounce`} />
                  <div className={`w-1 h-1 bg-${config.color}-400 rounded-full animate-bounce`} style={{ animationDelay: '0.1s' }} />
                  <div className={`w-1 h-1 bg-${config.color}-400 rounded-full animate-bounce`} style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Project Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-black/50 rounded p-2 border border-gray-700 text-center">
            <div className={`text-sm font-bold text-${config.color}-400 font-mono`}>{project.version || '2.1'}</div>
            <div className="text-xs text-gray-400 font-mono">VERSION</div>
          </div>
          <div className="bg-black/50 rounded p-2 border border-gray-700 text-center">
            <div className="text-sm font-bold text-yellow-400 font-mono">{project.stars || '15'}</div>
            <div className="text-xs text-gray-400 font-mono">STARS</div>
          </div>
          <div className="bg-black/50 rounded p-2 border border-gray-700 text-center">
            <div className="text-sm font-bold text-green-400 font-mono">{project.size || '2.5MB'}</div>
            <div className="text-xs text-gray-400 font-mono">SIZE</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className={`flex-1 flex items-center justify-center gap-2 bg-${config.color}-600 hover:bg-${config.color}-700 text-white px-3 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none font-mono text-xs`}
          >
            {isRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {isRunning ? 'RUNNING' : 'RUN'}
          </button>
          
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 font-mono text-xs"
            >
              <Github className="w-3 h-3" />
              CODE
            </a>
          )}
          
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 font-mono text-xs"
            >
              <ExternalLink className="w-3 h-3" />
              DEMO
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Projects Component
export default function MyProjects() {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleProjects, setVisibleProjects] = useState(new Set());
  const observerRef = useRef(null);

  // Sample project data with computer-related categories
  const projects = [
  {
    name: "",
    category: "",
    description: "",
    tech: ["React", "Node.js", "WebGL", "Socket.io", "MongoDB"],
    version: "",
    stars: "",
    size: "",
    github: "",
    demo: ""
  },
  {
    name: "",
    category: "",
    description: "",
    tech: ["Vue.js", "Python", "FFmpeg", "Redis", "PostgreSQL"],
    version: "",
    stars: "",
    size: "",
    github: "",
    demo: ""
  },
  {
    name: "",
    category: "",
    description: "",
    tech: ["JavaScript", "WebRTC", "FFmpeg", "AWS", "Docker"],
    version: "",
    stars: "",
    size: "",
    github: "",
    demo: ""
  },
  {
    name: "",
    category: "",
    description: "",
    tech: ["Electron", "TypeScript", "SQLite", "Jest", "Webpack"],
    version: "",
    stars: "",
    size: "",
    github: "",
    demo: ""
  },
  {
    name: "",
    category: "",
    description: "",
    tech: ["Next.js", "Go", "PostgreSQL", "Redis", "Docker"],
    version: "",
    stars: "",
    size: "",
    github: "",
    demo: ""
  },
  {
    name: "",
    category: "",
    description: "",
    tech: ["Go", "Kubernetes", "Prometheus", "Grafana", "PostgreSQL"],
    version: "",
    stars: "",
    size: "",
    github: "",
    demo: ""
  }
];


  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            setVisibleProjects(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const setProjectRef = useCallback((element, index) => {
    if (element && observerRef.current) {
      element.dataset.index = index;
      observerRef.current.observe(element);
    }
  }, []);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-7xl mx-auto">
        {/* Animated Heading */}
        <AnimatedProjectsHeading />
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => setProjectRef(el, index)}
            >
              <ProjectCard 
                project={project} 
                index={index}
                isVisible={visibleProjects.has(index)}
              />
            </div>
          ))}
        </div>

        {/* System Footer */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-gray-900 rounded-lg border border-gray-700 px-6 py-3">
            <div className="flex items-center gap-3 text-blue-400 text-sm font-mono">
              <Monitor className="w-4 h-4" />
              <span>System Portfolio • All applications loaded</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse ml-2" />
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}