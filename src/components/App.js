import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading", // we want a loading state. But this time we use this status which right now is loading string but it will basically be a string of the current
  //                    status of the application that will change throughout time. So the states can be 'loading', 'error', 'ready' - once that data has arrived and we
  //                    are ready to start a quiz, 'active' - once the quiz is actually running, 'finihed' - once the quiz is finished
  index: 0, // once the quiz is active, we want to display questions one by one and not all at once so for that we need to know which question is the current one and
  //           hence this state is for that. It's initial value is 0 because we will use this index to take a certain question out of the questions array. We now take
  //           this index to pass in the right question object into the <Question /> component as it will ofcourse need access to the current questions, so we pass
  //           questions[index] as prop
  answer: null, // Now, when we click on an option, the correct and wrong andswers are displayed, the points that we got were updated and the Next button was displayed.
  //               So we need to re-render the screen and we need a new piece of state and that state should basically store which of the options was selected(in other
  //               words, which was the answer provided by us) and so we have this state here for that(Basically answer is just going to be the index number of the
  //               options). In the beginning we have no answer so initial value is null. We also now create an action in our reducer() to update that answer(case
  //               'newAnswer'). Now the answer will get set to action.payload. We then go to the <Option/> component because there is weher the click on the button will
  //               happen(so there is where we will dispatch a new action). So we pass dispatch() function into <Question/> component and we also pass the answer that we
  //               gave as prop into the <Question/> component so that we can then display if the answer that was given was correct or not. Now from <Question/> component
  //               we pass there dispatch and answer prop into the <Options/> component
  points: 0, // now on clicking on an option, the user score should be updated and so this state is for that. Initial value is 0 as user starts at 0 points. Now to update
  //            the points, we have it in the same place where we received the newAnswer and so in the reducer() function, in case 'newAnswer', we also update points. We
  //            want to update points only if the answer was correct. So we need to figure out which is the correct question so we can access the correctOption propertt
  //            of the current question, and then if the answer is correct(that is equal to correctOption of the current question) only then we want to add the points to
  //            the current points. So we figure out which is the current question in a separate question variable in case 'newAnswer' and then in the returned object in
  //            case 'newAnswer', while overriding the points state, we check if the correctOption property of the current question is equal to the received answer(that
  //            received answer is action.payload). If equal, we update points state(by doing state.points + question.points because each question has a different value
  //            for points) else the points state remains same.
  highscore: 0, // this state is for the highscore and it needs to be remebered across re-renders and its initial value is 0. We update it in case 'finish' of our reducer
  //               by checking if current points are greater that the current highscore. If they are greater than the current highscore, then we assign that new value to
  //               the highscore otherwise highscore will simply remain as it is i.e. state.highscore. We then pass it to the <FinishScreen/> component as prop to be
  //               displayed there
  secondsRemaining: 10, // this state is for setting timer functionality. Its value will be decreased every second by the setInterval() function inside the useEffect() in
  //                       <Timer/> component. When the value here reaches zero(i.e. no more seconds remaining) then we will finish the game by setting the status to
  //                       'finished'. So now, in our reducer(), we create case 'tick' which is the event we are going to dispatch in the function() inside setInterval()
  //                       which further is in useEffect() in the <Timer/> component. So we also pass dispatch as a prop to the <Timer/> component. We also pass this
  //                       secondsRemaining state to the <Timer/> component so that it can then display this value and we also accept the prop in the <Timer/> component
  //                       function in Timer.js file. Now every seconds we also want to check if the timer has reached 0 and if it does, we end the quiz by setting the
  //                       status to 'finished', So in case 'tick', in the returned object we check if secondsRemaining = 0 if it is true, we set status as 'finished'
  //                       otherwise the status remains the same and also since the 'tick' function will be dispatched every second from the timer, this checking will
  //                       happend every second. Now once status is set to 'finished', the quiz ends and when we restart, the timer starts wil the the value that we
  //                       define here in the secondsRemaining state because in case 'restart', while returning the object, we are taking the whole initialState object
  //                       and overriding only the questions state to remain as it is and the status state as 'ready'. But we notice that without a cleanup function in
  //                       the useEffect() in the <Timer/> component, our timer keeps on running and never stop due to which, when we Restart the quiz, the timer goes
  //                       faster and the next time even faster. So we store the id of the timer that gets ruterned from the setInterval() methiod in id variable and then
  //                       in the cleanup function, we use the clearInterval() function in which we have to pass the id of the timer that we started with setItnerval()
  //                       (Every setInterval() ,ethod returns a unique id). So now the problem gets fixed. So earlier, each time we started our quiz, a new timer got
  //                       added and so then we had many timers running at the same time which were all dispatching the 'tick' action and so then our time was going down
  //                       very fast. Now, very second the whole App cpmponent re-renders and so do all the child component which can be a performance issue in large
  //                       applications but not here. Also, now we don't actually want to hardcode an initial value for the secondsRemaining state but we want to
  //                       calculate it from the number of questions. So we don't know that number in the beginning so we set the initial value of the secondsRemaining
  //                       state as null and we calculate this number as we start the game. So at the point when the 'start' action is dispatched, we will already have
  //                       the qustions array and so we calculate it in the returned object from case 'start'. So there for calulating, we find the length of the
  //                       questions array and multiply it with a SECS_PER_QUESTION constant the we will define separately at the top. We also format these seconds into a minutes and seconds format right in the <Timer/> component function itself
};

