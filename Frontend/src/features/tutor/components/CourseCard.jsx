import React, { useState, useEffect } from 'react';
import styles from '../dashboard.module.css';
import api from '../../../shared/api';

const programTitles = {
  "UI/UX": "UI/UX Design",
  "Frontend": "Frontend Development",
  "Backend": "Backend Development",
  "Data Analysis": "Data Analysis",
  "Product Management": "Product Management",
  "Cloud Engineering": "Cloud Engineering",
  "Networking": "Networking",
  "Cyber Security": "Cyber Security"
};

function getProgramTitle(title) {
  if (!title) return 'Study Session';
  return programTitles[title] || title;
}

const CourseCard = ({ onManageCourse }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    fetchLatestSession();
  }, []);

  const fetchLatestSession = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/notifications/tutor-details', token);
      if (response.data?.latestSession) {
        setSession(response.data.latestSession);
      }
    } catch (error) {
      console.error('Failed to fetch latest session:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles['tf-course-mgmt-card']}>
        <div className={styles['tf-course-mgmt-thumb']}>
          <div className={styles['tf-course-mgmt-thumb-icon']}>
            <div className={styles['tf-thumb-module-badge']}>Loading...</div>
          </div>
        </div>
        <div className={styles['tf-course-mgmt-body']}>
          <div className="p-4 text-center text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className={styles['tf-course-mgmt-card']}>
        <div className={styles['tf-course-mgmt-thumb']}>
          <div className={styles['tf-course-mgmt-thumb-icon']}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
            </svg>
            <div className={styles['tf-thumb-module-badge']}>No Sessions</div>
          </div>
        </div>
        <div className={styles['tf-course-mgmt-body']}>
          <div className={styles['tf-course-mgmt-label']}>Course You're Teaching</div>
          <div className={styles['tf-course-mgmt-title']}>Create your first study session</div>
        </div>
      </div>
    );
  }

  const stats = [
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
      value: session.enrolledCount || 0,
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
      value: 0,
      label: 'Need Help',
    },
    {
      id: 'completed',
      iconBg: '#d1fae5',
      iconStroke: '#065f46',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      value: session.completedCount || 0,
      label: 'Completed',
    },
  ];

  const getHoursLeft = () => {
    const now = new Date();
    const startDate = new Date(session.startDate);
    const diff = startDate - now;
    if (diff <= 0) return 'In progress';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) return `${hours}h Left`;
    const days = Math.floor(hours / 24);
    return `${days}d Left`;
  };

  return (
    <div className={styles['tf-course-mgmt-card']}>
      <div className={styles['tf-course-mgmt-thumb']}>
        <div className={styles['tf-course-mgmt-thumb-icon']}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
          <div className={styles['tf-thumb-module-badge']}>
            {session.totalModules > 0 ? `Module 1 of ${session.totalModules}` : 'Study Session'}
          </div>
        </div>
      </div>

      <div className={styles['tf-course-mgmt-body']}>
        <div className={styles['tf-course-mgmt-label']}>Course You're Teaching</div>
        <div className={styles['tf-course-mgmt-title']}>{getProgramTitle(session.title)}</div>
        <div className={styles['tf-course-mgmt-next']}>{session.subTopic}</div>

        <div className={styles['tf-course-mgmt-progress-label']}>
          <span>Avg. Student Progress - 0% Complete</span>
          <span>{getHoursLeft()}</span>
        </div>
        <div className={styles['tf-course-mgmt-bar']}>
          <div className={styles['tf-course-mgmt-bar-fill']} style={{ width: '0%' }} />
        </div>

        <div className={styles['tf-course-mgmt-stats']}>
          {stats.map((stat) => (
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
            Last updated just now
          </div>
          {onManageCourse && (
            <button className={styles['tf-manage-course-btn']} onClick={onManageCourse}>
              Manage Course
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;