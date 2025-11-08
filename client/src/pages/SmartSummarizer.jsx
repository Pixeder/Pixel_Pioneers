import React, { useState } from 'react';
import { FileText, Youtube, Link, Sparkles, Copy, Download, BookOpen, Clock, ChevronRight, Check, Zap, List, Brain, Newspaper, Lightbulb, AlertCircle } from 'lucide-react';

const SmartSummarizerBolt = () => {
  const [inputUrl, setInputUrl] = useState('');
  const [inputType, setInputType] = useState('youtube');
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [summaryType, setSummaryType] = useState('key-points');
  const [copied, setCopied] = useState(false);

  const sampleSummaries = {
    youtube: {
      title: "React Hooks Explained - Complete Tutorial",
      duration: "28:45",
      channel: "Web Dev Simplified",
      summaries: {
        'key-points': {
          points: [
            "React Hooks were introduced in React 16.8 to allow functional components to use state and lifecycle features",
            "useState hook enables state management in functional components with simple syntax",
            "useEffect hook handles side effects and replaces lifecycle methods like componentDidMount and componentDidUpdate",
            "Custom hooks allow you to extract and reuse stateful logic across multiple components",
            "Rules of Hooks: only call at top level and only from React functions",
            "useContext hook simplifies consuming context without nested components",
            "useReducer is useful for complex state logic that involves multiple sub-values",
            "Performance optimization hooks like useMemo and useCallback prevent unnecessary re-renders"
          ],
          type: 'Key Points'
        },
        'tldr': {
          text: "React Hooks revolutionized React development by enabling functional components to use state and lifecycle features. The most important hooks are useState for state management and useEffect for side effects. Following the Rules of Hooks ensures proper functionality. Custom hooks allow reusable logic across components.",
          type: 'TL;DR'
        },
        'detailed': {
          sections: [
            {
              title: "Introduction to React Hooks",
              content: "React Hooks were introduced in version 16.8 as a groundbreaking feature that changed how developers write React components. Before hooks, only class components could have state and lifecycle methods.",
              timestamp: "0:00 - 3:45"
            },
            {
              title: "Understanding useState",
              content: "The useState hook is the most fundamental hook for managing state in functional components. It returns an array with two elements: the current state value and a function to update it.",
              timestamp: "3:46 - 8:20"
            },
            {
              title: "Working with useEffect",
              content: "useEffect is the hook for handling side effects in functional components. It serves as a replacement for componentDidMount, componentDidUpdate, and componentWillUnmount.",
              timestamp: "8:21 - 15:30"
            }
          ],
          type: 'Detailed Summary'
        },
        'headline': {
          text: "React Hooks Transform Functional Components with State Management and Lifecycle Features",
          type: 'Headline'
        }
      },
      keyTerms: ["React Hooks", "useState", "useEffect", "Functional Components", "Custom Hooks", "useContext"],
      estimatedReadTime: "5 min",
      complexity: "Intermediate"
    },
    doc: {
      title: "Introduction to Machine Learning - Research Paper",
      pages: 24,
      author: "Dr. Andrew Ng",
      source: "Stanford University",
      summaries: {
        'key-points': {
          points: [
            "Machine learning is a subset of artificial intelligence that enables systems to learn from data without explicit programming",
            "Three main types: supervised learning (labeled data), unsupervised learning (unlabeled data), and reinforcement learning (reward-based)",
            "Supervised learning algorithms include linear regression, logistic regression, decision trees, and neural networks",
            "Feature engineering and selection are critical steps that significantly impact model performance",
            "Training data should be split into training, validation, and test sets to evaluate model generalization",
            "Overfitting occurs when models perform well on training data but poorly on new data",
            "Common evaluation metrics include accuracy, precision, recall, F1-score for classification",
            "Deep learning has achieved breakthrough results in computer vision and NLP"
          ],
          type: 'Key Points'
        },
        'tldr': {
          text: "Machine learning enables computers to learn from data through three approaches: supervised, unsupervised, and reinforcement learning. Success depends on quality data, proper feature engineering, and avoiding overfitting.",
          type: 'TL;DR'
        },
        'detailed': {
          sections: [
            {
              title: "Foundations of Machine Learning",
              content: "Machine learning represents a paradigm shift in programming, where instead of explicitly coding rules, we train models to discover patterns in data.",
              page: "Pages 1-4"
            },
            {
              title: "Types of Machine Learning",
              content: "The field divides into three primary categories. Supervised learning uses labeled examples. Unsupervised learning finds hidden patterns. Reinforcement learning trains through rewards.",
              page: "Pages 5-8"
            },
            {
              title: "Algorithm Selection",
              content: "Choosing the right algorithm depends on the problem type, data characteristics, and computational resources available.",
              page: "Pages 9-14"
            }
          ],
          type: 'Detailed Summary'
        },
        'headline': {
          text: "Machine Learning Revolutionizes Computing Through Data-Driven Pattern Recognition",
          type: 'Headline'
        }
      },
      keyTerms: ["Supervised Learning", "Neural Networks", "Overfitting", "Feature Engineering", "Deep Learning"],
      estimatedReadTime: "8 min",
      complexity: "Advanced"
    }
  };

  const handleSummarize = async (e) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      setSummary(sampleSummaries[inputType]);
      setIsLoading(false);
    }, 2500);
  };

  const handleCopy = () => {
    const currentSummary = summary.summaries[summaryType];
    let textToCopy = '';

    if (summaryType === 'key-points') {
      textToCopy = currentSummary.points.join('\n• ');
    } else if (summaryType === 'tldr' || summaryType === 'headline') {
      textToCopy = currentSummary.text;
    } else if (summaryType === 'detailed') {
      textToCopy = currentSummary.sections.map(s => `${s.title}\n${s.content}`).join('\n\n');
    }

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInputUrl('');
    setSummary(null);
    setSummaryType('key-points');
  };

  const getSummaryIcon = (type) => {
    switch(type) {
      case 'key-points': return List;
      case 'tldr': return Zap;
      case 'detailed': return BookOpen;
      case 'headline': return Newspaper;
      default: return Brain;
    }
  };

  // INPUT VIEW - Bolt Black Mode
  if (!summary) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-3xl w-full">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-6xl font-bold text-white tracking-tight">
                  SmartSummarize
                </h1>
              </div>
              <p className="text-xl text-gray-300 mb-3 font-medium">AI-Powered Content Summarization</p>
              <p className="text-gray-500 font-medium">Transform lengthy videos and documents into digestible insights</p>
            </div>

            {/* Main Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12">
              {/* Type Selector */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => setInputType('youtube')}
                  className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold transition ${
                    inputType === 'youtube'
                      ? 'bg-red-600 text-white border border-red-600'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20'
                  }`}
                >
                  <Youtube className="w-5 h-5" />
                  YouTube Video
                </button>
                <button
                  onClick={() => setInputType('doc')}
                  className={`flex-1 flex items-center justify-center gap-3 py-4 px-6 rounded-xl font-semibold transition ${
                    inputType === 'doc'
                      ? 'bg-blue-600 text-white border border-blue-600'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  Document
                </button>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSummarize} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    {inputType === 'youtube' ? 'YouTube URL' : 'Document URL'}
                  </label>
                  <div className="relative">
                    <Link className="absolute left-4 top-4 w-5 h-5 text-gray-600" />
                    <input
                      type="text"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder={
                        inputType === 'youtube'
                          ? 'https://www.youtube.com/watch?v=...'
                          : 'https://example.com/document.pdf'
                      }
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-white/10 disabled:text-gray-600 text-white font-bold py-4 px-6 rounded-xl transition flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin">⚙️</div>
                      Analyzing Content...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Summary
                    </>
                  )}
                </button>
              </form>

              {/* Sample Links */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-sm text-gray-500 mb-4 font-medium">Try a sample:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {inputType === 'youtube' ? (
                    <>
                      <button
                        onClick={() => setInputUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}
                        className="text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 transition"
                      >
                        <div className="flex items-center gap-3">
                          <Youtube className="w-5 h-5 text-red-500" />
                          <div>
                            <div className="font-semibold text-white text-sm">React Hooks Tutorial</div>
                            <div className="text-xs text-gray-500 font-medium">28:45 • Web Dev Simplified</div>
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => setInputUrl('https://www.youtube.com/watch?v=example2')}
                        className="text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 transition"
                      >
                        <div className="flex items-center gap-3">
                          <Youtube className="w-5 h-5 text-red-500" />
                          <div>
                            <div className="font-semibold text-white text-sm">Python ML Course</div>
                            <div className="text-xs text-gray-500 font-medium">45:20 • freeCodeCamp</div>
                          </div>
                        </div>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setInputUrl('https://arxiv.org/pdf/example.pdf')}
                        className="text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 transition"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-500" />
                          <div>
                            <div className="font-semibold text-white text-sm">ML Research Paper</div>
                            <div className="text-xs text-gray-500 font-medium">24 pages • Stanford</div>
                          </div>
                        </div>
                      </button>
                      <button
                        onClick={() => setInputUrl('https://example.com/whitepaper.pdf')}
                        className="text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 transition"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-500" />
                          <div>
                            <div className="font-semibold text-white text-sm">AI Whitepaper</div>
                            <div className="text-xs text-gray-500 font-medium">18 pages • OpenAI</div>
                          </div>
                        </div>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Zap, title: 'Lightning Fast', desc: 'Summaries in seconds' },
                { icon: Brain, title: 'AI-Powered', desc: 'Advanced NLP' },
                { icon: Lightbulb, title: 'Smart Insights', desc: 'Key information' },
              ].map((feature, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                  <feature.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <h3 className="font-bold text-white mb-2 text-sm">{feature.title}</h3>
                  <p className="text-sm text-gray-500 font-medium">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SUMMARY VIEW - Bolt Black Mode
  const currentSummary = summary.summaries[summaryType];
  const Icon = getSummaryIcon(summaryType);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Bar */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <button
              onClick={handleReset}
              className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-2 text-sm"
            >
              ← New Summary
            </button>
            <div className="flex items-center gap-2">
              <Brain className="w-6 h-6 text-blue-400" />
              <span className="font-bold text-white text-lg">SmartSummarize</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition flex items-center gap-2 text-sm font-semibold"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2 text-sm font-semibold">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-8">
        {/* Content Info */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-6">
            <div className={`w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 ${
              inputType === 'youtube' ? 'bg-red-600' : 'bg-blue-600'
            }`}>
              {inputType === 'youtube' ? (
                <Youtube className="w-10 h-10 text-white" />
              ) : (
                <FileText className="w-10 h-10 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-3">{summary.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400 font-medium">
                {inputType === 'youtube' ? (
                  <>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {summary.duration}
                    </div>
                    <div>{summary.channel}</div>
                  </>
                ) : (
                  <>
                    <div>{summary.pages} pages</div>
                    <div>By {summary.author}</div>
                    <div>{summary.source}</div>
                  </>
                )}
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {summary.estimatedReadTime} read
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  summary.complexity === 'Beginner' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                  summary.complexity === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                  'bg-red-500/20 text-red-300 border-red-500/30'
                }`}>
                  {summary.complexity}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Summary Type Selector */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">Summary Type</h3>
              <div className="space-y-2">
                {[
                  { id: 'key-points', label: 'Key Points', icon: List },
                  { id: 'tldr', label: 'TL;DR', icon: Zap },
                  { id: 'detailed', label: 'Detailed', icon: BookOpen },
                  { id: 'headline', label: 'Headline', icon: Newspaper },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSummaryType(type.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition font-semibold text-sm ${
                      summaryType === type.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <type.icon className="w-5 h-5" />
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Key Terms */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">Key Terms</h3>
              <div className="flex flex-wrap gap-2">
                {summary.keyTerms.map((term, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-full text-xs font-bold"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Main Summary Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <Icon className="w-7 h-7 text-blue-400" />
                <h2 className="text-2xl font-bold text-white">{currentSummary.type}</h2>
              </div>

              {/* Key Points */}
              {summaryType === 'key-points' && (
                <div className="space-y-4">
                  {currentSummary.points.map((point, idx) => (
                    <div key={idx} className="flex gap-4 p-5 rounded-xl bg-white/5 hover:bg-white/[0.07] transition border border-white/10">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        {idx + 1}
                      </div>
                      <p className="text-gray-200 leading-relaxed flex-1 font-medium">{point}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* TL;DR / Headline */}
              {(summaryType === 'tldr' || summaryType === 'headline') && (
                <div className="p-6 rounded-xl bg-blue-600/20 border border-blue-500/30">
                  <p className="text-lg text-gray-100 leading-relaxed font-medium">{currentSummary.text}</p>
                </div>
              )}

              {/* Detailed */}
              {summaryType === 'detailed' && (
                <div className="space-y-6">
                  {currentSummary.sections.map((section, idx) => (
                    <div key={idx} className="p-6 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-1">{section.title}</h3>
                          <p className="text-xs text-gray-500 font-semibold">{section.timestamp || section.page}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 leading-relaxed ml-14 font-medium">{section.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          width: 6px;
        }
        div::-webkit-scrollbar-track {
          background: transparent;
        }
        div::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        div::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

export default SmartSummarizerBolt;