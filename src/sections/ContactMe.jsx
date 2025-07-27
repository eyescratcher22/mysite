import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Send, Terminal, User, Mail, MessageSquare, MapPin, Clock, Briefcase } from 'lucide-react';

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
    <div className="min-h-screen bg-black p-8 flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Terminal Form */}
          <div className="xl:col-span-1 bg-gray-900 rounded-lg border border-gray-700 shadow-2xl overflow-hidden">
            {/* Terminal Header */}
            <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-mono text-sm">contact@amitesh.terminal</span>
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm">
              <div className="text-green-400 mb-4">
                <span className="text-purple-400">amitesh@portfolio</span>:
                <span className="text-blue-400">~/contact</span>$ contact-form --interactive
              </div>

              <div className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="flex items-center gap-2 text-yellow-400 mb-2">
                    <User className="w-4 h-4" />
                    Enter your name:
                  </label>
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">{'>'}</span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-transparent text-white outline-none flex-1 border-b border-gray-600 pb-1 focus:border-green-400 transition-colors duration-200"
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
                  <label className="flex items-center gap-2 text-yellow-400 mb-2">
                    <Mail className="w-4 h-4" />
                    Enter your email:
                  </label>
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">{'>'}</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-transparent text-white outline-none flex-1 border-b border-gray-600 pb-1 focus:border-green-400 transition-colors duration-200"
                      placeholder="john@example.com"
                      required
                      disabled={isTyping}
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label className="flex items-center gap-2 text-yellow-400 mb-2">
                    <MessageSquare className="w-4 h-4" />
                    Enter your message:
                  </label>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2 mt-1">{'>'}</span>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      className="bg-transparent text-white outline-none flex-1 border border-gray-600 p-2 rounded focus:border-green-400 transition-colors duration-200 resize-none"
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
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none font-sans font-semibold"
                >
                  <Send className="w-4 h-4" />
                  {isTyping ? 'Sending...' : 'Execute Contact'}
                </button>
              </div>

              {/* Terminal Output */}
              {terminalOutput.length > 0 && (
                <div className="mt-6 border-t border-gray-700 pt-4">
                  {terminalOutput.map((line, index) => (
                    <div key={index} className="text-green-400 mb-1">
                      {line}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex items-center gap-2 text-green-400 mt-2">
                      <span>Processing</span>
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

          {/* Computer Screen Display */}
          <div className="xl:col-span-1">
            <ComputerScreen displayData={displayData} />
          </div>

          {/* Contact Info Section */}
          <div className="xl:col-span-1">
            <ContactInfoSection />
          </div>
        </div>
      </div>
    </div>
  );
}

// Computer Screen Component
const ComputerScreen = React.memo(({ displayData }) => (
  <div className="relative">
    {/* Monitor Frame */}
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-4 shadow-2xl border border-gray-700">
      {/* Screen */}
      <div className="bg-black rounded-lg p-6 min-h-[400px] relative overflow-hidden border border-gray-700">
        {/* Screen content */}
        <div className="relative z-10 h-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-green-400 text-lg font-mono">CONTACT PREVIEW</h3>
          </div>

          {/* Data Display */}
          <div className="space-y-6">
            {/* Name Display */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="text-yellow-400 text-xs font-mono mb-2">NAME:</div>
              <div className="text-white font-mono text-lg h-7 flex items-center">
                {displayData.name || <span className="text-gray-500">Awaiting input...</span>}
                {displayData.name && <span className="animate-pulse text-green-400 ml-1">_</span>}
              </div>
            </div>

            {/* Email Display */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="text-yellow-400 text-xs font-mono mb-2">EMAIL:</div>
              <div className="text-white font-mono text-lg h-7 flex items-center">
                {displayData.email || <span className="text-gray-500">Awaiting input...</span>}
                {displayData.email && <span className="animate-pulse text-green-400 ml-1">_</span>}
              </div>
            </div>

            {/* Message Display */}
            <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <div className="text-yellow-400 text-xs font-mono mb-2">MESSAGE:</div>
              <div className="text-white font-mono min-h-[100px] flex items-start">
                {displayData.message ? (
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {displayData.message}
                    <span className="animate-pulse text-green-400">_</span>
                  </div>
                ) : (
                  <span className="text-gray-500">Awaiting input...</span>
                )}
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

    {/* Monitor Stand */}
    <div className="flex justify-center mt-2">
      <div className="w-8 h-8 bg-gray-700 rounded-t-lg"></div>
    </div>
    <div className="flex justify-center">
      <div className="w-20 h-3 bg-gray-800 rounded-full"></div>
    </div>
  </div>
));

ComputerScreen.displayName = 'ComputerScreen';

// Contact Info Section
const ContactInfoSection = React.memo(() => (
  <div className="space-y-6">
    {/* About Section */}
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
      <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3>
      <p className="text-gray-300 leading-relaxed mb-4">
        I'm always excited to work on new projects and collaborate with amazing people.
        Whether you have a project in mind or just want to say hello, feel free to reach out!
      </p>
      <div className="text-gray-300">
        <p className="mb-2 flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <strong>Response Time:</strong> Within 24 hours
        </p>
        <p className="mb-2 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-gray-400" />
          <strong>Availability:</strong> Open for new projects
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <strong>Location:</strong> IIT Roorkee
        </p>
      </div>
    </div>

    {/* Quick Stats */}
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
      <h3 className="text-2xl font-bold text-white mb-4">Quick Stats</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <div className="text-3xl font-bold text-green-400 mb-1">15+</div>
          <div className="text-gray-300 text-sm">Projects</div>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <div className="text-3xl font-bold text-blue-400 mb-1">2+</div>
          <div className="text-gray-300 text-sm">Years</div>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <div className="text-3xl font-bold text-yellow-400 mb-1">24/7</div>
          <div className="text-gray-300 text-sm">Available</div>
        </div>
        <div className="text-center p-3 bg-white/5 rounded-lg">
          <div className="text-3xl font-bold text-purple-400 mb-1">100%</div>
          <div className="text-gray-300 text-sm">Dedicated</div>
        </div>
      </div>
    </div>
  </div>
));

ContactInfoSection.displayName = 'ContactInfoSection';