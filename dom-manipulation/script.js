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
function populateCategories() {
    const uniqueCategories = new Set();
    quotes.forEach(quote => {
      uniqueCategories.add(quote.category);
    });
  
    const categoryFilter = document.getElementById('categoryFilter');
    uniqueCategories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent   
   = category;
      categoryFilter.appendChild(option);
    });
  
    // Load the last selected category from local storage
    const lastSelectedCategory = localStorage.getItem('lastSelectedCategory');
    if (lastSelectedCategory) {
      categoryFilter.value = lastSelectedCategory;
      filterQuotes();
    }
  }
  
  // Function to filter quotes based on the selected category
  function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    const filteredQuotes = quotes.filter(quote => {
      return selectedCategory === 'all' || quote.category === selectedCategory;
    });
  
    // Update the quote display with filtered quotes
    // ... (similar to showRandomQuote, but iterate through filteredQuotes)
  
    // Save the selected category to local storage
    localStorage.setItem('lastSelectedCategory', selectedCategory);
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

const serverUrl = 'https://jsonplaceholder.typicode.com/posts';

function fetchServerData() {
  fetch(serverUrl)
    .then(response => response.json())
    .then(serverQuotes => {
      // Simulate conflict resolution: prioritize server data
      serverQuotes.forEach(serverQuote => {
        const existingQuote = quotes.find(quote => quote.id === serverQuote.id);
        if (existingQuote) {
          // Update existing quote with server data
          existingQuote.text = serverQuote.title;
          existingQuote.author = serverQuote.body;
        } else {
          // Add new quote from server
          quotes.push({
            text: serverQuote.title,
            author: serverQuote.body,
            id: serverQuote.id // Assuming a unique ID for each quote
          });
        }
      });

      saveQuotes();
      showRandomQuote();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      // Handle error, e.g., display a notification to the user
    });
}

// Periodically fetch data (adjust interval as needed)
setInterval(fetchServerData, 60000); // Fetch every minute
fetchQuotesFromServer
"await", "async"
map
["method", "POST", "headers", "Content-Type"]
syncQuotes