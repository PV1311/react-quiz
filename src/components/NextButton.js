function NextButton({ dispatch, answer, index, numQuestions }) {
  // we want this component to allow if it wants to render the button or not in case there has been an answer so we also receive the answer
  // So we do an early return for that
  if (answer === null) return;

  // when we answer the 15th question, then instead of Next button, we want to display Finish button and on clicking on Finish button, the status should change to
  // finished. So now in this <NextButton/> component, we return the Next button if (index < numQuestions - 1)(We did numQuestions - 1 because indices are 0 based). So
  // we now we accept index and numQuestions states too to as props. Also, after answering the 15th question, we now want to display the Finish button. So we render a
  // Finish button if(index === numQuestions - 1). So from this Finish button, on clicking, we now dispatch an event called finish. So we now make case 'finish' in our
  // reducer() to handle that where we set the status to 'finish':
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
