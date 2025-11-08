import React, { useState } from 'react';
import { 
  BookOpen, 
  Play, 
  FileText, 
  Award, 
  Code, 
  Bookmark, 
  Search, 
  Grid3X3, 
  List, 
  CheckCircle2, 
  Clock, 
  Users, 
  Star,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ExternalLink,
  TrendingUp
} from 'lucide-react';

const SyllabusHubBolt = () => {
  const [syllabusInput, setSyllabusInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [parsedTopics, setParsedTopics] = useState([]);
  const [currentView, setCurrentView] = useState('input');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [completedResources, setCompletedResources] = useState([]);
  const [bookmarkedResources, setBookmarkedResources] = useState([]);

  const resourceDatabase = {
    'HTML & CSS Fundamentals': {
      videos: [
        { id: 'v1', title: 'HTML & CSS Full Course - Beginner to Pro', channel: 'SuperSimpleDev', duration: '6:31:19', views: '2.4M', difficulty: 'Beginner', link: 'https://www.youtube.com/watch?v=G3e-cpL7ofc' },
        { id: 'v2', title: 'CSS Flexbox and Grid Tutorial', channel: 'freeCodeCamp.org', duration: '2:45:30', views: '1.8M', difficulty: 'Beginner', link: 'https://www.youtube.com/watch?v=EiNiSFIPIQE' },
        { id: 'v3', title: 'Build a Responsive Website', channel: 'Traversy Media', duration: '1:45:22', views: '950K', difficulty: 'Intermediate', link: 'https://www.youtube.com/watch?v=p0bGHP-PXD4' },
      ],
      docs: [
        { id: 'd1', title: 'MDN Web Docs - HTML', type: 'Official Docs', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML', description: 'Comprehensive HTML documentation' },
        { id: 'd2', title: 'CSS-Tricks Complete Guide', type: 'Tutorial', link: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/', description: 'Flexbox and Grid guides' },
        { id: 'd3', title: 'W3Schools HTML Tutorial', type: 'Interactive', link: 'https://www.w3schools.com/html/', description: 'Hands-on HTML learning' },
      ],
      courses: [
        { id: 'c1', title: 'The Complete Web Developer Bootcamp', platform: 'Udemy', instructor: 'Angela Yu', rating: '4.7', students: '985K', price: '$84.99', link: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/' },
      ],
      practice: [
        { id: 'p1', title: 'CodePen', type: 'Interactive Sandbox', link: 'https://codepen.io/', description: 'Frontend playground' },
      ],
    },
    'JavaScript Basics': {
      videos: [
        { id: 'v4', title: 'JavaScript Full Course for Beginners', channel: 'Programming with Mosh', duration: '1:48:12', views: '3.2M', difficulty: 'Beginner', link: 'https://www.youtube.com/watch?v=W6NZfCO5SIk' },
        { id: 'v5', title: 'JavaScript ES6 Tutorial', channel: 'The Net Ninja', duration: '2:15:30', views: '1.5M', difficulty: 'Intermediate', link: 'https://www.youtube.com/watch?v=NCwa_xi0Uuc' },
        { id: 'v6', title: 'Async JavaScript Deep Dive', channel: 'Web Dev Simplified', duration: '45:30', views: '780K', difficulty: 'Advanced', link: 'https://www.youtube.com/watch?v=ZYb_ZU8LNxs' },
      ],
      docs: [
        { id: 'd4', title: 'MDN JavaScript Guide', type: 'Official Docs', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', description: 'Complete JavaScript reference' },
        { id: 'd5', title: 'JavaScript.info', type: 'Tutorial', link: 'https://javascript.info/', description: 'Modern JavaScript tutorial' },
        { id: 'd6', title: 'Eloquent JavaScript', type: 'Book', link: 'https://eloquentjavascript.net/', description: 'Free online JavaScript book' },
      ],
      courses: [
        { id: 'c2', title: 'Modern JavaScript From The Beginning', platform: 'Udemy', instructor: 'Brad Traversy', rating: '4.8', students: '620K', price: '$84.99', link: 'https://www.udemy.com/course/modern-javascript-from-the-beginning/' },
      ],
      practice: [
        { id: 'p2', title: 'LeetCode', type: 'Coding Challenges', link: 'https://leetcode.com/', description: 'Practice coding problems' },
        { id: 'p3', title: 'HackerRank', type: 'Coding Practice', link: 'https://www.hackerrank.com/', description: 'Programming challenges' },
      ],
    },
    'React.js Framework': {
      videos: [
        { id: 'v7', title: 'React Course - Beginner Tutorial', channel: 'freeCodeCamp.org', duration: '11:55:27', views: '5.1M', difficulty: 'Beginner', link: 'https://www.youtube.com/watch?v=bMknfKXIFA8' },
        { id: 'v8', title: 'React Hooks Tutorial', channel: 'Codevolution', duration: '2:30:45', views: '1.2M', difficulty: 'Intermediate', link: 'https://www.youtube.com/watch?v=cF2lQ_gZeA8' },
        { id: 'v9', title: 'Advanced React Patterns', channel: 'Jack Herrington', duration: '1:05:20', views: '450K', difficulty: 'Advanced', link: 'https://www.youtube.com/watch?v=3XaXKiXtNjw' },
      ],
      docs: [
        { id: 'd7', title: 'React Official Documentation', type: 'Official Docs', link: 'https://react.dev/', description: 'React 19 documentation' },
        { id: 'd8', title: 'React Tutorial for Beginners', type: 'Interactive', link: 'https://scrimba.com/learn/learnreact', description: 'Interactive React course' },
        { id: 'd9', title: 'React Patterns', type: 'Guide', link: 'https://reactpatterns.com/', description: 'Common React patterns' },
      ],
      courses: [
        { id: 'c3', title: 'Modern React with Redux', platform: 'Udemy', instructor: 'Stephen Grider', rating: '4.6', students: '540K', price: '$89.99', link: 'https://www.udemy.com/course/react-redux/' },
        { id: 'c4', title: 'React - The Complete Guide', platform: 'Udemy', instructor: 'Maximilian Schwarzmüller', rating: '4.8', students: '780K', price: '$94.99', link: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/' },
      ],
      practice: [
        { id: 'p4', title: 'CodePen', type: 'Interactive Sandbox', link: 'https://codepen.io/', description: 'Frontend playground' },
      ],
    },
    'Python Programming': {
      videos: [
        { id: 'v10', title: 'Python for Beginners - Full Course', channel: 'Programming with Mosh', duration: '6:14:07', views: '28M', difficulty: 'Beginner', link: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc' },
        { id: 'v11', title: 'Python OOP Tutorial', channel: 'Corey Schafer', duration: '1:09:15', views: '2.1M', difficulty: 'Intermediate', link: 'https://www.youtube.com/watch?v=ZDa-Z5_ywYg' },
        { id: 'v12', title: 'Advanced Python Concepts', channel: 'Real Python', duration: '45:20', views: '320K', difficulty: 'Advanced', link: 'https://www.youtube.com/watch?v=cKPlPJapXA4' },
      ],
      docs: [
        { id: 'd10', title: 'Python Official Documentation', type: 'Official Docs', link: 'https://docs.python.org/3/', description: 'Python 3 documentation' },
        { id: 'd11', title: 'Real Python Tutorials', type: 'Tutorial', link: 'https://realpython.com/', description: 'In-depth Python tutorials' },
      ],
      courses: [
        { id: 'c5', title: 'Python for Data Science', platform: 'Udemy', instructor: 'Jose Portilla', rating: '4.6', students: '750K', price: '$94.99', link: 'https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/' },
      ],
      practice: [
        { id: 'p5', title: 'HackerRank', type: 'Coding Practice', link: 'https://www.hackerrank.com/', description: 'Programming challenges' },
        { id: 'p6', title: 'LeetCode', type: 'Coding Challenges', link: 'https://leetcode.com/', description: 'Practice coding problems' },
      ],
    },
  };

  const parseSyllabus = (text) => {
    if (!text.trim()) return [];
    const lines = text.split('\n').filter(line => line.trim());
    const topics = [];
    
    lines.forEach(line => {
      const cleaned = line.trim();
      if (cleaned.match(/^[\d\-\*•]/)) {
        const topicName = cleaned.replace(/^[\d\-\*•\.]+\s*/, '').trim();
        if (topicName.length > 0) {
          topics.push(topicName);
        }
      } else if (cleaned.length > 3 && !cleaned.includes(':')) {
        topics.push(cleaned);
      }
    });
    
    return topics;
  };

  const handleGenerateResources = async (e) => {
    e.preventDefault();
    if (!syllabusInput.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      const topics = parseSyllabus(syllabusInput);
      setParsedTopics(topics);
      setCurrentView('resources');
      setSelectedTopic(topics[0]);
      setIsLoading(false);
    }, 2000);
  };

  const handleUseSample = (sampleText) => {
    setSyllabusInput(sampleText);
  };

  const toggleCompleted = (resourceId) => {
    if (completedResources.includes(resourceId)) {
      setCompletedResources(completedResources.filter(id => id !== resourceId));
    } else {
      setCompletedResources([...completedResources, resourceId]);
    }
  };

  const toggleBookmark = (resourceId) => {
    if (bookmarkedResources.includes(resourceId)) {
      setBookmarkedResources(bookmarkedResources.filter(id => id !== resourceId));
    } else {
      setBookmarkedResources([...bookmarkedResources, resourceId]);
    }
  };

  const getResourcesForTopic = (topic) => {
    return resourceDatabase[topic] || { videos: [], docs: [], courses: [], practice: [] };
  };

  const getAllResources = () => {
    if (!selectedTopic) return [];
    const resources = getResourcesForTopic(selectedTopic);
    const all = [
      ...resources.videos.map(r => ({ ...r, type: 'video' })),
      ...resources.docs.map(r => ({ ...r, type: 'docs' })),
      ...resources.courses.map(r => ({ ...r, type: 'course' })),
      ...resources.practice.map(r => ({ ...r, type: 'practice' })),
    ];

    return all.filter(r => 
      (filterType === 'all' || r.type === filterType) &&
      (r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       r.description?.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const progressPercentage = completedResources.length > 0 
    ? Math.round((completedResources.length / (parsedTopics.length * 5)) * 100)
    : 0;

  // INPUT SECTION - Bolt Black
  if (currentView === 'input') {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-2xl w-full">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-blue-600 mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-6xl font-bold text-white mb-4 tracking-tight">Learning Hub</h1>
              <p className="text-gray-400 text-lg font-medium">Transform your syllabus into curated learning resources</p>
            </div>

            {/* Main Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
              <form onSubmit={handleGenerateResources} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">
                    Your Syllabus
                  </label>
                  <textarea
                    value={syllabusInput}
                    onChange={(e) => setSyllabusInput(e.target.value)}
                    placeholder="1. HTML & CSS Fundamentals&#10;2. JavaScript Basics&#10;3. React.js Framework&#10;4. Python Programming&#10;&#10;Paste your full syllabus here..."
                    className="w-full h-40 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition font-medium resize-none"
                  />
                  <div className="mt-2 text-xs text-gray-500 font-medium">
                    {syllabusInput.length} characters
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
                      Generating Resources...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Resources
                    </>
                  )}
                </button>
              </form>

              {/* Sample Links */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-sm text-gray-500 mb-4 font-semibold">Quick Start:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={() => handleUseSample('1. HTML & CSS Fundamentals\n2. JavaScript Basics\n3. React.js Framework\n4. Node.js and Express\n5. MongoDB Database\n6. RESTful APIs\n7. Authentication & Security\n8. Deployment and DevOps')}
                    className="text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 transition"
                  >
                    <div className="font-semibold text-white text-sm mb-1">Full Stack Web Dev</div>
                    <div className="text-xs text-gray-500 font-medium">8 comprehensive topics</div>
                  </button>
                  <button
                    onClick={() => handleUseSample('Module 1: Python Programming\nModule 2: Data Analysis with Pandas\nModule 3: Data Visualization\nModule 4: Statistical Analysis\nModule 5: Machine Learning Basics\nModule 6: Deep Learning Introduction')}
                    className="text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 transition"
                  >
                    <div className="font-semibold text-white text-sm mb-1">Data Science Python</div>
                    <div className="text-xs text-gray-500 font-medium">6 in-depth modules</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Play, title: 'Video Tutorials', desc: 'Curated courses' },
                { icon: FileText, title: 'Documentation', desc: 'Official docs' },
                { icon: Code, title: 'Practice', desc: 'Coding challenges' },
              ].map((feature, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                  <feature.icon className="w-6 h-6 text-blue-400 mx-auto mb-3" />
                  <h3 className="font-bold text-white text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-gray-500 font-medium">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RESOURCES SECTION - Bolt Black
  if (currentView === 'resources') {
    const resources = getResourcesForTopic(selectedTopic);
    const filteredResources = getAllResources();
    const completionStats = {
      videos: resources.videos.length,
      docs: resources.docs.length,
      courses: resources.courses.length,
      practice: resources.practice.length,
    };

    return (
      <div className="min-h-screen bg-black text-white">
        {/* Sidebar */}
        <div className="hidden md:flex fixed left-0 top-0 h-screen w-72 bg-white/5 backdrop-blur-xl border-r border-white/10 flex-col overflow-y-auto">
          <div className="p-6 border-b border-white/10">
            <button
              onClick={() => {
                setCurrentView('input');
                setSyllabusInput('');
                setParsedTopics([]);
              }}
              className="text-sm text-blue-400 hover:text-blue-300 transition flex items-center gap-2 mb-6 font-semibold"
            >
              ← New Syllabus
            </button>
            <h2 className="text-xl font-bold text-white mb-1">Topics</h2>
            <p className="text-xs text-gray-500 font-medium">{parsedTopics.length} discovered</p>
          </div>

          <div className="flex-1 p-4 space-y-2 overflow-y-auto">
            {parsedTopics.map((topic, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTopic(topic)}
                className={`w-full text-left px-4 py-3 rounded-lg transition font-semibold text-sm ${
                  selectedTopic === topic
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Progress */}
          <div className="p-6 border-t border-white/10">
            <div className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Progress</div>
            <div className="w-full bg-white/10 rounded-full h-2 mb-3">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-3xl font-bold text-white">{progressPercentage}%</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:ml-72">
          {/* Top Bar */}
          <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/80 border-b border-white/10 p-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-3xl font-bold text-white">{selectedTopic}</h2>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 rounded-lg transition ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-500'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 rounded-lg transition ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white/10 text-gray-500'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto p-6">
            {/* Search and Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-4 top-4 w-5 h-5 text-gray-600" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition font-medium"
                />
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none cursor-pointer font-medium"
              >
                <option value="all">All Resources</option>
                <option value="video">Videos</option>
                <option value="docs">Documentation</option>
                <option value="course">Courses</option>
                <option value="practice">Practice</option>
              </select>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { label: 'Videos', count: completionStats.videos, icon: Play },
                { label: 'Docs', count: completionStats.docs, icon: FileText },
                { label: 'Courses', count: completionStats.courses, icon: Award },
                { label: 'Practice', count: completionStats.practice, icon: Code },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <stat.icon className="w-6 h-6 text-blue-400 mb-3" />
                  <div className="text-4xl font-bold text-white mb-1">{stat.count}</div>
                  <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Resources Grid */}
            {filteredResources.length === 0 ? (
              <div className="text-center py-20">
                <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 font-medium">No resources found</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredResources.map((resource) => {
                  const isCompleted = completedResources.includes(resource.id);
                  const isBookmarked = bookmarkedResources.includes(resource.id);

                  if (resource.type === 'video') {
                    return (
                      <div key={resource.id} className="bg-white/5 border border-white/10 hover:border-white/20 rounded-xl overflow-hidden transition">
                        <div className="w-full h-40 bg-red-600 flex items-center justify-center">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-white mb-2 line-clamp-2">{resource.title}</h3>
                          <p className="text-sm text-gray-500 mb-3 font-medium">{resource.channel}</p>
                          <div className="text-sm text-gray-500 mb-4 font-medium">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {resource.duration} • {resource.views}
                            </div>
                            <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold mt-2 ${
                              resource.difficulty === 'Beginner' ? 'bg-green-600' :
                              resource.difficulty === 'Intermediate' ? 'bg-yellow-600' :
                              'bg-red-600'
                            }`}>{resource.difficulty}</span>
                          </div>
                          <div className="flex gap-2">
                            <a
                              href={resource.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition text-center text-sm"
                            >
                              Watch
                            </a>
                            <button
                              onClick={() => toggleCompleted(resource.id)}
                              className={`p-2 rounded-lg transition ${isCompleted ? 'bg-green-600 text-white' : 'bg-white/10 text-gray-500'}`}
                            >
                              <CheckCircle2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => toggleBookmark(resource.id)}
                              className="p-2"
                            >
                              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-white text-white' : 'text-gray-600'}`} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (resource.type === 'docs') {
                    return (
                      <div key={resource.id} className="bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-6 transition">
                        <div className="flex items-center gap-3 mb-4">
                          <FileText className="w-5 h-5 text-blue-400" />
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{resource.type}</span>
                        </div>
                        <h3 className="font-bold text-white mb-2">{resource.title}</h3>
                        <p className="text-sm text-gray-500 mb-4 font-medium">{resource.description}</p>
                        <div className="flex gap-2">
                          <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition text-center flex items-center justify-center gap-2 text-sm"
                          >
                            Read <ExternalLink className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => toggleBookmark(resource.id)}
                            className="p-2"
                          >
                            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-white text-white' : 'text-gray-600'}`} />
                          </button>
                        </div>
                      </div>
                    );
                  }

                  if (resource.type === 'course') {
                    return (
                      <div key={resource.id} className="bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-6 transition">
                        <div className="flex items-center gap-3 mb-4">
                          <Award className="w-5 h-5 text-blue-400" />
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{resource.platform}</span>
                        </div>
                        <h3 className="font-bold text-white mb-2">{resource.title}</h3>
                        <p className="text-sm text-gray-500 mb-3 font-medium">by {resource.instructor}</p>
                        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 font-medium">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-white font-bold">{resource.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span className="text-white font-bold">{resource.students}</span>
                          </div>
                        </div>
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition text-center block text-sm"
                        >
                          Enroll Now
                        </a>
                      </div>
                    );
                  }

                  if (resource.type === 'practice') {
                    return (
                      <div key={resource.id} className="bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-6 transition">
                        <div className="flex items-center gap-3 mb-4">
                          <Code className="w-5 h-5 text-blue-400" />
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{resource.type}</span>
                        </div>
                        <h3 className="font-bold text-white mb-2">{resource.title}</h3>
                        <p className="text-sm text-gray-500 mb-4 font-medium">{resource.description}</p>
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition text-center block text-sm"
                        >
                          Start Practicing
                        </a>
                      </div>
                    );
                  }
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default SyllabusHubBolt;