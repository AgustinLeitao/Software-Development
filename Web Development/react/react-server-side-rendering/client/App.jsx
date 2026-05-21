import React from 'react'

export const App = ({questions, answers, handleMofifyAnswerVotes}) => (
    <>
        <h1>
            React Component
        </h1>
        
        {questions.map(({questionId, content}) => (
        <div key={questionId}>
            <h3>
                {content}
            </h3>
            <div>
                {answers.filter(ans => ans.questionId === questionId).map(({answerId, answer, upvotes}) => (
                <div key={answerId}>
                    <h3>
                        {answer} : {upvotes}
                    </h3>
                    <button onClick={() => handleMofifyAnswerVotes(answerId, 1)}> + </button>
                    <button onClick={() => handleMofifyAnswerVotes(answerId, -1)}> - </button>
                </div>))}
            </div>
        </div>
        ))}
    </>
)

