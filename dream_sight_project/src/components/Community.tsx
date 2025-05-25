import React, { useState } from 'react';
import { DreamEntry, Comment } from '../types';
import { Heart, MessageSquare, Calendar } from 'lucide-react';

interface CommunityProps {
  sharedDreams: DreamEntry[];
  onShareDream: () => void;
}

const Community: React.FC<CommunityProps> = ({ sharedDreams, onShareDream }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const [expandedDream, setExpandedDream] = useState<string | null>(null);

  const handleLike = (dreamId: string) => {
    setLikes({
      ...likes,
      [dreamId]: !likes[dreamId]
    });
  };

  const handleAddComment = (dreamId: string) => {
    if (!commentText[dreamId]?.trim()) return;
    
    const newComment: Comment = {
      id: Date.now().toString(),
      dreamId,
      text: commentText[dreamId],
      author: 'Anonymous User',
      date: new Date()
    };
    
    setComments([...comments, newComment]);
    setCommentText({
      ...commentText,
      [dreamId]: ''
    });
  };

  const toggleExpandDream = (dreamId: string) => {
    setExpandedDream(expandedDream === dreamId ? null : dreamId);
  };

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
        className={`${colors[emotion]} text-xs px-2 py-1 rounded-full text-white mr-2 text-xs`}
      >
        {emotion}
      </span>
    ));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Dream Community</h2>
        <p className="text-gray-700">
          Explore dreams shared by the community. Interact with others by liking and commenting on their dream experiences.
        </p>
      </div>

      {sharedDreams.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Dreams Shared Yet</h3>
          <p className="text-gray-600 mb-4">
            Be the first to share your dream with the community!
          </p>
          <button 
            onClick={onShareDream}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-all"
          >
            Share Your Dream
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {sharedDreams.map((dream) => (
            <div key={dream.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white font-bold">
                      {dream.id.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <div className="text-gray-800 font-medium">Anonymous Dreamer</div>
                      <div className="text-gray-500 text-sm flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(dream.date)}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {getEmotionBadges(dream.emotions)}
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-800 mb-2">
                    {dream.description.length > 150 && expandedDream !== dream.id
                      ? `${dream.description.slice(0, 150)}...`
                      : dream.description}
                  </p>
                  {dream.description.length > 150 && (
                    <button 
                      onClick={() => toggleExpandDream(dream.id)} 
                      className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                    >
                      {expandedDream === dream.id ? 'Read less' : 'Read more'}
                    </button>
                  )}
                </div>
                
                {expandedDream === dream.id && dream.analysis && (
                  <div className="bg-purple-50 p-4 rounded-md mb-4">
                    <h4 className="text-lg font-medium text-purple-700 mb-2">Dream Analysis</h4>
                    <p className="text-gray-700 mb-3">{dream.analysis.interpretation}</p>
                    <h5 className="text-sm font-medium text-purple-600">Key Symbols</h5>
                    <ul className="mb-2">
                      {dream.analysis.symbols.slice(0, 3).map((symbol, index) => (
                        <li key={index} className="text-sm text-gray-700">
                          <span className="font-medium">{symbol.symbol}:</span> {symbol.meaning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex items-center space-x-4 text-gray-600">
                  <button 
                    onClick={() => handleLike(dream.id)}
                    className={`flex items-center hover:text-purple-700 transition-colors ${likes[dream.id] ? 'text-purple-600' : ''}`}
                  >
                    <Heart className={`w-5 h-5 mr-1 ${likes[dream.id] ? 'fill-current' : ''}`} />
                    <span>{likes[dream.id] ? 'Liked' : 'Like'}</span>
                  </button>
                  
                  <button 
                    onClick={() => toggleExpandDream(dream.id)}
                    className="flex items-center hover:text-purple-700 transition-colors"
                  >
                    <MessageSquare className="w-5 h-5 mr-1" />
                    <span>Comment</span>
                  </button>
                </div>
              </div>
              
              {expandedDream === dream.id && (
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <div className="space-y-3 mb-4">
                    {comments
                      .filter(comment => comment.dreamId === dream.id)
                      .map(comment => (
                        <div key={comment.id} className="bg-white p-3 rounded-md shadow-sm">
                          <div className="flex justify-between items-center mb-1">
                            <p className="font-medium text-gray-800">{comment.author}</p>
                            <p className="text-xs text-gray-500">{formatDate(comment.date)}</p>
                          </div>
                          <p className="text-gray-700">{comment.text}</p>
                        </div>
                      ))}
                  </div>
                  
                  <div className="flex">
                    <input
                      type="text"
                      value={commentText[dream.id] || ''}
                      onChange={(e) => setCommentText({
                        ...commentText,
                        [dream.id]: e.target.value
                      })}
                      placeholder="Add a comment..."
                      className="flex-grow p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => handleAddComment(dream.id)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-r-md transition-all"
                    >
                      Post
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Community;