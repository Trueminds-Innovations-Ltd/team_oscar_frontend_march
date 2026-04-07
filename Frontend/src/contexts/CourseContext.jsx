import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../shared/api';

const CourseContext = createContext();

const MAX_INCOMPLETE_COURSES = 3;

export function CourseProvider({ children }) {
  const [activeCourse, setActiveCourse] = useState(null);
  const [inProgressCourses, setInProgressCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [studySessions, setStudySessions] = useState([]);
  const [studySessionProgress, setStudySessionProgress] = useState({});
  const [error, setError] = useState(null);
  const [readingModal, setReadingModal] = useState({ isOpen: false, course: null });
  const [studySessionModal, setStudySessionModal] = useState({ isOpen: false, session: null });

  const loadCourses = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/courses/my-courses', token);
      
      const courses = response.data?.courses || [];
      setEnrolledCourses(courses);
      
      const inProgress = courses.filter(c => c.progress > 0 && c.progress < 100);
      setInProgressCourses(inProgress);
      
      const active = inProgress[0];
      if (active) {
        setActiveCourse(active);
      }
    } catch (err) {
      console.error('Failed to load courses:', err.message);
      loadMockData();
    }
  }, []);

  const loadStudySessions = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, skipping study sessions load');
        return;
      }
      console.log('Loading study sessions with token:', token);
      
      const response = await api.get('/study-sessions/student', token);
      console.log('Study sessions response:', response);
      console.log('Study sessions data:', response.data);
      
      if (response.data && response.data.sessions) {
        setStudySessions(response.data.sessions);
      }
      
      try {
        const progressResponse = await api.get('/study-sessions/my-progress', token);
        console.log('Progress response:', progressResponse);
        if (progressResponse.data?.progressMap) {
          setStudySessionProgress(progressResponse.data.progressMap);
        }
      } catch (progressErr) {
        console.error('Failed to load progress (non-critical):', progressErr.message);
      }
    } catch (err) {
      console.error('Failed to load study sessions (non-critical):', err.message);
    }
  }, []);

  useEffect(() => {
    loadCourses();
    loadStudySessions();
  }, [loadCourses, loadStudySessions]);

  const loadMockData = () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const mockCourses = [
      {
        _id: 'mock1',
        title: 'UI/UX Design Fundamentals',
        category: 'Design',
        moduleNumber: 1,
        totalModules: 8,
        progress: 60,
        lastVisited: new Date(Date.now() - 2 * 60 * 60 * 1000),
        nextUp: 'Wireframing Basics',
        isActive: true,
        availableDate: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        _id: 'mock2',
        title: 'React & TypeScript Masterclass',
        category: 'Frontend',
        moduleNumber: 1,
        totalModules: 6,
        progress: 30,
        lastVisited: new Date(Date.now() - 24 * 60 * 60 * 1000),
        nextUp: 'React Hooks Deep Dive',
        isActive: false,
        availableDate: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        _id: 'mock3',
        title: 'Python for Data Analysis',
        category: 'Data',
        moduleNumber: 2,
        totalModules: 5,
        progress: 0,
        lastVisited: null,
        nextUp: 'Pandas Basics',
        isActive: false,
        availableDate: new Date(today.getTime() + 1 * 24 * 60 * 60 * 1000)
      },
    ];
    
    setEnrolledCourses(mockCourses);
    setInProgressCourses(mockCourses.filter(c => c.progress > 0 && c.progress < 100));
    setActiveCourse(mockCourses[0]);
  };

  const openStudySessionModal = (session) => {
    setStudySessionModal({ isOpen: true, session });
  };

  const closeStudySessionModal = () => {
    setStudySessionModal({ isOpen: false, session: null });
    loadStudySessions();
  };

  const getIncompleteStudySessions = useCallback(() => {
    const incomplete = [];
    studySessions.forEach(session => {
      const progress = studySessionProgress[session._id];
      if (progress && progress.progress > 0 && progress.progress < 100) {
        incomplete.push({ session, progress: progress.progress, lastPosition: progress.lastPosition || 0 });
      }
    });
    return incomplete.sort((a, b) => b.lastPosition - a.lastPosition);
  }, [studySessions, studySessionProgress]);

  const getLatestIncomplete = useCallback(() => {
    const incomplete = getIncompleteStudySessions();
    return incomplete[0]?.session || null;
  }, [getIncompleteStudySessions]);

  const getIncompleteCount = useCallback(() => {
    return getIncompleteStudySessions().length;
  }, [getIncompleteStudySessions]);

  const canStartCourse = useCallback((courseId) => {
    const course = enrolledCourses.find(c => c._id === courseId);
    if (!course) return false;
    
    if (course.progress > 0 && course.progress < 100) return true;
    
    return getIncompleteCount() < MAX_INCOMPLETE_COURSES;
  }, [enrolledCourses, getIncompleteCount]);

  const openReadingModal = (course) => {
    setReadingModal({ isOpen: true, course });
  };

  const closeReadingModal = () => {
    setReadingModal({ isOpen: false, course: null });
  };

  const startCourse = async (courseId) => {
    const course = enrolledCourses.find(c => c._id === courseId);
    if (!course) return;

    if (!canStartCourse(courseId)) {
      alert('Complete at least one course to start a new one');
      return;
    }

    if (activeCourse && activeCourse._id !== courseId && activeCourse.progress > 0 && activeCourse.progress < 100) {
      setInProgressCourses(prev => {
        const filtered = prev.filter(c => c._id !== activeCourse._id);
        return [...filtered, { ...activeCourse, isActive: false }];
      });
    }

    const courseWithProgress = { ...course, isActive: true };
    setActiveCourse(courseWithProgress);

    if (course.progress === 0) {
      setInProgressCourses(prev => {
        const filtered = prev.filter(c => c._id !== courseId);
        return [...filtered, courseWithProgress];
      });

      try {
        const token = localStorage.getItem('token');
        if (course.lessons && course.lessons.length > 0) {
          await api.post(`/courses/${courseId}/lessons/${course.lessons[0]._id}/start`, {}, token);
        }
      } catch (err) {
        console.error('Failed to start lesson:', err);
      }
    }

    openReadingModal(course);
  };

  const updateProgress = async ({ courseId, progress, completedAt, lastVisited }) => {
    const updatedCourse = enrolledCourses.find(c => c._id === courseId);
    if (!updatedCourse) return;

    const updated = {
      ...updatedCourse,
      progress: progress || updatedCourse.progress,
      lastVisited: lastVisited || new Date(),
      isActive: false
    };

    if (progress >= 100) {
      updated.completedAt = completedAt;
    }

    setEnrolledCourses(prev => prev.map(c => c._id === courseId ? updated : c));

    if (activeCourse?._id === courseId) {
      setActiveCourse(null);
    }

    setInProgressCourses(prev => {
      const filtered = prev.filter(c => c._id !== courseId);
      if (progress > 0 && progress < 100) {
        return [...filtered, updated];
      }
      return filtered;
    });

    if (progress >= 100) {
      const nextCourse = enrolledCourses.find(c => c._id !== courseId && c.progress > 0 && c.progress < 100);
      if (nextCourse) {
        setActiveCourse(nextCourse);
      }
    }

    try {
      const token = localStorage.getItem('token');
      await api.put(`/courses/${courseId}/progress`, {
        progressPercentage: progress,
        completedAt,
        lastVisited
      }, token);
    } catch (err) {
      console.error('Failed to update progress:', err);
    }
  };

  const value = {
    activeCourse,
    inProgressCourses,
    enrolledCourses,
    studySessions,
    studySessionProgress,
    error,
    readingModal,
    studySessionModal,
    openReadingModal,
    closeReadingModal,
    openStudySessionModal,
    closeStudySessionModal,
    startCourse,
    updateProgress,
    loadCourses,
    loadStudySessions,
    canStartCourse,
    getIncompleteCount,
    getIncompleteStudySessions,
    getLatestIncomplete,
    maxIncomplete: MAX_INCOMPLETE_COURSES
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
}

export default CourseContext;
