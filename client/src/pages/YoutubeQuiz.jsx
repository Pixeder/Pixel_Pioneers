import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle, 
  AlertCircle, 
  Zap, 
  History, 
  BookOpen, 
  ExternalLink, 
  Lightbulb,
  TrendingUp,
  Award,
  Clock,
  Target,
  X,
  Youtube,
  BarChart3,
  Brain,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Menu,
  Home,
  Settings
} from 'lucide-react';

const YouTubeQuizBolt = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [currentSection, setCurrentSection] = useState('input');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const savedHistory = localStorage.getItem('quizHistory');
    if (savedHistory) {
      setQuizHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Sample quiz data - 15 questions
  const quizzes = {
    technology: {
      id: 'technology',
      title: 'React Fundamentals',
      questions: [
        {
          id: 1,
          topic: 'Introduction to React',
          question: 'What is React primarily used for?',
          options: ['Building user interfaces', 'Database management', 'Server configuration', 'Network security'],
          correct: 0,
        },
        {
          id: 2,
          topic: 'Introduction to React',
          question: 'Who developed React?',
          options: ['Google', 'Facebook', 'Microsoft', 'Amazon'],
          correct: 1,
        },
        {
          id: 3,
          topic: 'Core Concepts',
          question: 'What are the building blocks of React applications?',
          options: ['Functions', 'Components', 'Classes', 'Modules'],
          correct: 1,
        },
        {
          id: 4,
          topic: 'Core Concepts',
          question: 'What is JSX?',
          options: ['A database language', 'A JavaScript syntax extension', 'A CSS framework', 'A testing library'],
          correct: 1,
        },
        {
          id: 5,
          topic: 'State Management',
          question: 'Which hook is used to add state to functional components?',
          options: ['useEffect', 'useContext', 'useState', 'useReducer'],
          correct: 2,
        },
        {
          id: 6,
          topic: 'State Management',
          question: 'What does state represent in React?',
          options: ['Static data', 'Component styling', 'Dynamic data that changes over time', 'API endpoints'],
          correct: 2,
        },
        {
          id: 7,
          topic: 'Component Lifecycle',
          question: 'Which hook handles side effects in functional components?',
          options: ['useState', 'useEffect', 'useMemo', 'useCallback'],
          correct: 1,
        },
        {
          id: 8,
          topic: 'Component Lifecycle',
          question: 'When does useEffect run by default?',
          options: ['Only once', 'Never', 'After every render', 'Before rendering'],
          correct: 2,
        },
        {
          id: 9,
          topic: 'Best Practices',
          question: 'What is the virtual DOM?',
          options: ['A real DOM element', 'A lightweight copy of the actual DOM', 'A CSS framework', 'A database'],
          correct: 1,
        },
        {
          id: 10,
          topic: 'Best Practices',
          question: 'Why should keys be used in lists?',
          options: ['For styling', 'For animations', 'To help React identify which items changed', 'For accessibility'],
          correct: 2,
        },
        {
          id: 11,
          topic: 'Hooks',
          question: 'What does useContext hook allow you to do?',
          options: ['Create animations', 'Access context values without prop drilling', 'Handle routing', 'Manage timers'],
          correct: 1,
        },
        {
          id: 12,
          topic: 'Hooks',
          question: 'What is the purpose of useCallback?',
          options: ['To fetch data', 'To memoize callback functions', 'To create styles', 'To manage forms'],
          correct: 1,
        },
        {
          id: 13,
          topic: 'Performance',
          question: 'What does React.memo do?',
          options: ['Saves data to memory', 'Prevents unnecessary re-renders of components', 'Stores component history', 'Creates memos'],
          correct: 1,
        },
        {
          id: 14,
          topic: 'Performance',
          question: 'How can you improve React app performance?',
          options: ['Use more components', 'Code splitting and lazy loading', 'Avoid useState', 'Disable JavaScript'],
          correct: 1,
        },
        {
          id: 15,
          topic: 'Advanced',
          question: 'What is a Higher-Order Component (HOC)?',
          options: ['A component with more features', 'An advanced pattern for reusing component logic', 'A component that renders HTML', 'A CSS-in-JS library'],
          correct: 1,
        },
      ],
    },
  };

  const topicRecommendations = {
    'Introduction to React': [
      { title: 'React Official Documentation', url: 'https://react.dev/learn', type: 'docs' },
      { title: 'React for Beginners - freeCodeCamp', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8', type: 'video' },
      { title: 'React Fundamentals Course', url: 'https://www.codecademy.com/learn/react-101', type: 'course' }
    ],
    'Core Concepts': [
      { title: 'Understanding Components and Props', url: 'https://react.dev/learn/passing-props-to-a-component', type: 'docs' },
      { title: 'JSX In Depth', url: 'https://react.dev/learn/writing-markup-with-jsx', type: 'docs' },
      { title: 'React Components Tutorial', url: 'https://www.youtube.com/watch?v=Cla1WwguArA', type: 'video' }
    ],
    'State Management': [
      { title: 'State: A Components Memory', url: 'https://react.dev/learn/state-a-components-memory', type: 'docs' },
      { title: 'React State Management Tutorial', url: 'https://www.youtube.com/watch?v=35lXWvCuM8o', type: 'video' },
      { title: 'Redux Fundamentals', url: 'https://redux.js.org/tutorials/fundamentals/part-1-overview', type: 'docs' }
    ],
    'Component Lifecycle': [
      { title: 'useEffect Complete Guide', url: 'https://react.dev/reference/react/useEffect', type: 'docs' },
      { title: 'React Hooks Deep Dive', url: 'https://www.youtube.com/watch?v=cF2lQ_gZeA8', type: 'video' },
    ],
    'Best Practices': [
      { title: 'React Best Practices 2024', url: 'https://react.dev/learn/thinking-in-react', type: 'docs' },
      { title: 'Clean Code in React', url: 'https://www.youtube.com/watch?v=3XaXKiXtNjw', type: 'video' },
    ],
    'Hooks': [
      { title: 'React Hooks Documentation', url: 'https://react.dev/reference/react/hooks', type: 'docs' },
      { title: 'Custom Hooks Tutorial', url: 'https://www.youtube.com/watch?v=J0d8zR6dStE', type: 'video' },
    ],
    'Performance': [
      { title: 'React Performance Optimization', url: 'https://kentcdodds.com/blog/usememo-and-usecallback', type: 'article' },
      { title: 'Code Splitting in React', url: 'https://react.dev/reference/react/lazy', type: 'docs' },
    ],
    'Advanced': [
      { title: 'Higher-Order Components', url: 'https://react.dev/reference/react/forwardRef', type: 'docs' },
      { title: 'Advanced React Patterns', url: 'https://www.youtube.com/watch?v=3XaXKiXtNjw', type: 'video' },
    ],
  };

  const extractVideoId = (url) => {
    let id;
    if (url.includes('youtube.com/watch?v=')) {
      id = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      id = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      id = url.split('embed/')[1].split('?')[0];
    }
    return id;
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    const id = extractVideoId(youtubeUrl);
    if (id) {
      setVideoId(id);
      setCurrentSection('video');
      const randomQuiz = Object.values(quizzes)[Math.floor(Math.random() * Object.keys(quizzes).length)];
      setSelectedQuiz(randomQuiz);
    } else {
      alert('Please enter a valid YouTube URL');
    }
  };

  const startQuiz = () => {
    setCurrentSection('quiz');
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
  };

  const handleAnswerSelect = (optionIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCurrentSection('results');
      saveToHistory();
    }
  };

  const saveToHistory = () => {
    const results = calculateResults();
    const historyItem = {
      id: Date.now(),
      url: youtubeUrl,
      videoId: videoId,
      title: selectedQuiz.title,
      date: new Date().toLocaleString(),
      score: results.correct,
      total: results.total,
      percentage: results.percentage,
      strongTopics: results.strongTopics,
      weakTopics: results.weakTopics,
    };

    const updatedHistory = [historyItem, ...quizHistory].slice(0, 10);
    setQuizHistory(updatedHistory);
    localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
  };

  const handleRetakeQuiz = () => {
    setYoutubeUrl('');
    setVideoId('');
    setCurrentSection('input');
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedQuiz(null);
  };

  const calculateResults = () => {
    if (!selectedQuiz) return null;

    const correctCount = userAnswers.filter(
      (answer, index) => answer === selectedQuiz.questions[index].correct
    ).length;

    const topicPerformance = {};
    selectedQuiz.questions.forEach((q, index) => {
      if (!topicPerformance[q.topic]) {
        topicPerformance[q.topic] = { correct: 0, total: 0 };
      }
      topicPerformance[q.topic].total += 1;
      if (userAnswers[index] === q.correct) {
        topicPerformance[q.topic].correct += 1;
      }
    });

    const strongTopics = Object.entries(topicPerformance)
      .filter(([_, perf]) => perf.correct === perf.total)
      .map(([topic, _]) => topic);

    const weakTopics = Object.entries(topicPerformance)
      .filter(([_, perf]) => perf.correct < perf.total)
      .map(([topic, _]) => topic);

    return {
      correct: correctCount,
      total: selectedQuiz.questions.length,
      percentage: Math.round((correctCount / selectedQuiz.questions.length) * 100),
      strongTopics,
      weakTopics,
      topicPerformance,
    };
  };

  const getRecommendationsForTopic = (topic) => {
    return topicRecommendations[topic] || [];
  };

  const getIconForResourceType = (type) => {
    switch(type) {
      case 'video': return Youtube;
      case 'docs': return BookOpen;
      case 'course': return Award;
      case 'article': return BookOpen;
      case 'interactive': return Target;
      default: return ExternalLink;
    }
  };

  // Sidebar Navigation Component
  const Sidebar = () => (
    <div className={`fixed left-0 top-0 h-screen bg-[#0f0f0f] border-r border-[#27272a] transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} z-40 flex flex-col`}>
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-[#27272a]">
        <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
          <Brain className="w-5 h-5 text-white" />
        </div>
        {sidebarOpen && <span className="ml-3 text-white font-semibold text-sm">Quiz</span>}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <button
          onClick={() => setCurrentSection('input')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            currentSection === 'input'
              ? 'bg-[#1a1a1a] text-white border border-[#3f3f46]'
              : 'text-[#a1a1aa] hover:text-white hover:bg-[#1a1a1a]'
          }`}
        >
          <Home className="w-4 h-4 flex-shrink-0" />
          {sidebarOpen && <span className="text-sm font-medium">Home</span>}
        </button>

        <button
          onClick={() => setShowHistory(true)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
            currentSection === 'history'
              ? 'bg-[#1a1a1a] text-white border border-[#3f3f46]'
              : 'text-[#a1a1aa] hover:text-white hover:bg-[#1a1a1a]'
          }`}
        >
          <History className="w-4 h-4 flex-shrink-0" />
          {sidebarOpen && <span className="text-sm font-medium">History</span>}
        </button>

        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#a1a1aa] hover:text-white hover:bg-[#1a1a1a] transition-all"
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          {sidebarOpen && <span className="text-sm font-medium">Settings</span>}
        </button>
      </nav>

      {/* Collapse Button */}
      <div className="p-4 border-t border-[#27272a]">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full flex items-center justify-center py-2 text-[#71717a] hover:text-white transition-all"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  // Main Content Area
  const mainContent = () => {
    if (showHistory) {
      return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0f0f0f] border border-[#27272a] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="border-b border-[#27272a] p-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Quiz History</h2>
              <button
                onClick={() => setShowHistory(false)}
                className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-all text-[#a1a1aa] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
              {quizHistory.length === 0 ? (
                <div className="text-center py-12">
                  <History className="w-12 h-12 text-[#3f3f46] mx-auto mb-4" />
                  <p className="text-[#71717a] text-sm">No quiz history yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {quizHistory.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-[#1a1a1a] border border-[#27272a] rounded-lg hover:border-[#3f3f46] transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-white font-medium text-sm">{item.title}</h3>
                          <p className="text-[#71717a] text-xs mt-1">{item.date}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-blue-500">{item.percentage}%</div>
                          <div className="text-xs text-[#71717a]">{item.score}/{item.total}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (currentSection === 'input') {
      return (
        <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
          <div className="max-w-2xl w-full">
            <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-semibold text-white mb-2">Quiz Master</h1>
                <p className="text-[#71717a] text-sm">Transform videos into knowledge</p>
              </div>

              <form onSubmit={handleUrlSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-medium text-[#71717a] mb-2 uppercase tracking-wide">YouTube URL</label>
                  <input
                    type="text"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-4 py-3 bg-[#0f0f0f] border border-[#27272a] rounded-lg text-white placeholder-[#3f3f46] focus:outline-none focus:border-blue-600 transition-all text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <span>Generate Quiz (15 Questions)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }

    if (currentSection === 'video') {
      return (
        <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
          <div className="max-w-4xl w-full">
            <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">{selectedQuiz?.title}</h2>

              <div className="bg-black rounded-lg overflow-hidden mb-6 aspect-video border border-[#27272a]">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <button
                onClick={startQuiz}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2 text-sm mb-4"
              >
                <Play className="w-4 h-4" />
                Start Quiz (15 Questions)
              </button>

              <button
                onClick={() => setCurrentSection('input')}
                className="w-full bg-[#0f0f0f] hover:bg-[#1a1a1a] text-[#a1a1aa] font-medium py-3 rounded-lg transition-all border border-[#27272a] text-sm"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (currentSection === 'quiz' && selectedQuiz) {
      const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
      const progress = ((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100;

      return (
        <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
          <div className="max-w-2xl w-full h-full flex flex-col">
            <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-8 flex flex-col flex-1">
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-medium text-[#71717a]">
                    Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
                  </span>
                  <span className="px-2 py-1 bg-[#0f0f0f] border border-[#27272a] rounded text-xs text-[#71717a]">
                    {currentQuestion.topic}
                  </span>
                </div>
                <div className="w-full h-1 bg-[#0f0f0f] rounded-full overflow-hidden">
                  <div
                    className="h-1 bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-6">{currentQuestion.question}</h3>

              <div className="space-y-3 mb-6 flex-1 overflow-y-auto">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-lg border transition-all text-sm flex-shrink-0 ${
                      userAnswers[currentQuestionIndex] === index
                        ? 'bg-blue-600/10 border-blue-600 text-white'
                        : 'bg-[#0f0f0f] border-[#27272a] text-[#a1a1aa] hover:border-[#3f3f46] hover:bg-[#1a1a1a]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-medium border flex-shrink-0 ${
                        userAnswers[currentQuestionIndex] === index
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-[#3f3f46] text-[#71717a]'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="line-clamp-2">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextQuestion}
                disabled={userAnswers[currentQuestionIndex] === undefined}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-[#27272a] disabled:text-[#71717a] disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-all text-sm flex-shrink-0"
              >
                {currentQuestionIndex === selectedQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (currentSection === 'results' && selectedQuiz) {
      const results = calculateResults();

      return (
        <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
          <div className="w-full max-w-2xl h-full flex flex-col">
            <div className="bg-[#1a1a1a] border border-[#27272a] rounded-lg p-6 overflow-y-auto flex-1 flex flex-col">
              {/* Score */}
              <div className="text-center mb-6 pb-6 border-b border-[#27272a] flex-shrink-0">
                <h2 className="text-2xl font-semibold text-white mb-3">Quiz Complete!</h2>
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {results.percentage}%
                </div>
                <p className="text-[#71717a] text-sm">
                  {results.correct} of {results.total} correct
                </p>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto space-y-6 pb-4">
                {/* Topics */}
                {(results.strongTopics.length > 0 || results.weakTopics.length > 0) && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">Performance</h3>
                    <div className="space-y-2">
                      {results.strongTopics.map((topic, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-[#0f0f0f] border border-[#27272a] rounded-lg">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                          <span className="text-sm text-[#a1a1aa]">{topic}</span>
                        </div>
                      ))}
                      {results.weakTopics.map((topic, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-[#0f0f0f] border border-[#27272a] rounded-lg">
                          <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                          <span className="text-sm text-[#a1a1aa]">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Performance Breakdown */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">Breakdown</h3>
                  <div className="space-y-3">
                    {Object.entries(results.topicPerformance).map(([topic, perf], idx) => {
                      const percentage = Math.round((perf.correct / perf.total) * 100);
                      return (
                        <div key={idx}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-[#a1a1aa]">{topic}</span>
                            <span className="text-xs text-[#71717a]">{perf.correct}/{perf.total}</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#0f0f0f] rounded-full overflow-hidden">
                            <div
                              className="h-1.5 bg-blue-600 rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recommendations */}
                {results.weakTopics.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">Resources</h3>
                    {results.weakTopics.map((topic, idx) => {
                      const recommendations = getRecommendationsForTopic(topic);
                      return (
                        <div key={idx} className="mb-4">
                          <p className="text-xs text-[#71717a] mb-2 font-medium">{topic}</p>
                          <div className="space-y-2">
                            {recommendations.map((rec, recIdx) => {
                              const Icon = getIconForResourceType(rec.type);
                              return (
                                <a
                                  key={recIdx}
                                  href={rec.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-3 p-3 bg-[#0f0f0f] border border-[#27272a] rounded-lg hover:border-blue-600 transition-all group"
                                >
                                  <Icon className="w-4 h-4 text-[#71717a] group-hover:text-blue-600 flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs text-[#a1a1aa] group-hover:text-white truncate">
                                      {rec.title}
                                    </p>
                                    <p className="text-xs text-[#3f3f46] capitalize">{rec.type}</p>
                                  </div>
                                  <ExternalLink className="w-3 h-3 text-[#3f3f46] group-hover:text-blue-600 flex-shrink-0" />
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Actions - Fixed at bottom */}
              <div className="flex gap-3 flex-shrink-0 border-t border-[#27272a] pt-4 mt-4">
                <button
                  onClick={handleRetakeQuiz}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  New Quiz
                </button>
                <button
                  onClick={() => setCurrentSection('input')}
                  className="flex-1 bg-[#0f0f0f] hover:bg-[#1a1a1a] text-[#a1a1aa] font-medium py-3 rounded-lg transition-all border border-[#27272a] text-sm"
                >
                  Home
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a]">
      <Sidebar />
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'} flex flex-col w-full h-screen overflow-hidden`}>
        {mainContent()}
      </div>
    </div>
  );
};

export default YouTubeQuizBolt;