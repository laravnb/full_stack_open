import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad, all }) => {
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = ((good / all) * 100).toPrecision(14);

  return (
    <>
      {all === 0 ? (
        <div>No feedback given</div>
      ) : (
        <div>
          <div>good {good}</div>
          <div>neutral {neutral}</div>
          <div>bad {bad}</div>
          <div>all {all}</div>
          <div>average {average}</div>
          <div>positive {positive} % </div>
        </div>
      )}
    </>
  );
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

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
};

export default App;
