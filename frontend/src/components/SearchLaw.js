import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  Menu, 
  Shield, 
  Scale, 
  Home, 
  ShoppingCart, 
  Building, 
  Monitor, 
  Book, 
  Users, 
  FileText, 
  Heart, 
  Phone,
  ChevronRight,
  BookOpen,
  Target,
  Eye,
  MessageSquare,
  Loader2
} from 'lucide-react';

const SearchLaw = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [rights, setRights] = useState(null);
  const [section, setSection] = useState("");
  const [templates, setTemplates] = useState([]);
  const [searchTemplate, setSearchTemplate] = useState("");
  const [error, setError] = useState("");

  // Function to fetch rights by section from your API
  const fetchRightsBySection = async () => {
    if (!section.trim()) {
      setError("⚠️ Please enter a section (e.g., 420 IPC)");
      return;
    }
    
    setError("");
    setRights(null);
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/rights/${section}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) throw new Error("Section not found");
      
      const data = await res.json();
      setRights(data);
    } catch (error) {
      setRights(null);
      setError("❌ Section not found in database.");
    }
  };

  // Function to search laws from your API
  const searchLaws = async (query) => {
    if (!query.trim()) return [];
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) throw new Error("Search failed");
      
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Search error:", error);
      return [];
    }
  };

  // Function to get suggestions from your API
  const getSuggestions = async (query) => {
    if (!query.trim()) return [];
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/suggestions?q=${encodeURIComponent(query)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) return [];
      
      const data = await res.json();
      return data.slice(0, 5); // Limit to 5 suggestions
    } catch (error) {
      console.error("Suggestions error:", error);
      return [];
    }
  };

  const featuredLaws = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Right to Information (RTI)",
    description: "Access information from government bodies"
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Fundamental Rights",
    description: "Basic rights guaranteed by Constitution"
  },
  {
    icon: <Book className="w-6 h-6" />,
    title: "Right to Education",
    description: "Free education for children aged 6-14"
  },
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: "Consumer Protection",
    description: "Protection against unfair trade practices"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Domestic Violence Act",
    description: "Protection from domestic abuse"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "POSH Act",
    description: "Workplace sexual harassment protection"
  }
  ];

  const tips = [
    {
      icon: <Search className="w-6 h-6" />,
      text: "Start by typing a keyword in the search bar"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      text: "Browse results and select the relevant law"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      text: "Read detailed information and understand your rights"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      text: "Contact legal aid or file an FIR if needed"
    }
  ];

  // Search suggestions effect
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      const suggestionResults = await getSuggestions(searchQuery);
      setSuggestions(suggestionResults);
      setShowSuggestions(suggestionResults.length > 0);
    }, 300); // Debounce suggestions

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const performSearch = async () => {
    if (searchQuery.trim() === '') return;
    
    setIsSearching(true);
    setShowSuggestions(false);
    
    try {
      const results = await searchLaws(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    
    setIsSearching(true);
    try {
      const results = await searchLaws(suggestion);
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleCategoryClick = async (categoryTitle) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/category/${encodeURIComponent(categoryTitle)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.ok) {
        const results = await res.json();
        setSearchResults(results);
      }
    } catch (error) {
      console.error("Category search failed:", error);
    }
    
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Know Your Legal Rights
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Search and understand laws, rights, and legal procedures in simple language
          </p>
          
          {/* Section Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex gap-2">
              <input
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                placeholder="Enter section (e.g., 302 IPC)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={fetchRightsBySection}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
              >
                Find Section
              </button>
            </div>
            {error && (
              <p className="mt-2 text-red-600 text-sm">{error}</p>
            )}
          </div>
        </div>

        {/* Section Result */}
        {rights && (
          <div className="mb-8 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Section Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Section</p>
                <p className="text-lg font-semibold text-blue-600">{rights.section}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Bail</p>
                <p className={`text-lg font-semibold ${rights.bail ? 'text-green-600' : 'text-red-600'}`}>
                  {rights.bail ? 'Bailable' : 'Non-Bailable'}
                </p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">Title</p>
              <p className="text-xl font-semibold text-gray-900">{rights.title}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">Description</p>
              <p className="text-gray-700">{rights.description}</p>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">Reference</p>
              <p className="text-gray-700">{rights.reference}</p>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Search Results</h3>
            <div className="space-y-4">
              {searchResults.map((law) => (
                <div key={law.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">{law.title}</h4>
                      <p className="text-blue-600 font-medium">{law.section}</p>
                    </div>
                    {law.bail !== null && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        law.bail ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {law.bail ? 'Bailable' : 'Non-Bailable'}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-4">{law.description}</p>
                  <p className="text-sm text-gray-600">{law.reference}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Featured Laws */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Featured Laws & Rights</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredLaws.map((law, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-blue-600 mb-4">
                  {law.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{law.title}</h4>
                <p className="text-gray-600">{law.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How to Use */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">How to Use</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <div className="text-blue-600">
                    {tip.icon}
                  </div>
                </div>
                <p className="text-gray-700">{tip.text}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchLaw;