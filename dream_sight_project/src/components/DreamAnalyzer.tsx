import React, { useState } from 'react';
import { Emotion, DreamEntry, DreamAnalysis } from '../types';
import { generateDreamAnalysis } from '../utils/dreamAnalysis';

interface DreamAnalyzerProps {
  onSaveDream: (dream: DreamEntry) => void;
}

const DreamAnalyzer: React.FC<DreamAnalyzerProps> = ({ onSaveDream }) => {
  const [dreamDescription, setDreamDescription] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState<Emotion[]>([]);
  const [isShared, setIsShared] = useState(false);
  const [analysis, setAnalysis] = useState<DreamAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const emotions: Emotion[] = ['Happiness', 'Fear', 'Sadness', 'Anger', 'Peace', 'Confusion'];

  const toggleEmotion = (emotion: Emotion) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter(e => e !== emotion));
    } else if (selectedEmotions.length < 3) {
      setSelectedEmotions([...selectedEmotions, emotion]);
    }
  };

  const handleAnalyzeDream = async () => {
    if (!dreamDescription.trim() || selectedEmotions.length === 0) {
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const dreamAnalysis = generateDreamAnalysis(dreamDescription, selectedEmotions);
      setAnalysis(dreamAnalysis);
      
      const newDream: DreamEntry = {
        id: Date.now().toString(),
        description: dreamDescription,
        emotions: selectedEmotions,
        date: new Date(),
        isShared,
        analysis: dreamAnalysis
      };
      
      onSaveDream(newDream);
      setIsAnalyzing(false);
    }, 1500);
  };

  const getEmotionColor = (emotion: Emotion) => {
    const colors = {
      'Happiness': 'bg-yellow-500 hover:bg-yellow-400',
      'Fear': 'bg-red-500 hover:bg-red-400',
      'Sadness': 'bg-blue-500 hover:bg-blue-400',
      'Anger': 'bg-orange-500 hover:bg-orange-400',
      'Peace': 'bg-green-500 hover:bg-green-400',
      'Confusion': 'bg-purple-500 hover:bg-purple-400'
    };
    
    return colors[emotion];
  };

  const resetForm = () => {
    setDreamDescription('');
    setSelectedEmotions([]);
    setIsShared(false);
    setAnalysis(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Dream Analyzer</h2>
      
      {!analysis ? (
        <>
          <p className="text-gray-700 mb-6">
            Describe your dream in detail below and select the emotions you felt. Our AI will analyze it
            based on the emotional context and symbolism present.
          </p>
          
          <div className="mb-6">
            <label htmlFor="dreamDescription" className="block mb-2 font-medium text-gray-700">
              Describe your dream
            </label>
            <textarea
              id="dreamDescription"
              value={dreamDescription}
              onChange={(e) => setDreamDescription(e.target.value)}
              placeholder="I was walking through a forest when suddenly..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent min-h-[150px]"
              required
            />
          </div>
          
          <div className="mb-6">
            <p className="block mb-2 font-medium text-gray-700">
              What emotions did you feel in this dream? (Select up to 3)
            </p>
            <div className="flex flex-wrap gap-2">
              {emotions.map((emotion) => (
                <button
                  key={emotion}
                  onClick={() => toggleEmotion(emotion)}
                  className={`px-4 py-2 rounded-full text-white transition-all ${
                    selectedEmotions.includes(emotion)
                      ? `${getEmotionColor(emotion)} ring-2 ring-offset-2 ring-gray-400`
                      : `${getEmotionColor(emotion)} opacity-70`
                  }`}
                >
                  {emotion}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isShared}
                onChange={() => setIsShared(!isShared)}
                className="h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
              />
              <span className="ml-2 text-gray-700">Share this dream publicly in the community</span>
            </label>
          </div>
          
          <button
            onClick={handleAnalyzeDream}
            disabled={!dreamDescription.trim() || selectedEmotions.length === 0 || isAnalyzing}
            className={`w-full py-3 rounded-md text-white font-medium transition-all ${
              isAnalyzing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
          >
            {isAnalyzing ? 'Analyzing Dream...' : 'Analyze Dream'}
          </button>
        </>
      ) : (
        <div className="dream-analysis animate-fade-in">
          <div className="p-4 bg-purple-50 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-purple-700 mb-3">Dream Interpretation</h3>
            <p className="text-gray-700 mb-4">{analysis.interpretation}</p>
            
            <h4 className="text-lg font-medium text-purple-600 mb-2">Key Symbols</h4>
            <ul className="mb-4 space-y-2">
              {analysis.symbols.map((item, index) => (
                <li key={index} className="flex">
                  <span className="font-medium text-purple-600 mr-2">{item.symbol}:</span>
                  <span className="text-gray-700">{item.meaning}</span>
                </li>
              ))}
            </ul>
            
            <h4 className="text-lg font-medium text-purple-600 mb-2">Reflection</h4>
            <p className="text-gray-700">{analysis.reflection}</p>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedEmotions.map((emotion) => (
              <span
                key={emotion}
                className={`px-3 py-1 rounded-full text-white text-sm ${getEmotionColor(emotion)}`}
              >
                {emotion}
              </span>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={resetForm}
              className="flex-1 py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 font-medium transition-all"
            >
              New Dream
            </button>
            
            <button
              onClick={() => setAnalysis(null)}
              className="flex-1 py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md text-white font-medium transition-all"
            >
              Edit This Dream
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DreamAnalyzer;