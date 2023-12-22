import { Section } from './Section/Section';
import { Statistics } from './Statistics/Statistics';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Notification } from './Notification/Notification';
import { useState } from 'react';

export const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleFeedback = type => {
    setFeedback(prevState => ({
      ...prevState,
      [type]: prevState[type] + 1,
    }));
  };
  const { good, neutral, bad } = feedback;
  const countTotalFeedback = () => {
    return good + neutral + bad;
  };
  const countPositiveFeedbackPercentage = () => {
    return ((good * 100) / (neutral + bad + good) || 0).toFixed(0);
  };

  return (
    <div className="container border border-primary ">
      <Section title={'Please leave feedback'}>
        <FeedbackOptions
          options={Object.keys(feedback)}
          onLeaveFeedback={handleFeedback}
        />
      </Section>
      <Section title={'Statistic'}>
        {countTotalFeedback() > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};
