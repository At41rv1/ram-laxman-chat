import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Users, ArrowRight, Sparkles, Zap, Shield, Star, CheckCircle } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-6xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 shadow-lg text-gray-700 text-sm mb-8 hover:shadow-xl transition-all duration-300">
              <Sparkles className="w-4 h-4 mr-2 text-gray-600" />
              Next-Generation AI Chat Experience
              <Star className="w-4 h-4 ml-2 text-yellow-500" />
            </div>
          </div>
          
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-gray-800 mb-6 animate-fade-in delay-300">
            Chat 3
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-600 to-gray-800"> AI</span>
          </h1>
          
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 mb-6 animate-fade-in delay-500 leading-relaxed">
            Where AI Personalities Come Alive
          </p>
          
          <p className="text-base sm:text-lg text-gray-500 mb-12 max-w-3xl mx-auto animate-fade-in delay-700 leading-relaxed px-4">
            Experience dynamic conversations with AI companions or get personalized learning support with our intelligent tutoring system that adapts to your unique learning style. ~ by at41rv
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in delay-1000">
            <Link 
              to="/chat-selector" 
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-full text-lg font-semibold hover:from-gray-900 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Start Chatting 
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="flex items-center text-gray-500 text-sm bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              Free • No Registration Required
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
              Meet Your AI Companions
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the future of AI interaction with personalities that understand, engage, and entertain
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 hover:bg-white hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Ram</h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                Your dedicated AI companion who delivers perfect answers with intelligence and charm. 
                Ram brings depth to every conversation, making complex topics accessible and enjoyable 
                with his engaging personality and thoughtful responses.
              </p>
              <div className="flex items-center text-gray-600 bg-gray-100 px-4 py-2 rounded-full w-fit">
                <Shield className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Intelligent & Reliable</span>
              </div>
            </div>
            
            <div className="group bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 hover:bg-white hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                <MessageCircle className="text-white" size={32} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Laxman</h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                The witty conversationalist who combines perfect accuracy with humor and lightness. 
                Laxman transforms every interaction into an entertaining experience while maintaining 
                exceptional helpfulness and providing insightful, engaging responses.
              </p>
              <div className="flex items-center text-gray-600 bg-gray-100 px-4 py-2 rounded-full w-fit">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Witty & Entertaining</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-gray-200 max-w-4xl mx-auto hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MessageCircle className="text-white" size={40} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">Dynamic Three-Way Conversations</h3>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
                Experience truly natural AI interactions where both personalities respond to you and engage 
                with each other, creating rich, contextual conversations that feel completely human and authentic.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
                <div className="flex items-center text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                  <Zap className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Real-time Responses</span>
                </div>
                <div className="flex items-center text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">Context Aware</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
            Ready to Experience the Future?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of users discovering the next level of AI conversation technology
          </p>
          <Link 
            to="/chat-selector" 
            className="group inline-flex items-center px-12 py-5 bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-full text-xl font-semibold hover:from-gray-900 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl"
          >
            Enter Chat Room 
            <MessageCircle className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500">
            Built with ❤️ for the future of AI conversation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
