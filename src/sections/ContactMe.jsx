import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Send, Terminal, User, Mail, MessageSquare, MapPin, Clock, Briefcase, Zap, Shield, Code } from 'lucide-react';

export default function ContactMe() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [displayData, setDisplayData] = useState({ name: '', email: '', message: '' });
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const ACCESS_KEY = 'a213bf9e-9484-419c-ac7e-6c946af49e45';

  // Optimized cursor blinking with cleanup
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Smooth typing animation for screen display
  const animateText = useCallback((text, field) => {
    let index = 0;
    const animate = () => {
      if (index <= text.length) {
        setDisplayData(prev => ({
          ...prev,
          [field]: text.substring(0, index)
        }));
        index++;
        setTimeout(animate, 50);
      }
    };
    animate();
  }, []);

  // Memoized input handler with screen animation
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Animate text on screen with slight delay
    setTimeout(() => {
      animateText(value, name);
    }, 100);
  }, [animateText]);

  // Optimized terminal animation
  const animateTerminalOutput = useCallback((lines, onComplete) => {
    setTerminalOutput([]);
    
    let currentIndex = 0;
    const displayNextLine = () => {
      if (currentIndex < lines.length) {
        setTerminalOutput(prev => [...prev, lines[currentIndex]]);
        currentIndex++;
        timeoutRef.current = setTimeout(displayNextLine, 400);
      } else {
        if (onComplete) onComplete();
      }
    };
    
    displayNextLine();
  }, []);

  // Terminal submission
  const simulateTerminalSubmit = useCallback(async () => {
    setIsTyping(true);

    const initialCommands = [
      '$ initiating secure connection...',
      '$ validating contact information...',
      '$ preparing message transmission...',
      '$ establishing encrypted channel...',
    ];

    animateTerminalOutput(initialCommands, async () => {
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('access_key', ACCESS_KEY);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('message', formData.message);
        formDataToSend.append('subject', `New Contact Form Message from ${formData.name}`);
        formDataToSend.append('from_name', formData.name);

        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formDataToSend,
        });

        const data = await response.json();

        if (data.success) {
          const successMessages = [
            '$ message transmitted successfully',
            '$ thank you for reaching out',
            '$ you will receive a response within 24 hours',
            '$ connection terminated gracefully',
          ];
          animateTerminalOutput(successMessages, () => {
            setIsTyping(false);
            setTimeout(() => {
              setFormData({ name: '', email: '', message: '' });
              setDisplayData({ name: '', email: '', message: '' });
            }, 1000);
            timeoutRef.current = setTimeout(() => {
              setTerminalOutput([]);
            }, 3000);
          });
        } else {
          throw new Error(data.message || 'Failed to send message');
        }
      } catch (err) {
        const errorMessages = [
          '$ transmission failed - network error',
          '$ please verify your connection and retry',
        ];
        animateTerminalOutput(errorMessages, () => {
          setIsTyping(false);
        });
      }
    });
  }, [formData, animateTerminalOutput]);

  const handleSubmit = useCallback(() => {
    if (!isTyping && formData.name && formData.email && formData.message) {
      simulateTerminalSubmit();
    }
  }, [isTyping, formData, simulateTerminalSubmit]);

  // Memoize form validation
  const isFormValid = useMemo(() => {
    return formData.name.trim() && formData.email.trim() && formData.message.trim();
  }, [formData]);

  return (
    <div className="min-h-screen bg-black p-4 flex items-center justify-center">
      <div className="w-full max-w-7xl">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Terminal Form - Much Smaller */}
          <div className="xl:col-span-2 bg-gray-900 rounded-lg border border-gray-700 shadow-2xl overflow-hidden max-h-[600px]">
            {/* Terminal Header */}
            <div className="bg-gray-800 px-3 py-2 flex items-center gap-2 border-b border-gray-700">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center gap-2 ml-3">
                <Terminal className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-400 font-mono text-xs">contact@amitesh.terminal</span>
              </div>
            </div>

            {/* Terminal Content - Much more compact */}
            <div className="p-3 font-mono text-xs max-h-[550px] overflow-y-auto">
              <div className="text-green-400 mb-3">
                <span className="text-purple-400">amitesh@portfolio</span>:
                <span className="text-blue-400">~/contact</span>$ contact-form --interactive
              </div>

              <div className="space-y-3">
                {/* Name Input */}
                <div>
                  <label className="flex items-center gap-1.5 text-yellow-400 mb-1.5">
                    <User className="w-3 h-3" />
                    Enter your name:
                  </label>
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">{'>'}</span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-transparent text-white outline-none flex-1 border-b border-gray-600 pb-1 focus:border-green-400 transition-colors duration-200 text-xs"
                      placeholder="John Doe"
                      required
                      disabled={isTyping}
                    />
                    {showCursor && formData.name === '' && !isTyping && (
                      <span className="text-white animate-pulse">_</span>
                    )}
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="flex items-center gap-1.5 text-yellow-400 mb-1.5">
                    <Mail className="w-3 h-3" />
                    Enter your email:
                  </label>
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">{'>'}</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-transparent text-white outline-none flex-1 border-b border-gray-600 pb-1 focus:border-green-400 transition-colors duration-200 text-xs"
                      placeholder="john@example.com"
                      required
                      disabled={isTyping}
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label className="flex items-center gap-1.5 text-yellow-400 mb-1.5">
                    <MessageSquare className="w-3 h-3" />
                    Enter your message:
                  </label>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">{'>'}</span>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="2"
                      className="bg-transparent text-white outline-none flex-1 border border-gray-600 p-1.5 rounded focus:border-green-400 transition-colors duration-200 resize-none text-xs"
                      placeholder="Your message here..."
                      required
                      disabled={isTyping}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isTyping || !isFormValid}
                  className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-sans font-semibold text-xs"
                >
                  <Send className="w-3 h-3" />
                  {isTyping ? 'Sending...' : 'Execute Contact'}
                </button>
              </div>

              {/* Terminal Output */}
              {terminalOutput.length > 0 && (
                <div className="mt-3 border-t border-gray-700 pt-2">
                  {terminalOutput.map((line, index) => (
                    <div key={index} className="text-green-400 mb-1 text-xs">
                      {line}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex items-center gap-2 text-green-400 mt-2">
                      <span className="text-xs">Processing</span>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" />
                        <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Computer Screen - Wider */}
          <div className="xl:col-span-3">
            <ComputerScreen displayData={displayData} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Computer Screen Component with new layout
const ComputerScreen = React.memo(({ displayData }) => (
  <div className="relative">
    {/* Monitor Frame - Compact for desktop */}
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 shadow-2xl border border-gray-700">
      {/* Screen - Compact height */}
      <div className="bg-black rounded-lg p-6 min-h-[600px] relative overflow-hidden border border-gray-700">
        {/* Screen content */}
        <div className="relative z-10 h-full">
          {/* New layout: Contact preview on top, stats below */}
          <div className="space-y-6 h-full">
            
            {/* Top Section - Contact Preview (Full Width) */}
            <div className="w-full">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-green-400 text-lg font-mono">CONTACT PREVIEW</h3>
              </div>

              {/* Data Display - Horizontal layout for better desktop viewing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Name Display */}
                <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                  <div className="text-yellow-400 text-xs font-mono mb-2">NAME:</div>
                  <div className="text-white font-mono text-sm h-6 flex items-center">
                    {displayData.name || <span className="text-gray-500">Awaiting input...</span>}
                    {displayData.name && <span className="animate-pulse text-green-400 ml-1">_</span>}
                  </div>
                </div>

                {/* Email Display */}
                <div className="bg-gray-900 rounded-lg p-3 border border-gray-700">
                  <div className="text-yellow-400 text-xs font-mono mb-2">EMAIL:</div>
                  <div className="text-white font-mono text-sm h-6 flex items-center">
                    {displayData.email || <span className="text-gray-500">Awaiting input...</span>}
                    {displayData.email && <span className="animate-pulse text-green-400 ml-1">_</span>}
                  </div>
                </div>

                {/* Message Display */}
                <div className="bg-gray-900 rounded-lg p-3 border border-gray-700 md:col-span-1">
                  <div className="text-yellow-400 text-xs font-mono mb-2">MESSAGE:</div>
                  <div className="text-white font-mono text-xs h-16 flex items-start overflow-hidden">
                    {displayData.message ? (
                      <div className="whitespace-pre-wrap leading-relaxed truncate">
                        {displayData.message.substring(0, 50)}
                        {displayData.message.length > 50 && '...'}
                        <span className="animate-pulse text-green-400">_</span>
                      </div>
                    ) : (
                      <span className="text-gray-500">Awaiting input...</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section - Side by side stats panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
              
              {/* Left Panel - Secure Connection */}
              <div className="bg-gray-900 rounded-lg border border-green-500/30 shadow-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-transparent to-green-500/20 animate-pulse"></div>
                
                <div className="relative p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-4 h-4 text-green-400" />
                    <h3 className="text-sm font-bold text-green-400 font-mono">SECURE_CONNECTION</h3>
                  </div>
                  
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="text-green-400 font-mono">></span>
                      <span className="font-mono">Initiating encrypted handshake...</span>
                    </div>
                    
                    <div className="bg-black/50 rounded p-3 border border-gray-700">
                      <div className="grid grid-cols-1 gap-2 text-xs font-mono">
                        <div className="flex justify-between">
                          <span className="text-yellow-400">STATUS:</span>
                          <span className="text-green-400">ONLINE</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-yellow-400">RESPONSE:</span>
                          <span className="text-green-400">&lt; 24h</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-yellow-400">LOCATION:</span>
                          <span className="text-green-400">IIT_ROORKEE</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-yellow-400">ENCRYPTION:</span>
                          <span className="text-green-400">AES-256</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-300">
                      <span className="text-green-400 font-mono">></span>
                      <span className="font-mono text-xs">Ready for new collaborations...</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel - System Stats */}
              <div className="bg-gray-900 rounded-lg border border-red-500/30 shadow-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20 animate-pulse"></div>
                
                <div className="relative p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Code className="w-4 h-4 text-red-400" />
                    <h3 className="text-sm font-bold text-red-400 font-mono">SYSTEM_STATS.log</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-black/50 rounded p-2 border border-gray-700 text-center">
                      <div className="text-lg font-bold text-green-400 font-mono">15+</div>
                      <div className="text-xs text-gray-300 font-mono">EXPLOITS</div>
                    </div>
                    
                    <div className="bg-black/50 rounded p-2 border border-gray-700 text-center">
                      <div className="text-lg font-bold text-blue-400 font-mono">2+</div>
                      <div className="text-xs text-gray-300 font-mono">YRS_EXP</div>
                    </div>
                    
                    <div className="bg-black/50 rounded p-2 border border-gray-700 text-center">
                      <div className="text-lg font-bold text-yellow-400 font-mono">24/7</div>
                      <div className="text-xs text-gray-300 font-mono">UPTIME</div>
                    </div>
                    
                    <div className="bg-black/50 rounded p-2 border border-gray-700 text-center">
                      <div className="text-lg font-bold text-purple-400 font-mono">100%</div>
                      <div className="text-xs text-gray-300 font-mono">COMMIT</div>
                    </div>

                    <div className="bg-black/50 rounded p-2 border border-gray-700 text-center col-span-2">
                      <div className="text-base font-bold text-cyan-400 font-mono">SECURE</div>
                      <div className="text-xs text-gray-300 font-mono">CONNECTION STATUS</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex items-center gap-2 text-xs">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    <span className="text-gray-400 font-mono">Last updated: just now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status Indicator */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-xs font-mono">LIVE</span>
          </div>
        </div>
      </div>
    </div>

    {/* Monitor Stand - Smaller */}
    <div className="flex justify-center mt-2">
      <div className="w-8 h-6 bg-gray-700 rounded-t-lg"></div>
    </div>
    <div className="flex justify-center">
      <div className="w-20 h-3 bg-gray-800 rounded-full"></div>
    </div>
  </div>
));

ComputerScreen.displayName = 'ComputerScreen';
