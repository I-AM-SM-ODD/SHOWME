import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, MessageCircle, Calendar, Download, Share2, 
  Linkedin, Github, Globe, Twitter, Instagram, 
  Star, FileText, Play, QrCode, Copy, Check
} from 'lucide-react';
import { useProfile } from '../contexts/ProfileContext';
import confetti from 'canvas-confetti';
import QRCode from 'qrcode';

interface PortfolioProps {
  onBack: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ onBack }) => {
  const { profile } = useProfile();
  const portfolioRef = useRef<HTMLDivElement>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const portfolioUrl = `${window.location.origin}/portfolio/${encodeURIComponent(profile.name)}`;

  useEffect(() => {
    // Trigger confetti on mount
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Generate QR code
    QRCode.toDataURL(portfolioUrl)
      .then(url => setQrCodeUrl(url))
      .catch(err => console.error(err));
  }, [portfolioUrl]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(portfolioUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 p-4"
    >
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <div className="bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-2xl p-6 mb-6">
            <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
              🎉 Portfolio Created Successfully!
            </h2>
            <p className="text-green-600 dark:text-green-300">
              Your professional portfolio is ready to share with the world!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <button
              onClick={handleCopyLink}
              className="bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:bg-primary-600 transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied!' : 'Copy Portfolio Link'}</span>
            </button>
            
            <button className="bg-secondary-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 hover:bg-secondary-600 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share Portfolio</span>
            </button>

            <button
              onClick={onBack}
              className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Create Another
            </button>
          </div>
        </motion.div>

        {/* Portfolio Preview */}
        <motion.div
          ref={portfolioRef}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              {profile.profileImage && (
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
              )}
              <div className="text-center md:text-left flex-1">
                <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
                <p className="text-xl opacity-90 mb-4">{profile.bio}</p>
                
                {/* Contact Buttons */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <a
                    href={`mailto:${profile.contactInfo.email}`}
                    className="bg-white text-primary-600 px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-gray-100 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email Me</span>
                  </a>
                  
                  {profile.contactInfo.whatsapp && (
                    <a
                      href={`https://wa.me/${profile.contactInfo.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-green-600 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </a>
                  )}

                  {profile.contactInfo.calendly && (
                    <a
                      href={profile.contactInfo.calendly}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 hover:bg-blue-600 transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book a Call</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Skills */}
            {profile.skills.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 text-primary-800 dark:text-primary-200 px-3 py-2 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Services */}
            {profile.services.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Services & Pricing</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.services.map((service) => (
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
                      {service.description && (
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {service.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Media */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Video */}
              {profile.video && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Introduction Video</h2>
                  <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <video
                      src={profile.video}
                      controls
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </section>
              )}

              {/* Resume */}
              {profile.resume && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Resume</h2>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-300 mb-4">Resume Available</p>
                    <button className="bg-primary-500 text-white px-6 py-2 rounded-lg font-semibold flex items-center space-x-2 mx-auto hover:bg-primary-600 transition-colors">
                      <Download className="w-4 h-4" />
                      <span>Download Resume</span>
                    </button>
                  </div>
                </section>
              )}
            </div>

            {/* Social Links */}
            {Object.entries(profile.socialLinks).some(([_, url]) => url) && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Connect With Me</h2>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(profile.socialLinks).map(([platform, url]) => 
                    url && (
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
                    )
                  )}
                </div>
              </section>
            )}

            {/* QR Code */}
            {qrCodeUrl && (
              <section className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Share My Portfolio</h2>
                <div className="inline-block bg-white p-4 rounded-xl shadow-lg">
                  <img src={qrCodeUrl} alt="Portfolio QR Code" className="w-32 h-32 mx-auto" />
                  <p className="text-sm text-gray-600 mt-2">Scan to view portfolio</p>
                </div>
              </section>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Portfolio;