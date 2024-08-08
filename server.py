from flask import Flask, render_template, request, jsonify
from article_fetcher import fetch_article
from summarizer import summarize_text
import os

app = Flask(__name__)

HUGGINGFACE_API_KEY = os.environ.get("HUGGINGFACE_API_KEY")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/fetch_and_summarize', methods=['POST'])
def fetch_and_summarize():
    url = request.json['url']
    article = fetch_article(url)
    if article:
        summary = summarize_text(article, HUGGINGFACE_API_KEY)
        return jsonify({'summary': summary})
    else:
        return jsonify({'error': 'Failed to fetch the article'}), 400

if __name__ == '__main__':
    app.run(debug=True)
