import { Emotion, DreamAnalysis } from '../types';

// Common dream symbols and their general meanings
const dreamSymbols = [
  { symbol: 'Water', meaning: 'Emotions, unconscious mind, or purification' },
  { symbol: 'Flying', meaning: 'Freedom, escaping limitations, or transcending difficulties' },
  { symbol: 'Falling', meaning: 'Insecurity, anxiety, or loss of control' },
  { symbol: 'Teeth', meaning: 'Anxiety, self-image, or concern about appearance' },
  { symbol: 'Death', meaning: 'End of something, transformation, or rebirth' },
  { symbol: 'House', meaning: 'Sense of self, personality aspects, or life situation' },
  { symbol: 'Animals', meaning: 'Instinctual nature, specific traits, or qualities' },
  { symbol: 'Chase', meaning: 'Avoiding an issue or person, anxiety, or fear' },
  { symbol: 'Naked', meaning: 'Vulnerability, exposure, or authenticity' },
  { symbol: 'Forest', meaning: 'Unconscious mind, unknown territory, or life journey' },
  { symbol: 'Mountain', meaning: 'Challenge, achievement, or obstacle to overcome' },
  { symbol: 'Bridge', meaning: 'Transition, connection, or crossing into a new phase' },
  { symbol: 'Door', meaning: 'Opportunity, transition, or access to new aspects of self' },
  { symbol: 'Key', meaning: 'Access, solution, or unlocking hidden knowledge' },
  { symbol: 'Car', meaning: 'Direction in life, personal journey, or control' },
  { symbol: 'Baby', meaning: 'New beginning, vulnerability, or aspect of self' },
  { symbol: 'School', meaning: 'Learning, evaluation, or personal development' },
  { symbol: 'Food', meaning: 'Nourishment, knowledge, or fulfillment of needs' },
  { symbol: 'Clock', meaning: 'Pressure, time awareness, or life transitions' },
  { symbol: 'Money', meaning: 'Self-worth, value, or energy exchange' }
];

// Extract key words from text
const extractKeywords = (text: string): string[] => {
  const keywords = [
    'water', 'ocean', 'river', 'lake', 'rain',
    'fly', 'flying', 'float', 'soaring',
    'fall', 'falling', 'dropped',
    'teeth', 'tooth', 'bite', 'chew',
    'die', 'death', 'dead', 'dying',
    'house', 'home', 'building', 'room',
    'animal', 'dog', 'cat', 'bird', 'snake', 'wolf',
    'chase', 'run', 'escape', 'pursue',
    'naked', 'clothes', 'undressed',
    'forest', 'woods', 'trees', 'jungle',
    'mountain', 'climb', 'hill', 'peak',
    'bridge', 'crossing', 'connect',
    'door', 'gate', 'entrance', 'exit',
    'key', 'lock', 'unlock',
    'car', 'vehicle', 'drive', 'road',
    'baby', 'child', 'infant',
    'school', 'class', 'test', 'exam',
    'food', 'eat', 'meal', 'hungry',
    'clock', 'time', 'watch', 'late',
    'money', 'wealth', 'cash', 'coin'
  ];

  return keywords.filter(keyword => 
    text.toLowerCase().includes(keyword)
  );
};

