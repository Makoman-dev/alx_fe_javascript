const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const addQuoteForm = document.getElementById('addQuoteForm');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');

let quotes = [
  { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
  // ... more quotes
];

function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `"${randomQuote.text}" - ${randomQuote.author}`;
;
}

function createAddQuoteForm() {
  const newQuote = {
    text: newQuoteText.value,
    category: newQuoteCategory.value
  };
  quotes.push(newQuote);
  newQuoteText.value = '';
  newQuoteCategory.value = '';
  toggleForm();
  showRandomQuote();
}

function toggleForm() {
  addQuoteForm.style.display = addQuoteForm.style.display === 'none' ? 'block' : 'none';
}

newQuoteButton.addEventListener('click', showRandomQuote);
addQuoteBtn.addEventListener('click', toggleForm);