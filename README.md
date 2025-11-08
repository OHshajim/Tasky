<div align="center">
  <img src="public/logo.png" alt="Tasky Logo" width="150" />
  <h1>Tasky — Smart Task Manager</h1>
  <p>A simple, elegant task management app built with <strong>React</strong>, <strong>TypeScript</strong>, and <strong>Tailwind CSS</strong>. Organize your tasks efficiently with local storage — no backend required.</p>

  <!-- Shields.io Badges -->
  <p>
    <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-18.2-61DAFB?logo=react" alt="React" /></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.2-3178C6?logo=typescript" alt="TypeScript" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite" alt="Vite" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwindcss" alt="Tailwind CSS" /></a>
    <a href="https://ui.shadcn.com/"><img src="https://img.shields.io/badge/shadcn/ui-2023-000000?logo=shadcnui" alt="shadcn/ui" /></a>
    <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT License" /></a>
  </p>
</div>

---

## 🚀 Features
- ✅ Add, edit, and delete tasks
- 🏷️ Set priority levels (Low, Medium, High)
- 📅 Choose deadlines with an interactive calendar
- 🗂️ Filter and sort tasks
- 💾 Local storage persistence (no backend required)
- 🎨 Clean UI with [shadcn/ui](https://ui.shadcn.com)
- ⚡ Built with React, TypeScript, and Vite

---

## 🧩 Tech Stack
| Category          | Tools Used                       |
|-------------------|----------------------------------|
| **Frontend**      | React + TypeScript               |
| **Styling**       | Tailwind CSS + shadcn/ui         |
| **State Management** | React Hooks                    |
| **Icons**         | Lucide React                     |
| **Form Validation** | React Hook Form + Zod           |
| **Build Tool**    | Vite                             |

---

## 🛠️ Installation & Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/OHshajim/Tasky.git
   cd tasky
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run the development server**
    ```bash
    npm run dev
    ```

# Folder Structure
```
    src/
    ├── components/             # Reusable components
    │   ├── ui/                 # shadcn/ui components
    │   ├── TaskForm.tsx        # Task create/edit dialog
    │   ├── TaskList.tsx        # List view for tasks
    │   └── TaskCard.tsx        # Individual task display
    │   └── TaskFilter.tsx      # Individual task state
    │   └── WelcomeDialog.tsx   # Welcome dialog
    ├── hooks/                  # Custom React hooks
    │   └── UseLocalStorage.tsx # Using Localstorage
    │   └── Use-toast.tsx       # Using toast
    ├── types/                  # TypeScript type definitions
    │   └── task.ts
    ├── lib/                    # Utility helpers
    │   └── utils.ts
    ├── pages/                  # All pages
    │   └── Index.ts            # Home page for task management
    │   └── NotFound.ts         # Not Found Page
    ├── App.tsx
    └── main.tsx
```

# 🧑‍💻 Author
### Shajim Ahmed
Web Developer | CST Student
[GitHub](https://github.com/OHshajim/Tasky) | [LinkedIn](https://www.linkedin.com/in/shajim-ahmed/)
