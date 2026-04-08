import React, { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';
import api from '../../../shared/api';

const Greeting = ({ user, onCreateSession }) => {
  const [taskCount, setTaskCount] = useState(0);
  const firstName = user?.name ? user.name.split(' ')[0] : 'Tutor';

  useEffect(() => {
    fetchTaskCount();
  }, []);

  const fetchTaskCount = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/notifications/tutor-details', token);
      if (response.data) {
        setTaskCount(response.data.taskCount || 0);
      }
    } catch (error) {
      console.error('Failed to fetch task count:', error);
    }
  };
  
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