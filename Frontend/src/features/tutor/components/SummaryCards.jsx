import React, { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';
import api from '../../../shared/api';

const SummaryCards = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    pendingMessages: 0,
    unreadToday: 0,
    studentsNeedingHelp: 0,
    activeStudents: 0,
    studentsIncrease: 0
  });

  useEffect(() => {
    fetchDashboardSummary();
  }, []);

  const fetchDashboardSummary = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/notifications/tutor-summary', token);
      if (response?.data) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard summary:', error);
    } finally {
      setLoading(false);
    }
  };

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
      value: data.pendingMessages,
      sub: `${data.unreadToday} unread today`,
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
      value: data.studentsNeedingHelp,
      sub: 'Tutor requests',
      subWarn: true,
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
      value: data.activeStudents,
      sub: data.studentsIncrease > 0 ? `+${data.studentsIncrease} increased` : 'No new students',
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
        <div className={styles['tf-summary-value']}>
          {loading ? '-' : card.value}
        </div>
        <div className={`${styles['tf-summary-sub']} ${card.subWarn ? styles.warn : ''}`.trim()}>{card.sub}</div>
      </div>
    </div>
  );

  return (
    <div className={styles['tf-summary-grid']}>
      {defaultCards.map((card) => (
        <SummaryCard key={card.id} card={card} />
      ))}
    </div>
  );
};

export default SummaryCards;
