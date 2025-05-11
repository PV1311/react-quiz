import { useReducer, useState } from "react";

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  // this reducer function takes the current state and the action as arguments
  console.log(state, action);
  // return state + action;

  // // accounting for action types as just below:
  // // if (action.type === "inc") return state + action.payload;
  // if (action.type === "inc") return state + 1;
  // // if (action.type === "dec") return state - action.payload;
  // if (action.type === "dec") return state - 1;
  // if (action.type === "setCount") return action.payload;

  // return { count: 0, step: 1 };

  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - state.step }; // here we spread the current state object and override the property we want to modify because states are
    //                                                       immutable so we don't directly mutate the current state and also the reducer must be a pure function that
    //                                                       always returns a new state
    case "inc":
      return { ...state, count: state.count + state.step };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      // return { count: 0, step: 1 };
      return initialState;
    default:
      throw new Error("Unknown action");
  }
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  // Now we replace the useState() hook above with useReducer() hook which is a more advanceed and complex way of managing state. useReducer() works with a reducer
  // function which is a pure function that will always take in the prevous sate and the so called action as an argument and will then return the next state. So we
  // replaced the above count and step state with useReducer() hook below:

  // const [count, dispatch] = useReducer(reducer, 0); // 1st argument is the reducer function and the 2nd argument is the initial state.Outside the component we
  // //                                                   created the reducer function. So this useReducer() returns the current state just like the useState() hook but
  // //                                                   instead of returning a state setter function like the useState() hook, this useReducer() hook returns a
  // //                                                   dispatch function as a 2nd thing and this dispatch function can also be used to update the state. It just works
  // //                                                   in a slightly different way. So let's call this dipatch function in the increment event handler and pass in
  // //                                                   number 1. Now when we click on the + button, we see 0 1 logged on console which comes from the console.log() in
  // //                                                   the reducer() function we created outside the component. This means state is 0 and the action is 1. This is
  // //                                                   because the reducer function gets access to the current state(which right now is 0, i.e. the initial state we
  // //                                                   pass right here while creating the useReducer() hook) and it also gets access to the action which right now is
  // //                                                   simply the 1 we passed inside dispatch() while using it inside the increment event handler function. So the idea
  // //                                                   of the reducer is to take these current state and the action and based on that, return the next state and so we
  // //                                                   do that in the very next line after console.log() in the reducer function where we simply return state + action
  // //                                                   in this case(So whatever we return from the reducer function, will then become the new state). This means that
  // //                                                   right now, our on clicking on + button, our value in the input field should become 1 and then on click 2 and then
  // //                                                   3 and so on. Now for the functionality of - button, we call dispatch() function inside decrement event handler
  // //                                                   and pass -1 in it(which in terms of useReducer, we call dispatching an action)
  //
  // Now, we also need to think about setting the state, because when we type some number in the input field, we want the state to update to that number, which is what we
  // earlier did in the defineCount() function using state setter when we did it with useState. But it will not work here with dispatch() function because in the
  // defineCount() function now if we did dispatch(Number(e.target.value)), then that will simply be added to the current state. Now if we reload the application and
  // click on + button, we see 1 in input field, but if we write 0 after the 1(i.e. it will not become in input field), we see that it actually added the 0 to the current
  // state(because in our reducer function we are just adding action to the current state) and now instead of 0 we see 1, so now we have 11 on screen in input field. If
  // we add another 0, then that too will just get added to the current state and we will see 121 on screen and that is not at all what we want. Therefore, we need to
  // think about actions in the reducer function. So basically in this case we have 3 actions - decreasing the count, increasing it and setting it. So we need to name
  // these actions. So what we are going to do is not just to pass 1 or -1 as values in dispatch() in increment and decrement handler functions but an object which
  // contains the action as well as this value. So in decrement handler function, we pass in dispatch(), an object {type: 'dec', payload: -1} and so this object is what
  // we now call an action when we work with reducer functions. In theory this object could have any shape that we wanted but it is a standar to have the type and
  // payload property, the same is actually true in Redux which we will learn later. Also, now in defineCount() function too, we will pass a similar object instead of
  // just passing Number(e.target.value) in dispatch(). So we pass a similar object in increment handler function. Also now in reducer function, instead of just doing
  // return state + action, we now need to account for these different. Now, while accounting for different types in reducer function, we should logically return
  // state - action.payload if(action.type === 'dec'). But if we think, there is no need to pass in a payload in the object in dispatch() inside increment and decrement
  // handler function because the reducer should know what to do when want to decrease or increase. So they are just adding or subtracting 1 from current state. So
  // instead of returning state + action.payload in case of 'inc' type we can just return state + 1 and in case of 'dec' type return state - 1 and removie payload
  // properties from the objects in dispatch() in increment and decrement handler functions. Ofcourse in case of the object in dispatch() in defineCount() function, we
  // still need the payload property

  // Now ususally we use useReducer() to manage a more complex state and not just a single value as we did with count state. So what this means is that the state is
  // usually going to be an object and not just one single value. So now we define an object initialState just below where count is 0 and step is 1 which are the same
  // default values that we had before with useState() hook. And now we pass in this initialState object to the useReducer() on RHS in place of the 0 we passed in for
  // the count state we creted above(we comment the initial state creation with useReducer() above and create a new one below) and now instead of count on LHS we just
  // call it state and we immediately destructure that state object just after creating the state: (Also, the returning of new states from reducer functions that we did
  // earlier based on object type passed in dispatch() is commented as it would no longer work):
  //
  // const initialState = { count: 0, step: 1 }; // we can do even better by defining this object outside the component just like the reducer() function
  const [state, dispatch] = useReducer(reducer, initialState); // Now, the state that we now get in the reducer() is the same as this initialState object that we passes
  //                                                              into useReducer() and so then we need to return an object with the smae shape. So now the returned
  //                                                              object  also contains the count and the step. So now we adapt our reducer function based on that. Now
  //                                                              instead of if() for evaluating action,type, we use switch statement(we could also do with if() as we
  //                                                              did earlier)
  // destructuring the state below:
  const { count, step } = state;
  // Now, for the step state functionality, we also want to dispatch and action with a type of 'setStep' and the payload will be Number(e.target.value) and we pass a
  // function with this type and payload in dispatch() in defineStep() function and we create a case 'setStep' in the Switch statement in the reducer() function. Then we
  // have to take this step into account when we increase or decrease the value in input field. For that, in the returned object of case 'dec' in the reducer() function,
  // we override the count propert with state.count - state.step instead of state.count - 1 and similary for case 'inc', we return object with overriding count property
  // with state.count + state.step
  //
  // Now, for reset functionality, earlier with useState() hook, we took the 2 state setters and call both of them but now we can do one big state transition whoch does
  // all that at the same time and that is going to be one of the huge advantages of useReducer() hook(especially if we had even more states than just these two here).
  // So now for reset, we dispatch and action woth type: 'reset' and here we don't need to pass any data into the reducer() function and therefore, we don't need to
  // specify any payload and because we can do that right inside the reducer() function. So now in reducer(), we define a case 'reset' where we return an object where
  // the count is reset to 0 and the step is reset to 1. We can do even better by taking the initialState object creation from here to outside the component just like
  // the reducer() function and then return just the initialState onject by simply writing return initialState
  //
  // Now, all we are doing in the nelow event handlers is to just dispatch and so we could just move all of these dispatches right into the JSX and we could replace all
  // the event handlers.

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // dispatch(-1);
    dispatch({ type: "dec" });

    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    // dispatch(1);
    dispatch({ type: "inc" });

    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    // dispatch(Number(e.target.value));
    dispatch({ type: "setCount", payload: Number(e.target.value) });

    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });

    // setStep(Number(e.target.value));
  };

  const reset = function () {
    dispatch({ type: "reset" });

    // setCount(0);
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
