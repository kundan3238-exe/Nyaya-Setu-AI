import React, { useState, useEffect, useRef } from 'react';
import { FileText, Download, Eye, AlertCircle, Check, Calendar, User, MapPin, Scale, FileEdit } from 'lucide-react';

const LegalNoticeGenerator = () => {
  const [language, setLanguage] = useState('english');
  const [showPreview, setShowPreview] = useState(true);
  const [validationError, setValidationError] = useState('');
  const [formData, setFormData] = useState({
    senderName: '',
    senderAddress: '',
    senderContact: '',
    receiverName: '',
    receiverAddress: '',
    subject: '',
    disputeReason: '',
    specificIncident: '',
    remedySought: '',
    timeLimit: '30',
    lawyerName: '',
    placeDate: ''
  });

  const previewRef = useRef(null);

  const templates = {
    cheque: {
      subject: "Legal Notice for Dishonour of Cheque under Section 138 of Negotiable Instruments Act, 1881",
      disputeReason: "You have issued a cheque which was dishonoured by the bank due to insufficient funds/stopped payment/account closed. This constitutes a criminal offence under Section 138 of the Negotiable Instruments Act, 1881.",
      specificIncident: "Cheque No. [___], dated [___], for an amount of Rs. [___], drawn on [Bank Name] was dishonoured on [Date] with the reason '[Reason for dishonour]'.",
      remedySought: "You are hereby demanded to pay the said amount along with interest and penalty within the stipulated time period, failing which criminal proceedings under Section 138 of the Negotiable Instruments Act will be initiated against you."
    },
    property: {
      subject: "Legal Notice regarding Property Dispute and Trespass",
      disputeReason: "You have unlawfully occupied/damaged/interfered with my property without any legal right or authority, which constitutes trespass and violation of property rights under the Transfer of Property Act, 1882.",
      specificIncident: "The property in question is located at [Property Address], bearing Survey No. [___], and you have [describe the specific violation - illegal occupation/construction/damage etc.]",
      remedySought: "You are hereby directed to immediately vacate the premises and cease all unauthorized activities. You are also liable to pay compensation for damages caused."
    },
    employment: {
      subject: "Legal Notice regarding Wrongful Termination and Violation of Employment Terms",
      disputeReason: "My employment has been wrongfully terminated without proper notice, due process, or valid grounds, which violates the terms of employment contract and provisions under the Industrial Disputes Act, 1947.",
      specificIncident: "I was employed as [Designation] since [Date] with a monthly salary of Rs. [Amount]. My termination on [Date] was without [proper notice/due inquiry/valid reasons].",
      remedySought: "You are demanded to reinstate me to my position with full back wages, benefits, or alternatively pay compensation equivalent to [X] months salary along with all pending dues."
    },
    contract: {
      subject: "Legal Notice for Breach of Contract and Recovery of Damages",
      disputeReason: "You have committed breach of the contract dated [Date] by failing to perform your obligations as agreed, which has caused me financial loss and damages.",
      specificIncident: "As per the contract terms, you were obligated to [describe obligation], but you have failed to fulfill the same despite repeated reminders and expiry of the agreed timeline.",
      remedySought: "You are hereby directed to fulfill your contractual obligations immediately or pay damages of Rs. [Amount] as compensation for the losses suffered due to your breach."
    }
  };

  const translations = {
    english: {
      introText: "I, [SENDER_NAME], hereby serve this legal notice upon you under the provisions of law. This notice is being sent to bring to your attention the following matter and to demand appropriate action from your end.",
      legalBasis: "You are legally bound to address this matter as per the applicable provisions of law. Your actions/inactions have caused me significant inconvenience and financial loss.",
      warningText: "Please take this notice seriously. If you fail to comply with the demands mentioned herein within the stipulated time period, I shall be constrained to initiate appropriate legal proceedings against you for recovery of damages and other reliefs as deemed fit, without any further reference to you.",
      finalWarning: "This legal notice is issued without prejudice to my other rights and remedies available under law."
    },
    hindi: {
      introText: "मैं, [SENDER_NAME], कानून के प्रावधानों के तहत आपको यह कानूनी नोटिस भेज रहा हूं। यह नोटिस निम्नलिखित मामले के बारे में आपका ध्यान आकर्षित करने और आपसे उचित कार्रवाई की मांग करने के लिए भेजा जा रहा है।",
      legalBasis: "कानून के लागू प्रावधानों के अनुसार आप इस मामले को संबोधित करने के लिए कानूनी रूप से बाध्य हैं। आपके कार्यों/निष्क्रियता से मुझे महत्वपूर्ण असुविधा और वित्तीय हानि हुई है।",
      warningText: "कृपया इस नोटिस को गंभीरता से लें। यदि आप निर्धारित समयावधि के भीतर इसमें उल्लिखित मांगों का अनुपालन करने में विफल रहते हैं, तो मैं आपके बिना किसी और संदर्भ के, हर्जाने की वसूली और अन्य उचित राहत के लिए आपके खिलाफ उपयुक्त कानूनी कार्यवाही शुरू करने के लिए बाध्य हो जाऊंगा।",
      finalWarning: "यह कानूनी नोटिस कानून के तहत उपलब्ध मेरे अन्य अधिकारों और उपचारों के पूर्वाग्रह के बिना जारी किया गया है।"
    }
  };

  const loadTemplate = (templateType) => {
    const template = templates[templateType];
    setFormData(prev => ({
      ...prev,
      ...template
    }));
    setValidationError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setValidationError('');
  };

  const validateForm = () => {
    const requiredFields = {
      senderName: 'Your Full Name',
      senderAddress: 'Your Address',
      receiverName: "Recipient's Full Name",
      receiverAddress: "Recipient's Address",
      subject: 'Subject of Notice',
      disputeReason: 'Reason for Dispute',
      remedySought: 'Remedy/Action Demanded'
    };

    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field]?.trim()) {
        setValidationError(`Please fill in the required field: ${label}`);
        return false;
      }
    }
    setValidationError('');
    return true;
  };

  const generateContent = () => {
    if (!validateForm()) return null;

    const currentLang = translations[language];
    let content = currentLang.introText.replace('[SENDER_NAME]', formData.senderName);
    
    content += `\n\nFacts of the Case: ${formData.disputeReason}`;
    
    if (formData.specificIncident) {
      content += `\n\nSpecific Details: ${formData.specificIncident}`;
    }
    
    content += `\n\n${currentLang.legalBasis}`;
    content += `\n\nDemand: ${formData.remedySought} You are hereby given ${formData.timeLimit} days from the receipt of this notice to comply with the above demands.`;
    content += `\n\n${currentLang.warningText}`;
    content += `\n\n${currentLang.finalWarning}`;

    return content;
  };

  const downloadPDF = () => {
    if (!validateForm()) return;
    
    const printContent = previewRef.current;
    const printWindow = window.open('', '', 'width=800,height=600');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Legal Notice</title>
          <style>
            body { 
              font-family: 'Times New Roman', serif; 
              padding: 40px;
              line-height: 1.8;
            }
            .legal-notice {
              max-width: 850px;
              margin: 0 auto;
              border: 2px solid #333;
              padding: 40px;
            }
            .notice-header {
              text-align: center;
              margin-bottom: 40px;
              border-bottom: 2px solid #333;
              padding-bottom: 20px;
            }
            .notice-title {
              font-size: 2.2em;
              font-weight: bold;
              letter-spacing: 3px;
            }
            .notice-subtitle {
              font-size: 0.9em;
              color: #666;
              font-style: italic;
              margin-top: 10px;
            }
            .notice-section {
              margin-bottom: 25px;
            }
            .section-title {
              font-weight: bold;
              text-decoration: underline;
              margin-bottom: 10px;
              font-size: 1.1em;
            }
            .notice-content {
              text-align: justify;
              white-space: pre-line;
            }
            .notice-content p {
              margin-bottom: 15px;
              text-indent: 50px;
            }
            .signature-section {
              margin-top: 50px;
              text-align: right;
            }
            .signature-line {
              border-bottom: 1px solid #333;
              width: 200px;
              margin: 20px 0 5px auto;
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const currentDate = new Date().toLocaleDateString('en-IN');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Scale className="w-12 h-12 text-indigo-600" />
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              NyayaSetu
            </h1>
          </div>
          <p className="text-lg text-gray-600">Legal Notice Generator for Indian Citizens</p>
        </div>

        {/* Main Container */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FileEdit className="w-6 h-6" />
                Notice Details
              </h2>
            </div>

            <div className="p-6 space-y-6 max-h-[800px] overflow-y-auto">
              {/* Language Toggle */}
              <div className="flex gap-2 justify-center bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setLanguage('english')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                    language === 'english'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('hindi')}
                  className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                    language === 'hindi'
                      ? 'bg-white text-indigo-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  हिंदी
                </button>
              </div>

              {/* Validation Error */}
              {validationError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start gap-3 animate-pulse">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-red-700 text-sm">{validationError}</p>
                </div>
              )}

              {/* Templates */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Quick Templates
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'cheque', label: 'Cheque Bounce', icon: '💳' },
                    { key: 'property', label: 'Property Dispute', icon: '🏠' },
                    { key: 'employment', label: 'Job Termination', icon: '💼' },
                    { key: 'contract', label: 'Contract Breach', icon: '📄' }
                  ].map(template => (
                    <button
                      key={template.key}
                      onClick={() => loadTemplate(template.key)}
                      className="p-3 bg-gradient-to-br from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-200 rounded-lg text-sm font-medium text-gray-700 transition-all hover:shadow-md"
                    >
                      <span className="mr-2">{template.icon}</span>
                      {template.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="senderName"
                      value={formData.senderName}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="senderAddress"
                    value={formData.senderAddress}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    placeholder="Enter your complete address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Contact (Phone/Email)
                  </label>
                  <input
                    type="text"
                    name="senderContact"
                    value={formData.senderContact}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Phone or email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Recipient's Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="receiverName"
                    value={formData.receiverName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="Enter recipient's full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Recipient's Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="receiverAddress"
                    value={formData.receiverAddress}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    placeholder="Enter recipient's complete address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject of Notice <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="e.g., Regarding non-payment of dues"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Reason for Dispute <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="disputeReason"
                    value={formData.disputeReason}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    placeholder="Describe the main issue or violation..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Specific Details of Incident
                  </label>
                  <textarea
                    name="specificIncident"
                    value={formData.specificIncident}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    placeholder="Provide dates, amounts, or specific details..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Remedy/Action Demanded <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="remedySought"
                    value={formData.remedySought}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    placeholder="What action do you want the recipient to take?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Time Limit for Compliance
                  </label>
                  <select
                    name="timeLimit"
                    value={formData.timeLimit}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  >
                    <option value="15">15 Days</option>
                    <option value="30">30 Days</option>
                    <option value="45">45 Days</option>
                    <option value="60">60 Days</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Advocate/Legal Firm Name (Optional)
                  </label>
                  <input
                    type="text"
                    name="lawyerName"
                    value={formData.lawyerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    placeholder="If sending through legal counsel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Place
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="placeDate"
                      value={formData.placeDate}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="City name"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Eye className="w-5 h-5" />
                  {showPreview ? 'Hide' : 'Show'} Preview
                </button>
                <button
                  onClick={downloadPDF}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  Preview
                </h2>
              </div>

              <div className="p-6 max-h-[800px] overflow-y-auto">
                <div ref={previewRef} className="legal-notice bg-white border-2 border-gray-900 p-8">
                  {/* Header */}
                  <div className="notice-header text-center mb-8 border-b-2 border-gray-900 pb-6">
                    <div className="text-3xl font-bold tracking-widest mb-2">LEGAL NOTICE</div>
                    <div className="text-sm text-gray-600 italic">
                      Generated via NyayaSetu – Citizen Legal Assistant
                    </div>
                  </div>

                  {/* Date */}
                  <div className="text-right font-semibold mb-6">
                    Date: {currentDate}
                  </div>

                  {/* To Section */}
                  <div className="mb-6">
                    <div className="font-bold underline mb-2">TO:</div>
                    <div>
                      <strong>{formData.receiverName || '[Recipient Name]'}</strong>
                      <br />
                      {formData.receiverAddress ? (
                        formData.receiverAddress.split('\n').map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))
                      ) : (
                        '[Recipient Address]'
                      )}
                    </div>
                  </div>

                  {/* From Section */}
                  <div className="mb-6">
                    <div className="font-bold underline mb-2">FROM:</div>
                    <div>
                      <strong>{formData.senderName || '[Your Name]'}</strong>
                      <br />
                      {formData.senderAddress ? (
                        formData.senderAddress.split('\n').map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))
                      ) : (
                        '[Your Address]'
                      )}
                      {formData.senderContact && (
                        <>
                          <br />
                          Contact: {formData.senderContact}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="mb-6">
                    <div className="font-bold underline mb-2">SUBJECT:</div>
                    <div>{formData.subject || '[Subject of Notice]'}</div>
                  </div>

                  {/* Content */}
                  <div className="text-justify leading-relaxed space-y-4">
                    {generateContent() ? (
                      generateContent().split('\n\n').map((para, i) => (
                        <p key={i} className="indent-12">{para}</p>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">
                        Please fill in the required fields to generate your legal notice preview.
                      </p>
                    )}
                  </div>

                  {/* Signature */}
                  <div className="mt-12 text-right">
                    <div>Yours faithfully,</div>
                    <div className="border-b border-gray-900 w-48 my-4 ml-auto"></div>
                    <div>({formData.senderName || '[Your Name]'})</div>
                    <div>Date: {currentDate}</div>
                    <div>Place: {formData.placeDate || '[Place]'}</div>
                    {formData.lawyerName && (
                      <div className="mt-4 italic">
                        Through: {formData.lawyerName}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          <p>⚖️ NyayaSetu - Empowering Citizens with Legal Tools</p>
          <p className="mt-2 text-xs">
            Note: This is a template generator. Please consult with a qualified legal professional before sending any legal notice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalNoticeGenerator;