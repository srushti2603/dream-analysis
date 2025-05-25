import React, { useState } from 'react';
import { DreamEntry } from '../types';
import { Calendar, Search, Filter, ArrowUp, ArrowDown } from 'lucide-react';

interface JournalProps {
  dreamEntries: DreamEntry[];
}

const Journal: React.FC<JournalProps> = ({ dreamEntries }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEmotion, setFilterEmotion] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedDream, setSelectedDream] = useState<DreamEntry | null>(null);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getEmotionBadges = (emotions: string[]) => {
    const colors: { [key: string]: string } = {
      'Happiness': 'bg-yellow-500',
      'Fear': 'bg-red-500',
      'Sadness': 'bg-blue-500',
      'Anger': 'bg-orange-500',
      'Peace': 'bg-green-500',
      'Confusion': 'bg-purple-500'
    };
    
    return emotions.map(emotion => (
      <span 
        key={emotion} 
        className={`${colors[emotion]} px-2 py-1 rounded-full text-white mr-2 text-xs`}
      >
        {emotion}
      </span>
    ));
  };

  const filteredDreams = dreamEntries
    .filter(dream => 
      dream.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dream.emotions.some(emotion => 
        emotion.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .filter(dream => 
      !filterEmotion || dream.emotions.includes(filterEmotion as any)
    )
    .sort((a, b) => {
      if (sortDirection === 'asc') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Dream Journal</h2>
        <p className="text-gray-700 mb-6">
          Keep track of your dreams and discover patterns over time. Your personal dream journal helps you reflect on your subconscious mind.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search dreams..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={filterEmotion || ''}
              onChange={(e) => setFilterEmotion(e.target.value || null)}
              className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">All emotions</option>
              <option value="Happiness">Happiness</option>
              <option value="Fear">Fear</option>
              <option value="Sadness">Sadness</option>
              <option value="Anger">Anger</option>
              <option value="Peace">Peace</option>
              <option value="Confusion">Confusion</option>
            </select>
            
            <button
              onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
              className="flex items-center p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              title={sortDirection === 'asc' ? 'Oldest first' : 'Newest first'}
            >
              <Filter className="h-5 w-5 mr-1 text-gray-600" />
              {sortDirection === 'asc' ? (
                <ArrowUp className="h-4 w-4 text-gray-600" />
              ) : (
                <ArrowDown className="h-4 w-4 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {dreamEntries.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Your Journal is Empty</h3>
          <p className="text-gray-600 mb-4">
            Start by analyzing your first dream to add it to your journal.
          </p>
          <button 
            onClick={() => window.scrollTo(0, 0)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-all"
          >
            Analyze a Dream
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 space-y-4">
            {filteredDreams.map(dream => (
              <div 
                key={dream.id} 
                onClick={() => setSelectedDream(dream)}
                className={`bg-white rounded-lg shadow hover:shadow-md cursor-pointer transition-all p-4 ${
                  selectedDream?.id === dream.id ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(dream.date)}
                </div>
                <p className="text-gray-800 mb-2 line-clamp-2">{dream.description}</p>
                <div className="flex flex-wrap">
                  {getEmotionBadges(dream.emotions)}
                </div>
              </div>
            ))}
            
            {filteredDreams.length === 0 && (
              <div className="bg-white rounded-lg shadow-lg p-4 text-center">
                <p className="text-gray-600">No dreams match your search criteria</p>
              </div>
            )}
          </div>
          
          <div className="col-span-1 md:col-span-2">
            {selectedDream ? (
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    {formatDate(selectedDream.date)}
                  </div>
                  <div className="flex">
                    {getEmotionBadges(selectedDream.emotions)}
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-800 whitespace-pre-line">{selectedDream.description}</p>
                </div>
                
                {selectedDream.analysis && (
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h3 className="text-xl font-semibold text-purple-700 mb-3">Dream Analysis</h3>
                    
                    <h4 className="text-lg font-medium text-purple-600 mb-2">Interpretation</h4>
                    <p className="text-gray-700 mb-4">{selectedDream.analysis.interpretation}</p>
                    
                    <h4 className="text-lg font-medium text-purple-600 mb-2">Key Symbols</h4>
                    <ul className="mb-4 space-y-2">
                      {selectedDream.analysis.symbols.map((item, index) => (
                        <li key={index} className="flex">
                          <span className="font-medium text-purple-600 mr-2">{item.symbol}:</span>
                          <span className="text-gray-700">{item.meaning}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h4 className="text-lg font-medium text-purple-600 mb-2">Reflection</h4>
                    <p className="text-gray-700">{selectedDream.analysis.reflection}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6 text-center h-64 flex flex-col items-center justify-center">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a Dream</h3>
                <p className="text-gray-600">
                  Click on a dream from your journal to view its details and analysis.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Journal;