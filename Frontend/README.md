## File Structure
src/
│
├── app/                           # App wiring & core setup
│   ├── router/
│   │   ├── index.jsx              # Main router config
│   │   ├── routes.jsx             # Route definitions
│   │   └── ProtectedRoute.jsx     # Auth guard
│   │
│   ├── providers/                 # Global providers composition
│   │   ├── AppProviders.jsx       # Wraps all providers
│   │   ├── QueryProvider.jsx      # React Query (optional)
│   │   └── StoreProvider.jsx      # Redux/Zustand (optional)
│   │
│   └── App.jsx
│
├── features/
│   ├── auth/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── ResetPassword.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── AuthForm.jsx
│   │   │   ├── PasswordInput.jsx
│   │   │   └── AuthHeader.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useLogin.js
│   │   │   ├── useSignup.js
│   │   │   └── useAuth.js
│   │   │
│   │   ├── services/
│   │   │   └── authService.js
│   │   │
│   │   └── index.js
│   │
│   ├── dashboard/
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── StatsCard.jsx
│   │   │   ├── ActivityFeed.jsx
│   │   │   └── DashboardHeader.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useDashboard.js
│   │   │
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
