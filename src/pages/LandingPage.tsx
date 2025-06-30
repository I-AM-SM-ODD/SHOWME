import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Zap, Share2, Smartphone, Globe, Users } from 'lucide-react';
import AnimatedButton from '../components/AnimatedButton';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Create in Minutes",
      description: "Build your professional portfolio in just a few clicks with our guided process."
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile-First Design",
      description: "Your portfolio looks stunning on every device, from phones to desktops."
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: "Easy Sharing",
      description: "Share your portfolio with QR codes, direct links, or social media."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Professional URL",
      description: "Get a clean, memorable URL like showme.com/yourname"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Client Tools",
      description: "Built-in invoice generator and contact forms to manage your business."
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Stand Out",
      description: "Showcase your work with video intros, testimonials, and custom branding."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Graphic Designer",
      content: "ShowMe helped me land 3 new clients in my first week! The portfolio looks so professional.",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Marcus Rodriguez",
      role: "Web Developer",
      content: "I love how easy it is to update my services and pricing. The QR code feature is genius!",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Emily Johnson",
      role: "Content Writer",
      content: "The invoice generator saves me hours every week. Everything I need in one place!",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">ShowMe</span>
            </motion.div>
            <div className="flex items-center space-x-4">
              <Link
                to="/signin"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
              >
                Sign In
              </Link>
              <AnimatedButton
                href="/signup"
                variant="primary"
                size="sm"
              >
                Get Started
              </AnimatedButton>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Create Your Dream
                <motion.span 
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                >
                  Portfolio in Minutes
                </motion.span>
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                ShowMe helps freelancers create stunning, professional portfolios that attract clients and grow their business. No coding required! 🚀
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <AnimatedButton
                  href="/signup"
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Start Building Free
                </AnimatedButton>
                <AnimatedButton
                  variant="secondary"
                  size="lg"
                >
                  View Examples
                </AnimatedButton>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Everything You Need to Succeed
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              From portfolio creation to client management, ShowMe has all the tools freelancers need.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer"
              >
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center text-white mb-4"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Loved by Freelancers Worldwide
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Join thousands of freelancers who've grown their business with ShowMe
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex items-center mb-4">
                  <motion.img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  "{testimonial.content}"
                </p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Your Portfolio?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of freelancers who've transformed their business with ShowMe
            </p>
            <AnimatedButton
              href="/signup"
              variant="secondary"
              size="lg"
              className="bg-white text-primary-600 hover:bg-gray-100"
              icon={ArrowRight}
              iconPosition="right"
            >
              Get Started for Free
            </AnimatedButton>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <motion.div 
                className="flex items-center space-x-2 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold">ShowMe</span>
              </motion.div>
              <p className="text-gray-400">
                The easiest way for freelancers to create professional portfolios and grow their business.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Examples</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ShowMe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;