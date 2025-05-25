import React from 'react';
import { Brain, Users, BookText, MoonStar } from 'lucide-react';

interface HeaderProps {
  activeTab: 'analyzer' | 'community' | 'journal';
  setActiveTab: (tab: 'analyzer' | 'community' | 'journal') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-purple-700 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <MoonStar className="h-6 w-6 text-white mr-2" />
            <h1 className="text-2xl font-bold text-white">DreamSight</h1>
          </div>
          
          <nav className="flex space-x-2">
            <button 
              onClick={() => setActiveTab('analyzer')}
              className={`flex items-center px-4 py-2 rounded-md transition-all duration-300 ${
                activeTab === 'analyzer' 
                  ? 'bg-white text-purple-700' 
                  : 'bg-purple-600 text-white hover:bg-purple-500'
              }`}
            >
              <Brain className="h-5 w-5 mr-2" />
              <span>Dream Analyzer</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('community')}
              className={`flex items-center px-4 py-2 rounded-md transition-all duration-300 ${
                activeTab === 'community' 
                  ? 'bg-white text-purple-700' 
                  : 'bg-purple-600 text-white hover:bg-purple-500'
              }`}
            >
              <Users className="h-5 w-5 mr-2" />
              <span>Community</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('journal')}
              className={`flex items-center px-4 py-2 rounded-md transition-all duration-300 ${
                activeTab === 'journal' 
                  ? 'bg-white text-purple-700' 
                  : 'bg-purple-600 text-white hover:bg-purple-500'
              }`}
            >
              <BookText className="h-5 w-5 mr-2" />
              <span>Journal</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;