import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { handleMofifyAnswerVotes } from '../shared/utility'

let state;

fetch('http://localhost:8000/data').then(data => data.json()).then(json => {
    state = json;
    
    render();
});

function handleVote(answerId, increment) {
    handleMofifyAnswerVotes(state.answers, answerId, increment);

    fetch(`vote/${answerId}?increment=${increment}`);
    
    render();
}

 function render() {
     ReactDOM.hydrate(<App {...state} handleMofifyAnswerVotes={handleVote}/>, document.querySelector('#container'));
 }