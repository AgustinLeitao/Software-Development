import express from 'express';
import { readFileSync } from 'fs';
import React from 'react';
import { App } from '../client/App';
import { renderToString } from 'react-dom/server';
import { handleMofifyAnswerVotes } from '../shared/utility'

const app = express();

app.use(express.static("dist"));

const data = {
    questions: [{
        questionId: "Q1",
        content: "Desc1"
    },
    {
        questionId: "Q2",
        content: "Desc2"
    },
    {
        questionId: "Q3",
        content: "Desc3"
    }],
    answers: [{
        answerId: "A1",
        questionId: "Q1",
        answer: "Answer1",
        upvotes: 0
    },
    {
        answerId: "A2",
        questionId: "Q2",
        answer: "Answer2",
        upvotes: 0
    },
    {
        answerId: "A3",
        questionId: "Q3",
        answer: "Answer3",
        upvotes: 0
    }]
}

app.get('/data', async (req, res) => {
    res.json(data);
});

app.get('/vote/:answerId', async (req, res) => {
    const { query, params} = req;
    handleMofifyAnswerVotes(data.answers, params.answerId, +query.increment)
    res.sendStatus(200);
});

app.get('/', async (req, res) => {
    const htmlFile = readFileSync("public/index.html", "utf8");
    const rootComponent = renderToString(<App {...data} />); 
    
    res.setHeader('Content-Type', 'text/html');
    res.send(htmlFile.replace("{{rendered}}", rootComponent));
});

app.listen(8000);