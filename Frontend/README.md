# Team Oscar - Learning Management System (LMS) Frontend

<div align="center">

![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0.1-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2.2-38B2AC?style=flat-square&logo=tailwindcss)
![React Router](https://img.shields.io/badge/React_Router-7.13.2-CA4245?style=flat-square&logo=react-router)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

A modern, responsive Learning Management System frontend built with React and Tailwind CSS. Designed for students and tutors to facilitate seamless online learning experiences.

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Project Structure](#project-structure) • [Development](#development)

</div>

---

## 📋 Overview

**Team Oscar LMS** is a comprehensive Learning Management System frontend that provides an intuitive platform for students and tutors to manage courses, track progress, communicate, and enhance their learning experience through AI-powered features.

This is a full-featured SPA (Single Page Application) built with modern React practices, featuring lazy loading, context-based state management, and a responsive design optimized for all device sizes.

---

## ✨ Features

### Authentication & Onboarding

- **User Authentication**: Secure login and signup with email verification
- **Role-Based Access**: Distinct workflows for students and tutors
- **Email Verification**: Comprehensive email confirmation flow
- **Onboarding Experience**: Guided setup process for new users with experience selection and course preferences

### Course Management

- **Browse Courses**: Comprehensive course catalog with filtering and search
- **Enrollment**: Easy course discovery and enrollment system
- **Active Courses**: Track and manage currently enrolled courses
- **Course Progress**: Visual progress indicators and completion tracking
- **Study Sessions**: Organized learning sessions with materials and resources
- **Course Materials**: Access to downloadable resources and course content

### User Dashboard

- **Student Dashboard**: Personalized student learning hub with quick stats and progress overview
- **Tutor Dashboard**: Course management and student progress tracking for instructors
- **Activity Tracking**: Monitor learning progress and engagement

### Communication

- **Messaging System**: Real-time messaging between students and tutors
- **Message Organization**: Categorized message panels for easy navigation
- **Chat Notifications**: Stay updated with incoming messages

### User Profile

- **Profile Management**: View and edit user information and preferences
- **Profile Customization**: Update personal details and learning preferences
- **User Settings**: Manage account preferences and privacy settings

### AI-Powered Features

- **Floating AI Chat**: Always-accessible AI assistant for learning support
- **Smart Assistance**: Context-aware AI help throughout the platform

### Additional Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Loading States**: Full-page spinners and loading indicators for better UX
- **Modern UI**: Clean, professional interface built with Tailwind CSS
- **Error Handling**: Comprehensive error management and user feedback

---

## 🛠️ Tech Stack

### Frontend Framework & Build Tools

- **React 19.2.4** - Modern UI library with latest hooks and features
- **Vite 8.0.1** - Lightning-fast build tool and dev server
- **React Router 7.13.2** - Client-side routing with lazy loading

### Styling & UI

- **Tailwind CSS 4.2.2** - Utility-first CSS framework
- **PostCSS 8.5.8** - CSS transformations with autoprefixer
- **Ionic React 8.8.3** - Cross-platform UI components
- **Lucide React 1.8.0** - Lightweight icon library
- **React Icons 5.6.0** - Popular icon sets

### State Management & Utilities

- **React Context API** - Global state management (LMSContext, CourseContext)
- **DayJS 1.11.20** - Lightweight date/time handling
- **Ionicons 8.0.13** - Professional icon library

### Development Tools

- **ESLint 9.39.4** - Code quality and style enforcement
- **ESLint Plugin React Hooks** - React hooks best practices
- **ESLint Plugin React Refresh** - Vite HMR support

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Trueminds-Innovations-Ltd/team_oscar_frontend_march.git
   cd team_oscar_frontend_march/Frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration** (if needed)
   - Create a `.env` file in the root directory
   - Configure API endpoints and other environment variables as needed

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

---

## 📁 Project Structure

```
src/
├── App.jsx                          # Root application component
├── index.css                        # Global styles
├── main.jsx                         # Application entry point
│
├── contexts/                        # Global state management
│   ├── LMSContext.jsx              # User auth & app state
│   └── CourseContext.jsx           # Course and enrollment state
│
├── features/                        # Feature-based modules
│   ├── auth/                       # Authentication feature
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── VerifyEmail.jsx
│   │   │   └── EmailConfirmation.jsx
│   │   └── components/
│   │       ├── AuthPages.jsx
│   │       ├── AuthBgLogin.jsx
│   │       ├── AuthBgSignUp.jsx
│   │       ├── LoginForm.jsx
│   │       ├── SignUpForm.jsx
│   │       ├── EmailVerification.jsx
│   │       └── Input.jsx
│   │
│   ├── activecourses/              # Active courses feature
│   │   ├── pages/
│   │   │   └── ActiveCourses.jsx
│   │   └── components/
│   │       ├── ActiveCourseTabs.jsx
│   │       ├── LessonOverviewPanel.jsx
│   │       ├── LessonSidebarPanel.jsx
│   │       └── MaterialsDownloadsPanel.jsx
│   │
│   ├── courses/                    # Course browsing & enrollment
│   │   ├── pages/
│   │   │   └── Courses.jsx
│   │   └── components/
│   │       ├── CoursesContent.jsx
│   │       ├── CoursesControlBar.jsx
│   │       ├── CourseSection.jsx
│   │       └── CourseCard.jsx
│   │
│   ├── student/                    # Student dashboard feature
│   │   ├── components/
│   │   └── pages/
│   │       └── StudentDashboard.jsx
│   │
│   ├── tutor/                      # Tutor dashboard feature
│   │   ├── components/
│   │   │   └── TutorDashboard.jsx
│   │   └── dashboard.module.css
│   │
│   ├── profile/                    # User profile management
│   │   ├── components/
│   │   │   └── EditProfilePage.jsx
│   │   ├── pages/
│   │   │   └── ProfileOverviewPage.jsx
│   │   └── data/
│   │
│   ├── messages/                   # Messaging system
│   │   ├── pages/
│   │   │   └── MessagesPage.jsx
│   │   ├── components/
│   │   │   ├── MessageChatPanel.jsx
│   │   │   ├── MessageListPanel.jsx
│   │   │   ├── MessageIcons.jsx
│   │   │   ├── MessageSectionNav.jsx
│   │   │   └── MessagesShell.jsx
│   │   └── data/
│   │       └── messagesData.js
│   │
│   ├── onboarding/                 # Onboarding feature
│   │   ├── pages/
│   │   │   └── Onboarding.jsx
│   │   ├── components/
│   │   │   ├── AiSupportStep.jsx
│   │   │   ├── BackgroundDecor.jsx
│   │   │   ├── CoursesStep.jsx
│   │   │   ├── ExperienceStep.jsx
│   │   │   └── ...
│   │   └── onboarding.css
│   │
│   └── Spinner/                    # Loading indicators
│       ├── components/
│       │   ├── Spinner.jsx
│       │   └── SpinnerFullPage.jsx
│       ├── Spinner.module.css
│       └── SpinnerFullPage.module.css
│
├── shared/                         # Shared utilities & components
│   ├── api.js                      # API client configuration
│   ├── components/
│   │   ├── ChatWindow.jsx          # AI chat interface
│   │   ├── CourseReadingModal.jsx
│   │   ├── FloatingAIChat.jsx      # Floating AI assistant
│   │   └── StudySessionModal.jsx
│   ├── layout/
│   │   ├── NavBar.jsx              # Top navigation
│   │   ├── NavBarShell.jsx
│   │   └── Sidebar.jsx             # Side navigation
│   ├── hooks/
│   │   └── useSidebarOpen.jsx      # Sidebar state hook
│   ├── ui/                         # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Image.jsx
│   │   ├── Logo.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SummaryCard.jsx
│   │   ├── TextBox.jsx
│   │   └── UserProfile.jsx
│   └── utils/
│       └── dateUtils.js            # Date utilities
│
└── public/                         # Static assets
    └── images/
```

### Architecture Highlights

- **Feature-Based Organization**: Each feature is self-contained with its own pages, components, and data
- **Shared Components**: Reusable UI components and layouts in the `shared/` directory
- **Context API**: Global state management using React Context (`LMSContext`, `CourseContext`)
- **Lazy Loading**: Route-based code splitting for optimal performance
- **Protected Routes**: Authentication guard with `ProtectedRoute` component

---

## 💻 Development

### Available Commands

```bash
# Start development server with hot reload
npm run dev

# Lint code using ESLint
npm run lint

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Development Workflow

1. **Start Dev Server**

   ```bash
   npm run dev
   ```

2. **Make Changes**
   - Edit components and see live updates with Vite's Hot Module Replacement
   - Changes to `.jsx` files trigger instant browser refresh

3. **Linting**

   ```bash
   npm run lint
   ```

   - Ensures code quality and consistency
   - Fixes common issues automatically where possible

4. **Testing During Development**
   - Test on multiple devices using responsive design mode
   - Use browser DevTools for debugging
   - Leverage React DevTools browser extension

### Code Style Guidelines

- **Format**: ESLint configuration enforces consistent code style
- **Naming**: Use PascalCase for components, camelCase for utilities/hooks
- **Component Structure**: Organize components with imports, component definition, and exports
- **CSS Classes**: Use Tailwind CSS utility classes
- **Comments**: Add meaningful comments for complex logic

---

## 🏗️ Building for Production

### Build Process

```bash
npm run build
```

This command:

- Bundles all JavaScript, CSS, and assets
- Minifies code for optimal file sizes
- Generates optimized output in the `dist/` directory
- Outputs an optimized, production-ready build

### Build Output

- **Output Directory**: `dist/`
- **Assets**: `dist/assets/`
- **Entry Point**: `dist/index.html`

### Preview Production Build

```bash
npm run preview
```

This previews the production build locally to verify everything works correctly.

---

## 🌐 Deployment

### Vercel Deployment (Recommended)

The project includes `vercel.json` configuration for seamless Vercel deployment:

```bash
# Deploy to Vercel
vercel
```

**Features**:

- Automatic builds on git push
- Preview deployments for PRs
- Environment variable management
- SPA routing with client-side fallback

### Manual Deployment

1. **Build the Project**

   ```bash
   npm run build
   ```

2. **Deploy `dist/` folder** to your hosting provider:
   - AWS S3 + CloudFront
   - GitHub Pages
   - Netlify
   - Any static hosting service

3. **Configure SPA Routing**: Ensure your server redirects all requests to `index.html` for client-side routing

---

## 📦 Dependencies

### Core Dependencies

| Package          | Version | Purpose                   |
| ---------------- | ------- | ------------------------- |
| react            | 19.2.4  | UI library                |
| react-dom        | 19.2.4  | DOM rendering             |
| react-router-dom | 7.13.2  | Client-side routing       |
| @ionic/react     | 8.8.3   | Cross-platform components |
| dayjs            | 1.11.20 | Date/time utilities       |
| lucide-react     | 1.8.0   | Icon library              |
| react-icons      | 5.6.0   | Popular icons             |

### Dev Dependencies

| Package              | Version | Purpose                |
| -------------------- | ------- | ---------------------- |
| vite                 | 8.0.1   | Build tool             |
| tailwindcss          | 4.2.2   | Styling framework      |
| eslint               | 9.39.4  | Linting                |
| @vitejs/plugin-react | 6.0.1   | React support for Vite |

---

## 🔐 Security & Best Practices

- **Token Storage**: JWT tokens stored in localStorage with secure handling
- **Protected Routes**: Authentication guard prevents unauthorized access
- **HTTPS**: Deploy with HTTPS to secure data transmission
- **Environment Variables**: Store sensitive data in environment files (not committed to repo)
- **Input Validation**: Client-side validation with form handling
- **CORS**: API configured with proper CORS headers

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines

- Follow the existing code style (ESLint enforced)
- Keep components focused and reusable
- Write meaningful commit messages
- Update documentation for new features
- Test changes before submitting PR

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support & Contact

For issues, questions, or feedback:

- **GitHub Issues**: [Create an issue](https://github.com/Trueminds-Innovations-Ltd/team_oscar_frontend_march/issues)
- **Documentation**: Check the wiki or docs folder for detailed guides

---

## 🎯 Roadmap

- [ ] Advanced analytics dashboard
- [ ] Real-time notifications
- [ ] Video conferencing integration
- [ ] Mobile app (React Native)
- [ ] Offline mode support
- [ ] Advanced course recommendations
- [ ] Gamification features

---

## 🙏 Acknowledgments

- Team at Trueminds Innovations Ltd
- React and Vite communities
- All contributors and maintainers

---

<div align="center">

**[⬆ back to top](#team-oscar---learning-management-system-lms-frontend)**

Made with ❤️ by the Team Oscar Development Team

</div>
│   │   └── index.js
│   │
│   ├── courses/
│   │   ├── pages/
│   │   │   ├── Courses.jsx
│   │   │   ├── CourseDetails.jsx
│   │   │   └── LessonViewer.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── CourseCard.jsx
│   │   │   ├── CourseList.jsx
│   │   │   ├── LessonList.jsx
│   │   │   └── VideoPlayer.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useCourses.js
│   │   │   └── useCourseDetails.js
│   │   │
│   │   ├── services/
│   │   │   └── courseService.js
│   │   │
│   │   └── index.js
│   │
│   ├── profile/
│   │   ├── pages/
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── ProfileCard.jsx
│   │   │   └── EditProfileForm.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useProfile.js
│   │   │
│   │   ├── services/
│   │   │   └── profileService.js
│   │   │
│   │   └── index.js
│   │
│   ├── admin/
│   │   ├── pages/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── ManageUsers.jsx
│   │   │   └── ManageCourses.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── UserTable.jsx
│   │   │   ├── CourseTable.jsx
│   │   │   └── AdminSidebar.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useAdmin.js
│   │   │
│   │   ├── services/
│   │   │   └── adminService.js
│   │   │
│   │   └── index.js
│
├── shared/
│   ├── ui/                        # Reusable UI primitives
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Table.jsx
│   │   └── Loader.jsx
│   │
│   ├── layout/                   # App layouts
│   │   ├── AppLayout.jsx
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── AuthLayout.jsx
│   │
│   └── lib/                      # Shared utilities
│       ├── formatters/
│       │   └── formatDate.js
│       │
│       ├── validators/
│       │   └── authValidator.js
│       │
│       └── constants/
│           ├── routes.js
│           └── roles.js
│
├── services/                     # Global API setup
│   ├── apiClient.js              # axios/fetch config
│   ├── interceptors.js           # request/response interceptors
│   └── endpoints.js              # optional central endpoints
│
├── contexts/                     # Only truly global state
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── styles/
│   └── global.css
│
└── main.jsx
