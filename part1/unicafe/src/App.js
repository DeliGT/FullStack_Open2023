import React, { useState } from 'react';

const FeedbackButton = ({ onClick, label }) => {
  return <button onClick={onClick}>{label}</button>;
};

const Title = ({ content }) => {
  return <h2>{content}</h2>;
};

const StatsRow = ({ label, data }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{data}</td>
    </tr>
  );
};

const FeedbackStats = ({ feedback }) => {
  const avg = (feedback.positive + (feedback.negative * -1)) / feedback.total;
  const percentPositive = (feedback.positive / feedback.total) * 100;

  if (feedback.total === 0) {
    return <div>No feedback provided.</div>;
  }

  return (
    <table>
      <tbody>
        <StatsRow label="Positive" data={feedback.positive} />
        <StatsRow label="Neutral" data={feedback.neutral} />
        <StatsRow label="Negative" data={feedback.negative} />
        <StatsRow label="Total" data={feedback.total} />
        <StatsRow label="Average" data={avg} />
        <StatsRow label="Positive%" data={percentPositive} />
      </tbody>
    </table>
  );
};

const FeedbackApp = () => {
  const [feedback, setFeedback] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
    total: 0,
  });

  const incrementPositive = () => setFeedback({ ...feedback, positive: feedback.positive + 1, total: feedback.total + 1 });
  const incrementNeutral = () => setFeedback({ ...feedback, neutral: feedback.neutral + 1, total: feedback.total + 1 });
  const incrementNegative = () => setFeedback({ ...feedback, negative: feedback.negative + 1, total: feedback.total + 1 });

  return (
    <div>
      <Title content="Give Feedback" />
      <FeedbackButton onClick={incrementPositive} label="Positive" />
      <FeedbackButton onClick={incrementNeutral} label="Neutral" />
      <FeedbackButton onClick={incrementNegative} label="Negative" />
      <div>
        <Title content="Statistics" />
        <FeedbackStats feedback={feedback} />
      </div>
    </div>
  );
};

export default FeedbackApp;
