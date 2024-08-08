document.getElementById('fetchButton').addEventListener('click', async () => {
    const summaryArea = document.getElementById('summaryArea');
    summaryArea.innerHTML = 'Fetching and summarizing...';

    try {
        // Replace this with your own list of popular sites
        const popularSites = [
            'https://www.bbc.com',
            'https://www.cnn.com',
            'https://www.nytimes.com',
            'https://www.theguardian.com',
            'https://www.wsj.com'
        ];

        const summaries = await Promise.all(popularSites.map(async (site) => {
            try {
                // First, fetch the article content
                const articleResponse = await fetch(site);
                const articleText = await articleResponse.text();

                // Then, use Hugging Face API for summarization
                const response = await fetch('https://api-inference.huggingface.co/models/t5-base', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
                    },
                    body: JSON.stringify({
                        inputs: articleText,
                        parameters: {
                            max_length: 100,
                            min_length: 30
                        }
                    }),
                });

                const data = await response.json();
                if (response.ok) {
                    return `<h2>${site}</h2><p>${data[0].summary_text}</p>`;
                } else {
                    return `<p>Error: ${data.error || 'Failed to summarize article'}</p>`;
                }
            } catch (error) {
                return `<p>Error: ${error.message}</p>`;
            }
        }));

        summaryArea.innerHTML = summaries.join('');
    } catch (error) {
        summaryArea.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
