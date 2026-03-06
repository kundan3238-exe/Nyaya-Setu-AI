import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Menu, X, Download, Shield, Scale, FileText, Users, Clock, MapPin, Edit, Eye, Copy, Phone } from 'lucide-react';

const Fir = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [language, setLanguage] = useState('en');

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  const downloadFIRTemplate = () => {
    // Create a simple FIR template content
    const firTemplate = `
FIRST INFORMATION REPORT (FIR) TEMPLATE
======================================

Date: _______________  Time: _______________  Police Station: _______________

COMPLAINANT DETAILS:
Name: _______________________________________________
Father's/Husband's Name: _____________________________
Age: ________  Gender: ________  Occupation: ___________
Address: ____________________________________________
         ____________________________________________
Phone Number: ______________________________________
Email: _____________________________________________

INCIDENT DETAILS:
Date of Incident: ___________________________________
Time of Incident: ___________________________________
Place of Incident: __________________________________
                   __________________________________

DESCRIPTION OF INCIDENT:
(Describe the incident in detail - what happened, who was involved, witnesses, etc.)
_________________________________________________
_________________________________________________
_________________________________________________
_________________________________________________
_________________________________________________

ACCUSED DETAILS (if known):
Name: ______________________________________________
Address: ___________________________________________
Description: _______________________________________

WITNESSES (if any):
1. Name: ___________________ Contact: ______________
2. Name: ___________________ Contact: ______________

EVIDENCE/DOCUMENTS:
_________________________________________________

PRAYER/REQUEST:
I request you to register this complaint and take necessary legal action.

Complainant's Signature: _____________________
Date: _______________

FOR POLICE USE:
FIR No: __________ Date: __________ Time: __________
Section of Law: ____________________________________
IO Assigned: ______________________________________

Police Officer's Signature: _____________________
    `;

    const blob = new Blob([firTemplate], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'FIR_Template_NyayaSetu.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const steps = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Police Station",
      description: "Go to the nearest police station in your area or where the incident occurred."
    },
    {
      icon: <Edit className="w-6 h-6" />,
      title: "Provide Details",
      description: "Clearly explain the incident with all relevant details to the officer."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Share Personal Info",
      description: "Provide your name, address, contact details, and identification."
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Officer Records",
      description: "The police officer will write down all the information in the FIR."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Verify Information",
      description: "Read through the FIR carefully and verify all details before signing."
    },
    {
      icon: <Copy className="w-6 h-6" />,
      title: "Get Your Copy",
      description: "Collect your free copy of the registered FIR for your records."
    }
  ];

  const rights = [
    {
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      title: "Right to Register FIR",
      description: "Every citizen has the fundamental right to file an FIR. Police cannot refuse to register your complaint."
    },
    {
      icon: <Copy className="w-8 h-8 text-green-600" />,
      title: "Free Copy of FIR",
      description: "You have the right to receive a free copy of the FIR immediately after registration."
    },
    {
      icon: <MapPin className="w-8 h-8 text-orange-600" />,
      title: "File Anywhere",
      description: "You can file an FIR at any police station, regardless of jurisdiction for serious crimes."
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: "Language Rights",
      description: "You have the right to file FIR in your own language and get translation if needed."
    }
  ];

  const faqs = [
    {
      question: "What information should I include in an FIR?",
      answer: "Include details like date, time, and place of incident, description of what happened, names of accused (if known), witnesses, and any evidence. Be as specific and accurate as possible."
    },
    {
      question: "Can I file an FIR online?",
      answer: "Yes, many states offer online FIR filing for certain non-serious crimes. However, you may still need to visit the police station for verification and further procedures."
    },
    {
      question: "What if the police refuse to register my FIR?",
      answer: "If police refuse to register FIR, you can file a complaint with the Superintendent of Police, approach the Magistrate under Section 156(3) CrPC, or contact the State Human Rights Commission."
    },
    {
      question: "Is there any fee for filing an FIR?",
      answer: "No, filing an FIR is completely free of cost. Police cannot charge any fee for registering an FIR or providing a copy of it."
    },
    {
      question: "Can someone else file an FIR on my behalf?",
      answer: "Yes, in cases where the victim cannot file FIR due to injury, illness, or other valid reasons, a family member or legal guardian can file FIR on their behalf."
    },
    {
      question: "How long does it take to register an FIR?",
      answer: "An FIR should be registered immediately upon reporting. There is no waiting period, and police are legally bound to register cognizable offenses without delay."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-800 serif">⚖️ NyayaSetu</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Rights</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">File FIR</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Chatbot</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Resources</a>
              <a href="#" className="text-blue-600 font-semibold border-b-2 border-blue-600">FIR Awareness</a>
              
              {/* Language Toggle */}
              <button 
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
              >
                {language === 'en' ? 'हिंदी' : 'English'}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-blue-600"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-3 space-y-3">
              <a href="#" className="block text-gray-600 hover:text-blue-600">Home</a>
              <a href="#" className="block text-gray-600 hover:text-blue-600">Rights</a>
              <a href="#" className="block text-gray-600 hover:text-blue-600">File FIR</a>
              <a href="#" className="block text-gray-600 hover:text-blue-600">Chatbot</a>
              <a href="#" className="block text-gray-600 hover:text-blue-600">Resources</a>
              <a href="#" className="block text-blue-600 font-semibold">FIR Awareness</a>
              <button 
                onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium"
              >
                {language === 'en' ? 'हिंदी' : 'English'}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Understand Your Rights. 
                <span className="text-blue-600"> File FIR Confidently.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Learn how to file a First Information Report (FIR), understand the process, and know your legal rights — all in simple language.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-2xl transition-colors">
                  Learn How to File an FIR
                </button>
                <button 
                  onClick={downloadFIRTemplate}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-2xl transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download FIR Template
                </button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white p-8 rounded-3xl shadow-2xl">
                <Scale className="w-24 h-24 text-blue-600 mx-auto mb-4" />
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Justice for All</h3>
                  <p className="text-gray-600">Your rights. Your voice. Your protection.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About FIR Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">What is an FIR?</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                An FIR (First Information Report) is a written document prepared by the police when they receive information about a cognizable offense. It is the first step in the criminal justice process.
              </p>
              <ul className="space-y-4">
                {[
                  "FIR is free of cost to file",
                  "Every citizen has the right to file an FIR",
                  "Police must register the FIR without delay", 
                  "A copy of the FIR must be given to the complainant for free"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 p-8 rounded-3xl">
              <FileText className="w-32 h-32 text-blue-600 mx-auto mb-4" />
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Your Legal Document</h3>
                <p className="text-gray-600">FIR serves as the foundation of criminal proceedings</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How to File an FIR – Step by Step</h2>
            <p className="text-xl text-gray-600">Follow these simple steps to file your FIR correctly</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mr-4">
                    {step.icon}
                  </div>
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rights Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Your Legal Rights When Filing an FIR</h2>
            <p className="text-xl text-gray-600">Know your rights and exercise them confidently</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rights.map((right, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    {right.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{right.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{right.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Get answers to common questions about FIR</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  {expandedFAQ === index ? 
                    <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  }
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-navy-900" style={{ backgroundColor: '#1e3a8a' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Don't stay silent. File your FIR today and protect your rights.
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Every citizen deserves justice. Take the first step towards protecting your rights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={downloadFIRTemplate}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-900 font-semibold px-8 py-4 rounded-2xl text-lg transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Download Template
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold">⚖️ NyayaSetu</span>
              </div>
              <p className="text-gray-300 mb-4">
                Empowering citizens with legal knowledge and making justice accessible to all.
              </p>
              <p className="text-gray-400 text-sm">
                © 2025 NyayaSetu. Justice Made Simple.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Emergency</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-gray-300">Police: 100</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-gray-300">Women Helpline: 1091</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-gray-300">Legal Aid: 15100</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Fir;