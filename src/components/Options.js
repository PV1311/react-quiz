function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {/* In payload we pass the index of the option selected, because the correct option is also marked using these same indices. We get the index here as the 2nd
              option of the map() method */}
          {option}
        </button> // in our question object that we receive here, we see that we have the question(which we used above in <h4>) and we have an array of options. So we
        //           loop over it and create <buttons> for the options and not <ul> because our options itself will be buttons too in the quiz.
      ))}
      {/* On clicking on an option, we don't any further clicking to happen, so we pass a dissabled prop and in it pass hasAnswered variable. So if there is an answer,
          options(or buttons) will be disabled */}
      {/* based on the selected option(whose index is stored in answer state) we conditionally render the className here. So if we select an option , it's index is
          stored in answer and in that case index === answer and so answer class is added. So the selected answer moves a bit to right because of this class. Also, we
          conditionally render another class for coloring the options. So the correct option is getting correct class and the other wrong class. But we want this
          conditional rendering to happen only if there is an answer so we stored the bollean value for if there is an answer or not in a separate variable called
          hasAnswered and based on that we do this conditional adding of correct and wrong class(So it will become nested ternary)  */}
    </div>
  );
}

export default Options;
