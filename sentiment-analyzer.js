// sentiment-analyzer.js
// This file contains all the logic for the sentiment analysis tool

// Enhanced lexicons
const positiveWords = [
    'good', 'great', 'excellent', 'wonderful', 'fantastic', 'amazing', 'happy', 'love', 'like', 
    'best', 'beautiful', 'perfect', 'joy', 'excited', 'brilliant', 'positive', 'awesome', 
    'enjoy', 'pleased', 'delighted', 'superior', 'recommend', 'outstanding', 'superb',
    'pleasant', 'impressive', 'exceptional', 'favorable', 'nice', 'satisfactory', 'satisfied',
    'impressive', 'admirable', 'efficient', 'beneficial', 'successful', 'helpful', 'impressed',
    'innovative', 'valuable', 'convenient', 'reliable', 'user-friendly', 'effective'
  ];
  
  const negativeWords = [
    'bad', 'terrible', 'awful', 'horrible', 'worst', 'poor', 'hate', 'dislike', 'negative',
    'disappointed', 'sad', 'angry', 'annoyed', 'unhappy', 'failure', 'useless',
    'trouble', 'problem', 'difficult', 'inferior', 'avoid', 'mediocre', 'frustrating',
    'disappointing', 'broken', 'faulty', 'defective', 'unreliable', 'slow', 'expensive',
    'complicated', 'inconvenient', 'ineffective', 'confusing', 'inadequate', 'buggy',
    'overpriced', 'waste', 'misleading', 'fails', 'irritating', 'unpleasant'
  ];
  
  // Intensity modifiers - words that strengthen or weaken sentiment
  const intensifiers = {
    'very': 1.5,
    'extremely': 2,
    'incredibly': 2,
    'really': 1.3,
    'so': 1.3,
    'absolutely': 1.8,
    'completely': 1.5,
    'totally': 1.5,
    'utterly': 1.8,
    'quite': 1.2,
    'somewhat': 0.7,
    'slightly': 0.5,
    'a bit': 0.6,
    'hardly': 0.3,
    'barely': 0.3,
    'not': -1,
    "n't": -1,
    'never': -1
  };
  
  // Negation words that flip sentiment
  const negationWords = ['not', "n't", 'no', 'never', 'neither', 'nor', 'hardly', 'barely'];
  
  // Function to check if a word is preceded by a negation within a reasonable window
  function isNegated(words, currentIndex) {
    const lookbackWindow = 3; // Check up to 3 words back
    for (let i = Math.max(0, currentIndex - lookbackWindow); i < currentIndex; i++) {
      if (negationWords.includes(words[i])) {
        return true;
      }
    }
    return false;
  }
  
  // Function to analyze sentiment of a single sentence
  function analyzeSentenceSentiment(sentence) {
    const lowerSentence = sentence.toLowerCase();
    const words = lowerSentence.match(/\b\w+(?:'t)?\b/g) || [];
    
    let positiveScore = 0;
    let negativeScore = 0;
    
    words.forEach((word, index) => {
      let isNegated_ = isNegated(words, index);
      
      if (positiveWords.includes(word)) {
        if (!isNegated_) positiveScore++;
        else negativeScore++;
      } else if (negativeWords.includes(word)) {
        if (!isNegated_) negativeScore++;
        else positiveScore++;
      }
      
      // Check for intensifiers
      if (index > 0) {
        const prevWord = words[index - 1];
        if (intensifiers[prevWord] && (positiveWords.includes(word) || negativeWords.includes(word))) {
          if (positiveWords.includes(word) && !isNegated_) {
            positiveScore += (intensifiers[prevWord] - 1);
          } else if (negativeWords.includes(word) && !isNegated_) {
            negativeScore += (intensifiers[prevWord] - 1);
          }
        }
      }
    });
    
    const totalScore = (positiveScore - negativeScore) / (words.length || 1);
    const normalizedScore = Math.max(-1, Math.min(1, totalScore * 3));
    
    let sentiment;
    if (normalizedScore > 0.05) sentiment = 'positive';
    else if (normalizedScore < -0.05) sentiment = 'negative';
    else sentiment = 'neutral';
    
    return {
      score: parseFloat(normalizedScore.toFixed(2)),
      sentiment
    };
  }
  
  // Main function to analyze sentiment
  function analyzeSentiment(text) {
    if (!text) return { score: 0, sentiment: 'neutral', analysis: {} };
    
    const lowerText = text.toLowerCase();
    const words = lowerText.match(/\b\w+(?:'t)?\b/g) || [];
    
    let positiveScore = 0;
    let negativeScore = 0;
    
    const analysis = {
      positiveWords: [],
      negativeWords: [],
      wordCount: words.length,
      sentences: text.split(/[.!?]+/).filter(s => s.trim().length > 0).length,
      sentenceSentiments: []
    };
    
    // Analyze each word considering context
    words.forEach((word, index) => {
      let sentimentValue = 0;
      let isNegated_ = isNegated(words, index);
      
      // Check if word is positive or negative
      if (positiveWords.includes(word)) {
        sentimentValue = 1;
        if (!isNegated_) {
          positiveScore++;
          analysis.positiveWords.push(word);
        } else {
          negativeScore++;
          analysis.negativeWords.push(`not ${word}`);
        }
      } else if (negativeWords.includes(word)) {
        sentimentValue = -1;
        if (!isNegated_) {
          negativeScore++;
          analysis.negativeWords.push(word);
        } else {
          positiveScore++;
          analysis.positiveWords.push(`not ${word}`);
        }
      }
      
      // Check for intensifiers
      if (index > 0 && sentimentValue !== 0) {
        const prevWord = words[index - 1];
        if (intensifiers[prevWord]) {
          if (sentimentValue > 0) {
            positiveScore += (intensifiers[prevWord] - 1); // Add the extra intensity
          } else {
            negativeScore += (intensifiers[prevWord] - 1); // Add the extra intensity
          }
        }
      }
    });
    
    // Analyze sentences
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    sentences.forEach(sentence => {
      const sentenceAnalysis = analyzeSentenceSentiment(sentence);
      analysis.sentenceSentiments.push({
        sentence,
        sentiment: sentenceAnalysis.sentiment,
        score: sentenceAnalysis.score
      });
    });
    
    // Calculate overall score (-1 to 1)
    const totalScore = (positiveScore - negativeScore) / (words.length || 1);
    const normalizedScore = Math.max(-1, Math.min(1, totalScore * 3)); // Scale the score
    
    // Determine sentiment category
    let sentiment;
    if (normalizedScore > 0.05) sentiment = 'positive';
    else if (normalizedScore < -0.05) sentiment = 'negative';
    else sentiment = 'neutral';
    
    // Add percentages for better understanding
    analysis.positivity = ((positiveScore / words.length) * 100).toFixed(1) + '%';
    analysis.negativity = ((negativeScore / words.length) * 100).toFixed(1) + '%';
    
    return {
      score: parseFloat(normalizedScore.toFixed(2)),
      sentiment,
      analysis
    };
  }
  
  // Color functions for UI
  function getScoreColor(score) {
    if (score > 0) return `rgba(0, 128, 0, ${Math.min(1, Math.abs(score) + 0.2)})`;
    if (score < 0) return `rgba(220, 0, 0, ${Math.min(1, Math.abs(score) + 0.2)})`;
    return 'rgba(128, 128, 128, 0.6)';
  }
  
  function getSentimentIcon(sentiment) {
    switch (sentiment) {
      case 'positive': return '😃';
      case 'negative': return '😞';
      default: return '😐';
    }
  }
  
  // Event listeners and UI handling
  document.addEventListener('DOMContentLoaded', function() {
    const textArea = document.getElementById('text-input');
    const analyzeButton = document.getElementById('analyze-button');
    const resultContainer = document.getElementById('result-container');
    const examplesContainer = document.getElementById('examples-container');
    
    // Define example texts
    const examples = [
      "I really love this product! It's amazing and works perfectly.",
      "This is the worst experience I've ever had. Terrible customer service.",
      "The product arrived on time. It works as described.",
      "While the design is nice, the quality is quite poor and it broke after a week.",
      "I have mixed feelings about this. Some features are great but others need improvement."
    ];
    
    // Create example buttons
    examples.forEach((example, index) => {
      const button = document.createElement('button');
      button.textContent = `Example ${index + 1}`;
      button.className = 'example-button';
      button.addEventListener('click', () => {
        textArea.value = example;
        performAnalysis(example);
      });
      examplesContainer.appendChild(button);
    });
    
    // Handle analyze button click
    analyzeButton.addEventListener('click', () => {
      const text = textArea.value.trim();
      if (text) {
        performAnalysis(text);
      }
    });
    
    // Function to perform analysis and update UI
    function performAnalysis(text) {
      const result = analyzeSentiment(text);
      
      // Update UI with result
      resultContainer.innerHTML = `
        <h2>Analysis Results</h2>
        
        <!-- Overall sentiment -->
        <div class="sentiment-overview">
          <div class="sentiment-icon" style="background-color: ${getScoreColor(result.score)}">
            ${getSentimentIcon(result.sentiment)}
          </div>
          <div class="sentiment-summary">
            <div class="sentiment-label">${result.sentiment.charAt(0).toUpperCase() + result.sentiment.slice(1)} Sentiment</div>
            <div class="sentiment-score">Score: ${result.score} 
              (${result.score > 0 ? 'Positive' : result.score < 0 ? 'Negative' : 'Neutral'})
            </div>
          </div>
        </div>
        
        <!-- Statistics -->
        <div class="stats-grid">
          <div class="stat-box">
            <div class="stat-label">Positive Words</div>
            <div class="stat-value">${result.analysis.positiveWords.length}</div>
            <div class="stat-subtext">(${result.analysis.positivity})</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Negative Words</div>
            <div class="stat-value">${result.analysis.negativeWords.length}</div>
            <div class="stat-subtext">(${result.analysis.negativity})</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Word Count</div>
            <div class="stat-value">${result.analysis.wordCount}</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Sentence Count</div>
            <div class="stat-value">${result.analysis.sentences}</div>
          </div>
        </div>
        
        <!-- Word highlights -->
        <div class="word-highlights">
          <h3>Sentiment Words Found:</h3>
          <div class="tags-container">
            ${result.analysis.positiveWords.map(word => 
              `<span class="tag positive-tag">${word}</span>`
            ).join('')}
            ${result.analysis.negativeWords.map(word => 
              `<span class="tag negative-tag">${word}</span>`
            ).join('')}
            ${result.analysis.positiveWords.length === 0 && result.analysis.negativeWords.length === 0 ? 
              '<span class="no-words">No sentiment words detected</span>' : ''}
          </div>
        </div>
        
        <!-- Sentence-by-sentence analysis -->
        <div class="sentence-analysis">
          <h3>Sentence Analysis:</h3>
          ${result.analysis.sentenceSentiments.map(item => `
            <div class="sentence-item" style="border-color: ${getScoreColor(item.score)}">
              <div class="sentence-content">
                <span class="sentence-icon">${getSentimentIcon(item.sentiment)}</span>
                <span>${item.sentence}</span>
              </div>
              <div class="sentence-score">
                Score: ${item.score} (${item.sentiment})
              </div>
            </div>
          `).join('')}
        </div>
      `;
      
      resultContainer.style.display = 'block';
    }
  });