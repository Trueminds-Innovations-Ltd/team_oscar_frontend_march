import { useState, useEffect, useContext } from 'react';
import { IoClose } from 'react-icons/io5';
import api from '../../../shared/api';
import LMSContext from '../../../contexts/LMSContext';

function CreateStudySession({ isOpen, onClose, onSuccess }) {
  const { user, token } = useContext(LMSContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    course: '',
    subTopic: '',
    fileUrl: '',
    linkUrl: '',
    startDate: '',
    uploading: false
  });
  
  const [error, setError] = useState('');

  const tutorInterests = user?.interests || [];
  const tutorSubTopics = user?.subTopics || [];

  useEffect(() => {
    if (isOpen && token) {
      fetchCourses();
    }
  }, [isOpen, token]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await api.get('/courses/tutor', token);
      const allCourses = response.data.courses || [];
      
      setCourses(allCourses);
    } catch (err) {
      console.error('Failed to fetch courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const selectedCourse = courses.find(c => c._id === formData.course);
  
  const availableSubTopics = tutorSubTopics;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (name === 'course') {
      setFormData(prev => ({ ...prev, subTopic: '' }));
    }
    setError('');
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        setError('Please upload a PDF or DOCX file');
        return;
      }
      
      setFormData(prev => ({ ...prev, fileUrl: file.name, uploading: true }));
      
      try {
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);
        
        const response = await fetch('http://localhost:3000/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formDataUpload
        });
        
        const result = await response.json();
        
        if (result.success) {
          setFormData(prev => ({ ...prev, fileUrl: result.fileUrl, uploading: false }));
        } else {
          setError('Failed to upload file');
          setFormData(prev => ({ ...prev, fileUrl: '', uploading: false }));
        }
      } catch (err) {
        setError('Failed to upload file');
        setFormData(prev => ({ ...prev, fileUrl: '', uploading: false }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.course || !formData.subTopic || !formData.startDate) {
      setError('Please fill in all required fields');
      return;
    }

    if (!formData.fileUrl && !formData.linkUrl) {
      setError('Please provide either a file or a link');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        course: formData.course,
        subTopic: formData.subTopic,
        fileUrl: formData.fileUrl,
        linkUrl: formData.linkUrl,
        startDate: formData.startDate
      };

      await api.post('/study-sessions', payload, token);
      
      setFormData({
        course: '',
        subTopic: '',
        fileUrl: '',
        linkUrl: '',
        startDate: '',
        uploading: false
      });
      
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create study session');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-lg rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-bold text-gray-900">Create Study Session</h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <IoClose size={24} className="text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Select Course <span className="text-red-500">*</span>
            </label>
            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
              disabled={loading}
            >
              <option value="">Choose a course...</option>
              {courses.map(course => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
            {courses.length === 0 && !loading && (
              <p className="mt-1 text-sm text-gray-500">
                No courses match your interests. Create a course first.
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Sub-topic <span className="text-red-500">*</span>
            </label>
            <select
              name="subTopic"
              value={formData.subTopic}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
              disabled={!formData.course}
            >
              <option value="">Choose a sub-topic...</option>
              {availableSubTopics.map(subTopic => (
                <option key={subTopic} value={subTopic}>
                  {subTopic}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Upload File (PDF or DOCX, max 50MB)
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
            />
            {formData.uploading && (
              <p className="mt-1 text-sm text-blue-600">Uploading...</p>
            )}
            {formData.fileUrl && !formData.uploading && (
              <p className="mt-1 text-sm text-green-600">✓ File uploaded</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Or provide a link (YouTube, Google Meet, etc.)
            </label>
            <input
              type="url"
              name="linkUrl"
              value={formData.linkUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none"
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-blue-900 py-3 font-medium text-white hover:bg-blue-800 disabled:opacity-50"
          >
            {submitting ? 'Creating...' : 'Create Study Session'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateStudySession;