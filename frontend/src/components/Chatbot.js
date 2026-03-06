import React, { useState, useEffect, useRef } from 'react';
import { Send, Scale } from 'lucide-react';

const NyayaSetuAI = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Namaste! I'm NyayaSetu-AI, your intelligent legal assistant specializing in Indian law. I have comprehensive knowledge of the Indian Penal Code and can help you understand legal provisions, your rights, and available remedies. Ask me about any section of IPC or describe your legal concern.",
      isUser: false
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [legalData, setLegalData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Load legal data from backend
  useEffect(() => {
    const loadLegalData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/rights');
        if (!response.ok) {
          throw new Error('Failed to fetch legal data');
        }
        const data = await response.json();
        setLegalData(Array.isArray(data) ? data : []);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading legal data:', error);
        setIsLoading(false);
        setMessages(prev => [...prev, {
          id: Date.now(),
          content: "⚠️ Unable to connect to the legal database. Please ensure the backend server is running on http://localhost:5000",
          isUser: false
        }]);
      }
    };

    loadLegalData();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const findBestMatch = (userInput) => {
    if (legalData.length === 0) return null;
    
    const input = userInput.toLowerCase();
    let bestMatch = null;
    let highestScore = 0;
    
    for (const item of legalData) {
      let score = 0;
      
      // Exact section match (highest priority)
      if (item.section && input.includes(item.section.toLowerCase())) {
        score += 20;
      }
      
      // Extract numbers from input to match section numbers
      const inputNumbers = input.match(/\d+[a-zA-Z]?/g);
      const sectionNumbers = item.section ? item.section.match(/\d+[a-zA-Z]?/g) : [];
      if (inputNumbers && sectionNumbers) {
        for (const num of inputNumbers) {
          if (sectionNumbers.some(sn => sn.toLowerCase() === num.toLowerCase())) {
            score += 15;
          }
        }
      }
      
      // Title keyword matching
      if (item.title) {
        const titleWords = item.title.toLowerCase().split(/\s+/);
        const inputWords = input.split(/\s+/);
        
        for (const word of titleWords) {
          if (word.length > 3 && inputWords.includes(word)) {
            score += 5;
          }
        }
        
        // Check for key legal terms
        const legalTerms = ['cruelty', 'cheating', 'assault', 'murder', 'theft', 'fraud', 'harassment', 'dowry', 'rape', 'kidnapping'];
        for (const term of legalTerms) {
          if (item.title.toLowerCase().includes(term) && input.includes(term)) {
            score += 10;
          }
        }
      }
      
      // Description matching
      if (item.description) {
        const descWords = item.description.toLowerCase().split(/\s+/);
        const inputWords = input.split(/\s+/);
        
        for (const word of descWords) {
          if (word.length > 4 && inputWords.includes(word)) {
            score += 2;
          }
        }
      }
      
      // Reference type matching
      if (item.reference) {
        if (input.includes('ipc') && item.reference.toLowerCase().includes('penal code')) {
          score += 5;
        }
        if (input.includes('crpc') && item.reference.toLowerCase().includes('criminal procedure')) {
          score += 5;
        }
      }
      
      // Bail-related queries
      if (input.includes('bail') || input.includes('bailable')) {
        score += 3;
      }
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }
    
    return highestScore > 5 ? bestMatch : null;
  };

  const generateResponse = (matchedItem, userInput) => {
    if (!matchedItem) {
      return `I apologize, but I couldn't find a specific provision matching your query in my current database. 

Here are some suggestions:
• Try mentioning the section number (e.g., "Section 420 IPC" or "498A")
• Describe your legal issue with key terms (e.g., "cheating", "cruelty", "assault")
• Ask about specific legal concepts

You can also consult with a qualified lawyer for personalized legal advice on your specific situation.`;
    }
    
    // Build comprehensive legal response
    let response = `📋 **Legal Provision Found**\n\n`;
    
    // Section heading
    response += `**${matchedItem.section}**\n`;
    response += `*${matchedItem.title}*\n\n`;
    
    // Description
    response += `**What the law says:**\n${matchedItem.description}\n\n`;
    
    // Reference
    response += `**Legal Reference:** ${matchedItem.reference}\n\n`;
    
    // Bail information with explanation
    if (typeof matchedItem.bail === 'boolean') {
      if (matchedItem.bail) {
        response += `**Bail Status:** ✅ This is a **bailable offense**\n`;
        response += `This means the accused has a right to be released on bail. Bail can typically be granted by the police or magistrate.\n\n`;
      } else {
        response += `**Bail Status:** ❌ This is a **non-bailable offense**\n`;
        response += `This means bail is not a matter of right and must be granted by a magistrate or court after considering various factors.\n\n`;
      }
    }
    
    // Additional helpful information
    response += `**What you should know:**\n`;
    response += `• This provision is part of the ${matchedItem.reference}\n`;
    response += `• Legal proceedings require proper documentation and evidence\n`;
    response += `• It's advisable to consult with a qualified lawyer for your specific case\n\n`;
    
    // Context-aware follow-up
    if (userInput.toLowerCase().includes('file') || userInput.toLowerCase().includes('complaint')) {
      response += `**Next Steps:** If you wish to file a complaint under this section, you should approach the nearest police station with relevant evidence and documentation.`;
    } else if (userInput.toLowerCase().includes('defend') || userInput.toLowerCase().includes('accused')) {
      response += `**Legal Defense:** If you or someone you know is accused under this section, immediate legal representation is crucial. Contact a criminal defense lawyer.`;
    } else {
      response += `I can answer more questions from my laws dataset — try asking about related sections, procedures, or required documents.`;
    }
    
    return response;
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      content: inputValue,
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Realistic typing delay
    await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));

    const match = findBestMatch(currentInput);
    const response = generateResponse(match, currentInput);

    const aiMessage = {
      id: Date.now() + 1,
      content: response,
      isUser: false
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Enhanced message formatting
  const formatMessage = (content) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      // Bold text with **
      if (line.includes('**')) {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={index} className="mb-2">
            {parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>;
              }
              return part;
            })}
          </p>
        );
      }
      // Italic text with *
      else if (line.includes('*') && !line.includes('**')) {
        const parts = line.split(/(\*.*?\*)/g);
        return (
          <p key={index} className="mb-2 italic text-gray-600">
            {parts.map((part, i) => {
              if (part.startsWith('*') && part.endsWith('*')) {
                return <em key={i}>{part.slice(1, -1)}</em>;
              }
              return part;
            })}
          </p>
        );
      }
      // Bullet points
      else if (line.trim().startsWith('•')) {
        return (
          <li key={index} className="ml-4 mb-1">
            {line.trim().substring(1).trim()}
          </li>
        );
      }
      // Empty lines
      else if (!line.trim()) {
        return <br key={index} />;
      }
      // Regular text
      else {
        return <p key={index} className="mb-2">{line}</p>;
      }
    });
  };

  // Quick question suggestions
  const quickQuestions = [
    "What is Section 420 IPC?",
    "Tell me about Section 498A",
    "What are bailable offenses?",
    "Explain cruelty laws"
  ];

  const handleQuickQuestion = (question) => {
    setInputValue(question);
  };

  return (
  <div className="h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col overflow-hidden">

  {/* Chat Container */}
  <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 py-6 overflow-hidden">
    <div className="flex-1 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">

      {/* Messages (scrollable like ChatGPT) */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.isUser ? "flex-row-reverse" : ""
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ${
                message.isUser
                  ? "bg-gradient-to-r from-green-500 to-emerald-600"
                  : "bg-gradient-to-r from-blue-600 to-purple-600"
              }`}
            >
              {message.isUser ? "U" : "N"}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[80%] px-5 py-4 rounded-2xl ${
                message.isUser
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-tr-sm"
                  : "bg-gray-50 text-gray-800 rounded-tl-sm border border-gray-200"
              }`}
            >
              {message.isUser ? (
                <p className="leading-relaxed">{message.content}</p>
              ) : (
                <div className="leading-relaxed">
                  {formatMessage(message.content)}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              N
            </div>
            <div className="bg-gray-50 px-5 py-4 rounded-2xl rounded-tl-sm border border-gray-200">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length <= 2 && !isTyping && (
        <div className="px-6 pb-4">
          <p className="text-sm text-gray-600 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm transition-colors border border-blue-200"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area — fixed like ChatGPT */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="flex items-end gap-3">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about any IPC section or describe your legal concern..."
            rows="1"
            className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={isLoading}
            style={{ minHeight: "48px", maxHeight: "120px" }}
          />

          <button
            onClick={handleSend}
            disabled={isTyping || !inputValue.trim() || isLoading}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 h-12"
          >
            <Send size={20} />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </div>
    </div>
  </main>

  {/* Footer */}
  <footer className="text-center py-4 text-sm text-gray-600">
    <p>
      ⚠️ This is an AI assistant for informational purposes only. Consult a
      qualified lawyer for legal advice.
    </p>
  </footer>
</div>

  );
};

export default NyayaSetuAI;