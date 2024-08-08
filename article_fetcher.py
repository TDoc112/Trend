# article_fetcher.py
import requests
from bs4 import BeautifulSoup

def fetch_article(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # This is a simple extraction and might need to be adjusted based on the website structure
        article = ' '.join([p.text for p in soup.find_all('p')])
        
        return article
    except Exception as e:
        print(f"Error fetching article: {e}")
        return None
