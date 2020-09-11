const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Used to show the loading animation with page refresh and getting new quote.
function showLoading() {
    loader.hidden = false;
    quoteContainer.hidden = true; 
}

function hideLoading() {
    loader.hidden = !loader.hidden;
    quoteContainer.hidden = !quoteContainer.hidden;
}

async function getQuote() {
    showLoading(); 

    const proxy = "https://cors-anywhere.herokuapp.com/";
    const url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

    try {
        const response = await fetch(proxy + url);
        const data = await response.json();
                
        if(data.quoteAuthor === "")
            authorText.innerText = "Unknown";
        else
            authorText.innerText = data.quoteAuthor;

        // if quote is too long for quote box, make it smaller.
        if(data.quoteText.length > 100)
            quoteText.classList.add("long-quote");
        else
            quoteText.classList.remove("long-quote");

        quoteText.innerText = data.quoteText;
        hideLoading()
    }
    catch(e) {
        console.log(e)
    }
}

// Send a quote with author to twitter as a tweet.
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

    window.open(twitterUrl, "_blank")
}

//Event listeners

newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuote();
