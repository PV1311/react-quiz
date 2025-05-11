function FinishScreen({ points, maxPossiblePoints, highscore, dispatch }) {
  const percentage = (points / maxPossiblePoints) * 100;

  // we conditionally set an emoji to display based on how the user performed:
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦🏻‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)})
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      {/* Now we also want to implement a highscore feature. So if the user scored 100 points but then in the nxt time they do it again and they score 200, then we want
          to store that 200 as the high score and so if they do the quiz for the 3rd time and they score 150, then 200 stays as the high score. So we also want to
          display that as a paragraph here. Now we may think when, where and how is the best way to calculate this Highscore and the place to do so is exactly when the
          user finishes the game. So we can do it in case 'finish' in our reducer and we need another piece of state(which is the highscore state) as we need it to be
          remebered across re-renders. We accept that highscore state here as props to display it in the <p> element with className="highscore"  */}
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
      {/* Now we also want to display this Restart Quiz button on the Finish screen which will basically reset all the states. So here, on button click, we dispatch an
          action with type restart and make case 'restart' in our reduceer where we reset the states. */}
    </>
  );
}

export default FinishScreen;
