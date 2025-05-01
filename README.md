# Sentiment Analysis Tool

A lightweight, browser-based text sentiment analysis tool that evaluates the emotional tone of written content. This project uses a lexicon-based approach with context awareness to determine whether text expresses positive, negative, or neutral sentiment.

![Sentiment Analysis Tool Screenshot] Click this ->
https://github.com/prakash-pg/sentiment-analysis-tool/issues/1#issue-3034021531



## Features

- **Real-time sentiment scoring** on a scale from -1 (negative) to +1 (positive)
- **Contextual analysis** that considers negations (e.g., "not good") and intensifiers (e.g., "very good")
- **Word-level breakdown** with highlighted positive and negative terms
- **Sentence-by-sentence analysis** for detailed emotional mapping of longer texts
- **Statistical overview** including word counts and sentiment distribution
- **Visual indicators** with emojis and color-coding for intuitive interpretation
- **Pre-loaded examples** for quick demonstration
- **Responsive design** that works on mobile and desktop devices

## How It Works

The tool uses a lexicon-based approach to sentiment analysis:

1. **Text Preprocessing**: Breaks input text into words and sentences
2. **Sentiment Detection**: Matches words against positive and negative lexicons
3. **Context Analysis**: Accounts for negations and intensifiers that modify sentiment
4. **Scoring Algorithm**: Calculates overall sentiment score based on positive/negative word ratios
5. **Results Visualization**: Presents sentiment analysis with intuitive color-coding and statistics

## Use Cases

- **Content Creators**: Evaluate the emotional tone of articles, blog posts, or social media content
- **Customer Service**: Analyze customer feedback and support requests
- **Marketing**: Assess the sentiment of marketing copy and campaign materials
- **Product Reviews**: Automatically detect customer satisfaction levels in reviews
- **Personal Writing**: Check the emotional impact of emails or messages before sending

## Getting Started

### Local Setup

1. Clone this repository:
```bash
git clone https://github.com/prakash-pg/sentiment-analysis-tool.git
```

2. Open the project folder:
```bash
cd sentiment-analysis-tool
```

3. Open `index.html` in your browser, or use a local server:
```bash
# If you have Python installed
python -m http.server

# If you have Node.js installed
npx serve
```

### Usage

1. Enter or paste text into the input area
2. Click "Analyze Sentiment" to process the text
3. View the detailed sentiment breakdown in the results section
4. Try the examples to see different sentiment patterns

## Technical Implementation

- **Pure HTML/CSS/JavaScript**: No external dependencies or frameworks
- **Responsive Design**: Works on different screen sizes
- **Lexicon-Based Analysis**: Uses curated lists of positive and negative words
- **Context-Aware Processing**: Handles negations and intensity modifiers

## Customization

You can easily extend this tool by:

- **Expanding the lexicons**: Add domain-specific positive/negative words in `sentiment-analyzer.js`
- **Adjusting sensitivity**: Modify the scoring algorithm weights
- **Adding languages**: Create lexicons for other languages
- **Enhancing visualization**: Customize the UI styling in `index.html`

## Future Improvements

- Machine learning integration for improved accuracy
- Support for multiple languages
- Export functionality for analysis results
- Theme switching (light/dark mode)
- Advanced emotion detection beyond positive/negative (e.g., anger, joy, sadness)

## Contributing

Contributions are welcome! Feel free to fork this repository and submit pull requests.

1. Fork the project
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by various sentiment analysis techniques in natural language processing
- Uses a curated lexicon derived from multiple sentiment resources
