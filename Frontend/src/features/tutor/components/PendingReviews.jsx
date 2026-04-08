import React, { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';
import api from '../../../shared/api';

const BADGE_MAP = {
  available: styles['tf-badge-completed'],
  scheduled: styles['tf-badge-pending'],
  urgent: styles['tf-badge-urgent'],
  inreview: styles['tf-badge-inreview'],
  pending: styles['tf-badge-pending'],
  completed: styles['tf-badge-completed'],
};

const BADGE_LABELS = {
  available: 'Available',
  scheduled: 'Scheduled',
  urgent: 'Urgent',
  inreview: 'In Review',
  pending: 'Pending',
  completed: 'Completed',
};

const PendingReviews = ({ onViewAll }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/notifications/tutor-details', token);
      if (response.data?.allSessions) {
        setSessions(response.data.allSessions.slice(0, 5));
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (session) => {
    const now = new Date();
    const startDate = new Date(session.startDate);
    if (startDate <= now) return 'available';
    return 'scheduled';
  };

  const getDateText = (session) => {
    const now = new Date();
    const startDate = new Date(session.startDate);
    const diff = startDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days <= 0) return 'Available now';
    if (days === 1) return 'Tomorrow';
    if (days <= 7) return `${days} days more to go`;
    return startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getSessionTitle = (session) => {
    return session.title || 'Study Session';
  };

  if (loading) {
    return (
      <div className={styles['tf-reviews-card']}>
        <div className={styles['tf-card-header']}>
          <div className={styles['tf-card-title']}>Urgent Courses</div>
        </div>
        <div className="p-4 text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className={styles['tf-reviews-card']}>
        <div className={styles['tf-card-header']}>
          <div className={styles['tf-card-title']}>Urgent Courses</div>
        </div>
        <div className="p-4 text-center text-gray-500">No study sessions created yet</div>
      </div>
    );
  }

  return (
    <div className={styles['tf-reviews-card']}>
      <div className={styles['tf-card-header']}>
        <div className={styles['tf-card-title']}>Urgent Courses</div>
        {onViewAll && (
          <div className={styles['tf-view-all-link']} onClick={onViewAll} role="button" tabIndex={0}>
            View all
          </div>
        )}
      </div>

      {sessions.map((session) => (
        <div className={styles['tf-review-row']} key={session._id}>
          <div className={styles['tf-review-thumb']} style={{ background: '#eff6ff' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
          </div>
          <div className={styles['tf-review-body']}>
            <div className={styles['tf-review-title']}>{getSessionTitle(session)}</div>
            <div className={styles['tf-review-student']}>{session.subTopic}</div>
          </div>
          <span className={`${styles['tf-status-badge']} ${BADGE_MAP[getStatus(session)]}`}>
            {BADGE_LABELS[getStatus(session)]}
          </span>
          <div className={styles['tf-review-date']}>{getDateText(session)}</div>
        </div>
      ))}
    </div>
  );
};

export default PendingReviews;