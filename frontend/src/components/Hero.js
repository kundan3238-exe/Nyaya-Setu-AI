import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Phone, MessageCircle, Shield, Users, Download, ExternalLink } from 'lucide-react';
import { BookOpen, FileText, File, MapPin, BarChart2, Calculator, Search, Home, Clipboard, FileCheck, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Edu from "./Education";

export const quickServices = [
  { icon: <BookOpen className="w-8 h-8 text-blue-600" />, title: 'Know Your Rights', desc: 'Learn about your fundamental and legal rights in India', link: '/search', color: 'bg-blue-50' },
  { icon: <FileText className="w-8 h-8 text-red-600" />, title: 'File FIR / Notice', desc: 'Guidance to file complaints or legal notices easily', link: '/fir', color: 'bg-red-50' },
  { icon: <File className="w-8 h-8 text-indigo-600" />, title: 'Legal Templates', desc: 'Download ready-to-use legal document templates', link: '#resources', color: 'bg-indigo-50' },
  { icon: <MapPin className="w-8 h-8 text-yellow-600" />, title: 'Legal Aid Near Me', desc: 'Find lawyers and legal aid centers in your area', link: '/map', color: 'bg-yellow-50' },
  { icon: <BarChart2 className="w-8 h-8 text-teal-600" />, title: 'RTI Assistant', desc: 'File Right to Information requests quickly', link: '#rti', color: 'bg-teal-50' },
  { icon: <Calculator className="w-8 h-8 text-purple-600" />, title: 'Legal Calculator', desc: 'Calculate court fees, stamp duty, property registration charges, and more', link: '/calculate', color: 'bg-purple-50' },
];

export const featuredTools = [
  { icon: <Search className="w-8 h-8 " />, title: 'Case Law Search', desc: 'Search through thousands of Indian court judgments and legal precedents to strengthen your case.', button: <Link to="/search">Explore Cases</Link>, color: 'bg-blue-600' },
  { icon: <MapPin className="w-8 h-8 " />, title: 'Nearby Courts & Lawyers', desc: 'Find nearby courts, legal aid centers, police stations, and experienced lawyers in your area.', button: <Link to="/map">Find On Map</Link>, color: 'bg-blue-600' },
  { icon: <Calculator className="w-8 " />, title: 'Legal Calculator', desc: 'Calculate court fees, stamp duty, property registration charges, and other legal costs instantly.', button: <Link to="/calculate">Calculate Now</Link>, color: 'bg-blue-600' }
];
const legalTopics = [
  { 
    icon: <UserCheck className="w-8 h-8 text-gray-700" />, 
    title: 'Arrest Rights', 
    desc: 'You have the right to remain silent, the right to legal representation, the right to be informed of charges, and protection against illegal detention.' 
  },
  { 
    icon: <Home className="w-8 h-8 text-gray-700" />, 
    title: 'Tenant Rights', 
    desc: 'You have the right to live peacefully in your rented property, receive proper notice before eviction, and claim your security deposit without unfair deductions.' 
  },
  { 
    icon: <Clipboard className="w-8 h-8 text-gray-700" />, 
    title: 'Cheque Bounce Laws', 
    desc: 'You have the right to file a criminal complaint under Section 138 of the Negotiable Instruments Act and claim fines or compensation for dishonored cheques.' 
  },
  { 
    icon: <FileCheck className="w-8 h-8 text-gray-700" />, 
    title: 'Dowry Laws', 
    desc: 'You have the right to protection from dowry harassment, to file complaints under the Dowry Prohibition Act, and to pursue legal action against offenders.' 
  },
  { 
    icon: <File className="w-8 h-8 text-gray-700" />, 
    title: 'Motor Accident Claims', 
    desc: 'You have the right to claim compensation for medical expenses, loss of income, and damages caused due to motor vehicle accidents under the Motor Vehicles Act.' 
  },
  { 
    icon: <Users className="w-8 h-8 text-gray-700" />, 
    title: 'Employment Rights', 
    desc: 'You have the right to fair wages, safe working conditions, protection from harassment, and to approach labor courts for disputes or wrongful termination.' 
  }
];

export const legalTemplates = [
  { icon: <FileText className="w-8 h-8 text-blue-600" />, title: 'Consent Form', desc: 'Template to obtain general permissions in legal matters.', color: 'bg-blue-600' },
  { icon: <FileText className="w-8 h-8 text-green-600" />, title: 'Civil Petition', desc: 'Template for filing civil petitions in courts for various disputes.', color: 'bg-green-600' },
  { icon: <FileText className="w-8 h-8 text-red-600" />, title: 'FIR Format', desc: 'Standard FIR template for reporting criminal complaints to authorities.', color: 'bg-red-600' },
  { icon: <FileText className="w-8 h-8 text-yellow-600" />, title: 'RTI Form', desc: 'Template to file Right to Information requests to government departments.', color: 'bg-yellow-600' },
  { icon: <FileText className="w-8 h-8 text-blue-600" />, title: 'Legal Notice', desc: 'Template to send formal legal notices for disputes or claims.', color: 'bg-blue-600' },
  { icon: <FileText className="w-8 h-8 text-green-600" />, title: 'Will Template', desc: 'Template for drafting legal wills and managing asset distribution.', color: 'bg-green-600' },
  { icon: <FileText className="w-8 h-8 text-red-600" />, title: 'Power of Attorney', desc: 'Template for creating general/specific power of attorney documents.', color: 'bg-red-600' },
  { icon: <FileText className="w-8 h-8 text-yellow-600" />, title: 'Employment Contract', desc: 'Template for standard employment contracts with essential clauses.', color: 'bg-yellow-600' }
];

const NyayaSetu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [email, setEmail] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const languages = [
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'hi', label: 'HI', name: 'Hindi' },
    { code: 'mr', label: 'MR', name: 'Marathi' }
  ];

  const testimonials = [
    { name: 'Rakesh Kumar', role: 'Small Business Owner, Delhi', initial: 'R', color: 'bg-blue-600', text: 'I was cheated by a contractor who didn\'t complete my shop renovation. NyayaSetu helped me understand my rights and provided the exact legal notice format. I got my money back within 2 months. This platform saved me from expensive lawyer fees.' },
    { name: 'Priya Sharma', role: 'Software Engineer, Bangalore', initial: 'P', color: 'bg-green-600', text: 'As a woman working in tech, I faced harassment at workplace. NyayaSetu\'s women helpdesk guided me through the POSH Act and helped me file a proper complaint. The 24/7 chatbot support was incredibly helpful during my difficult time.' },
    { name: 'Amit Patel', role: 'Teacher, Gujarat', initial: 'A', color: 'bg-purple-600', text: 'My landlord was trying to evict me illegally during COVID lockdown. Through NyayaSetu, I learned about tenant rights and the eviction moratorium. The platform connected me with a local legal aid lawyer who helped me stay in my home.' },
    { name: 'Rajesh Kumar', role: 'Small Business Owner, Delhi', initial: 'R', color: 'bg-blue-600', text: 'I was cheated by a contractor who didn\'t complete my shop renovation. NyayaSetu helped me understand my rights and provided the exact legal notice format. I got my money back within 2 months. This platform saved me from expensive lawyer fees.' },
    { name: 'Priti Sharma', role: 'Software Engineer, Bangalore', initial: 'P', color: 'bg-green-600', text: 'As a woman working in tech, I faced harassment at workplace. NyayaSetu\'s women helpdesk guided me through the POSH Act and helped me file a proper complaint. The 24/7 chatbot support was incredibly helpful during my difficult time.' },
    { name: 'Amita Patel', role: 'Teacher, Gujarat', initial: 'A', color: 'bg-purple-600', text: 'My landlord was trying to evict me illegally during COVID lockdown. Through NyayaSetu, I learned about tenant rights and the eviction moratorium. The platform connected me with a local legal aid lawyer who helped me stay in my home.' }
  ];

  const govPortals = [
    { title: 'Central RTI Portal', desc: 'File RTI with central government departments', url: 'https://rtionline.gov.in' },
    { title: 'CPGRAMS', desc: 'Centralized Public Grievance Redress System', url: 'https://pgportal.gov.in' },
    { title: 'Supreme Court e-Filing', desc: 'Electronic filing system for Supreme Court', url: 'https://main.sci.gov.in/efiling' },
    { title: 'e-Courts Services', desc: 'Case status, cause lists, and court orders', url: 'https://ecourts.gov.in' },
    { title: 'National Legal Services Authority', desc: 'Free legal aid services across India', url: 'https://nalsa.gov.in' }
  ];
    
  const faqs = [
    { 
      q: 'Is my personal information safe with NyayaSetu?', 
      a: 'We take basic precautions to protect your information. Currently, we do not share your data, but advanced security features like encryption are limited.' 
    },
    { 
      q: 'Can NyayaSetu help in filing RTI applications?', 
      a: 'We provide guidance and sample templates for RTI requests. Filing is still manual, so you will need to submit them yourself online or offline.' 
    },
    { 
      q: 'Do I need to pay for lawyer consultations through NyayaSetu?', 
      a: 'Our platform does not provide direct lawyer consultations yet. Some guidance may be free, but connecting with lawyers will depend on external services.' 
    },
    { 
      q: 'Can I access NyayaSetu from my mobile phone?', 
      a: 'Yes, the website works on mobile devices, but some features like document uploads or map-based searches may have limited functionality on smaller screens.' 
    },
    { 
      q: 'How accurate is the AI legal assistant?', 
      a: 'Our AI provides general guidance and sample text. It is helpful for basic queries, but it cannot replace professional legal advice.' 
    },
    { 
      q: 'Does NyayaSetu cover all Indian states?', 
      a: 'We aim to provide general guidance for all states. Some state-specific details, like online FIR systems, may not be fully covered yet.' 
    },
    { 
      q: 'Can I get templates for different types of legal documents?', 
      a: 'Yes, we provide basic templates for FIRs, legal notices, and RTI applications. They are simple and may need customization for specific cases.' 
    },
    { 
      q: 'How quickly can I get answers from the AI assistant?', 
      a: 'The AI responds instantly, but the answers are simple and meant for general guidance only.' 
    }
  ];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing with email: ${email}`);
      setEmail('');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 transition-colors">
                <span className="text-2xl">⚖️</span>
                <span className="text-xl font-bold text-blue-800">NyayaSetu</span>
              </button>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 transition-colors">Home</button>
              <button onClick={() => scrollToSection('rights')} className="text-gray-700 hover:text-blue-600 transition-colors">Rights</button>
              <button onClick={() => scrollToSection('chatbot')} className="text-gray-700 hover:text-blue-600 transition-colors">ChatBot</button>
              <button onClick={() => scrollToSection('resources')} className="text-gray-700 hover:text-blue-600 transition-colors">Resources</button>
              <button className="text-gray-700 hover:text-blue-600 transition-colors"><Link to="/map">Map</Link></button>
              
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-gray-100 border border-gray-300 rounded-md px-3 py-1 text-sm">
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.label}</option>
                ))}
              </select>
            </div>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              <button onClick={() => scrollToSection('home')} className="block w-full text-left py-2 text-gray-700">Home</button>
              <button onClick={() => scrollToSection('rights')} className="block w-full text-left py-2 text-gray-700">Rights</button>
              <button onClick={() => scrollToSection('chatbot')} className="block w-full text-left py-2 text-gray-700">ChatBot</button>
              <button onClick={() => scrollToSection('resources')} className="block w-full text-left py-2 text-gray-700">Resources</button>
              <button className="text-gray-700 hover:text-blue-600 transition-colors"><Link to="/map">Map</Link></button>
            </div>
          </div>
        )}
      </nav>

      {/* Tailwind Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-30px); opacity: 1; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }

        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fade-up 1s ease forwards; }
        .animate-fade-up.delay-200 { animation-delay: 0.2s; }

        @keyframes gradient-slow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-slow {
          background-size: 400% 400%;
          animation: gradient-slow 15s ease infinite;
        }
      `}
      </style>

      <section id="home" className="bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 animate-gradient-slow text-white py-20 min-h-screen flex items-center relative overflow-hidden">
        {/* Floating Shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => {
            const size = Math.random() * 40 + 20; // 20px to 60px
            return (
              <div
                key={i}
                className="absolute bg-white opacity-20 rounded-full animate-float"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${6 + Math.random() * 6}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></div>
            );
          })}
        </div>
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fade-up">
              Justice Made Simple for Every Indian
            </h1>
            <p className="text-lg md:text-2xl mb-8 animate-fade-up delay-200">
              Your one-stop platform for legal awareness, FIRs, rights, and support — in your language.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button className="bg-red-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <Link to="/search"><button>Know Your Rights</button></Link>
              </button>
              <button className="bg-white text-blue-800 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <Link to="/chat"><button>Speak to ChatBot</button></Link>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Quick Legal Services</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Access essential legal services with just one click. We've simplified the complex legal system for you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickServices.map((service, i) => (
              service.link.startsWith('#') ? (
                <div
                  key={i}
                  onClick={() => {
                    const section = document.getElementById(service.link.substring(1));
                    section?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`${service.color} rounded-xl p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer`}
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.desc}</p>
                </div>
              ) : (
                <Link
                  key={i}
                  to={service.link}
                  className={`${service.color} rounded-xl p-6 text-center block transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer`}
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.desc}</p>
                </Link>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section id="tools" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Legal Tools</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Powerful tools designed to make legal processes accessible to everyone</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTools.map((tool, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-lg transform transition-all duration-300 hover:scale-105">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-4">{tool.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800">{tool.title}</h3>
                </div>
                <p className="text-gray-600 mb-6">{tool.desc}</p>
                <button className={`${tool.color} text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity`}>
                  {tool.button}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Legal Topics */}
      <section id="rights" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Legal Topics</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Understanding your rights is the first step towards justice</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {legalTopics.map((topic, i) => (
              <div key={i} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
                <div className="text-4xl">{topic.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{topic.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{topic.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How NyayaSetu Works</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Three simple steps to get the legal help you need</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: 1, title: 'Describe Your Problem', desc: 'Tell us about your legal issue through text or voice input. Our system understands multiple Indian languages and can process complex legal scenarios.' },
              { num: 2, title: 'Get Matching Laws & Templates', desc: 'Our AI analyzes your case and provides relevant laws, precedents, and ready-to-use legal templates tailored to your specific situation.' },
              { num: 3, title: 'Download or Take Action', desc: 'Download your documents, file them online, or connect with lawyers for further assistance. Track your case progress through our platform.' }
            ].map((step, i) => (
              <div key={i} className="text-center relative">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 right-0 w-8 h-0.5 bg-gray-300 transform translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What People Say</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Real stories from citizens who found justice through NyayaSetu</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold`}>
                    {testimonial.initial}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Templates Section */}
      <section id="resources" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Free Legal Templates & Downloads</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Ready-to-use legal documents that you can customize and download instantly</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {legalTemplates.map((template, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105 text-center">
                <div className="text-4xl mb-4">{template.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{template.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{template.desc}</p>
                <button className={`w-full ${template.color} text-white py-2 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}>
                  <Download className="w-4 h-4" />
                  <Link to="/template">Create Now!</Link>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RTI & Government Portals */}
      <section id="rti" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">RTI & Grievance Portal</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Exercise your right to information and file grievances against government departments</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-blue-50 rounded-xl p-8">
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">📋</div>
                <h3 className="text-2xl font-bold text-gray-800">What is RTI?</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Right to Information (RTI) Act, 2005 empowers citizens to seek information from public authorities. You can request documents, policies, decisions, and other information from government departments.
              </p>
              <div className="space-y-3 mb-6">
                {[
                  'File RTI applications online',
                  'Track your application status',
                  'Appeal if information is denied',
                  '30-day response guarantee'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <FileText className="w-5 h-5" />
                <Link to="/rti">Start RTI Application</Link>
              </button>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Links to Government Portals</h3>
              <div className="space-y-4">
                {govPortals.map((portal, i) => (
                  <a key={i} href={portal.url} target="_blank" rel="noopener noreferrer" className="block bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-800">{portal.title}</div>
                        <div className="text-gray-600 text-sm">{portal.desc}</div>
                      </div>
                      <ExternalLink className="text-blue-600 w-5 h-5" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Law Student Zone */}
      <section className="py-16 bg-gradient-to-r">
        <Edu/>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-lg">Common questions about legal rights and procedures</p>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-6 text-left flex justify-between items-center"
                >
                  <span className="font-semibold text-gray-800">{faq.q}</span>
                  <ChevronDown className={`text-blue-600 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">⚖️</span>
                <span className="text-xl font-bold">NyayaSetu</span>
              </div>
              <p className="text-gray-300 mb-4">Making justice accessible for every Indian citizen through technology and legal awareness.</p>
              <div className="flex space-x-10">
                <span className="text-2xl cursor-pointer hover:text-blue-400 transition-colors">📘</span>
                <span className="text-2xl cursor-pointer hover:text-blue-400 transition-colors">🐦</span>
                <span className="text-2xl cursor-pointer hover:text-red-400 transition-colors">📺</span>
                <span className="text-2xl cursor-pointer hover:text-purple-400 transition-colors">📸</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button className="hover:text-white transition-colors text-left">File FIR</button></li>
                <li><button className="hover:text-white transition-colors text-left">Know Your Rights</button></li>
                <li><button className="hover:text-white transition-colors text-left">Legal Templates</button></li>
                <li><button className="hover:text-white transition-colors text-left">RTI Assistant</button></li>
                <li><button className="hover:text-white transition-colors text-left">Find Lawyer</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Legal Areas</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button className="hover:text-white transition-colors text-left">Criminal Law</button></li>
                <li><button className="hover:text-white transition-colors text-left">Civil Rights</button></li>
                <li><button className="hover:text-white transition-colors text-left">Consumer Protection</button></li>
                <li><button className="hover:text-white transition-colors text-left">Employment Law</button></li>
                <li><button className="hover:text-white transition-colors text-left">Family Law</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><button className="hover:text-white transition-colors text-left">Help Center</button></li>
                <li><button className="hover:text-white transition-colors text-left">Contact Us</button></li>
                <li><button className="hover:text-white transition-colors text-left">Privacy Policy</button></li>
                <li><button className="hover:text-white transition-colors text-left">Terms of Service</button></li>
                <li><button className="hover:text-white transition-colors text-left">Disclaimer</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-300 text-center md:text-left mb-4 md:mb-0">
                <p>© 2025 NyayaSetu — Built with ❤️ for India 🇮🇳</p>
                <p className="text-sm">Developer: <span className="text-blue-400">Rudra Milke</span>, GH Raisoni University</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="text-gray-300 text-sm">Made in India</span>
                <span className="text-xl">🇮🇳</span>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm max-w-3xl mx-auto">
                <strong>Disclaimer:</strong> NyayaSetu provides general legal information and should not be considered as formal legal advice. For specific legal matters, please consult with qualified lawyers. We strive to keep our information accurate and updated, but laws can change frequently.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NyayaSetu;