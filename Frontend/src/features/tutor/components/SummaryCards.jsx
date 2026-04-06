import React from 'react';
import styles from '../dashboard.module.css';

const defaultCards = [
  {
    id: 'messages',
    iconBg: '#eff6ff',
    iconStroke: '#1e3a8a',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
    label: 'Pending Messages',
    value: 12,
    sub: '4 unread today',
    subWarn: true,
  },
  {
    id: 'help',
    iconBg: '#fef3c7',
    iconStroke: '#d97706',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    label: 'Students Needing Help',
    value: 5,
    sub: '2 urgent',
    subWarn: true,
  },
  {
    id: 'assignments',
    iconBg: '#fce7f3',
    iconStroke: '#9d174d',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    label: 'Assignments to Review',
    value: 8,
    sub: '3/8 reviewed',
    subWarn: false,
    showProgress: true,
    progressPercent: 37.5,
    progressColor: '#9d174d',
  },
  {
    id: 'students',
    iconBg: '#d1fae5',
    iconStroke: '#065f46',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    label: 'Active Students',
    value: 243,
    sub: '+3 increased',
    subWarn: false,
  },
];

const SummaryCard = ({ card }) => (
  <div className={styles['tf-summary-card']}>
    <div className={styles['tf-summary-icon']} style={{ background: card.iconBg }}>
      {React.cloneElement(card.icon, { stroke: card.iconStroke })}
    </div>
    <div className={styles['tf-summary-body']}>
      <div className={styles['tf-summary-label']}>{card.label}</div>
      <div className={styles['tf-summary-value']}>{card.value}</div>
      <div className={`${styles['tf-summary-sub']} ${card.subWarn ? styles.warn : ''}`.trim()}>{card.sub}</div>
      {card.showProgress && (
        <div className={styles['tf-progress-mini']}>
          <div
            className={styles['tf-progress-mini-fill']}
            style={{ width: `${card.progressPercent}%`, background: card.progressColor }}
          />
        </div>
      )}
    </div>
  </div>
);

const SummaryCards = ({ cards = defaultCards }) => {
  return (
    <div className={styles['tf-summary-grid']}>
      {cards.map((card) => (
        <SummaryCard key={card.id} card={card} />
      ))}
    </div>
  );
};

export default SummaryCards;
