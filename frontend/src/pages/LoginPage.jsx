import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Github, Code, GitMerge, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoginButton from '../components/auth/LoginButton';

// Enhanced gradient color palette
const gradients = {
  primary: 'from-blue-600 to-violet-600',
  secondary: 'from-violet-600 to-fuchsia-600',
  accent: 'from-fuchsia-600 to-pink-600',
  highlight: 'from-pink-600 to-orange-500',
  dark: 'from-gray-900 to-slate-900',
};

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-900 via-indigo-950 to-black">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12"
      >
        <div className="w-full max-w-5xl">
          <motion.div 
            variants={itemVariants}
            className="w-full max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-8">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  duration: 1.2, 
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                className="inline-block p-8 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 mb-10 relative"
              >
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
                <Github className="w-20 h-20 text-white" />
              </motion.div>
              
              <motion.h1 
                variants={itemVariants}
                className="text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-violet-100"
              >
                Welcome to OSMatchmaker
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-2xl text-gray-300"
              >
                Find the perfect open source issues to contribute to
              </motion.p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-xl p-16 border border-white/10 mb-16 max-w-3xl mx-auto"
            >
              <motion.div 
                variants={itemVariants}
                className="text-center mb-10"
              >
                <h2 className="text-3xl font-semibold text-white mb-6">
                  Sign in to get started
                </h2>
                <p className="text-xl text-gray-400">
                  Connect with GitHub to access personalized issue recommendations
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="max-w-md mx-auto"
              >
                <LoginButton className="w-full" />
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="text-sm text-gray-400 text-center mt-8"
              >
                By signing in, you agree to our{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Privacy Policy
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6"
          >
            {[
              {
                title: "Smart Matching",
                description: "Our AI-powered system matches you with issues that align perfectly with your skills and experience level.",
                gradient: "from-blue-500 to-blue-600",
                Icon: Code,
                iconBg: "bg-blue-500"
              },
              {
                title: "Easy Integration",
                description: "Seamlessly connect with GitHub and start contributing to open-source projects in minutes.",
                gradient: "from-purple-500 to-purple-600",
                Icon: GitMerge,
                iconBg: "bg-purple-500"
              },
              {
                title: "Community Driven",
                description: "Join a thriving community of developers and maintainers passionate about open source.",
                gradient: "from-pink-500 to-pink-600",
                Icon: Users,
                iconBg: "bg-pink-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/[0.05] p-10 min-h-[300px] transition-all duration-300 group hover:bg-white/[0.05]"
                whileHover={{ y: -5 }}
              >
                <div className={`absolute -top-6 left-8 ${feature.iconBg} rounded-2xl p-5 shadow-lg`}>
                  <feature.Icon className="w-8 h-8 text-white" />
                </div>
                <div className="mt-10">
                  <h3 className="text-3xl font-semibold text-white mb-6">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

LoginPage.propTypes = {
  // Add any prop types if needed
};

export default LoginPage;