import React, { Fragment } from 'react';

const Anecdote = ({ anecdote }) => {
  console.log(anecdote);

  return (
    <Fragment>
      <h2>"{anecdote.content}"</h2>
      <h3>has {anecdote.votes} votes</h3>
    </Fragment>
  );
};

export default Anecdote;
