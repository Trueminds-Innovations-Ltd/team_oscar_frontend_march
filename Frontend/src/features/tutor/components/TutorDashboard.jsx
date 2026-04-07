import React from "react";
import styles from "../dashboard.module.css";
import TopBar from "./TopBar";
import Greeting from "./Greeting";
import SummaryCards from "./SummaryCards";
import CourseCard from "./CourseCard";
import PendingReviews from "./PendingReviews";
import TutorInsights from "./TutorInsights";

const TutorDashboard = () => {
  return (
    <div className={styles["tf-main"]}>
      <TopBar />

      <div className={styles["tf-content"]}>
        <Greeting name="Maria" taskCount={8} />
        <SummaryCards />
        <CourseCard />

        <div className={styles["tf-bottom-grid"]}>
          <PendingReviews />
          <TutorInsights />
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
