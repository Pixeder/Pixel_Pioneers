import React, { useState } from 'react';
import {
  MessageCircle,
  BookOpen,
  Calendar,
  FileText,
  Users,
  Search,
  Send,
  Phone,
  Video,
  Download,
  Star,
  ArrowRight,
  Bot,
  Sparkles,
  TrendingUp,
  Zap,
  HelpCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';

const StudentSupportBoltBlack = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'bot', text: 'Hi! I\'m your AI Support Assistant. How can I help you today?' }
  ]);

  const supportCategories = [
    { id: 'all', name: 'All Support', icon: HelpCircle },
    { id: 'academic', name: 'Academic', icon: BookOpen },
    { id: 'technical', name: 'Technical', icon: Zap },
    { id: 'financial', name: 'Financial', icon: FileText },
    { id: 'career', name: 'Career', icon: TrendingUp }
  ];

  const quickActions = [
    { icon: MessageCircle, title: 'Live Chat', desc: 'Get instant help' },
    { icon: Phone, title: 'Call Support', desc: '1-800-STUDENT' },
    { icon: Calendar, title: 'Book Meeting', desc: 'Schedule time' },
    { icon: Video, title: 'Video Call', desc: 'Face-to-face' }
  ];

  const faqs = [
    {
      category: 'academic',
      question: 'How do I access my course materials?',
      answer: 'Log into your student portal, navigate to "My Courses," and select the course you want to access.'
    },
    {
      category: 'academic',
      question: 'Can I change my course schedule?',
      answer: 'Yes! You can modify your schedule during the add/drop period (first two weeks of semester).'
    },
    {
      category: 'technical',
      question: 'I forgot my password. What should I do?',
      answer: 'Click "Forgot Password" on the login page. We\'ll send you a reset link within 5 minutes.'
    },
    {
      category: 'technical',
      question: 'Which browsers are supported?',
      answer: 'We support the latest versions of Chrome, Firefox, Safari, and Edge.'
    },
    {
      category: 'financial',
      question: 'When is tuition due?',
      answer: 'Tuition payment is due by the first day of each semester. Payment plans are available.'
    },
    {
      category: 'financial',
      question: 'How do I apply for scholarships?',
      answer: 'Visit the Financial Aid portal to browse available scholarships.'
    },
    {
      category: 'career',
      question: 'How can I find internships?',
      answer: 'Our Career Services portal lists hundreds of internship opportunities.'
    },
    {
      category: 'career',
      question: 'Do you offer resume reviews?',
      answer: 'Absolutely! Book a free resume review session with our Career Services team.'
    }
  ];

  const supportTeam = [
    { name: 'Dr. Emily Chen', role: 'Academic Advisor', rating: 4.9, available: true },
    { name: 'Mark Johnson', role: 'Tech Support', rating: 4.8, available: true },
    { name: 'Sarah Williams', role: 'Financial Aid', rating: 5.0, available: false },
    { name: 'David Brown', role: 'Career Counselor', rating: 4.7, available: true }
  ];

  const recentTickets = [
    { id: 1, title: 'Unable to access online exam', status: 'In Progress', date: '2h ago' },
    { id: 2, title: 'Scholarship application help', status: 'Resolved', date: '1d ago' },
    { id: 3, title: 'Course registration issue', status: 'Open', date: '3h ago' }
  ];

  const resources = [
    { title: 'Student Handbook', icon: BookOpen, downloads: '2.4K' },
    { title: 'IT Setup Guide', icon: Zap, downloads: '1.8K' },
    { title: 'Financial Aid Forms', icon: FileText, downloads: '3.1K' },
    { title: 'Career Resources', icon: TrendingUp, downloads: '1.5K' }
  ];

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages([...chatMessages, 
        { id: chatMessages.length + 1, type: 'user', text: chatMessage },
        { id: chatMessages.length + 2, type: 'bot', text: 'I understand. Our support team will respond within 5 minutes.' }
      ]);
      setChatMessage('');
    }
  };

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header - Bolt Black: Minimal, no border */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white tracking-tight">Student Support</h1>
                <p className="text-xs text-gray-500 font-medium">24/7 Assistance</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Online
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero - Bolt Black: Simple, bold, clean */}
      <section className="py-20 bg-gradient-to-b from-black via-black to-black/50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-8">
            <Bot className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-300">AI-Powered Support</span>
          </div>
          
          <h2 className="text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            How can we help you?
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 font-medium">
            Get instant answers, connect with advisors, or explore our knowledge base
          </p>

          {/* Search - Bolt Black: Clean input */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative group">
              <Search className="absolute left-4 top-4 w-5 h-5 text-gray-600" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition font-medium"
              />
            </div>
          </div>

          {/* Quick Actions - Bolt Black: Minimal cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                className="group p-6 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 hover:bg-white/10 transition text-center"
              >
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-500/20 transition border border-blue-500/20 group-hover:border-blue-500/40">
                  <action.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white mb-1 text-sm">{action.title}</h3>
                <p className="text-xs text-gray-500">{action.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content - Bolt Black */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - FAQs */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Category Filters - Bolt Black */}
              <div className="flex flex-wrap gap-3">
                {supportCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition ${
                      activeCategory === cat.id
                        ? 'bg-blue-600 text-white border border-blue-600'
                        : 'bg-white/5 text-gray-400 border border-white/10 hover:border-white/20'
                    }`}
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* FAQs - Bolt Black: Dark cards */}
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h3>
                {filteredFaqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-6 bg-white/5 border border-white/10 rounded-lg hover:border-white/20 hover:bg-white/[0.07] transition"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full border border-blue-500/30">
                        {faq.category}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3">{faq.question}</h4>
                    <p className="text-gray-400 leading-relaxed font-medium">{faq.answer}</p>
                  </div>
                ))}
              </div>

              {/* Resources - Bolt Black */}
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">Helpful Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.map((resource, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-lg hover:border-blue-500/50 hover:bg-white/[0.07] transition cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                          <resource.icon className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">{resource.title}</div>
                          <div className="text-sm text-gray-500 font-medium">{resource.downloads} downloads</div>
                        </div>
                      </div>
                      <Download className="w-5 h-5 text-gray-600 group-hover:text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Chat & Sidebar */}
            <div className="space-y-6">
              
              {/* AI Chat - Bolt Black */}
              <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5 flex items-center gap-4 border-b border-white/10">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center border border-white/20">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">AI Assistant</div>
                    <div className="text-xs text-blue-100 font-medium">Always here to help</div>
                  </div>
                </div>

                <div className="p-5 h-80 overflow-y-auto space-y-4 bg-black/40">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg text-sm font-medium ${
                          msg.type === 'user'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-white/10 text-gray-200 rounded-bl-none border border-white/10'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-5 border-t border-white/10 bg-white/5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition font-medium text-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Support Team - Bolt Black */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-5">Support Team</h3>
                <div className="space-y-4">
                  {supportTeam.map((member, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition cursor-pointer"
                    >
                      <div className="relative">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                          <Users className="w-6 h-6 text-blue-400" />
                        </div>
                        {member.available && (
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-black rounded-full animate-pulse"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-white text-sm">{member.name}</div>
                        <div className="text-xs text-gray-500 font-medium">{member.role}</div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-semibold text-gray-300">{member.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Tickets - Bolt Black */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-5">Recent Tickets</h3>
                <div className="space-y-3">
                  {recentTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="p-3 rounded-lg hover:bg-white/5 transition cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${
                          ticket.status === 'Resolved' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                          ticket.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                          'bg-blue-500/20 text-blue-300 border-blue-500/30'
                        }`}>
                          {ticket.status}
                        </span>
                        <span className="text-xs text-gray-600 font-medium">{ticket.date}</span>
                      </div>
                      <div className="font-semibold text-white text-sm">{ticket.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats - Bolt Black */}
      <section className="py-20 bg-gradient-to-b from-black to-black/50 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '24/7', label: 'Support Available' },
              { number: '<5min', label: 'Avg Response' },
              { number: '98%', label: 'Satisfaction' },
              { number: '50K+', label: 'Students Helped' }
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-5xl font-black text-blue-400 mb-2">{stat.number}</div>
                <div className="text-gray-500 font-semibold text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Bolt Black */}
      <section className="py-20 bg-black border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-500/30">
            <Sparkles className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Still need help?</h2>
          <p className="text-lg text-gray-400 mb-10 font-medium">Our support team is ready to assist you</p>
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition flex items-center gap-2 mx-auto">
            Contact Support Team
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

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

export default StudentSupportBoltBlack;