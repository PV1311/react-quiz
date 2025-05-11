import Options from "./Options";

function Question({ question, dispatch, answer }) {
  // console.log(question); // this was just to see the shape of the object we get
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
      {/* in our question object that we receive here, we see that we have the question(which we used above in <h4>) and we have an array of options. So we pass the
          question object in the <Options/> component as prop and there, loop over the options array in it and create <buttons> for the options and not <ul> because our
          options itself will be buttons too in the quiz. */}
    </div>
  );
}

export default Question;
