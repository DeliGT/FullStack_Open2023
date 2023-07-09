import React, { useState } from 'react';

const ActionButton = ({ handleAction, label }) => <button onClick={handleAction}>{label}</button>;

const Title = ({ heading }) => <h2>{heading}</h2>;

const AnecdoteDisplay = ({ content, totalVotes }) => (
  <div>
    <p>{content}</p>
    <p>has {totalVotes} votes</p>
  </div>
);


const findMaxVotesIndex = (votesArray) => {
  let highestVotes = 0;
  let maxIndex = 0;
  for (let i = 0; i < votesArray.length; i++) {
    if (votesArray[i] > highestVotes) {
      highestVotes = votesArray[i];
      maxIndex = i;
    }
  }
  return maxIndex;
};

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
	];

  const [currentIndex, setIndex] = useState(0);
  const [votes, updateVotes] = useState(new Array(phrases.length).fill(0));

  const getNextAnecdote = () => setIndex(Math.floor(Math.random() * phrases.length));
  const addVote = () => {
    const updatedVotes = [...votes];
    updatedVotes[currentIndex] += 1;
    updateVotes(updatedVotes);
  };

  const maxVotesIndex = findMaxVotesIndex(votes);

  return (
    <div className="App">
      <Title heading="Anecdote of the day" />
      <AnecdoteDisplay content={phrases[currentIndex]} totalVotes={votes[currentIndex]} />
      <ActionButton handleAction={addVote} label="Vote" />
      <ActionButton handleAction={getNextAnecdote} label="Next Anecdote" />
      <Title heading="Anecdote with Most Votes" />
      <AnecdoteDisplay content={phrases[maxVotesIndex]} totalVotes={votes[maxVotesIndex]} />
    </div>
  );
};

export default App;
