document.getElementById('urlForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = document.getElementById('urlInput').value;
    const summaryArea = document.getElementById('summaryArea');
    summaryArea.innerHTML = 'Fetching and summarizing...';

    try {
        // Replace 'YOUR_API_ENDPOINT' with the actual endpoint of your API
        const response = await fetch('YOUR_API_ENDPOINT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // If your API requires an API key, include it here
                // 'Authorization': 'Bearer YOUR_API_KEY'
            },
            body: JSON.stringify({ url }),
        });
        const data = await response.json();
        if (response.ok) {
            summaryArea.innerHTML = `<h2>Summary:</h2><p>${data.summary}</p>`;
        } else {
            summaryArea.innerHTML = `<p>Error: ${data.error || 'Failed to summarize article'}</p>`;
        }
    } catch (error) {
        summaryArea.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
