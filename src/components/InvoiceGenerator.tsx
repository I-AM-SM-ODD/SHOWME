import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Download, Send, FileText, DollarSign, User, Mail } from 'lucide-react';
import { Invoice } from '../types';

interface InvoiceGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

const InvoiceGenerator: React.FC<InvoiceGeneratorProps> = ({ isOpen, onClose }) => {
  const [invoice, setInvoice] = useState<Invoice>({
    clientName: '',
    clientEmail: '',
    service: '',
    price: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    invoiceNumber: `INV-${Date.now()}`
  });

  const handleInputChange = (field: keyof Invoice, value: string) => {
    setInvoice(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically generate and download the PDF
    console.log('Generating invoice:', invoice);
    alert('Invoice generated! (This would download a PDF in a real app)');
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <FileText className="w-6 h-6" />
            <span>Generate Invoice</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <User className="w-4 h-4" />
                <span>Client Name *</span>
              </label>
              <input
                type="text"
                value={invoice.clientName}
                onChange={(e) => handleInputChange('clientName', e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Mail className="w-4 h-4" />
                <span>Client Email *</span>
              </label>
              <input
                type="email"
                value={invoice.clientEmail}
                onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                placeholder="client@email.com"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Service *
              </label>
              <input
                type="text"
                value={invoice.service}
                onChange={(e) => handleInputChange('service', e.target.value)}
                placeholder="Web Design"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <DollarSign className="w-4 h-4" />
                <span>Price *</span>
              </label>
              <input
                type="text"
                value={invoice.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="500"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={invoice.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Brief description of the work completed..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date
              </label>
              <input
                type="date"
                value={invoice.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Invoice Number
              </label>
              <input
                type="text"
                value={invoice.invoiceNumber}
                onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Invoice Preview */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Invoice Preview</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Invoice #:</span>
                <span className="font-medium text-gray-900 dark:text-white">{invoice.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Client:</span>
                <span className="font-medium text-gray-900 dark:text-white">{invoice.clientName || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Service:</span>
                <span className="font-medium text-gray-900 dark:text-white">{invoice.service || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Amount:</span>
                <span className="font-bold text-primary-600 dark:text-primary-400 text-lg">
                  ${invoice.price || '0'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-6 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-6 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Generate Invoice</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default InvoiceGenerator;