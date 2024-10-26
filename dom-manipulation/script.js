const quoteDisplay = document.getElementById('quoteDisplay');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');

let quotes = [
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  // ... more quotes
];

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `"${randomQuote.text}"   
 - ${randomQuote.author}`;
}

function addQuote() {
  const newQuote = {
    text: newQuoteText.value,
    category: newQuoteCategory.value
  };
  quotes.push(newQuote);

  // Create a new div element to hold the quote
  const newQuoteDiv = document.createElement('div');

  // Create a p element for the quote text
  const quoteText = document.createElement('p');
  quoteText.innerHTML = `"${newQuote.text}"`;
  newQuoteDiv.appendChild(quoteText);

  // Create a p element for the author
  const quoteAuthor = document.createElement('p');
  quoteAuthor.textContent = `- ${newQuote.author}`;
  newQuoteDiv.appendChild(quoteAuthor);

  // Append the new div to the quoteDisplay
  quoteDisplay.appendChild(newQuoteDiv);

  newQuoteText.value = '';
  newQuoteCategory.value = '';
}

addQuoteBtn.addEventListener('click', addQuote);