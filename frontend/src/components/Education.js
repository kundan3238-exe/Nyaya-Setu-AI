import React, { useState, useEffect } from 'react';
import { Brain, BookOpen, Newspaper, Lightbulb, CheckCircle, XCircle, ChevronDown, ChevronUp, Award, Target } from 'lucide-react';

export default function NyayaSetuEDU() {
  const [activeSection, setActiveSection] = useState('overview');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [expandedGuide, setExpandedGuide] = useState(null);
  const [expandedMyth, setExpandedMyth] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setCurrentTime(new Date());
  }, []);

  const quizData = [
    {
      id: 'q1',
      question: 'Which Article of the Constitution guarantees Right to Equality?',
      options: [
        { value: 'a', label: 'Article 19' },
        { value: 'b', label: 'Article 14' },
        { value: 'c', label: 'Article 21' }
      ],
      correct: 'b',
      explanation: 'Article 14 guarantees Right to Equality before law.'
    },
    {
      id: 'q2',
      question: 'Under Consumer Protection Act, what is the time limit to file a complaint?',
      options: [
        { value: 'a', label: '1 year' },
        { value: 'b', label: '2 years' },
        { value: 'c', label: '3 years' }
      ],
      correct: 'b',
      explanation: 'Consumer complaints can be filed within 2 years of the cause of action.'
    },
    {
      id: 'q3',
      question: 'What is the penalty for not wearing helmet while riding a two-wheeler?',
      options: [
        { value: 'a', label: 'Rs. 500' },
        { value: 'b', label: 'Rs. 1000' },
        { value: 'c', label: 'Rs. 2000' }
      ],
      correct: 'b',
      explanation: 'Not wearing helmet attracts a fine of Rs. 1000 under Motor Vehicles Act.'
    },
    {
      id: 'q4',
      question: 'Police must register an FIR for cognizable offenses:',
      options: [
        { value: 'a', label: 'Only if they choose to' },
        { value: 'b', label: 'Only with court order' },
        { value: 'c', label: 'Immediately upon complaint' }
      ],
      correct: 'c',
      explanation: 'Police must immediately register FIR for cognizable offenses.'
    },
    {
      id: 'q5',
      question: 'Right to Information Act allows citizens to get information within:',
      options: [
        { value: 'a', label: '15 days' },
        { value: 'b', label: '30 days' },
        { value: 'c', label: '45 days' }
      ],
      correct: 'b',
      explanation: 'RTI Act mandates information to be provided within 30 days.'
    }
  ];

  const guides = [
    {
      id: 'guide1',
      title: 'Filing a complaint',
      points: [
        'Visit the nearest police station for criminal matters',
        'For consumer issues, approach Consumer Forum',
        'Keep all documents and evidence ready',
        'File written complaint with clear details',
        'Get acknowledgment receipt with date and time'
      ]
    },
    {
      id: 'guide2',
      title: 'Rental & property basics',
      points: [
        'Always sign written rental agreement',
        'Register agreement if rent exceeds Rs. 11,000/month',
        'Security deposit cannot exceed 3 months\' rent',
        'Landlord must give 1 month notice before eviction',
        'Keep property documents and payment receipts safe'
      ]
    },
    {
      id: 'guide3',
      title: 'Family law explained',
      points: [
        'Marriage registration is mandatory in most states',
        'Both spouses have equal rights to property',
        'Divorce can be mutual or contested',
        'Child custody prioritizes child\'s best interest',
        'Domestic violence has strict legal remedies'
      ]
    }
  ];

  const myths = [
    {
      id: 'myth1',
      myth: 'Police can refuse to file an FIR',
      fact: 'Police cannot refuse to file an FIR for cognizable offenses. It\'s their legal duty under Section 154 of CrPC. If they refuse, you can approach the SP or file a complaint in court.'
    },
    {
      id: 'myth2',
      myth: 'You must always carry your Aadhaar card',
      fact: 'There\'s no law requiring you to carry physical Aadhaar card everywhere. You only need it for specific services. Digital copy or other valid ID proofs are usually sufficient for verification.'
    },
    {
      id: 'myth3',
      myth: 'Verbal contracts are invalid',
      fact: 'Verbal contracts are valid and legally binding under Indian Contract Act, except for specific cases like property sale, marriage, or contracts above certain values that require written documentation.'
    }
  ];

  const news = [
    {
      id: 'news1',
      title: 'New Traffic Rules and Penalties',
      description: 'Updated penalties for traffic violations including higher fines for drunk driving and mobile phone usage while driving.',
      link: '#'
    },
    {
      id: 'news2',
      title: 'Consumer Protection Law Updates',
      description: 'New provisions for e-commerce complaints and stricter penalties for misleading advertisements and defective products.',
      link: '#'
    },
    {
      id: 'news3',
      title: 'Supreme Court Judgment on Privacy Rights',
      description: 'Landmark ruling clarifying citizens\' digital privacy rights and limitations on data collection by companies.',
      link: '#'
    }
  ];

  const handleQuizAnswer = (questionId, answer) => {
    setQuizAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleQuizSubmit = () => {
    let score = 0;
    quizData.forEach(q => {
      if (quizAnswers[q.id] === q.correct) score++;
    });
    setQuizScore(score);
    setQuizSubmitted(true);
    setTimeout(() => {
      document.getElementById('quiz-results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const resetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getScoreColor = (score) => {
    if (score >= 4) return 'text-green-600';
    if (score >= 3) return 'text-blue-600';
    return 'text-orange-600';
  };

  const getScoreMessage = (score) => {
    if (score === 5) return 'Perfect! You\'re a legal expert! 🎉';
    if (score >= 4) return 'Excellent work! Great legal knowledge! 🌟';
    if (score >= 3) return 'Good job! Keep learning! 👍';
    return 'Keep practicing! Review the explanations. 📚';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Feature Cards */}
        {activeSection === 'overview' && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 border-blue-500">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Legal Awareness Quiz</h2>
                  <p className="text-gray-600 mb-4">Test your knowledge of everyday laws and learn as you go.</p>
                  <ul className="text-left space-y-2 mb-6 text-sm">
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      <span>Fundamental Rights</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      <span>Consumer Protection</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      <span>Traffic Rules</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => setActiveSection('quiz')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg"
                  >
                    Take Quiz
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 border-green-500">
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Everyday Legal Guides</h2>
                  <p className="text-gray-600 mb-4">Easy-to-read guides on common legal issues.</p>
                  <ul className="text-left space-y-2 mb-6 text-sm">
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      <span>Filing a complaint</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      <span>Rental & property basics</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      <span>Family law explained</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => setActiveSection('guides')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg"
                  >
                    Read Guides
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 border-t-4 border-indigo-500">
                <div className="text-center">
                  <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Newspaper className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">Legal News & Updates</h2>
                  <p className="text-gray-600 mb-4">Stay informed about important changes in the law.</p>
                  <ul className="text-left space-y-2 mb-6 text-sm">
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      <span>New traffic rules</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      <span>Consumer law updates</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                      <span>Landmark judgments</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => setActiveSection('news')}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg"
                  >
                    Read Updates
                  </button>
                </div>
              </div>
            </div>

            {/* Myths Card - Full Width */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border-t-4 border-pink-500">
              <div className="text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-pink-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Law Myths vs Facts</h2>
                <p className="text-gray-600 mb-8">Clear up common legal misunderstandings.</p>
                
                <div className="grid sm:grid-cols-3 gap-6 mb-8">
                  {myths.map((myth, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-red-50 to-orange-50 p-5 rounded-xl border-2 border-red-200">
                      <p className="text-gray-800 mb-3 font-medium">"{myth.myth}"</p>
                      <div className="flex items-center justify-center">
                        <XCircle className="w-5 h-5 text-red-600 mr-2" />
                        <p className="text-red-600 font-bold">False</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => setActiveSection('myths')}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg"
                >
                  See More Myths & Facts
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Section */}
        {activeSection === 'quiz' && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            <div className="mb-8">
              <button
                onClick={() => setActiveSection('overview')}
                className="text-blue-600 hover:text-blue-700 font-medium mb-4"
              >
                ← Back to Overview
              </button>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Legal Awareness Quiz</h2>
                  <p className="text-gray-600">Test your knowledge of Indian laws with these 5 questions.</p>
                </div>
                <Target className="w-12 h-12 text-blue-600" />
              </div>
            </div>

            {!quizSubmitted ? (
              <div className="space-y-6">
                {quizData.map((question, idx) => (
                  <div key={question.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 transition-colors">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {idx + 1}. {question.question}
                    </h3>
                    <div className="space-y-3">
                      {question.options.map(option => (
                        <label
                          key={option.value}
                          className="flex items-center p-4 rounded-lg border-2 border-gray-200 hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-all"
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={option.value}
                            checked={quizAnswers[question.id] === option.value}
                            onChange={() => handleQuizAnswer(question.id, option.value)}
                            className="w-5 h-5 text-blue-600 mr-4"
                          />
                          <span className="font-medium text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(quizAnswers).length !== quizData.length}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-lg text-lg font-bold transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Quiz
                </button>
              </div>
            ) : (
              <div id="quiz-results" className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 border-2 border-blue-200">
                  <div className="flex items-center justify-center mb-4">
                    <Award className="w-16 h-16 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-2">Quiz Results</h3>
                  <p className={`text-4xl font-bold text-center mb-2 ${getScoreColor(quizScore)}`}>
                    {quizScore}/5
                  </p>
                  <p className="text-center text-gray-700 text-lg font-medium">
                    {getScoreMessage(quizScore)}
                  </p>
                </div>

                <div className="space-y-4">
                  {quizData.map((question, idx) => {
                    const isCorrect = quizAnswers[question.id] === question.correct;
                    return (
                      <div key={question.id} className={`p-6 rounded-xl border-2 ${isCorrect ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
                        <div className="flex items-start mb-3">
                          {isCorrect ? (
                            <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                          ) : (
                            <XCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                          )}
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 mb-1">Question {idx + 1}</p>
                            <p className="text-sm text-gray-700">{question.question}</p>
                          </div>
                        </div>
                        <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                          <p className="text-sm font-medium text-gray-800">{question.explanation}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={resetQuiz}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white py-4 rounded-lg text-lg font-bold transition-all shadow-lg"
                >
                  Retake Quiz
                </button>
              </div>
            )}
          </div>
        )}

        {/* Guides Section */}
        {activeSection === 'guides' && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setActiveSection('overview')}
              className="text-green-600 hover:text-green-700 font-medium mb-6"
            >
              ← Back to Overview
            </button>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Everyday Legal Guides</h2>
            <p className="text-gray-600 mb-8">Step-by-step guidance for common legal situations.</p>

            <div className="space-y-4">
              {guides.map(guide => (
                <div key={guide.id} className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-green-300 transition-all">
                  <button
                    onClick={() => setExpandedGuide(expandedGuide === guide.id ? null : guide.id)}
                    className="w-full px-6 py-5 text-left font-bold text-lg bg-gradient-to-r from-gray-50 to-green-50 hover:from-gray-100 hover:to-green-100 flex justify-between items-center transition-colors"
                  >
                    <span className="text-gray-900">{guide.title}</span>
                    {expandedGuide === guide.id ? (
                      <ChevronUp className="w-6 h-6 text-green-600" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </button>
                  {expandedGuide === guide.id && (
                    <div className="px-6 py-5 bg-white border-t-2 border-gray-100">
                      <ul className="space-y-3">
                        {guide.points.map((point, idx) => (
                          <li key={idx} className="flex items-start text-gray-700">
                            <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* News Section */}
        {activeSection === 'news' && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setActiveSection('overview')}
              className="text-indigo-600 hover:text-indigo-700 font-medium mb-6"
            >
              ← Back to Overview
            </button>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Legal News & Updates</h2>
            <p className="text-gray-600 mb-2">Stay updated with important legal changes.</p>
            <p className="text-sm text-gray-500 mb-8">
              Last updated: {currentTime.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <div className="space-y-6">
              {news.map(item => (
                <div key={item.id} className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl p-6 border-2 border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all">
                  <div className="flex items-start mb-4">
                    <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                      <Newspaper className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-700 mb-4">{item.description}</p>
                      <a
                        href={item.link}
                        className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-semibold"
                      >
                        Read more →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Myths Section */}
        {activeSection === 'myths' && (
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setActiveSection('overview')}
              className="text-pink-600 hover:text-pink-700 font-medium mb-6"
            >
              ← Back to Overview
            </button>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Law Myths vs Facts</h2>
            <p className="text-gray-600 mb-8">Busting common legal misconceptions with facts.</p>

            <div className="space-y-6">
              {myths.map(myth => (
                <div key={myth.id} className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6 border-2 border-red-200">
                  <div className="flex items-start justify-between mb-4">
                    <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                      MYTH
                    </span>
                    <button
                      onClick={() => setExpandedMyth(expandedMyth === myth.id ? null : myth.id)}
                      className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
                    >
                      {expandedMyth === myth.id ? 'Hide Fact' : 'Show Fact'}
                      {expandedMyth === myth.id ? (
                        <ChevronUp className="w-5 h-5 ml-1" />
                      ) : (
                        <ChevronDown className="w-5 h-5 ml-1" />
                      )}
                    </button>
                  </div>
                  <p className="text-lg font-bold text-gray-900 mb-4">"{myth.myth}"</p>
                  {expandedMyth === myth.id && (
                    <div className="bg-green-50 border-2 border-green-300 p-5 rounded-lg">
                      <div className="flex items-start">
                        <CheckCircle className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-bold text-green-800 mb-2">FACT:</p>
                          <p className="text-gray-800">{myth.fact}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}