// Map keywords to symbols
const mapKeywordsToSymbols = (keywords: string[]): { symbol: string; meaning: string }[] => {
  const symbolMap: { [key: string]: { symbol: string; meaning: string } } = {
    'water': dreamSymbols[0],
    'ocean': dreamSymbols[0],
    'river': dreamSymbols[0],
    'lake': dreamSymbols[0],
    'rain': dreamSymbols[0],
    'fly': dreamSymbols[1],
    'flying': dreamSymbols[1],
    'float': dreamSymbols[1],
    'soaring': dreamSymbols[1],
    'fall': dreamSymbols[2],
    'falling': dreamSymbols[2],
    'dropped': dreamSymbols[2],
    'teeth': dreamSymbols[3],
    'tooth': dreamSymbols[3],
    'bite': dreamSymbols[3],
    'chew': dreamSymbols[3],
    'die': dreamSymbols[4],
    'death': dreamSymbols[4],
    'dead': dreamSymbols[4],
    'dying': dreamSymbols[4],
    'house': dreamSymbols[5],
    'home': dreamSymbols[5],
    'building': dreamSymbols[5],
    'room': dreamSymbols[5],
    'animal': dreamSymbols[6],
    'dog': dreamSymbols[6],
    'cat': dreamSymbols[6],
    'bird': dreamSymbols[6],
    'snake': dreamSymbols[6],
    'wolf': dreamSymbols[6],
    'chase': dreamSymbols[7],
    'run': dreamSymbols[7],
    'escape': dreamSymbols[7],
    'pursue': dreamSymbols[7],
    'naked': dreamSymbols[8],
    'clothes': dreamSymbols[8],
    'undressed': dreamSymbols[8],
    'forest': dreamSymbols[9],
    'woods': dreamSymbols[9],
    'trees': dreamSymbols[9],
    'jungle': dreamSymbols[9],
    'mountain': dreamSymbols[10],
    'climb': dreamSymbols[10],
    'hill': dreamSymbols[10],
    'peak': dreamSymbols[10],
    'bridge': dreamSymbols[11],
    'crossing': dreamSymbols[11],
    'connect': dreamSymbols[11],
    'door': dreamSymbols[12],
    'gate': dreamSymbols[12],
    'entrance': dreamSymbols[12],
    'exit': dreamSymbols[12],
    'key': dreamSymbols[13],
    'lock': dreamSymbols[13],
    'unlock': dreamSymbols[13],
    'car': dreamSymbols[14],
    'vehicle': dreamSymbols[14],
    'drive': dreamSymbols[14],
    'road': dreamSymbols[14],
    'baby': dreamSymbols[15],
    'child': dreamSymbols[15],
    'infant': dreamSymbols[15],
    'school': dreamSymbols[16],
    'class': dreamSymbols[16],
    'test': dreamSymbols[16],
    'exam': dreamSymbols[16],
    'food': dreamSymbols[17],
    'eat': dreamSymbols[17],
    'meal': dreamSymbols[17],
    'hungry': dreamSymbols[17],
    'clock': dreamSymbols[18],
    'time': dreamSymbols[18],
    'watch': dreamSymbols[18],
    'late': dreamSymbols[18],
    'money': dreamSymbols[19],
    'wealth': dreamSymbols[19],
    'cash': dreamSymbols[19],
    'coin': dreamSymbols[19]
  };

  const foundSymbols: { [key: string]: { symbol: string; meaning: string } } = {};
  
  keywords.forEach(keyword => {
    if (symbolMap[keyword]) {
      foundSymbols[symbolMap[keyword].symbol] = symbolMap[keyword];
    }
  });
  
  // Get unique symbols
  return Object.values(foundSymbols);
};

// Generate reflections based on emotions
const generateReflection = (emotions: Emotion[]): string => {
  const reflections = {
    'Happiness': [
      'Your dream reflects inner contentment and positive energy. Consider what brings you joy in waking life.',
      'This positive dream may indicate a period of fulfillment. Embrace these feelings and carry them forward.',
      "The happiness in your dream suggests you're in a good place emotionally or anticipating positive change."
    ],
    'Fear': [
      'This dream may be revealing anxieties that need addressing. What specifically triggered your fear?',
      'Fear in dreams often highlights areas where you feel vulnerable. Consider what you\'re avoiding in waking life.',
      'Your subconscious might be processing stress or preparing you for challenges ahead.'
    ],
    'Sadness': [
      'The sadness in your dream may represent unprocessed grief or emotion that needs acknowledgment.',
      'Consider what losses or disappointments you might still be processing in your waking life.',
      'This dream could be offering you a safe space to experience emotions you might suppress when awake.'
    ],
    'Anger': [
      'Your dream anger may point to frustrations or boundaries being crossed in your waking life.',
      'Consider what situations or relationships might be causing repressed frustration or resentment.',
      'This dream could be encouraging you to assert yourself more effectively in certain situations.'
    ],
    'Peace': [
      'The peaceful elements in your dream suggest inner harmony and balance in your emotional life.',
      'This dream may be reflecting your desire for tranquility or appreciation of calm moments.',
      "Your subconscious may be showing you that you've resolved certain conflicts or found acceptance."
    ],
    'Confusion': [
      "The confusion in your dream might mirror uncertainty you're experiencing in waking life.",
      'Consider what decisions or situations currently feel unclear or overwhelming to you.',
      'This dream may be encouraging you to seek clarity or accept that some things remain unknowable for now.'
    ]
  };

  // Select random reflections for each emotion
  const selectedReflections = emotions.map(emotion => {
    const options = reflections[emotion];
    return options[Math.floor(Math.random() * options.length)];
  });

  return selectedReflections.join(' ');
};

