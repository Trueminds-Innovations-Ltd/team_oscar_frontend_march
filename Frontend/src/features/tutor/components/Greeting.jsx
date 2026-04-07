import React from 'react';
import styles from '../dashboard.module.css';

const Greeting = ({ name = 'Maria', taskCount = 8 }) => {
  return (
    <div className={styles['tf-greeting']}>
      <h1>Good Morning, {name}</h1>
      <p>You have {taskCount} tasks to review today</p>
    </div>
  );
};

export default Greeting;
