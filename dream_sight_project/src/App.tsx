import React, { useState } from 'react';
import { Brain, Users, BookText, MoonStar } from 'lucide-react';
import DreamAnalyzer from './components/DreamAnalyzer';
import Community from './components/Community';
import Journal from './components/Journal';
import Header from './components/Header';
import { DreamEntry } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<'analyzer' | 'community' | 'journal'>('analyzer');
  const [dreamEntries, setDreamEntries] = useState<DreamEntry[]>([]);
  const [sharedDreams, setSharedDreams] = useState<DreamEntry[]>([]);

  const handleSaveDream = (dream: DreamEntry) => {
    setDreamEntries([dream, ...dreamEntries]);
    
    if (dream.isShared) {
      setSharedDreams([dream, ...sharedDreams]);
    }
  };

  const handleShareDream = () => {
    setActiveTab('analyzer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'analyzer' && (
          <DreamAnalyzer onSaveDream={handleSaveDream} />
        )}
        
        {activeTab === 'community' && (
          <Community sharedDreams={sharedDreams} onShareDream={handleShareDream} />
        )}
        
        {activeTab === 'journal' && (
          <Journal dreamEntries={dreamEntries} />
        )}
      </div>
    </div>
  );
}

export default App;