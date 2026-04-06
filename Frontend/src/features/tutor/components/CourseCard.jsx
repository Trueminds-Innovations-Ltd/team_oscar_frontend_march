import React from 'react';
import styles from '../dashboard.module.css';

const defaultCourse = {
  moduleLabel: 'Module 3 of 8',
  sectionLabel: "Course You're Teaching",
  title: 'UX Fundamentals & Design Thinking',
  nextUp: 'Next Up: Wireframing With Low-Fidelity Prototypes',
  progressPercent: 60,
  hoursLeft: '14h Left',
  stats: [
    {
      id: 'enrolled',
      iconBg: '#eff6ff',
      iconStroke: '#1e3a8a',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
      value: 243,
      label: 'Students Enrolled',
    },
    {
      id: 'needhelp',
      iconBg: '#fef3c7',
      iconStroke: '#d97706',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
      value: 5,
      label: 'Need Help',
    },
    {
      id: 'pending',
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
      value: 8,
      label: 'Pending Assignments',
    },
  ],
  lastUpdated: '2h ago',
};

const CourseCard = ({ course = defaultCourse, onManageCourse }) => {
  return (
    <div className={styles['tf-course-mgmt-card']}>
      <div className={styles['tf-course-mgmt-thumb']}>
        <div className={styles['tf-course-mgmt-thumb-icon']}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
          <div className={styles['tf-thumb-module-badge']}>{course.moduleLabel}</div>
        </div>
      </div>

      <div className={styles['tf-course-mgmt-body']}>
        <div className={styles['tf-course-mgmt-label']}>{course.sectionLabel}</div>
        <div className={styles['tf-course-mgmt-title']}>{course.title}</div>
        <div className={styles['tf-course-mgmt-next']}>{course.nextUp}</div>

        <div className={styles['tf-course-mgmt-progress-label']}>
          <span>Avg. Student Progress - {course.progressPercent}% Complete</span>
          <span>{course.hoursLeft}</span>
        </div>
        <div className={styles['tf-course-mgmt-bar']}>
          <div className={styles['tf-course-mgmt-bar-fill']} style={{ width: `${course.progressPercent}%` }} />
        </div>

        <div className={styles['tf-course-mgmt-stats']}>
          {course.stats.map((stat) => (
            <div className={styles['tf-course-stat-item']} key={stat.id}>
              <div className={styles['tf-course-stat-icon']} style={{ background: stat.iconBg }}>
                {React.cloneElement(stat.icon, { stroke: stat.iconStroke })}
              </div>
              <div className={styles['tf-course-stat-value']}>{stat.value}</div>
              <div className={styles['tf-course-stat-label']}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className={styles['tf-course-mgmt-footer']}>
          <div className={styles['tf-course-last-visited']}>
            <span className={styles['tf-live-dot']} />
            Last updated {course.lastUpdated}
          </div>
          <button className={styles['tf-manage-course-btn']} onClick={onManageCourse}>
            Manage Course
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
