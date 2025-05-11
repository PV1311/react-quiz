import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  // As this <Timer/> component mounts, we want to initialize the timer and we are doing it right here(i.e. starting the timer here in this component) because this
  // <Timer/> component will mount as soon as the quiz starts. So ofcourse we couldn't start timer in the App component because the timer would start running as soon as
  // the entire application mounts.

  // below we format the time in seconds to time in minutes and seconds:
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        // console.log("tick");
        dispatch({ type: "tick" });
      }, 1000); // this setInterval() will run the function that we pass here every couple of milliseconds which we can alos define.Right it logs the string 'tick' every
      //           second. But this is not what we want. So we want some state value which we can decrease every second and so we define a state secondsRemaining which
      //           will be decreased every second here. So every second we dispatch event 'tick' which will decrease secondsRemaining and when the value of the state
      //           secondsRemaining is 0(i.e. no more seconds are remaining), we set finish the quiz by setting the status to 'finished'

      return () => clearInterval(id);
    },
    [dispatch] // dispatch is now a dependency
  );

  return (
    <div className="timer">
      {mins < 0 && "0"}
      {mins}:{seconds < 0 && "0"}
      {seconds}
      {/* In case of a single digit we want 0 to appear before the number(Ex: 05) so we did like this here */}
    </div>
  );
}

export default Timer;
