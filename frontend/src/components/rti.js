import React, { useState, useEffect } from 'react';
import { FileText, Search, BookOpen, AlertCircle, Download, Copy, ExternalLink, CheckCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react';

export default function NyayaSetuApp() {
  const [rtiForm, setRtiForm] = useState({
    fullName: '',
    email: '',
    address: '',
    publicAuthority: '',
    subject: '',
    information: ''
  });
  const [generatedDraft, setGeneratedDraft] = useState('');
  const [showDraft, setShowDraft] = useState(false);
  const [trackingQuery, setTrackingQuery] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [savedDrafts, setSavedDrafts] = useState([]);
  const [activeTab, setActiveTab] = useState('draft');

  useEffect(() => {
    const drafts = JSON.parse(localStorage.getItem('rtiDrafts') || '[]');
    setSavedDrafts(drafts);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRtiForm(prev => ({ ...prev, [name]: value }));
  };

  const generateRTIDraft = (data) => {
    return `To,
The Public Information Officer,
${data.publicAuthority}

Subject: ${data.subject}

Sir/Madam,

I, ${data.fullName}, resident of ${data.address}, am seeking the following information under the Right to Information Act, 2005:

${data.information}

I am willing to pay the prescribed fee for obtaining this information. If any document cannot be provided, please state the reason thereof.

If the information sought does not pertain to your department, please transfer this application to the concerned department and inform me accordingly.

Please acknowledge the receipt of this application and provide the information within the stipulated time frame of 30 days as per the RTI Act, 2005.

Thank you.

Yours faithfully,
${data.fullName}
Email: ${data.email}
Date: ${new Date().toLocaleDateString('en-IN')}

---
Application generated via NyayaSetu RTI Assistant
Please submit this application through the official RTI portal: https://rtionline.gov.in`;
  };

  const handleSubmit = () => {
    if (!rtiForm.fullName || !rtiForm.email || !rtiForm.address || 
        !rtiForm.publicAuthority || !rtiForm.subject || !rtiForm.information) {
      alert('Please fill in all required fields');
      return;
    }
    
    const draft = generateRTIDraft(rtiForm);
    setGeneratedDraft(draft);
    setShowDraft(true);

    const draftId = 'RTI' + Date.now();
    const draftData = {
      id: draftId,
      ...rtiForm,
      status: 'Draft Created',
      date: new Date().toLocaleDateString('en-IN'),
      content: draft
    };

    const drafts = JSON.parse(localStorage.getItem('rtiDrafts') || '[]');
    drafts.push(draftData);
    localStorage.setItem('rtiDrafts', JSON.stringify(drafts));
    setSavedDrafts(drafts);

    setTimeout(() => {
      document.getElementById('draft-result')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const downloadDraft = () => {
    const blob = new Blob([generatedDraft], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RTI_Draft_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const copyDraft = () => {
    navigator.clipboard.writeText(generatedDraft).then(() => {
      alert('RTI draft copied to clipboard!');
    });
  };

  const handleTracking = () => {
    if (!trackingQuery.trim()) {
      alert('Please enter a Draft ID or Name to track');
      return;
    }

    const found = savedDrafts.find(draft =>
      draft.id.toLowerCase().includes(trackingQuery.toLowerCase()) ||
      draft.fullName.toLowerCase().includes(trackingQuery.toLowerCase())
    );

    setTrackingResult(found || 'not_found');
  };

  const features = [
    { icon: <FileText className="w-8 h-8" />, title: "Draft RTI Applications", desc: "Create professional RTI requests with guided assistance" },
    { icon: <BookOpen className="w-8 h-8" />, title: "Learn How to File", desc: "Step-by-step guidance through the RTI process" },
    { icon: <AlertCircle className="w-8 h-8" />, title: "Appeal Guidance", desc: "Learn to file appeals when your rights are denied" }
  ];

  const faqs = [
    {
      q: "Is this a government portal?",
      a: "No, NyayaSetu is an independent educational tool that helps you prepare RTI applications. We are not affiliated with the Government of India. You must submit your RTI through the official government portal at rtionline.gov.in."
    },
    {
      q: "Will my RTI be automatically sent to the government?",
      a: "No, we do not automatically submit RTI applications. We only help you draft and prepare your RTI. You must visit the official RTI portal to submit your application and pay the required fees."
    },
    {
      q: "Is this service free?",
      a: "Yes, our RTI drafting and educational services are completely free. However, when you submit your RTI through the official portal, you may need to pay the government-prescribed application fee (typically ₹10 for central government departments)."
    },
    {
      q: "What if I don't get a response to my RTI?",
      a: "If you don't receive a response within 30 days of filing your RTI, you can file a First Appeal with the designated First Appellate Authority of the concerned public authority."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-2xl p-8 mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl mr-4">
              <FileText className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">NyayaSetu – RTI Assistant</h1>
              <p className="text-blue-100 text-sm sm:text-base">Your Right to Information, Made Simple</p>
            </div>
          </div>
          <p className="text-center text-blue-50 max-w-3xl mx-auto">
            The Right to Information Act 2005 empowers every Indian citizen to seek information from public authorities. 
            Draft professional RTI applications with confidence.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-all border-t-4 border-blue-500 transform hover:scale-105">
              <div className="text-blue-600 mb-3 flex justify-center">{feature.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-2 text-center text-sm">{feature.title}</h3>
              <p className="text-xs text-gray-600 text-center">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-2 mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'draft', label: 'Draft RTI', icon: <FileText className="w-4 h-4" /> },
              { id: 'appeal', label: 'Appeal Guide', icon: <AlertCircle className="w-4 h-4" /> },
              { id: 'faq', label: 'FAQ & Help', icon: <BookOpen className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Draft RTI Tab */}
        {activeTab === 'draft' && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <FileText className="w-7 h-7 mr-3 text-blue-600" />
              Draft Your RTI Application
            </h2>
            
            <div className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={rtiForm.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={rtiForm.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Complete Address *</label>
                <textarea
                  name="address"
                  value={rtiForm.address}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter your complete postal address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Public Authority (Department/Ministry) *</label>
                <input
                  type="text"
                  name="publicAuthority"
                  value={rtiForm.publicAuthority}
                  onChange={handleInputChange}
                  placeholder="e.g., Ministry of Education, Delhi Municipal Corporation"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject of Request *</label>
                <input
                  type="text"
                  name="subject"
                  value={rtiForm.subject}
                  onChange={handleInputChange}
                  placeholder="Brief description of what information you need"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Information Requested *</label>
                <textarea
                  name="information"
                  value={rtiForm.information}
                  onChange={handleInputChange}
                  rows="6"
                  placeholder="Please provide detailed information about what you want to know. Be specific and clear."
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg text-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg transform hover:scale-[1.02]"
              >
                Generate RTI Draft
              </button>
            </div>

            {showDraft && (
              <div id="draft-result" className="mt-8 p-6 bg-green-50 border-2 border-green-300 rounded-xl">
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                  <h3 className="text-lg font-bold text-green-800">Your RTI Draft is Ready!</h3>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-green-200 mb-4 max-h-96 overflow-y-auto">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">{generatedDraft}</pre>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={downloadDraft} className="flex items-center bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-md">
                    <Download className="w-4 h-4 mr-2" /> Download Draft
                  </button>
                  <button onClick={copyDraft} className="flex items-center bg-gray-600 text-white px-5 py-3 rounded-lg hover:bg-gray-700 transition-all font-semibold shadow-md">
                    <Copy className="w-4 h-4 mr-2" /> Copy Text
                  </button>
                  <a
                    href="https://rtionline.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition-all font-semibold shadow-md"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" /> Submit on RTI Portal
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
        {/* Appeal Tab */}
        {activeTab === 'appeal' && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <AlertCircle className="w-7 h-7 mr-3 text-blue-600" />
              File an RTI Appeal
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border-2 border-red-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">When to File an Appeal</h3>
                <ul className="space-y-3 text-gray-700">
                  {[
                    "No response within 30 days of RTI filing",
                    "Information denied without valid reason",
                    "Excessive fees demanded",
                    "Incomplete or misleading information provided"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-red-600 mr-3 mt-1 text-xl">•</span>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Appeal Process</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border-l-4 border-blue-600 shadow-sm">
                    <h4 className="font-bold text-blue-900 mb-1">First Appeal</h4>
                    <p className="text-sm text-gray-700">File with First Appellate Authority within 30 days</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border-l-4 border-green-600 shadow-sm">
                    <h4 className="font-bold text-green-900 mb-1">Second Appeal</h4>
                    <p className="text-sm text-gray-700">File with Information Commission within 90 days</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-xl shadow-xl">
              <h3 className="text-xl font-bold mb-4">Appeal Guidance</h3>
              <p className="mb-6 text-blue-50">
                To file an appeal, you'll need your original RTI application number, date of filing, and clear reasons for the appeal. 
                Visit the official RTI portal for the complete appeal process.
              </p>
              <a
                href="https://rtionline.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-all font-bold shadow-lg"
              >
                <ExternalLink className="w-5 h-5 mr-2" /> Go to RTI Portal
              </a>
            </div>
          </div>
        )}

        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <BookOpen className="w-7 h-7 mr-3 text-blue-600" />
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4 mb-8">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl overflow-hidden border-2 border-gray-200 hover:border-blue-300 transition-all">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="w-full p-5 text-left flex justify-between items-center hover:bg-white/50 transition-colors"
                  >
                    <h3 className="text-base font-bold text-gray-800 pr-4">{faq.q}</h3>
                    {expandedFaq === idx ? 
                      <ChevronUp className="w-6 h-6 text-blue-600 flex-shrink-0" /> : 
                      <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                    }
                  </button>
                  {expandedFaq === idx && (
                    <div className="px-5 pb-5 text-gray-700 bg-white border-t-2 border-gray-100">
                      <p className="pt-4">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-4">Government Portals</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="https://rtionline.gov.in" target="_blank" rel="noopener noreferrer" 
                 className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-xl hover:shadow-xl transition-all transform hover:scale-105">
                <h4 className="font-bold text-lg mb-2">Central RTI Portal</h4>
                <p className="text-blue-100 text-sm">Official government portal for RTI submissions</p>
              </a>
              <a href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer"
                 className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-xl hover:shadow-xl transition-all transform hover:scale-105">
                <h4 className="font-bold text-lg mb-2">CPGRAMS</h4>
                <p className="text-green-100 text-sm">Public Grievance Redress System</p>
              </a>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600 bg-white/50 backdrop-blur-sm rounded-lg p-4">
          <p className="mb-1">© 2025 NyayaSetu – Built by Rudra Milke, GH Raisoni University</p>
          <p className="text-xs text-gray-500">This is an RTI educational and drafting aid. Not affiliated with the Government of India.</p>
        </div>
      </div>
    </div>
  );
}