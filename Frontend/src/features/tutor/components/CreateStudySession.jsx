import { useState, useEffect, useContext } from 'react';
import { IoClose } from 'react-icons/io5';
import api from '../../../shared/api';
import LMSContext from '../../../contexts/LMSContext';

const courseTitleToProgram = {
  "Modern React Development": "Frontend",
  "UI/UX Fundamentals": "UI/UX",
  "UI/UX Design Fundamentals": "UI/UX",
  "Advanced Figma for UI/UX": "UI/UX",
  "Node.js Backend Mastery": "Backend",
  "Python for Data Science": "Data Analysis",
  "Product Management Basics": "Product",
  "AWS Cloud Practitioner": "Cloud",
  "Network Security Fundamentals": "Networking",
  "Ethical Hacking Intro": "Cyber Security",
  "Frontend Development": "Frontend",
  "UI/UX Design": "UI/UX",
  "Backend Development": "Backend",
  "Data Analysis": "Data Analysis",
  "Product Management": "Product",
  "Cloud Engineering": "Cloud",
  "Networking": "Networking",
  "Cyber Security": "Cyber Security",
  "Design": "UI/UX",
  "Development": "Frontend"
};

const programNameMapping = {
  "Frontend Development": "Frontend",
  "UI/UX Design": "UI/UX",
  "Backend Development": "Backend",
  "Data Analysis": "Data Analysis",
  "Product Management": "Product",
  "Cloud Engineering": "Cloud",
  "Networking": "Networking",
  "Cyber Security": "Cyber Security"
};

const programSubTopics = {
  "Frontend": ["React", "JavaScript", "TypeScript", "CSS", "Vue.js", "Next.js"],
  "UI/UX": ["Wireframing", "Prototyping", "User Research", "Figma", "Design Systems"],
  "Backend": ["Node.js", "Python", "Java", "Go", "Express.js", "Database Design"],
  "Data Analysis": ["Python", "SQL", "Excel", "Data Visualization", "Statistics"],
  "Product": ["Product Roadmaps", "OKRs", "User Interviews", "Go-to-Market", "Agile/Scrum"],
  "Cloud": ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "DevOps"],
  "Networking": ["CCNA", "Network Security", "Routing & Switching", "Firewalls", "VoIP"],
  "Cyber Security": ["Penetration Testing", "Ethical Hacking", "Security+", "CISSP"]
};

const programLabels = {
  "Frontend": "Frontend Development",
  "UI/UX": "UI/UX Design",
  "Backend": "Backend Development",
  "Data Analysis": "Data Analysis",
  "Product": "Product Management",
  "Cloud": "Cloud Engineering",
  "Networking": "Networking",
  "Cyber Security": "Cyber Security"
};

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

  const tutorPrograms = tutorInterests.map(interest => {
    if (courseTitleToProgram[interest]) return courseTitleToProgram[interest];
    if (Object.values(courseTitleToProgram).includes(interest)) return interest;
    return null;
  }).filter(Boolean);

  useEffect(() => {
    if (isOpen && token) {
      fetchCourses();
    }
  }, [isOpen, token]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const tutorInterestsList = user?.interests || [];
      const tutorSubTopicsList = user?.subTopics || [];
      
      console.log('Tutor interests:', tutorInterestsList);
      console.log('Tutor subTopics:', tutorSubTopicsList);
      
      const programSubTopicsMap = {
        "Frontend": ["React", "JavaScript", "TypeScript", "CSS", "Vue.js", "Next.js"],
        "UI/UX": ["Wireframing", "Prototyping", "User Research", "Figma", "Design Systems"],
        "Backend": ["Node.js", "Python", "Java", "Go", "Express.js", "Database Design"],
        "Data Analysis": ["Python", "SQL", "Excel", "Data Visualization", "Statistics"],
        "Product": ["Product Roadmaps", "OKRs", "User Interviews", "Go-to-Market", "Agile/Scrum"],
        "Cloud": ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "DevOps"],
        "Networking": ["CCNA", "Network Security", "Routing & Switching", "Firewalls", "VoIP"],
        "Cyber Security": ["Penetration Testing", "Ethical Hacking", "Security+", "CISSP"]
      };
      
      const courseTitleToProgram = {
        "Frontend Development": "Frontend",
        "UI/UX Design": "UI/UX",
        "Backend Development": "Backend",
        "Data Analysis": "Data Analysis",
        "Product Management": "Product",
        "Cloud Engineering": "Cloud",
        "Networking": "Networking",
        "Cyber Security": "Cyber Security"
      };
      
      const programsToShow = tutorInterestsList.map(interest => {
        return courseTitleToProgram[interest] || interest;
      }).filter(Boolean);
      
      console.log('Programs to show:', programsToShow);
      
      const coursesData = programsToShow.map(program => ({
        _id: program,
        title: program,
        subTopics: programSubTopicsMap[program] || [],
        isProgram: true
      }));
      
      console.log('Courses data:', coursesData);
      setCourses(coursesData);
    } catch (err) {
      console.error('Failed to process courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const selectedCourse = courses.find(c => c._id === formData.course);
  
  const getProgramForCourse = (courseTitle) => {
    return courseTitleToProgram[courseTitle] || courseTitle;
  };
  
  const selectedProgram = selectedCourse ? getProgramForCourse(selectedCourse.title) : null;
  
  const getSubTopicsForProgram = (program) => {
    const map = {
      "Frontend": ["React", "JavaScript", "TypeScript", "CSS", "Vue.js", "Next.js"],
      "UI/UX": ["Wireframing", "Prototyping", "User Research", "Figma", "Design Systems"],
      "Backend": ["Node.js", "Python", "Java", "Go", "Express.js", "Database Design"],
      "Data Analysis": ["Python", "SQL", "Excel", "Data Visualization", "Statistics"],
      "Product": ["Product Roadmaps", "OKRs", "User Interviews", "Go-to-Market", "Agile/Scrum"],
      "Cloud": ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "DevOps"],
      "Networking": ["CCNA", "Network Security", "Routing & Switching", "Firewalls", "VoIP"],
      "Cyber Security": ["Penetration Testing", "Ethical Hacking", "Security+", "CISSP"]
    };
    return map[program] || [];
  };
  
  // Get sub-topics the tutor is enrolled in for this program
  const enrolledSubTopicsForProgram = tutorSubTopics.filter(st => {
    const allProgramSubTopics = getSubTopicsForProgram(selectedProgram);
    return allProgramSubTopics.includes(st);
  });
  
  // Show only enrolled sub-topics if available, otherwise show all for the program
  const availableSubTopics = enrolledSubTopicsForProgram.length > 0 
    ? enrolledSubTopicsForProgram 
    : (selectedProgram ? getSubTopicsForProgram(selectedProgram) : tutorSubTopics);

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
      const selectedProgram = courses.find(c => c._id === formData.course);
      const programTitle = selectedProgram ? (programLabels[selectedProgram.title] || selectedProgram.title) : '';
      
      const payload = {
        course: formData.course,
        courseName: programTitle,
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
              <option value="">Choose a program...</option>
              {courses.map(course => (
                <option key={course._id} value={course._id}>
                  {programLabels[course.title] || course.title}
                </option>
              ))}
            </select>
            {courses.length === 0 && !loading && (
              <p className="mt-1 text-sm text-gray-500">
                You are not enrolled in any programs. Please enroll in a program first to create study sessions.
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