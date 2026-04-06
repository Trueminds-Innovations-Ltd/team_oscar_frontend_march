import React from 'react';
import styles from '../dashboard.module.css';

const BADGE_MAP = {
  urgent: styles['tf-badge-urgent'],
  inreview: styles['tf-badge-inreview'],
  pending: styles['tf-badge-pending'],
  completed: styles['tf-badge-completed'],
};

const BADGE_LABELS = {
  urgent: 'Urgent',
  inreview: 'In Review',
  pending: 'Pending',
  completed: 'Completed',
};

const defaultReviews = [
  {
    id: 1,
    thumbBg: '#eff6ff',
    thumbStroke: '#1e3a8a',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: 'Wireframe Prototype - Mod 3',
    student: 'James Adewale - UX Fundamentals',
    status: 'urgent',
    date: 'Tomorrow',
  },
  {
    id: 2,
    thumbBg: '#fef3c7',
    thumbStroke: '#d97706',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    title: 'Data Cleaning Exercise #4',
    student: 'Tunde Collins - Python Analytics',
    status: 'inreview',
    date: 'Mar 13th',
  },
  {
    id: 3,
    thumbBg: '#fce7f3',
    thumbStroke: '#9d174d',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    title: 'User Persona Research - Mod 2',
    student: 'Amaka Osei - UX Fundamentals',
    status: 'pending',
    date: 'Mar 15th',
  },
  {
    id: 4,
    thumbBg: '#d1fae5',
    thumbStroke: '#065f46',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'REST API Integration Lab',
    student: 'Sara Idowu - Full-Stack React',
    status: 'completed',
    date: 'Mar 13th',
  },
];

const PendingReviews = ({ reviews = defaultReviews, onViewAll }) => {
  return (
    <div className={styles['tf-reviews-card']}>
      <div className={styles['tf-card-header']}>
        <div className={styles['tf-card-title']}>Pending Reviews</div>
        <div className={styles['tf-view-all-link']} onClick={onViewAll} role="button" tabIndex={0}>
          View all
        </div>
      </div>

      {reviews.map((review) => (
        <div className={styles['tf-review-row']} key={review.id}>
          <div className={styles['tf-review-thumb']} style={{ background: review.thumbBg }}>
            {React.cloneElement(review.icon, { stroke: review.thumbStroke })}
          </div>
          <div className={styles['tf-review-body']}>
            <div className={styles['tf-review-title']}>{review.title}</div>
            <div className={styles['tf-review-student']}>{review.student}</div>
          </div>
          <span className={`${styles['tf-status-badge']} ${BADGE_MAP[review.status]}`}>
            {BADGE_LABELS[review.status]}
          </span>
          <div className={styles['tf-review-date']}>{review.date}</div>
        </div>
      ))}
    </div>
  );
};

export default PendingReviews;
