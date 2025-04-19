import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Code, Star, GitBranch, Users, Award, Github, ExternalLink, Zap, Heart } from 'lucide-react';
import Button from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Enhanced gradient color palette
const gradients = {
  primary: 'from-blue-600 to-violet-600',
  secondary: 'from-violet-600 to-fuchsia-600',
  accent: 'from-fuchsia-600 to-pink-600',
  highlight: 'from-pink-600 to-orange-500',
  dark: 'from-gray-900 to-slate-900',
};

// Animated background particles component
const ParticlesBackground = () => {
  const particlesRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const container = particlesRef.current;
    const particleCount = 200;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 1;
      
      particle.className = 'absolute rounded-full';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Different colors for particles
      const colorChoice = Math.random();
      if (colorChoice < 0.6) {
        particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`;
      } else if (colorChoice < 0.8) {
        particle.style.background = 'rgba(139, 92, 246, 0.6)'; // Violet
      } else {
        particle.style.background = 'rgba(236, 72, 153, 0.6)'; // Pink
      }
      
      particle.style.animation = `float ${Math.random() * 15 + 10}s infinite ease-in-out ${Math.random() * 5}s, twinkle ${Math.random() * 5 + 2}s infinite ${Math.random() * 2}s`;
      
      container.appendChild(particle);
      particles.push(particle);
    }

    // Mouse interaction effect
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
      
      particles.forEach((particle, index) => {
        if (index % 3 === 0) {
          const rect = particle.getBoundingClientRect();
          const particleX = rect.left + rect.width / 2;
          const particleY = rect.top + rect.height / 2;
          
          const distanceX = particleX - clientX;
          const distanceY = particleY - clientY;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          
          if (distance < 200) {
            const force = (200 - distance) / 10;
            const angleX = distanceX / distance;
            const angleY = distanceY / distance;
            
            particle.style.transform = `translate(${angleX * force}px, ${angleY * force}px)`;
            particle.style.transition = 'transform 0.5s ease-out';
          } else {
            particle.style.transform = '';
          }
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <div ref={particlesRef} className="fixed inset-0 z-0 overflow-hidden">
      <div 
        className="absolute w-64 h-64 rounded-full blur-3xl bg-violet-600/30 opacity-30"
        style={{ 
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
          transition: 'all 0.5s ease-out'
        }}
      />
    </div>
  );
};

// Enhanced parallax section with more animation options
const ParallaxSection = ({ 
  children, 
  offset = 50, 
  className = '', 
  direction = 'up', 
  scale = false,
  rotate = false
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  let transformProps = {};
  
  if (direction === 'up' || direction === 'down') {
    const yOffset = direction === 'up' ? -Math.abs(offset) : Math.abs(offset);
    const y = useSpring(
      useTransform(scrollYProgress, [0, 1], [0, yOffset]),
      { stiffness: 100, damping: 30 }
    );
    transformProps.y = y;
  }
  
  if (direction === 'left' || direction === 'right') {
    const xOffset = direction === 'left' ? -Math.abs(offset) : Math.abs(offset);
    const x = useSpring(
      useTransform(scrollYProgress, [0, 1], [0, xOffset]),
      { stiffness: 100, damping: 30 }
    );
    transformProps.x = x;
  }
  
  if (scale) {
    const scaleValue = useSpring(
      useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]),
      { stiffness: 100, damping: 30 }
    );
    transformProps.scale = scaleValue;
  }
  
  if (rotate) {
    const rotateValue = useSpring(
      useTransform(scrollYProgress, [0, 1], [0, rotate]),
      { stiffness: 50, damping: 30 }
    );
    transformProps.rotate = rotateValue;
  }

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);

  return (
    <motion.div 
      ref={ref} 
      style={{ ...transformProps, opacity }} 
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Advanced floating icons with dynamic movement
const FloatingIcon = ({ Icon, delay = 0, size = 8, position = {} }) => {
  const { scrollYProgress } = useScroll();
  
  const floatX = useTransform(
    useSpring(scrollYProgress, { stiffness: 50, damping: 20 }),
    [0, 0.5, 1],
    [0, 10, -5]
  );
  
  const floatY = useTransform(
    useSpring(scrollYProgress, { stiffness: 30, damping: 15 }),
    [0, 0.5, 1],
    [0, -15, -30]
  );
  
  const rotate = useTransform(
    useSpring(scrollYProgress, { stiffness: 60, damping: 30 }),
    [0, 1],
    [0, 45]
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.6, scale: 1 }}
      transition={{
        duration: 0.8,
        delay,
        type: "spring",
        stiffness: 100
      }}
      style={{ 
        x: floatX, 
        y: floatY, 
        rotate,
        position: 'absolute',
        ...position
      }}
      className="z-10"
      whileHover={{ scale: 1.2, opacity: 1 }}
    >
      <div className={`w-${size} h-${size} bg-gradient-to-br ${gradients.primary} p-2 rounded-full bg-opacity-30 backdrop-blur-sm`}>
        <Icon className={`w-${size-4} h-${size-4} text-white`} />
      </div>
    </motion.div>
  );
};

// Enhanced feature card with hover interactions
const FeatureCard = ({ icon: Icon, title, description, delay, gradient = gradients.primary }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, type: "spring" }}
      viewport={{ once: true, margin: "-100px" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="bg-white/5 backdrop-blur-lg p-8 rounded-2xl shadow-xl transition-all duration-500 border border-white/10 overflow-hidden relative group"
    >
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="flex items-center gap-4 mb-6 relative z-10">
        <motion.div 
          className={`p-4 rounded-xl bg-gradient-to-br ${gradient}`}
          animate={{ 
            rotate: hovered ? 10 : 0,
            scale: hovered ? 1.1 : 1
          }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>
        <h3 className="text-2xl font-bold text-white">
          {title}
        </h3>
      </div>
      
      <p className="text-lg text-gray-300 relative z-10">{description}</p>
      
      <motion.div 
        className={`absolute inset-0 rounded-2xl border-2 border-transparent`}
        animate={{ 
          borderColor: hovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0)',
          scale: hovered ? 1.02 : 1
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

// Animated counter component
const StatsCounter = ({ value, label, delay, gradient = gradients.secondary }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const valueNum = parseInt(value.replace(/[^0-9]/g, ''));
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startCount = 0;
          const duration = 2000;
          const increment = Math.ceil(valueNum / (duration / 16));
          
          const timer = setInterval(() => {
            startCount += increment;
            if (startCount >= valueNum) {
              setCount(valueNum);
              clearInterval(timer);
            } else {
              setCount(startCount);
            }
          }, 16);
          
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [valueNum]);
  
  const formattedCount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay, type: "spring" }}
      viewport={{ once: true }}
      className="text-center p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 relative group overflow-hidden"
      whileHover={{ scale: 1.05 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-fuchsia-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-full opacity-20`}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: '50%', left: '50%', height: '100%', width: '100%', x: '-50%', y: '-50%' }}
      />
      
      <motion.div
        className={`text-5xl font-bold bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-4 relative z-10`}
      >
        {formattedCount}{value.includes('+') ? '+' : ''}
      </motion.div>
      <div className="text-xl text-gray-300 relative z-10">{label}</div>
    </motion.div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { scrollYProgress } = useScroll();
  const headerRef = useRef(null);
  
  const scaleX = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });
  
  const arrowY = useTransform(
    useSpring(useScroll().scrollYProgress),
    [0, 0.1],
    [0, -100]
  );
  
  // FIXED ISSUE #3: Better distributed floating icons
  const iconConfigs = [
    { Icon: Code, pos: { top: '15%', left: '8%' }, delay: 0, size: 12 },
    { Icon: Star, pos: { top: '25%', right: '12%' }, delay: 0.1, size: 10 },
    { Icon: GitBranch, pos: { top: '65%', left: '15%' }, delay: 0.2, size: 14 },
    { Icon: Users, pos: { top: '70%', right: '20%' }, delay: 0.3, size: 12 },
    { Icon: Award, pos: { top: '40%', right: '8%' }, delay: 0.4, size: 10 },
    { Icon: Heart, pos: { bottom: '15%', left: '45%' }, delay: 0.5, size: 8 },
    { Icon: Zap, pos: { top: '30%', left: '30%' }, delay: 0.6, size: 9 },
    { Icon: ExternalLink, pos: { top: '55%', right: '25%' }, delay: 0.7, size: 11 },
  ];

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleSignUp = () => {
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-900 via-indigo-950 to-black">
      <ParticlesBackground />
      
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 z-50"
        style={{ scaleX, transformOrigin: '0%' }}
      />
      
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <div className="flex flex-col gap-4">
          {['Hero', 'Features', 'Stats'].map((section, i) => (
            <motion.div 
              key={section}
              className="w-3 h-3 rounded-full bg-white/50 cursor-pointer"
              whileHover={{ scale: 1.5, backgroundColor: '#8B5CF6' }}
              animate={{
                scale: scrollYProgress.get() > (i / 3) && scrollYProgress.get() < ((i + 1) / 3) ? 1.5 : 1,
                backgroundColor: scrollYProgress.get() > (i / 3) && scrollYProgress.get() < ((i + 1) / 3) ? '#8B5CF6' : 'rgba(255,255,255,0.5)',
              }}
            />
          ))}
        </div>
      </div>
      
      {/* FIXED ISSUE #3: Added width and height to ensure the icon container spans the entire viewport */}
      <div className="relative w-full h-full" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {iconConfigs.map((config, i) => (
          <FloatingIcon key={i} {...config} />
        ))}
      </div>

      <section ref={headerRef} className="relative min-h-screen flex items-center justify-center px-6">
        <ParallaxSection offset={-80} className="z-10">
          <div className="text-center max-w-5xl mx-auto">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 1.2, 
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            >
              <div className={`inline-block p-6 rounded-full bg-gradient-to-br ${gradients.primary} mb-12 relative`}>
                <motion.div
                  className="absolute inset-0 rounded-full bg-white opacity-30"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.1, 0.3] 
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <Github className="w-24 h-24 text-white" />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3, type: "spring" }}
              className="text-6xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-violet-100"
            >
              Find Your Next Coding Challenge
            </motion.h1>
            
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5, type: "spring" }}
              className="text-2xl text-gray-300 mb-12"
            >
              Discover open-source issues that match your skills and interests
            </motion.p>
            
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              className="relative inline-block"
            >
              <motion.div
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 opacity-70 blur-md"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Button
                size="lg"
                onClick={handleGetStarted}
                className={`relative bg-gradient-to-r ${gradients.accent} text-white text-xl px-12 py-6 rounded-full hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300`}
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </ParallaxSection>
        
        {/* FIXED ISSUE #2: Adjusted position to avoid overlapping with button */}
        <motion.div 
          style={{ y: arrowY }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {/* <motion.p 
            className="text-white/70 mb-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            
          </motion.p> */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-8 h-12 rounded-full border-2 border-white/30 flex justify-center p-2"
          >
            <motion.div 
              className="w-1 h-3 bg-white/70 rounded-full"
              initial={{ y: 0 }}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
          </motion.div>
        </motion.div>
      </section>

      <section className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <ParallaxSection offset={30} direction="up" className="mb-20">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-5xl font-bold text-center text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-violet-100"
            >
              Why Choose Our Platform?
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '120px' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-fuchsia-600 to-pink-600 mx-auto"
            />
          </ParallaxSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <ParallaxSection offset={40} direction="left">
              <FeatureCard
                icon={Code}
                title="Smart Matching"
                description="Our AI-powered system matches you with issues that align perfectly with your skills and experience level."
                delay={0.2}
                gradient={gradients.primary}
              />
            </ParallaxSection>
            
            <ParallaxSection offset={40} direction="up">
              <FeatureCard
                icon={GitBranch}
                title="Easy Integration"
                description="Seamlessly connect with GitHub and start contributing to open-source projects in minutes."
                delay={0.4}
                gradient={gradients.secondary}
              />
            </ParallaxSection>
            
            <ParallaxSection offset={40} direction="right">
              <FeatureCard
                icon={Users}
                title="Community Driven"
                description="Join a thriving community of developers and maintainers passionate about open source."
                delay={0.6}
                gradient={gradients.accent}
              />
            </ParallaxSection>
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6">
        <ParallaxSection offset={30} direction="up" scale={true} className="mb-20">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-5xl font-bold text-center text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-violet-100"
          >
            Our Impact
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '120px' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 mx-auto"
          />
        </ParallaxSection>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <StatsCounter 
              value="10,000+" 
              label="Active Issues" 
              delay={0.2} 
              gradient={gradients.primary}
            />
            <StatsCounter 
              value="5,000+" 
              label="Developers" 
              delay={0.4} 
              gradient={gradients.secondary}
            />
            <StatsCounter 
              value="1,000+" 
              label="Repositories" 
              delay={0.6} 
              gradient={gradients.accent}
            />
          </div>
        </div>
      </section>

      <section className="relative py-32 px-6">
        <ParallaxSection offset={50} className="z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-5xl font-bold text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-violet-100"
            >
              Ready to Start Contributing?
            </motion.h2>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl text-gray-300 mb-12"
            >
              Join thousands of developers making a difference in open source
            </motion.p>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="relative inline-block"
            >
              <motion.div
                className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 opacity-70 blur-md"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Button
                size="lg"
                onClick={handleSignUp}
                className={`relative bg-gradient-to-r ${gradients.secondary} text-white text-xl px-12 py-6 rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300`}
              >
                Sign Up Now
              </Button>
            </motion.div>
          </div>
        </ParallaxSection>
      </section>

      {/* FIXED ISSUE #1: Added improved CSS to prevent overscroll white background */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -10px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        /* Improved styles to prevent overscroll issues */
        html, body {
          overflow-x: hidden;
          background-color: #000;
          min-height: 100vh;
          margin: 0;
          padding: 0;
          overscroll-behavior: none;
        }
        
        body {
          position: relative;
          background: linear-gradient(to bottom, #111827, #1e1b4b, #000);
          color: #fff;
        }
        
        /* Ensure content fills viewport and beyond */
        #root {
          min-height: 100vh;
          background: linear-gradient(to bottom, #111827, #1e1b4b, #000);
          overflow-x: hidden;
          overscroll-behavior-y: none;
        }
        
        /* Set background color for any potential overscroll area */
        /* Set background color for any potential overscroll area */
        body:before, body:after {
          content: "";
          position: fixed;
          left: 0;
          right: 0;
          background: #000;
          z-index: -1;
        }
        
        body:before {
          top: -100vh;
          height: 100vh;
        }
        
        body:after {
          bottom: -100vh;
          height: 100vh;
        }
        
        /* Prevent overscroll bounce on mobile devices */
        @supports (-webkit-touch-callout: none) {
          body {
            -webkit-overflow-scrolling: auto;
            overscroll-behavior-y: none;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;