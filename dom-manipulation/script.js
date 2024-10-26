const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
let quotes = []; // Initialize empty quotes array

// Function to load quotes from local storage
function loadQuotes() {
  const storedQuotes = localStorage.getItem('quotes');
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to show random quote (unchanged)
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
  newQuoteText.value = '';
  newQuoteCategory.value = '';
  saveQuotes(); // Save quotes after adding a new one
  showRandomQuote();
}

// Optional: Session storage example - store last viewed quote index
let lastViewedQuoteIndex = null;
function storeLastViewedQuote(index) {
  sessionStorage.setItem('lastViewedQuote', index);
  lastViewedQuoteIndex = index;
}

function getLastViewedQuote() {
  const storedIndex = sessionStorage.getItem('lastViewedQuote');
  if (storedIndex) {
    lastViewedQuoteIndex = parseInt(storedIndex);
  }
}

// Function to export quotes as JSON
function exportToJsonFile() {
  const jsonData = JSON.stringify(quotes);
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download   
 = 'quotes.json';
  link.click();
  URL.revokeObjectURL(url); // Revoke temporary URL
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    alert('Quotes imported successfully!');
  };
  fileReader.readAsText(event.target.files[0]);
}

// Load quotes from local storage on initialization
loadQuotes();

// Event listeners (unchanged)
newQuoteButton.addEventListener('click', showRandomQuote);
addQuoteBtn.addEventListener('click', addQuote);

// Optional: Load last viewed quote index from session storage
getLastViewedQuote();
// ... (show last viewed quote if desired)