import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>the app is used by pressing the buttons</div>;
  }
  return <div>button press history: {props.allClicks.join(" ")}</div>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAllClicks] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setAllClicks(all + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setAllClicks(all + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    setAllClicks(all + 1);
  };

  const Average = () => {
    if (all === 0) {
      return 0;
    }
    const Average = (good * 1 + neutral * 0 + bad * -1) / all;
    return Average;
  };

  const PositiveFeedback = () => {
    if (all === 0) {
      return 0;
    }
    const positiveFeedback = (good / all) * 100;
    return positiveFeedback.toPrecision(14);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />

      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {all}</div>
      <div>average {Average()}</div>
      <div>positive {PositiveFeedback()} % </div>
    </div>
  );
};

export default App;
