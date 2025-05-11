function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />

      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints} points
      </p>
    </header>
  ); // we use a more semantic <header> element here and in it we use one <p> for each of the sides(one for displaying question number and the other for displaying
  //    points). We also display a progress bar in this component using <progress/> element. In it we define the max value that it can take which is the number of
  //    questions(so it will basically go from 0 to 15 in this case) and then we also define the current value(which will be the index and not index + 1 because we
  //    actually want it to start empty), so this is basically like an input element and here we are making it a controlled element, even though we cannot really set the
  //    state on the progress bar. Now, only by doing this much, the progress bar get filled only when we click on next button but we want it to fill as soon as we click
  //    on an option, so for that we also receive answer state in this component and in value instead of index we now pass index + Number(answer !== nulls). So we to a
  //    number, the boolean that will result from checking if there is an answer or not. So if there is no answer, then answer !== null is false and
  //    Number(answer !== null) will convert it to 0 but if there is an answer then Number(answer !== null) will be 1 so we add 1 to the index and hence, now on clicking
  //    on an option, we immediately see the progress bar filled.
}

export default Progress;
