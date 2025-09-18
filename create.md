{
  "task": "Create end-to-end Profile Management Application (React + TypeScript + MUI + Redux Toolkit + Node/Express + MongoDB) and prepare for Vercel deployment",
  "priority": "high",
  "projectSummary": {
    "goal": "Implement a production-feasible Profile Management app where users can create/update/view/delete a single user profile. Frontend: React + TypeScript (.tsx) with MUI styling; Backend: Node/Express + TypeScript (optional) using MongoDB; State: Redux Toolkit; Routing: React Router; Persistence: MongoDB + localStorage sync.",
    "constraints": [
      "Use Typescript and .tsx for all React components",
      "Use MUI for styling (assignment requirement)",
      "Follow clean, modular file structure and professional commit history",
      "Do not commit secrets; read MongoDB URI from .env as MONGODB_URI",
      "Deliver runnable app, tests, README, and deployment configuration for Vercel"
    ]
  },
  "preflight_codebaseAnalysis": {
    "goal": "If Cursor runs inside an existing repo, do a full code scan first. If repo is empty, initialize the project per the plan.",
    "steps": [
      "List root files and package.json(s).",
      "Detect monorepo or single repo structure and adapt.",
      "Detect preferred backend structure (Express, Nest, NextAPI). If Next.js exists and is allowed use Next API routes; otherwise implement Express server.",
      "Report any conflicting dependencies or conventions and propose minor adaptions."
    ],
    "deliverable": "Produce 'Codebase Analysis Report' with findings and exact plan to proceed. Do NOT modify code before user confirms if repo has conflicting conventions; otherwise proceed."
  },
  "env_and_secrets": {
    "rules": [
      "DO NOT hardcode the MongoDB connection string in source. Use .env with variable MONGODB_URI and add .env to .gitignore.",
      "If user provided connection string, instruct Cursor to store it only locally and not commit.",
      "Add sample env: .env.example with placeholders (MONGODB_URI=https://replace_me, REACT_APP_API_BASE_URL=http://localhost:4000/api)."
    ]
  },
  "tech_stack": {
    "frontend": {
      "framework": "React (Vite or Create React App) + TypeScript",
      "styling": "MUI v5 (emotion or styled-engine as in repo)",
      "state": "Redux Toolkit (RTK) + RTK Query optional for API calls",
      "routing": "React Router v6",
      "forms/validation": "react-hook-form + zod (for Typescript validation) or yup as fallback",
      "linting/format": "ESLint (typescript rules) + Prettier"
    },
    "backend": {
      "runtime": "Node.js (>=16) + TypeScript",
      "framework": "Express + express-async-handler",
      "db": "MongoDB (mongoose)",
      "auth": "None required for assignment; implement basic server-side input validation and CORS",
      "testing": "Jest + supertest for integration endpoints"
    },
    "deployment": {
      "platform": "Vercel for frontend. Backend: either Vercel serverless functions (if using Next) or deploy on Render/Heroku. Provide both guides.",
      "CI": "GitHub Actions sample to run lint + test on push"
    }
  },
  "project_structure": {
    "frontend": {
      "root": "frontend/",
      "suggestedFiles": [
        "frontend/package.json",
        "frontend/vite.config.ts or craco config",
        "frontend/src/main.tsx",
        "frontend/src/App.tsx",
        "frontend/src/index.css",
        "frontend/src/pages/ProfileForm.tsx",
        "frontend/src/pages/ProfileView.tsx",
        "frontend/src/pages/NotFound404.tsx",
        "frontend/src/components/ProfileFormCard.tsx",
        "frontend/src/components/Navbar.tsx",
        "frontend/src/store/index.ts",
        "frontend/src/features/profile/profileSlice.ts",
        "frontend/src/services/apiClient.ts",
        "frontend/src/services/profileApi.ts (RTK Query optional)",
        "frontend/src/hooks/useLocalSync.ts (helper to sync Redux <-> localStorage)",
        "frontend/.env.example"
      ]
    },
    "backend": {
      "root": "backend/",
      "suggestedFiles": [
        "backend/package.json",
        "backend/tsconfig.json",
        "backend/src/index.ts (server entry)",
        "backend/src/app.ts",
        "backend/src/routes/profile.routes.ts",
        "backend/src/controllers/profile.controller.ts",
        "backend/src/services/profile.service.ts",
        "backend/src/models/profile.model.ts (Mongoose schema)",
        "backend/src/utils/errorHandler.ts",
        "backend/src/middlewares/validateRequest.ts",
        "backend/.env.example"
      ]
    }
  },
  "data_model": {
    "profile": {
      "collection": "profiles",
      "fields": {
        "firstName": { "type": "String", "required": true, "minLength": 1 },
        "lastName": { "type": "String", "required": false },
        "email": { "type": "String", "required": true, "unique": true, "format": "email" },
        "age": { "type": "Number", "required": false, "min": 0 },
        "createdAt": "Date",
        "updatedAt": "Date"
      },
      "notes": "Frontend form collects Name as single field. Backend stores firstName & lastName. Split name on first whitespace for storage, but also support separate edit fields."
    }
  },
  "api_contract": {
    "base": "/api/profile",
    "endpoints": [
      {
        "method": "POST",
        "path": "/api/profile",
        "purpose": "Create or update profile (idempotent single-profile app). Body: { name, email, age }. If profile exists (by email) update it.",
        "validation": {
          "name": "required, minLength 3",
          "email": "required, valid email",
          "age": "optional, integer >=0"
        },
        "responses": {
          "201": "{ profile }",
          "400": "{ error: 'validation message' }",
          "500": "{ error: 'server error' }"
        }
      },
      {
        "method": "GET",
        "path": "/api/profile",
        "purpose": "Return saved profile. If no profile exists return 404.",
        "responses": {
          "200": "{ profile }",
          "404": "{ error: 'Profile not found' }",
          "500": "{ error: 'server error' }"
        }
      },
      {
        "method": "PUT",
        "path": "/api/profile",
        "purpose": "Update an existing profile. Body validation same as POST.",
        "responses": { "200": "{ profile }", "400": "...", "404": "..." }
      },
      {
        "method": "DELETE",
        "path": "/api/profile",
        "purpose": "Delete the profile (confirmation from UI).",
        "responses": { "200": "{ message: 'deleted' }", "404": "..." }
      }
    ]
  },
  "frontend_behavior": {
    "flow": [
      "Route /profile-form renders ProfileForm page",
      "ProfileForm uses react-hook-form + zod validation rules (Name >=3 chars, Email valid, Age optional number)",
      "On submit: dispatch Redux action (profile/createOrUpdate) that calls API client. Show spinner and disable submit while pending",
      "On success: store profile in Redux and in localStorage, then navigate to /profile",
      "Route /profile displays profile from Redux; if missing, check localStorage; if still missing call GET /api/profile",
      "404 route configured with React Router '*' -> NotFound404 page",
      "Navbar shows FirstName and LastName (from Redux) if profile exists; else shows 'No Profile' CTA",
      "Edit: ProfileView has Edit button which navigates to /profile-form with form pre-filled with profile data from Redux/localStorage",
      "Delete: ProfileView has Delete button with modal confirm; on confirm call DELETE /api/profile, clear Redux and localStorage and redirect to /profile-form with success toast"
    ]
  },
  "redux_design": {
    "slice": "profileSlice",
    "stateShape": {
      "profile": "Profile | null",
      "status": "'idle'|'loading'|'succeeded'|'failed'",
      "error": "string | null"
    },
    "thunks_or_rtkQuery": [
      "createProfile (POST)", "fetchProfile (GET)", "updateProfile (PUT)", "deleteProfile (DELETE)"
    ],
    "localStorageSync": {
      "strategy": "Persist only profile data (not status) to localStorage on succeeded actions. Hydrate store on app init via useEffect in root or a persisted middleware.",
      "hooks": "provide custom hook useLocalSync to keep store and localStorage consistent"
    }
  },
  "validation_rules": {
    "frontend": {
      "name": { "required": true, "minLength": 3, "errorMessage": "Name must be at least 3 characters." },
      "email": { "required": true, "pattern": "email", "errorMessage": "Enter a valid email." },
      "age": { "optional": true, "pattern": "positive integer", "errorMessage": "Enter a valid age." }
    },
    "backend": "Use express-validator or zod to validate same rules; return 400 with descriptive errors."
  },
  "ui_spec": {
    "theme": "MUI theme with professional palette (primary: #0B74FF or repo default), spacing, and accessible components",
    "components": [
      "Navbar: shows app title and profile first/last name if available",
      "ProfileFormCard: centered responsive card with inputs, validation text, Save & Cancel buttons",
      "ProfileView: clean key-value layout with Edit & Delete buttons and a small avatar placeholder",
      "Toasts: success/error notifications after actions (use notistack or MUI Snackbar)",
      "404: friendly page with link back to /profile-form"
    ],
    "responsiveness": "Mobile-first; components collapse nicely on small screens"
  },
  "error_handling_and_edge_cases": {
    "client": [
      "Show friendly messages for network failures and 4xx/5xx responses",
      "Graceful fallback if localStorage is unavailable (private mode).",
      "Disable form submit while API request active to avoid duplicates"
    ],
    "server": [
      "Return structured errors: { errors: [{ field: 'name', message: '...' }], message: 'Validation failed' }",
      "Catch unhandled exceptions and return 500 with non-sensitive message"
    ]
  },
  "testing_plan": {
    "frontend": [
      "Unit tests for ProfileForm validation using react-hook-form test utils (Jest + React Testing Library)",
      "Integration test for navigation: fill form -> submit -> redirect -> profile displays",
      "Snapshot for Navbar showing name"
    ],
    "backend": [
      "Unit tests for validation functions",
      "Integration tests with supertest: POST/GET/PUT/DELETE endpoints using in-memory MongoDB (mongodb-memory-server)"
    ]
  },
  "dev_and_prod_scripts": {
    "frontend": {
      "dev": "vite or react-scripts start",
      "build": "vite build or react-scripts build",
      "preview": "vite preview",
      "env_switch": "Use .env.development and .env.production; scripts pick REACT_APP_API_BASE_URL accordingly"
    },
    "backend": {
      "dev": "ts-node-dev src/index.ts",
      "build": "tsc",
      "start": "node dist/index.js"
    }
  },
  "migrations_and_data": {
    "seed": "Provide an optional dev-only seeder script to create a sample profile behind a flag (DO NOT run in production).",
    "migration": "No complex migrations needed; but provide script to remove duplicates if multiple profiles exist (keep first or let user choose)."
  },
  "git_and_commits_guideline": {
    "branching": "main (protected), feature/profile-form, feature/profile-api, chore/tests",
    "commit_messages": [
      "feat(profile): add ProfileForm UI with validation",
      "feat(api): implement POST /api/profile create or update",
      "refactor(store): add profileSlice and localStorage sync",
      "test(profile): add unit and integration tests"
    ],
    "PR_requirements": "Each feature should be a separate PR with description, screenshots, and checklist"
  },
  "deployment_instructions": {
    "vercel_frontend": [
      "Create Vercel project linked to GitHub repo",
      "Set environment variable REACT_APP_API_BASE_URL to your backend URL (or use serverless backend)",
      "Add build command (npm run build) and output directory (build or dist)",
      "Set NODE_ENV=production"
    ],
    "backend_deploy_options": [
      "Option A: Deploy as serverless API using Next.js API routes on Vercel — recommended if you prefer single repo",
      "Option B: Deploy Express backend on Render/Heroku and set API_BASE_URL on Vercel frontend",
      "Add MONGODB_URI env var in production config (do not commit)"
    ],
    "post_deploy_checks": [
      "Verify frontend calls /api/profile endpoints successfully",
      "Test create/update/view/delete flows on deployed app",
      "Check logs for errors"
    ]
  },
  "deliverables_checklist": [
    "Frontend source (TypeScript + MUI) with profile pages and components",
    "Backend source (TypeScript + Express) with profile API and validation",
    "Redux store + profileSlice with localStorage sync",
    ".env.example files for frontend and backend (no secrets)",
    "README.md with setup, run, test, and deployment instructions",
    "Unit + integration tests for critical flows",
    "Vercel deployment instructions and verification steps",
    "Clean git history with meaningful commits"
  ],
  "quality_and_best_practices": [
    "Accessibility: ensure labels, ARIA attributes, and keyboard navigation",
    "Security: do not expose MONGODB_URI; use TLS for DB connections in prod",
    "Performance: lazy-load non-critical components and code-split routes",
    "UX: optimistic UI not required here; show clear loading indicators and toasts",
    "Code style: consistent formatting with Prettier and ESLint",
    "Documentation: add inline comments for important logic and README for reviewers"
  ],
  "final_instructions_for_cursor": [
    "1) If repository exists: run 'preflight_codebaseAnalysis' and present the report before making changes.",
    "2) If implementing from scratch: create the project with the structure above, then implement features in small commits per feature.",
    "3) ALWAYS use .env and .env.example. Replace any pasted connection strings with process.env.MONGODB_URI.",
    "4) After implementation, run frontend and backend locally and run tests. Provide a short QA checklist and manual test steps for the user.",
    "5) Output: link to GitHub repo (or instructions to push), the Vercel deployment URL (if available), and README with usage steps."
  ]
}
