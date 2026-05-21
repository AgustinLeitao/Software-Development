export function handleMofifyAnswerVotes(answers, answerId, increment) {
    const answer = answers.find(answer => answer.answerId === answerId);
    answer.upvotes += increment;
}