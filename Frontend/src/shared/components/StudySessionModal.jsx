import { useState, useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import api from '../api';

function StudySessionModal({ session, onClose }) {
  const [progress, setProgress] = useState(0);
  const [lastPosition, setLastPosition] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    loadProgress();
  }, [session._id]);

  const loadProgress = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = `/study-sessions/${session._id}/progress`;
      const response = await api.get(url, token);
      if (response.data?.progress) {
        setProgress(response.data.progress.progress || 0);
        setLastPosition(response.data.progress.lastPosition || 0);
        setCompleted(response.data.progress.completed || false);
      }
    } catch (err) {
      console.error('Failed to load progress:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = async (e) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const scrollableDistance = scrollHeight - clientHeight;
    
    if (scrollableDistance <= 0) {
      updateProgress(100, 100);
      return;
    }

    const scrollPercentage = Math.round((scrollTop / scrollableDistance) * 100);
    const newProgress = Math.min(scrollPercentage, 100);
    setProgress(newProgress);
    setLastPosition(scrollTop);

    if (newProgress >= 100 && !completed) {
      setCompleted(true);
    }

    await saveProgress(newProgress, scrollTop);
  };

  const saveProgress = async (prog, pos) => {
    try {
      const token = localStorage.getItem('token');
      await api.post(`/study-sessions/${session._id}/progress`, {
        progress: prog,
        lastPosition: pos
      }, token);
    } catch (err) {
      console.error('Failed to save progress:', err);
    }
  };

  useEffect(() => {
    if (!loading && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollTop = lastPosition;
    }
  }, [loading, lastPosition]);

  const handleClose = async () => {
    await saveProgress(progress, lastPosition);
    onClose();
  };

  const formatContent = (content) => {
    if (!content) return null;
    
    const paragraphs = content.split('\n').filter(p => p.trim());
    
    return paragraphs.map((para, index) => {
      if (para.match(/^#{1,6}\s/)) {
        const level = para.match(/^#+/)[0].length;
        const text = para.replace(/^#+\s/, '');
        const sizes = ['text-3xl', 'text-2xl', 'text-xl', 'text-lg', 'text-base', 'text-sm'];
        return <h key={index} className={`${sizes[level-1]} font-bold text-gray-900 mt-6 mb-3`}>{text}</h>;
      }
      
      if (para.match(/^[-*]\s/)) {
        return <li key={index} className="ml-4 text-gray-700 mb-1">{para.replace(/^[-*]\s/, '')}</li>;
      }
      
      if (para.match(/^\d+\.\s/)) {
        return <li key={index} className="ml-4 text-gray-700 mb-1">{para.replace(/^\d+\.\s/, '')}</li>;
      }
      
      return <p key={index} className="text-gray-700 mb-4 leading-relaxed">{para}</p>;
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="relative flex h-[90vh] w-full max-w-4xl flex-col rounded-xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-gray-900 truncate pr-4">
              {session.course?.title || 'Study Session'}
            </h2>
            <p className="text-sm text-gray-500">{session.subTopic} • {session.tutor?.name}</p>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <IoClose size={24} className="text-gray-500" />
          </button>
        </div>

        <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-6 py-3">
          <span className="text-sm font-medium text-gray-600">
            Reading Progress
          </span>
          <span className={`text-sm font-bold ${completed ? 'text-green-600' : 'text-blue-900'}`}>
            {progress}%
          </span>
        </div>
        
        <div className="h-1.5 bg-gray-200">
          <div 
            className={`h-full transition-all duration-300 ease-out ${completed ? 'bg-green-500' : 'bg-blue-900'}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-8"
        >
          {session.fileContent ? (
            <div className="max-w-none">
              {formatContent(session.fileContent)}
              
              <div className="mt-12 p-6 bg-green-50 rounded-lg text-center">
                <p className="text-2xl mb-2">🎉</p>
                <p className="font-bold text-green-700">End of Content</p>
                <p className="text-sm text-green-600 mt-1">
                  You've reached the end of the material!
                </p>
              </div>
            </div>
          ) : session.linkUrl ? (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">External Link</h3>
                <a 
                  href={session.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 underline break-all"
                >
                  {session.linkUrl}
                </a>
              </div>
              
              <div className="text-center py-8">
                <p className="text-gray-600">Click the link above to access the study material.</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No content available for this session.</p>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 flex items-center justify-between border-t border-gray-200 bg-white px-6 py-4">
          <button
            onClick={handleClose}
            className="px-6 py-2.5 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors font-medium"
          >
            {progress > 0 ? 'Save & Exit' : 'Cancel'}
          </button>
          
          {completed ? (
            <div className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium">
              ✓ Completed
            </div>
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

export default StudySessionModal;