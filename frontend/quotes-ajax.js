document.getElementById('add-quote-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const quoteText = document.getElementById('quote-text').value;
    const quoteTopic = document.getElementById('quote-topic').value;

    fetch('http://localhost:8080/api/quotes', {  // Обновленный URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: quoteText,
            topic: quoteTopic
        })
    })
    .then(response => response.json())
    .then(data => {
        alert('Quote added successfully');
        document.getElementById('quote-text').value = '';
        document.getElementById('quote-topic').value = '';
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('search-quote-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const searchTerm = document.getElementById('search-term').value;

    fetch(`http://localhost:8080/quotes/search?term=${searchTerm}`)  // Обновленный URL
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById('search-results');
        resultsDiv.innerHTML = ''; // очищаем предыдущие результаты

        if (data.length === 0) {
            resultsDiv.innerHTML = 'No quotes found';
        } else {
            data.forEach(quote => {
                const quoteElement = document.createElement('p');
                quoteElement.textContent = `${quote.text} - ${quote.topic}`;
                resultsDiv.appendChild(quoteElement);
            });
        }
    })
    .catch(error => console.error('Error:', error));
});
