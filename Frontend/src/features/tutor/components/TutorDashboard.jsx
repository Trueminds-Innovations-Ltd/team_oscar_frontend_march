import React, { useState, useContext } from 'react';
import Sidebar from "../../../shared/layout/Sidebar";
import NavBar from "../../../shared/layout/NavBar";
import Greeting from './Greeting';
import SummaryCards from './SummaryCards';
import CourseCard from './CourseCard';
import PendingReviews from './PendingReviews';
import TutorInsights from './TutorInsights';
import LMSContext from "../../../contexts/LMSContext";
import styles from '../dashboard.module.css';
import CreateStudySession from './CreateStudySession';

const TutorDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCreateSession, setShowCreateSession] = useState(false);
  const { user } = useContext(LMSContext);

  return (
    <div className={styles['tf-wrapper']}>
      <Sidebar
        isMobileOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {isSidebarOpen && (
        <button
          type="button"
          className={styles['tf-overlay']}
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close sidebar overlay"
        />
      )}

      <div className={styles['tf-main']}>
        <NavBar 
          onOpenSidebar={() => setIsSidebarOpen(true)} 
          isSidebarOpen={isSidebarOpen} 
        />

        <main className={styles['tf-content']}>
          <Greeting user={user} onCreateSession={() => setShowCreateSession(true)} />
          
          <SummaryCards />
          
          <div className={styles['tf-grid']}>
            <div className={styles['tf-main-column']}>
              <CourseCard onManageCourse={() => {}} />
              <TutorInsights />
            </div>
            
            <div className={styles['tf-side-column']}>
              <PendingReviews onViewAll={() => {}} />
            </div>
          </div>
        </main>
      </div>

      {showCreateSession && (
        <CreateStudySession 
          isOpen={showCreateSession} 
          onClose={() => setShowCreateSession(false)} 
        />
      )}
    </div>
  );
};

export default TutorDashboard;