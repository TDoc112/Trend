# summarizer.py
import requests

def summarize_text(text, api_key):
    API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
    headers = {"Authorization": f"Bearer {api_key}"}

    def query(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.json()
    
    # Truncate text if it's too long
    max_length = 1024
    if len(text) > max_length:
        text = text[:max_length]

    output = query({
        "inputs": text,
        "parameters": {"max_length": 100, "min_length": 30}
    })

    return output[0]['summary_text']
