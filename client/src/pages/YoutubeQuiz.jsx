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
  ChevronRight
} from 'lucide-react';

const YouTubeQuizPremium = () => {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [currentSection, setCurrentSection] = useState('input');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load history from memory on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('quizHistory');
    if (savedHistory) {
      setQuizHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Sample quiz data (keeping your original data structure)
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
      ],
    },
    science: {
      id: 'science',
      title: 'Climate Change Basics',
      questions: [
        {
          id: 1,
          topic: 'Introduction',
          question: 'What is climate change?',
          options: ['Daily weather variations', 'Long-term shifts in temperatures and weather patterns', 'Seasonal changes', 'Ocean currents'],
          correct: 1,
        },
        {
          id: 2,
          topic: 'Introduction',
          question: 'What is the main greenhouse gas?',
          options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'],
          correct: 2,
        },
        {
          id: 3,
          topic: 'Causes',
          question: 'What human activity contributes most to climate change?',
          options: ['Walking', 'Burning fossil fuels', 'Planting trees', 'Recycling'],
          correct: 1,
        },
        {
          id: 4,
          topic: 'Causes',
          question: 'Deforestation contributes to climate change by:',
          options: ['Reducing CO2 absorption', 'Increasing rainfall', 'Cooling the planet', 'Creating more oxygen'],
          correct: 0,
        },
        {
          id: 5,
          topic: 'Effects',
          question: 'What is a major effect of climate change?',
          options: ['Stable weather patterns', 'Rising sea levels', 'Decreased temperatures', 'More forests'],
          correct: 1,
        },
        {
          id: 6,
          topic: 'Effects',
          question: 'How does climate change affect wildlife?',
          options: ['No impact', 'Helps all species', 'Disrupts habitats and migration', 'Increases populations'],
          correct: 2,
        },
        {
          id: 7,
          topic: 'Solutions',
          question: 'Which is a renewable energy source?',
          options: ['Coal', 'Solar power', 'Natural gas', 'Oil'],
          correct: 1,
        },
        {
          id: 8,
          topic: 'Solutions',
          question: 'What can individuals do to help?',
          options: ['Use more plastic', 'Reduce, reuse, recycle', 'Waste more food', 'Drive more'],
          correct: 1,
        },
        {
          id: 9,
          topic: 'Global Impact',
          question: 'Which regions are most affected by climate change?',
          options: ['Only tropical regions', 'Only polar regions', 'All regions globally', 'No regions'],
          correct: 2,
        },
        {
          id: 10,
          topic: 'Global Impact',
          question: 'What international agreement addresses climate change?',
          options: ['Geneva Convention', 'Paris Agreement', 'Treaty of Versailles', 'NATO'],
          correct: 1,
        },
      ],
    },
    history: {
      id: 'history',
      title: 'Ancient Civilizations',
      questions: [
        {
          id: 1,
          topic: 'Ancient Egypt',
          question: 'What was the primary purpose of the pyramids?',
          options: ['Hotels', 'Tombs for pharaohs', 'Warehouses', 'Schools'],
          correct: 1,
        },
        {
          id: 2,
          topic: 'Ancient Egypt',
          question: 'What river was central to Egyptian civilization?',
          options: ['Amazon', 'Mississippi', 'Nile', 'Ganges'],
          correct: 2,
        },
        {
          id: 3,
          topic: 'Ancient Rome',
          question: 'What language did the Romans speak?',
          options: ['Greek', 'Latin', 'English', 'French'],
          correct: 1,
        },
        {
          id: 4,
          topic: 'Ancient Rome',
          question: 'What was the Roman Colosseum used for?',
          options: ['Library', 'Temple', 'Entertainment and gladiator fights', 'Market'],
          correct: 2,
        },
        {
          id: 5,
          topic: 'Ancient Greece',
          question: 'Who was the king of Greek gods?',
          options: ['Apollo', 'Zeus', 'Poseidon', 'Hades'],
          correct: 1,
        },
        {
          id: 6,
          topic: 'Ancient Greece',
          question: 'Where were the ancient Olympic Games held?',
          options: ['Athens', 'Sparta', 'Olympia', 'Delphi'],
          correct: 2,
        },
        {
          id: 7,
          topic: 'Mesopotamia',
          question: 'Which civilization invented writing?',
          options: ['Egyptians', 'Romans', 'Sumerians', 'Chinese'],
          correct: 2,
        },
        {
          id: 8,
          topic: 'Mesopotamia',
          question: 'What does Mesopotamia mean?',
          options: ['Land of mountains', 'Land between rivers', 'Desert land', 'Coastal region'],
          correct: 1,
        },
        {
          id: 9,
          topic: 'Ancient China',
          question: 'What was the Great Wall of China built for?',
          options: ['Decoration', 'Defense against invasions', 'Trade route', 'Religious purposes'],
          correct: 1,
        },
        {
          id: 10,
          topic: 'Ancient China',
          question: 'What ancient Chinese invention revolutionized record-keeping?',
          options: ['Compass', 'Paper', 'Gunpowder', 'Silk'],
          correct: 1,
        },
      ],
    },
  };

  // Recommendations for each topic
  const topicRecommendations = {
    'Introduction to React': [
      { title: 'React Official Documentation', url: 'https://react.dev/learn', type: 'docs' },
      { title: 'React for Beginners - freeCodeCamp', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8', type: 'video' },
      { title: 'React Fundamentals Course - Codecademy', url: 'https://www.codecademy.com/learn/react-101', type: 'course' }
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
      { title: 'Lifecycle Methods Explained', url: 'https://www.freecodecamp.org/news/react-lifecycle-methods/', type: 'article' }
    ],
    'Best Practices': [
      { title: 'React Best Practices 2024', url: 'https://react.dev/learn/thinking-in-react', type: 'docs' },
      { title: 'Clean Code in React', url: 'https://www.youtube.com/watch?v=3XaXKiXtNjw', type: 'video' },
      { title: 'React Performance Optimization', url: 'https://kentcdodds.com/blog/usememo-and-usecallback', type: 'article' }
    ],
    'Introduction': [
      { title: 'Climate Change 101', url: 'https://www.nationalgeographic.com/environment/article/climate-change', type: 'article' },
      { title: 'NASA Climate Kids', url: 'https://climatekids.nasa.gov/', type: 'interactive' },
      { title: 'Climate Science Explained - Khan Academy', url: 'https://www.khanacademy.org/science/biology', type: 'course' }
    ],
    'Causes': [
      { title: 'Causes of Climate Change - EPA', url: 'https://www.epa.gov/climate-change', type: 'article' },
      { title: 'Greenhouse Gas Emissions Explained', url: 'https://www.youtube.com/watch?v=G4H1N_yXBiA', type: 'video' }
    ],
    'Effects': [
      { title: 'Climate Change Effects - NASA', url: 'https://climate.nasa.gov/effects/', type: 'article' },
      { title: 'Impact on Wildlife Documentary', url: 'https://www.youtube.com/watch?v=example', type: 'video' }
    ],
    'Solutions': [
      { title: 'Climate Action Solutions', url: 'https://www.un.org/en/climatechange/climate-solutions', type: 'article' },
      { title: 'Renewable Energy Guide', url: 'https://www.energy.gov/eere/renewable-energy', type: 'docs' }
    ],
    'Global Impact': [
      { title: 'IPCC Climate Reports', url: 'https://www.ipcc.ch/', type: 'docs' },
      { title: 'Paris Agreement Explained', url: 'https://unfccc.int/process-and-meetings/the-paris-agreement', type: 'article' }
    ],
    'Ancient Egypt': [
      { title: 'Ancient Egypt - Khan Academy', url: 'https://www.khanacademy.org/humanities/world-history', type: 'course' },
      { title: 'Secrets of the Pyramids', url: 'https://www.youtube.com/watch?v=example', type: 'video' }
    ],
    'Ancient Rome': [
      { title: 'Roman Empire History', url: 'https://www.history.com/topics/ancient-rome', type: 'article' },
      { title: 'Life in Ancient Rome', url: 'https://www.youtube.com/watch?v=example', type: 'video' }
    ],
    'Ancient Greece': [
      { title: 'Greek Mythology & History', url: 'https://www.britannica.com/topic/ancient-Greek-civilization', type: 'article' },
      { title: 'Ancient Greece Documentary', url: 'https://www.youtube.com/watch?v=example', type: 'video' }
    ],
    'Mesopotamia': [
      { title: 'Cradle of Civilization', url: 'https://www.worldhistory.org/Mesopotamia/', type: 'article' },
      { title: 'Mesopotamian Inventions', url: 'https://www.youtube.com/watch?v=example', type: 'video' }
    ],
    'Ancient China': [
      { title: 'Ancient China History - National Geographic', url: 'https://www.nationalgeographic.com/', type: 'article' },
      { title: 'Great Wall of China Documentary', url: 'https://www.youtube.com/watch?v=example', type: 'video' }
    ]
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

  const loadHistoryQuiz = (historyItem) => {
    setYoutubeUrl(historyItem.url);
    setVideoId(historyItem.videoId);
    setSelectedQuiz(quizzes[Object.keys(quizzes).find(key => quizzes[key].title === historyItem.title)]);
    setShowHistory(false);
    setCurrentSection('video');
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

  // History Modal
  if (showHistory) {
    return (
      <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-3xl rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-hidden border border-zinc-800/50 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="border-b border-zinc-800/50 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-light tracking-tight text-white mb-1">Quiz History</h2>
                <p className="text-sm text-zinc-500">Your learning journey</p>
              </div>
              <button
                onClick={() => setShowHistory(false)}
                className="p-3 hover:bg-zinc-800/50 rounded-2xl transition-all duration-300 group"
              >
                <X className="w-5 h-5 text-zinc-400 group-hover:text-white transition" />
              </button>
            </div>
          </div>

          <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)] custom-scrollbar">
            {quizHistory.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-zinc-800/30 flex items-center justify-center mx-auto mb-6">
                  <History className="w-10 h-10 text-zinc-600" />
                </div>
                <p className="text-zinc-400 text-lg font-light">No quiz history yet</p>
                <p className="text-zinc-600 text-sm mt-2">Complete a quiz to see your journey</p>
              </div>
            ) : (
              <div className="space-y-4">
                {quizHistory.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => loadHistoryQuiz(item)}
                    className="group p-6 bg-gradient-to-br from-zinc-900/50 to-transparent rounded-2xl border border-zinc-800/50 hover:border-zinc-700/70 transition-all duration-300 cursor-pointer hover:transform hover:scale-[1.01]"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-light text-white mb-2 group-hover:text-zinc-100 transition">{item.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <Clock className="w-3.5 h-3.5" />
                          {item.date}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-4xl font-extralight tracking-tighter ${
                          item.percentage >= 80 ? 'text-emerald-400' :
                          item.percentage >= 60 ? 'text-amber-400' :
                          'text-rose-400'
                        }`}>
                          {item.percentage}%
                        </div>
                        <div className="text-xs text-zinc-500 mt-1">{item.score}/{item.total} correct</div>
                      </div>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      {item.strongTopics.slice(0, 2).map((topic, idx) => (
                        <div key={idx} className="px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-light">
                          {topic}
                        </div>
                      ))}
                      {item.weakTopics.slice(0, 2).map((topic, idx) => (
                        <div key={idx} className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 rounded-full text-rose-400 text-xs font-light">
                          {topic}
                        </div>
                      ))}
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

  // Input section - Premium Minimalist Design
  if (currentSection === 'input') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
        {/* Subtle grain texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIgLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjAzIiAvPjwvc3ZnPg==')] opacity-30"></div>
        
        {/* Minimal gradient orbs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-zinc-800/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-zinc-800/10 rounded-full blur-[120px]"></div>

        <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
          <div className="max-w-xl w-full">
            {/* History Button */}
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setShowHistory(true)}
                className="group flex items-center gap-3 px-5 py-2.5 bg-zinc-900/50 hover:bg-zinc-800/50 border border-zinc-800/50 hover:border-zinc-700/70 rounded-full transition-all duration-300 backdrop-blur-xl"
              >
                <History className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition" />
                <span className="text-sm font-light text-zinc-400 group-hover:text-zinc-200 transition">History</span>
                {quizHistory.length > 0 && (
                  <span className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-xs font-light rounded-full border border-zinc-700">
                    {quizHistory.length}
                  </span>
                )}
              </button>
            </div>

            <div className="backdrop-blur-3xl bg-gradient-to-br from-zinc-900/30 to-transparent border border-zinc-800/50 rounded-3xl p-12 shadow-[0_0_80px_rgba(0,0,0,0.3)]">
              <div className="text-center mb-12">
                <div className="inline-flex p-5 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-3xl mb-6 border border-zinc-800/30">
                  <Brain className="w-10 h-10 text-zinc-300" />
                </div>
                <h1 className="text-5xl font-extralight tracking-tight text-white mb-3">Quiz Master</h1>
                <p className="text-zinc-500 font-light text-sm">Transform videos into knowledge</p>
              </div>
              
              <form onSubmit={handleUrlSubmit} className="space-y-8">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-zinc-600 mb-4 font-light">YouTube URL</label>
                  <input
                    type="text"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-5 py-4 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-700/70 transition font-light text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="group w-full bg-white hover:bg-zinc-100 text-black font-light py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 text-sm tracking-wide hover:scale-[1.02] shadow-lg"
                >
                  <span>Generate Quiz</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </button>
              </form>

              <div className="mt-10 pt-8 border-t border-zinc-800/50">
                <div className="flex items-start gap-3 px-5 py-4 bg-zinc-900/30 rounded-2xl border border-zinc-800/30">
                  <Sparkles className="w-5 h-5 text-zinc-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-light text-zinc-400 leading-relaxed">
                      Paste any educational video link to generate an intelligent quiz with personalized recommendations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(39, 39, 42, 0.3);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(113, 113, 122, 0.5);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(161, 161, 170, 0.7);
          }
          @keyframes fade-in {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          .animate-fade-in {
            animation: fade-in 0.3s ease-out;
          }
        `}</style>
      </div>
    );
  }

  // Video section - Premium Design
  if (currentSection === 'video') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setCurrentSection('input')}
              className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-all duration-300 font-light text-sm"
            >
              <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition" />
              Back
            </button>
            <button
              onClick={() => setShowHistory(true)}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 hover:bg-zinc-800/50 border border-zinc-800/50 rounded-full transition-all duration-300"
            >
              <History className="w-4 h-4 text-zinc-500" />
              <span className="text-sm font-light text-zinc-400">History</span>
            </button>
          </div>
          
          <div className="backdrop-blur-3xl bg-gradient-to-br from-zinc-900/30 to-transparent border border-zinc-800/50 rounded-3xl p-10 shadow-[0_0_80px_rgba(0,0,0,0.3)]">
            <h2 className="text-4xl font-extralight tracking-tight text-white mb-8">{selectedQuiz?.title}</h2>
            
            <div className="bg-black rounded-3xl overflow-hidden mb-8 aspect-video shadow-2xl border border-zinc-900">
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

            <div className="flex items-start gap-4 p-6 bg-zinc-900/30 rounded-2xl border border-zinc-800/30 mb-8">
              <Lightbulb className="w-5 h-5 text-zinc-500 flex-shrink-0 mt-1" />
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                Watch carefully, then test your understanding. You'll receive personalized recommendations based on your performance.
              </p>
            </div>

            <button
              onClick={startQuiz}
              className="group w-full bg-white hover:bg-zinc-100 text-black font-light py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.01] shadow-lg"
            >
              <span className="text-sm tracking-wide">Start Quiz</span>
              <Play className="w-4 h-4 group-hover:scale-110 transition" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz section - Premium Design
  if (currentSection === 'quiz' && selectedQuiz) {
    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black p-6">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-3xl bg-gradient-to-br from-zinc-900/30 to-transparent border border-zinc-800/50 rounded-3xl p-10 shadow-[0_0_80px_rgba(0,0,0,0.3)]">
            {/* Progress Section */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-light text-zinc-500">
                  Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
                </span>
                <span className="px-3 py-1.5 bg-zinc-900/50 border border-zinc-800/50 rounded-full text-zinc-400 text-xs font-light">
                  {currentQuestion.topic}
                </span>
              </div>
              <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                <div
                  className="h-1 bg-gradient-to-r from-zinc-600 to-zinc-400 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <h3 className="text-3xl font-light text-white mb-10 leading-relaxed">{currentQuestion.question}</h3>

            <div className="space-y-3 mb-10">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-5 text-left rounded-2xl border transition-all duration-300 group ${
                    userAnswers[currentQuestionIndex] === index
                      ? 'border-zinc-700 bg-zinc-900/50'
                      : 'border-zinc-800/50 bg-transparent hover:border-zinc-700/70 hover:bg-zinc-900/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-light text-sm border transition ${
                      userAnswers[currentQuestionIndex] === index
                        ? 'bg-white text-black border-transparent'
                        : 'border-zinc-800 text-zinc-500 group-hover:border-zinc-700 group-hover:text-zinc-400'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-zinc-300 font-light">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleNextQuestion}
              disabled={userAnswers[currentQuestionIndex] === undefined}
              className="w-full bg-white hover:bg-zinc-100 disabled:bg-zinc-900 disabled:text-zinc-600 disabled:cursor-not-allowed text-black font-light py-4 rounded-2xl transition-all duration-300 text-sm tracking-wide disabled:border disabled:border-zinc-800"
            >
              {currentQuestionIndex === selectedQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results section - Premium Design
  if (currentSection === 'results' && selectedQuiz) {
    const results = calculateResults();

    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black p-6">
        <div className="max-w-6xl mx-auto">
          <div className="backdrop-blur-3xl bg-gradient-to-br from-zinc-900/30 to-transparent border border-zinc-800/50 rounded-3xl p-12 shadow-[0_0_80px_rgba(0,0,0,0.3)]">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex p-6 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-3xl mb-6 border border-zinc-800/30">
                <Award className="w-12 h-12 text-zinc-300" />
              </div>
              <h2 className="text-5xl font-extralight tracking-tight text-white mb-3">Quiz Complete</h2>
              <p className="text-zinc-500 font-light">Your performance analysis</p>
            </div>

            {/* Score Section */}
            <div className="bg-gradient-to-br from-zinc-900/50 to-transparent border border-zinc-800/50 rounded-3xl p-10 mb-10 text-center">
              <p className="text-xs uppercase tracking-wider text-zinc-600 mb-4 font-light">Your Score</p>
              <h3 className="text-7xl font-extralight text-white mb-4 tracking-tighter">
                {results.correct}<span className="text-zinc-600">/{results.total}</span>
              </h3>
              <p className={`text-5xl font-extralight mb-8 tracking-tighter ${
                results.percentage >= 80 ? 'text-emerald-400' :
                results.percentage >= 60 ? 'text-amber-400' :
                'text-rose-400'
              }`}>
                {results.percentage}%
              </p>
              <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden max-w-md mx-auto">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ${
                    results.percentage >= 80 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' :
                    results.percentage >= 60 ? 'bg-gradient-to-r from-amber-500 to-amber-400' :
                    'bg-gradient-to-r from-rose-500 to-rose-400'
                  }`}
                  style={{ width: `${results.percentage}%` }}
                ></div>
              </div>
            </div>

            {/* Topics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              {results.strongTopics.length > 0 && (
                <div className="bg-gradient-to-br from-emerald-950/20 to-transparent border border-emerald-900/30 rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <h4 className="text-xl font-light text-white">Strong Topics</h4>
                  </div>
                  <div className="space-y-3">
                    {results.strongTopics.map((topic, idx) => (
                      <div key={idx} className="px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                        <span className="text-emerald-400 font-light text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results.weakTopics.length > 0 && (
                <div className="bg-gradient-to-br from-rose-950/20 to-transparent border border-rose-900/30 rounded-3xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-5 h-5 text-rose-500" />
                    <h4 className="text-xl font-light text-white">Growth Areas</h4>
                  </div>
                  <div className="space-y-3">
                    {results.weakTopics.map((topic, idx) => (
                      <div key={idx} className="px-4 py-3 bg-rose-500/10 border border-rose-500/20 rounded-2xl">
                        <span className="text-rose-400 font-light text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Recommendations */}
            {results.weakTopics.length > 0 && (
              <div className="bg-gradient-to-br from-zinc-900/50 to-transparent border border-zinc-800/50 rounded-3xl p-10 mb-10">
                <div className="flex items-center gap-3 mb-8">
                  <Lightbulb className="w-6 h-6 text-zinc-500" />
                  <div>
                    <h4 className="text-2xl font-light text-white">Recommended Resources</h4>
                    <p className="text-zinc-500 text-sm font-light mt-1">Curated to strengthen your weak areas</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {results.weakTopics.map((topic, idx) => {
                    const recommendations = getRecommendationsForTopic(topic);
                    return (
                      <div key={idx} className="border-t border-zinc-800/30 pt-6 first:border-t-0 first:pt-0">
                        <h5 className="text-lg font-light text-zinc-300 mb-4">{topic}</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          {recommendations.map((rec, recIdx) => {
                            const Icon = getIconForResourceType(rec.type);
                            return (
                              <a
                                key={recIdx}
                                href={rec.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-start gap-3 p-4 bg-zinc-900/30 hover:bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700/70 rounded-2xl transition-all duration-300"
                              >
                                <Icon className="w-4 h-4 text-zinc-500 flex-shrink-0 mt-1" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-zinc-300 text-sm font-light group-hover:text-white transition truncate">
                                    {rec.title}
                                  </p>
                                  <p className="text-xs text-zinc-600 capitalize mt-1">{rec.type}</p>
                                </div>
                                <ExternalLink className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 transition flex-shrink-0" />
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Topic Performance */}
            <div className="bg-gradient-to-br from-zinc-900/50 to-transparent border border-zinc-800/50 rounded-3xl p-8 mb-10">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="w-5 h-5 text-zinc-500" />
                <h4 className="text-xl font-light text-white">Performance Breakdown</h4>
              </div>
              <div className="space-y-4">
                {Object.entries(results.topicPerformance).map(([topic, perf], idx) => {
                  const percentage = Math.round((perf.correct / perf.total) * 100);
                  return (
                    <div key={idx}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-zinc-300 font-light text-sm">{topic}</span>
                        <span className="text-zinc-500 text-xs">{perf.correct}/{perf.total}</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-500 ${
                            percentage === 100 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' :
                            percentage >= 50 ? 'bg-gradient-to-r from-amber-500 to-amber-400' :
                            'bg-gradient-to-r from-rose-500 to-rose-400'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleRetakeQuiz}
                className="flex-1 bg-white hover:bg-zinc-100 text-black font-light py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 text-sm tracking-wide hover:scale-[1.01]"
              >
                <RotateCcw className="w-4 h-4" />
                New Quiz
              </button>
              <button
                onClick={() => setShowHistory(true)}
                className="flex-1 bg-zinc-900/50 hover:bg-zinc-800/50 border border-zinc-800/50 hover:border-zinc-700/70 text-white font-light py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 text-sm tracking-wide"
              >
                <History className="w-4 h-4" />
                View History
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default YouTubeQuizPremium;