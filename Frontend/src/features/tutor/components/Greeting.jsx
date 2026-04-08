import React from 'react';
import styles from '../dashboard.module.css';

const Greeting = ({ user, taskCount = 8, onCreateSession }) => {
  const firstName = user?.name ? user.name.split(' ')[0] : 'Tutor';
  
  return (
    <div className={styles['tf-greeting']}>
      <div className="flex items-center justify-between">
        <div>
          <h1>Good Morning, {firstName}</h1>
          <p>You have {taskCount} tasks to review today</p>
        </div>
        {onCreateSession && (
          <button
            onClick={onCreateSession}
            className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 font-medium transition-colors"
          >
            + Create Study Session
          </button>
        )}
      </div>
    </div>
  );
};

export default Greeting;