// Generate dream interpretation based on emotions and keywords
const generateInterpretation = (dreamText: string, emotions: Emotion[], symbols: { symbol: string; meaning: string }[]): string => {
  // Base interpretations for emotion combinations
  const emotionInterpretations: { [key: string]: string[] } = {
    'Happiness': [
      'Your dream reflects a period of joy and fulfillment in your life.',
      'This positive dream suggests you feel optimistic about your current path.',
      'The happiness in your dream indicates satisfaction with recent developments.'
    ],
    'Fear': [
      'This dream suggests you may be processing anxiety or concern about something in your waking life.',
      'Your subconscious might be working through fears or preparing you for challenges.',
      'The fearful elements of this dream could represent unaddressed worries.'
    ],
    'Sadness': [
      'Your dream reflects emotional processing, perhaps of recent disappointments or losses.',
      'This dream suggests you may need time to acknowledge and work through certain emotions.',
      'The sadness in your dream might represent unresolved feelings seeking expression.'
    ],
    'Anger': [
      'This dream suggests frustration or resentment that may need addressing.',
      'Your subconscious might be processing situations where you feel wronged or restricted.',
      'The anger in your dream could represent boundaries being crossed or needs not being met.'
    ],
    'Peace': [
      'Your dream reflects a state of inner harmony and acceptance.',
      'This peaceful dream suggests you\'re finding balance or have resolved certain conflicts.',
      'The tranquility in your dream indicates a period of emotional stability.'
    ],
    'Confusion': [
      'This dream suggests you\'re processing uncertainty or complexity in your life.',
      'Your subconscious might be working through ambiguous situations or feelings.',
      'The confusion in your dream could represent the need for clarity in some aspect of your life.'
    ],
    'Happiness,Fear': [
      'Your dream suggests mixed emotions - perhaps excitement about something new alongside anxiety about the unknown.',
      'This dream reflects a situation bringing both joy and apprehension.'
    ],
    'Happiness,Sadness': [
      'Your dream reflects bittersweetness, perhaps remembering good times during a difficult period.',
      'This dream suggests you may be experiencing both joy and loss simultaneously.'
    ],
    'Happiness,Anger': [
      'Your dream suggests a situation bringing satisfaction but also frustration about certain aspects.',
      'This dream reflects ambivalence - perhaps enjoyment of something while resenting restrictions.'
    ],
    'Happiness,Peace': [
      'Your dream reflects deep contentment and well-being.',
      'This dream suggests you\'re experiencing harmony between your desires and reality.'
    ],
    'Happiness,Confusion': [
      'Your dream suggests excitement about possibilities but uncertainty about direction.',
      'This dream reflects the sometimes disorienting nature of positive changes.'
    ],
    'Fear,Sadness': [
      'Your dream suggests anxiety about loss or anticipatory grief.',
      'This dream reflects deep vulnerability or concern about emotional pain.'
    ],
    'Fear,Anger': [
      'Your dream suggests feeling threatened and responding with defensive energy.',
      'This dream reflects a fight-or-flight response to perceived dangers.'
    ],
    'Fear,Peace': [
      'Your dream suggests finding calm amid anxiety, perhaps learning to accept uncertainty.',
      'This dream reflects the contrast between external concerns and inner resilience.'
    ],
    'Fear,Confusion': [
      'Your dream suggests disorientation in the face of threatening or unpredictable circumstances.',
      'This dream reflects feeling overwhelmed by complexity or uncertainty in a concerning situation.'
    ],
    'Sadness,Anger': [
      'Your dream suggests grief mixed with frustration, perhaps about circumstances beyond your control.',
      'This dream reflects the complex emotions that often accompany loss or disappointment.'
    ],
    'Sadness,Peace': [
      'Your dream suggests moving towards acceptance of difficult emotions or situations.',
      'This dream reflects finding tranquility even amid sorrow - a healing process.'
    ],
    'Sadness,Confusion': [
      'Your dream suggests struggling to make sense of emotional pain or loss.',
      'This dream reflects the disorienting nature of grief or disappointment.'
    ],
    'Anger,Peace': [
      'Your dream suggests moving from frustration towards resolution or acceptance.',
      'This dream reflects the contrast between external irritations and inner calm.'
    ],
    'Anger,Confusion': [
      'Your dream suggests frustration about unclear situations or mixed messages.',
      'This dream reflects feeling provoked but uncertain about the appropriate response.'
    ],
    'Peace,Confusion': [
      'Your dream suggests accepting uncertainty or finding calm amid complexity.',
      'This dream reflects the contrast between not knowing and being at peace with not knowing.'
    ]
  };

  // Create emotion key for lookup
  const emotionKey = emotions.sort().join(',');
  
  // Get base interpretation
  let baseInterpretations;
  if (emotionInterpretations[emotionKey]) {
    baseInterpretations = emotionInterpretations[emotionKey];
  } else if (emotions.length > 2) {
    // For 3 emotions, just use the first two for simplicity
    const simplifiedKey = emotions.slice(0, 2).sort().join(',');
    baseInterpretations = emotionInterpretations[simplifiedKey] || 
                          emotionInterpretations[emotions[0]] || 
                          emotionInterpretations['Confusion'];
  } else {
    baseInterpretations = emotionInterpretations[emotions[0]] || 
                          emotionInterpretations['Confusion'];
  }
  
  // Select random base interpretation
  const baseInterpretation = baseInterpretations[Math.floor(Math.random() * baseInterpretations.length)];
  
  // Add symbol-specific interpretations
  let symbolInterpretations = '';
  
  if (symbols.length > 0) {
    // Select up to 3 symbols to mention
    const selectedSymbols = symbols.slice(0, 3);
    
    const symbolStatements = selectedSymbols.map(symbol => {
      const statements = [
        `The presence of ${symbol.symbol.toLowerCase()} in your dream may represent ${symbol.meaning.toLowerCase()}.`,
        `${symbol.symbol} appearing in your dream often symbolizes ${symbol.meaning.toLowerCase()}.`,
        `Your dream features ${symbol.symbol.toLowerCase()}, which typically relates to ${symbol.meaning.toLowerCase()} in dream symbolism.`
      ];
      return statements[Math.floor(Math.random() * statements.length)];
    });
    
    symbolInterpretations = ' ' + symbolStatements.join(' ');
  }
  
  // Additional personalized touch
  const conclusions = [
    'Consider how this dream might reflect your current life circumstances.',
    'Reflect on how these dream elements might connect to your waking experiences.',
    'Think about what aspects of this dream feel most significant to you personally.',
    'Pay attention to how this dream made you feel upon waking, as this can provide additional insight.'
  ];
  
  const conclusion = ' ' + conclusions[Math.floor(Math.random() * conclusions.length)];
  
  // Combine all parts
  return baseInterpretation + symbolInterpretations + conclusion;
};

// Main function to generate dream analysis
export const generateDreamAnalysis = (dreamText: string, emotions: Emotion[]): DreamAnalysis => {
  // Extract keywords from dream description
  const keywords = extractKeywords(dreamText);
  
  // Map keywords to symbols
  let symbols = mapKeywordsToSymbols(keywords);
  
  // If no symbols found, provide some generic ones
  if (symbols.length === 0) {
    // Select 2-3 random symbols
    const randomSymbols = [...dreamSymbols]
      .sort(() => 0.5 - Math.random())
      .slice(0, 2 + Math.floor(Math.random() * 2));
    
    symbols = randomSymbols;
  }
  
  // Generate interpretation
  const interpretation = generateInterpretation(dreamText, emotions, symbols);
  
  // Generate reflection
  const reflection = generateReflection(emotions);
  
  return {
    interpretation,
    symbols,
    reflection
  };
};