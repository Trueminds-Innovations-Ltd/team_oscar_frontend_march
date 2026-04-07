import React from 'react';
import styles from '../dashboard.module.css';

const defaultInsights = {
  date: 'March 2026',
  metrics: [
    {
      id: 'progress',
      iconBg: '#eff6ff',
      iconStroke: '#1e3a8a',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
      label: 'Avg. Student Progress',
      value: '63%',
    },
    {
      id: 'response',
      iconBg: '#d1fae5',
      iconStroke: '#065f46',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      label: 'Avg. Response Time',
      value: '1.4 hrs',
    },
    {
      id: 'assisted',
      iconBg: '#fef3c7',
      iconStroke: '#d97706',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
      label: 'Students Assisted',
      value: '18 / 24',
    },
  ],
  gradesCompleted: 75,
};

const TutorInsights = ({ insights = defaultInsights }) => {
  const circumference = 283;
  const dashOffset = circumference * (1 - insights.gradesCompleted / 100);

  return (
    <div className={styles['tf-insights-card']}>
      <div className={styles['tf-card-header']} style={{ marginBottom: 4 }}>
        <div className={styles['tf-card-title']}>Tutor Insights</div>
      </div>
      <div className={styles['tf-insights-date']}>{insights.date}</div>

      <div className={styles['tf-insights-metrics']}>
        {insights.metrics.map((metric) => (
          <div className={styles['tf-insight-row']} key={metric.id}>
            <div className={styles['tf-insight-icon']} style={{ background: metric.iconBg }}>
              {React.cloneElement(metric.icon, { stroke: metric.iconStroke })}
            </div>
            <div className={styles['tf-insight-body']}>
              <div className={styles['tf-insight-label']}>{metric.label}</div>
              <div className={styles['tf-insight-value']}>{metric.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles['tf-circular-chart-wrap']}>
        <div className={styles['tf-circular-chart']}>
          <svg viewBox="0 0 100 100">
            <circle className={styles['tf-circle-bg']} cx="50" cy="50" r="45" />
            <circle
              className={`${styles['tf-circle-progress']} ${styles.green}`}
              cx="50"
              cy="50"
              r="45"
              style={{ strokeDashoffset: dashOffset }}
            />
          </svg>
          <div className={styles['tf-circular-center']}>
            <div className={styles['tf-circular-pct']}>{insights.gradesCompleted}%</div>
            <div className={styles['tf-circular-lbl']}>Grades<br />Completed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorInsights;
