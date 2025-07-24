import React, { useState, useEffect } from 'react';
import { Send, Terminal, User, Mail, MessageSquare } from 'lucide-react';

export default function ContactMe() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [showCursor, setShowCursor] = useState(true);

  // Web3Forms access key - Replace with your actual key
  const ACCESS_KEY = "a213bf9e-9484-419c-ac7e-6c946af49e45";

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const simulateTerminalSubmit = async () => {
    setIsTyping(true);
    const commands = [
      '$ initiating contact protocol...',
      '$ validating form data...',
      '$ encrypting message...',
      '$ establishing secure connection...'
    ];

    setTerminalOutput([]);
    
    for (let i = 0; i < commands.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setTerminalOutput(prev => [...prev, commands[i]]);
    }

    try {
      // Create FormData for Web3Forms
      const formDataToSend = new FormData();
      formDataToSend.append("access_key", ACCESS_KEY);
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);
      
      // Optional: Add additional fields
      formDataToSend.append("subject", `New Contact Form Message from ${formData.name}`);
      formDataToSend.append("from_name", formData.name);

      // Send to Web3Forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        // Success messages
        await new Promise(resolve => setTimeout(resolve, 800));
        setTerminalOutput(prev => [...prev, '$ message sent successfully!']);
        await new Promise(resolve => setTimeout(resolve, 800));
        setTerminalOutput(prev => [...prev, '$ thank you for reaching out, Amitesh will get back to you soon.']);
        await new Promise(resolve => setTimeout(resolve, 800));
        setTerminalOutput(prev => [...prev, '$ connection closed.']);
      } else {
        throw new Error(data.message || 'Failed to send message');
      }

    } catch (error) {
      console.error('Error:', error);
      // Error handling
      await new Promise(resolve => setTimeout(resolve, 800));
      setTerminalOutput(prev => [...prev, '$ error: message delivery failed']);
      await new Promise(resolve => setTimeout(resolve, 800));
      setTerminalOutput(prev => [...prev, '$ please try again or contact directly']);
    }
    
    setIsTyping(false);
    
    // Reset form after animation
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setTerminalOutput([]);
    }, 3000);
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      simulateTerminalSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-black p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            GET IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400">TOUCH</span>
          </h1>
          <p className="text-xl text-purple-200">Let's build something amazing together</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Terminal Form */}
          <div className="bg-gray-900 rounded-lg border border-gray-700 shadow-2xl overflow-hidden">
            {/* Terminal Header */}
            <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
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
                      className="bg-transparent text-white outline-none flex-1 border-b border-gray-600 pb-1 focus:border-pink-400 transition-colors"
                      placeholder="John Doe"
                      required
                    />
                    {showCursor && formData.name === '' && (
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
                      className="bg-transparent text-white outline-none flex-1 border-b border-gray-600 pb-1 focus:border-pink-400 transition-colors"
                      placeholder="john@example.com"
                      required
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
                      className="bg-transparent text-white outline-none flex-1 border border-gray-600 p-2 rounded focus:border-pink-400 transition-colors resize-none"
                      placeholder="Your message here..."
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isTyping}
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white px-6 py-3 rounded-lg hover:from-pink-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-sans font-semibold"
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
                    <div className="flex items-center gap-2 text-green-400">
                      <span>Processing</span>
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* About Section */}
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3>
              <p className="text-purple-200 leading-relaxed mb-4">
                I'm always excited to work on new projects and collaborate with amazing people. 
                Whether you have a project in mind or just want to say hello, feel free to reach out!
              </p>
              <div className="text-purple-200">
                <p className="mb-2">🚀 <strong>Response Time:</strong> Within 24 hours</p>
                <p className="mb-2">💼 <strong>Availability:</strong> Open for new projects</p>
                <p>🌍 <strong>Location:</strong> IIT Roorkee</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400 mb-1">10+</div>
                  <div className="text-purple-200 text-sm">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-1">1+</div>
                  <div className="text-purple-200 text-sm">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-1">24/7</div>
                  <div className="text-purple-200 text-sm">Available</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-1">100%</div>
                  <div className="text-purple-200 text-sm">Dedicated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}