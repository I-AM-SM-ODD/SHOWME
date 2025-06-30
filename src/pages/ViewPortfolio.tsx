import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, MessageCircle, Calendar, Download, Share2, 
  Linkedin, Github, Globe, Twitter, Instagram, 
  Star, FileText, Play, QrCode
} from 'lucide-react';

const ViewPortfolio: React.FC = () => {
  const { username } = useParams();

  // Mock portfolio data - in a real app, this would be fetched based on username
  const portfolio = {
    name: 'Sarah Chen',
    bio: 'Creative graphic designer with 5+ years of experience helping brands tell their story through visual design.',
    profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    skills: ['Graphic Design', 'Branding', 'UI/UX Design', 'Illustration', 'Adobe Creative Suite', 'Figma'],
    services: [
      { id: '1', name: 'Logo Design', price: '299', description: 'Professional logo design with 3 concepts and unlimited revisions' },
      { id: '2', name: 'Brand Identity Package', price: '899', description: 'Complete brand identity including logo, colors, typography, and guidelines' },
      { id: '3', name: 'Website Design', price: '1299', description: 'Custom website design with responsive layouts and user experience focus' },
    ],
    contactInfo: {
      email: 'sarah@example.com',
      whatsapp: '+1234567890',
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarahchen',
      behance: 'https://behance.net/sarahchen',
      instagram: 'https://instagram.com/sarahchen_design',
    },
    testimonials: [
      {
        id: '1',
        name: 'John Smith',
        company: 'Tech Startup Inc.',
        content: 'Sarah created an amazing brand identity for our startup. Her attention to detail and creativity exceeded our expectations!',
        rating: 5
      },
      {
        id: '2',
        name: 'Emily Johnson',
        company: 'Local Restaurant',
        content: 'Professional, creative, and delivered exactly what we needed. Highly recommend Sarah for any design work!',
        rating: 5
      }
    ]
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'github': return <Github className="w-5 h-5" />;
      case 'twitter': return <Twitter className="w-5 h-5" />;
      case 'instagram': return <Instagram className="w-5 h-5" />;
      case 'website': return <Globe className="w-5 h-5" />;
      case 'behance': return <Globe className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 p-8 text-white"
        >
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            <img
              src={portfolio.profileImage}
              alt={portfolio.name}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-bold mb-2">{portfolio.name}</h1>
              <p className="text-xl opacity-90 mb-4">{portfolio.bio}</p>
              
              {/* Contact Buttons */}
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <a
                  href={`mailto:${portfolio.contactInfo.email}`}
                  className="bg-white text-primary-600 px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-gray-100 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Me</span>
                </a>
                
                {portfolio.contactInfo.whatsapp && (
                  <a
                    href={`https://wa.me/${portfolio.contactInfo.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 p-8 space-y-8">
          {/* Skills */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Skills & Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 text-primary-800 dark:text-primary-200 px-3 py-2 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.section>

          {/* Services */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Services & Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.services.map((service) => (
                <div
                  key={service.id}
                  className="border border-gray-200 dark:border-gray-600 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {service.name}
                    </h3>
                    <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      ${service.price}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {service.description}
                  </p>
                  <button className="w-full bg-primary-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-600 transition-colors">
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Testimonials */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6"
                >
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Social Links */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Connect With Me</h2>
            <div className="flex flex-wrap gap-3">
              {Object.entries(portfolio.socialLinks).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  {getSocialIcon(platform)}
                  <span className="capitalize">{platform}</span>
                </a>
              ))}
            </div>
          </motion.section>

          {/* Contact CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Work Together?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Let's discuss your project and bring your vision to life!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${portfolio.contactInfo.email}`}
                className="bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors"
              >
                Send Email
              </a>
              {portfolio.contactInfo.whatsapp && (
                <a
                  href={`https://wa.me/${portfolio.contactInfo.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  WhatsApp Chat
                </a>
              )}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default ViewPortfolio;