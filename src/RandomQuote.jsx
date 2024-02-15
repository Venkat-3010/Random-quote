import React, { useEffect, useState } from 'react'
import './App.css'

const colors =[
  '#16a085',
  '#27ae60',
  '#2c3e50',
  '#f39c12',
  '#e74c3c',
  '#9b59b6',
  '#FB6964',
  '#342224',
  '#472E32',
  '#BDBB99',
  '#77B1A9',
  '#73A857'
];

export default function RandomQuote() {
  const [quotesData, setQuotesData] = useState([]);
  const [currentQuote, setCurrentQuote] = useState('');
  const [currentAuthor, setCurrentAuthor] = useState('');

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try{
      const response = await fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json');
      const data = await response.json();
      setQuotesData(data.quotes);
      getQuote(data.quotes);
    }catch(error){
      console.log("Error fetching quotes", error);
    }
  }

const getRandomQuote = () => {
  return quotesData[Math.floor(Math.random() * quotesData.length)];
}

const getQuote = (quotes) =>{
  if(!quotes || quotes.length===0){
    return;
  }
  const randomQuote = getRandomQuote();
  setCurrentQuote(randomQuote.quote);
  setCurrentAuthor(randomQuote.author);

  const twiiterUrl = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
    '"' + randomQuote.quote + '" ' + randomQuote.author)}`;
  document.getElementById("tweet-quote").setAttribute("href", twiiterUrl);

  const color = Math.floor(Math.random() * colors.length);
  document.documentElement.style.setProperty("--bg-color", colors[color]);
  document.documentElement.style.setProperty("--text-color", colors[color]);
  document.querySelectorAll(".button").forEach((button) => {
    button.style.backgroundColor = colors[color];
  });
};

useEffect(() => {
  getQuote(quotesData);
}, [quotesData]);

const handleClick = () =>{
  getQuote(quotesData)
}

return(
  <div id='quote-box' className='center-box'>
    <div id='text' className='quote-text'>
      {currentQuote}
    </div>
    <div id='author' className='quote-author'>
      - {currentAuthor}
    </div>
    <div className='buttons'>
      <button id='new-quote' className='button' onClick={handleClick}>
        New Quote
      </button>
      <a id="tweet-quote" className='button' href="" target='_blank' rel='noopener noreferrer'>
        <i className='fa fa-twitter'></i>
      </a>
    </div>
  </div>
);
}