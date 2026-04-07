import { useState, useRef, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

function CourseReadingModal({ course, onClose, onProgressUpdate }) {
  const [progress, setProgress] = useState(course?.progress || 0);
  const [isCompleting, setIsCompleting] = useState(false);
  const contentRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, []);

  const handleScroll = (e) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const scrollableDistance = scrollHeight - clientHeight;
    
    if (scrollableDistance <= 0) {
      setProgress(100);
      return;
    }

    const scrollPercentage = Math.round((scrollTop / scrollableDistance) * 100);
    setProgress(Math.min(scrollPercentage, 100));
  };

  const handleComplete = () => {
    setIsCompleting(true);
    setProgress(100);
    
    if (onProgressUpdate) {
      onProgressUpdate({
        courseId: course._id,
        progress: 100,
        completedAt: new Date(),
        lastVisited: new Date()
      });
    }

    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleCancel = () => {
    if (onProgressUpdate) {
      onProgressUpdate({
        courseId: course._id,
        progress: progress,
        lastVisited: new Date()
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="relative flex h-[90vh] w-full max-w-3xl flex-col rounded-xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-gray-900 truncate pr-4">
              {course?.title || 'Course Content'}
            </h2>
            <p className="text-sm text-gray-500">{course?.category || 'Module'}</p>
          </div>
          <button
            onClick={handleCancel}
            className="flex-shrink-0 rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <IoClose size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-6 py-3">
          <span className="text-sm font-medium text-gray-600">
            Reading Progress
          </span>
          <span className={`text-sm font-bold ${progress >= 100 ? 'text-green-600' : 'text-blue-900'}`}>
            {progress}%
          </span>
        </div>
        
        <div className="h-1.5 bg-gray-200">
          <div 
            className={`h-full transition-all duration-300 ease-out ${progress >= 100 ? 'bg-green-500' : 'bg-blue-900'}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-6"
        >
          <div ref={contentRef}>
            <div className="prose max-w-none">
              <div className="bg-black rounded-xl h-[800px] flex items-center justify-center">
                <p className="text-white/50 text-lg">Course Video Placeholder</p>
              </div>
              
              <div className="mt-8 space-y-6">
                <h3 className="text-xl font-bold text-gray-900">Introduction</h3>
                <p className="text-gray-600 leading-relaxed">
                  Welcome to this course module. This content is designed to help you understand the fundamentals and build practical skills. 
                  Continue scrolling to track your progress through the material.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900">Main Content</h3>
                <p className="text-gray-600 leading-relaxed">
                  This section covers the core concepts you need to master. Take your time to read through each section carefully.
                  The progress bar at the top tracks how much of the content you've viewed.
                </p>
                
                <div className="bg-gray-100 rounded-lg p-4 my-6">
                  <p className="font-medium text-gray-700">💡 Key Point</p>
                  <p className="text-gray-600 text-sm mt-1">
                    Keep scrolling to mark this lesson as complete. Your progress is automatically saved if you leave early.
                  </p>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900">Deep Dive</h3>
                <p className="text-gray-600 leading-relaxed">
                  This advanced section explores the topic in greater detail. Apply what you've learned in the previous sections 
                  to understand these concepts better.
                </p>
                
                <p className="text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900">Examples</h3>
                <p className="text-gray-600 leading-relaxed">
                  Let's look at some practical examples to solidify your understanding. These real-world applications will help you 
                  see how the concepts work in practice.
                </p>
                
                <div className="bg-blue-50 rounded-lg p-4 my-6">
                  <p className="font-medium text-blue-700">📚 Example</p>
                  <p className="text-gray-600 text-sm mt-1">
                    Here's a practical demonstration of the concept...
                  </p>
                </div>
                
                <p className="text-gray-600 leading-relaxed">
                  Continue reading to learn more about advanced techniques and best practices in this field.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900">Advanced Topics</h3>
                <p className="text-gray-600 leading-relaxed">
                  Now that you understand the basics, let's explore some advanced topics that will help you become proficient.
                </p>
                
                <p className="text-gray-600 leading-relaxed">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                
                <h3 className="text-xl font-bold text-gray-900">Conclusion</h3>
                <p className="text-gray-600 leading-relaxed">
                  You've reached the end of this module! Great job completing the content. Make sure to review any sections 
                  you found challenging.
                </p>
                
                <div className="bg-green-50 rounded-lg p-6 my-8 text-center">
                  <p className="text-2xl mb-2">🎉</p>
                  <p className="font-bold text-green-700">End of Content</p>
                  <p className="text-sm text-green-600 mt-1">
                    You've scrolled through all the material!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 flex items-center justify-between border-t border-gray-200 bg-white px-6 py-4">
          <button
            onClick={handleCancel}
            className="px-6 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium"
          >
            {progress > 0 ? 'Save & Exit' : 'Cancel'}
          </button>
          
          {progress >= 100 ? (
            <button
              onClick={handleComplete}
              disabled={isCompleting}
              className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
            >
              {isCompleting ? 'Completing...' : '✓ Mark as Complete'}
            </button>
          ) : (
            <p className="text-sm text-gray-500">
              Scroll to {100 - progress}% more to complete
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseReadingModal;
