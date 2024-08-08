# main.py
from article_fetcher import fetch_article
from summarizer import summarize_text
import os

# Replace with your actual Hugging Face API key
HUGGINGFACE_API_KEY = os.environ.get("HUGGINGFACE_API_KEY")

def main():
    url = input("Enter the URL of the article you want to summarize: ")
    
    article = fetch_article(url)
    if article:
        summary = summarize_text(article, HUGGINGFACE_API_KEY)
        print("\nSummary:")
        print(summary)
    else:
        print("Failed to fetch the article.")

if __name__ == "__main__":
    main()
