import React, { useState } from 'react';
import { useContext } from "react";
import Sidebar from "../../../shared/layout/Sidebar";
import TopBar from './TopBar';
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
        <TopBar 
          onOpenSidebar={() => setIsSidebarOpen(true)} 
          isSidebarOpen={isSidebarOpen} 
        />

        <div className={styles['tf-content']}>
          <div className="flex justify-between items-center mb-6">
            <Greeting name={user?.name || "Tutor"} taskCount={8} />
            <button
              onClick={() => setShowCreateSession(true)}
              className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 font-medium text-sm"
            >
              + Create Study Session
            </button>
          </div>
          
          <SummaryCards />
          <CourseCard />

          <div className={styles['tf-bottom-grid']}>
            <PendingReviews />
            <TutorInsights />
          </div>
        </div>
      </div>

      <CreateStudySession 
        isOpen={showCreateSession} 
        onClose={() => setShowCreateSession(false)} 
      />
    </div>
  );
};

export default TutorDashboard;