// Now on clicking on the next button, we move to the next question which basically means increasing the index state because it is based on this index that the current
// question is being read and then displayed which is what we do by passing in the questions object that corresponds to the current index in th e<Question/> component.
// So for this we create another action in our reducer() called nextQuestion(case 'nextQuestion') and there we will just return the current state and override it the
// index state by doing index: state.index + 1. Now, here in the returned JSX of this App component, in case status === 'active', besides the <Quesion/> component we
// also want to display the Next button so we create a <NextButton/> component and render it here. So here in the returned JSX we write <NextButton/> after <Question/>
// but this <NextButton/> component will only render the button element itself if there has been an answer(So we could also do it other way around and do the conditional
// rendering here in the returned JSX itself but instead, we're going to do that conditional rendering inside the button, so we will allow this <NextButton/> component
// to basically decide if it wants to render itself or not.). We passed dispatch() in the <NextButton /> component since we want to dispatch an action from there. We
// also pass answer since we want the component to decide whether it wants to render the button or not in case there is an answer.

// Now, besides the <Question/> component and the <NextButton/> component, in case of active status, we also want to display the <Progress/> component and in it we need
// access to current question index and the number of questions and also the points state(which stores points scored by user) and the answer state(for progress bar
// functionality theory for which is written in <Progress/> component) and the maximum points which we calculated in the maxPossiblePoints derived state just below the
// numQuestions derived state in the App component function below and so we pass these as props to the <Progress/> component.

// Now, after the user has answered the last question, we want our application to move to a finished status so that then we can display a finished screen. So now we
// create a FinishScreen.js component and when status === 'finished', we conditionally render it here below in the returned JSX of this App component and in it we pass
// the points to display user score and maxPossiblePoints state too for displaying total points. So now, when we answer the 15th question, then instead of Next button,
// we want to display Finish button and on clicking on Finish button, the status should change to finished. So now in the <NextButton/> component, we return the Next
// button if (index < numQuestions - 1)(We did numQuestions - 1 because indices are 0 based). So we now pass index and numQuestions states too to <NextButton/> component
// as props. Also, now we return another button from the <NextButton/> component if(index === numQuestions - 1) i.e. after answering the 15th question, we now want to
// display the Finish button. So we render a Finish button if(index === numQuestions - 1). So from this Finish button, on clicking, we now dispatch an event called
// finish. So we now make case 'finish' in our reducer() to handle that where we set the status to 'finish'.

// Now, on the finish screen we also want to display a Restart quiz button which will dispatch an action of type restart on click and so we define a case 'restart' in
// our reducer which will reset the states(except for questions states which we will leave as it is i.e. state.questions and the status should become 'ready' instead of
// resetting it) and also pass dispatch() function as a prop to the <FinishScreen/> componnet because that is where this Restart quiz is created and that is from where
// the restart action will be dispatched.

// Now we use useEffect() to set up a timer and this feature will play nicely with the reducer() that we already have. So when the quiz is going to start, the timer will
// also start and once the timer reaches zero, we will have the quiz end by setting the status to 'finished' again. So we create a <Timer/> component which will display
// the current time that is remaining and that will also actually start the timer in the beginning. Now this component will be at the bottom of our UI, so the <Timer/>
// component and the <NextButton/> component will now be inside a <Footer/> component and all that the <Footer/> component will do is to return a <footer> element which
// will then contain the children that we pass in. Now, we set up a timer using setInterval() inside useEffect() in the <Timer/> component which will decrease the state
// secondsRemaining value every second

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null }; // on clicking on the next button, we want our answer state to reset(other wise the coloring of options
    //                                                              will be present for all further questions and the cirrect answer will be shown too and the options
    //                                                              (buttons) will be disabled too)
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    // we could also have done as below:
    // return {
    //   ...state,
    //   points: 0,
    //   highscore: 0,
    //   index: 0,
    //   answer: null,
    //   status: "ready",
    // };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      return new Error("Action unknown");
  }
}

export default function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState); // we destructured the state here on the go
  const numQuestions = questions.length; // in the StartScreen component we want to display the number of questions, so the length of this questions array so we
  //                                        calculate it as a derived state here and pass it as a prop
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  // below we load questions from a fake API:
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data })) // once we receive the data, we use this dispatch() to set the questions state with the data
      //                                                                    received
      .catch((err) => dispatch({ type: "dataFailed" })); // this time we don't ispatch any payload because we are not interested in the error that we are going to
    //                                                    receive. All we are going to do is to tell our state that now the status is an error
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />

            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
      {/* To start the quiz, we just change the status to active and display the <Question/> component. To change the status to active, we create a new action type
          (case 'start') in our reducer. Then we have to dispatch an action when we click on Let's start button with the action type of start we just created. So we
          dispatch this action in the StartScreen component because that is where the Let's start button is and therefore we now need access to the dispatch function
          there so we accept it as a prop in the StartScreen component */}
    </div>
  );
}
