# Doings - Todo List Application

A modern, feature-rich todo list application built with vanilla JavaScript, featuring project management, task filtering, sorting capabilities, and persistent IndexedDB storage.

## Features

### Task Management
- **Create Tasks**: Add tasks with name, description, due date, and priority levels
- **Edit Tasks**: Modify existing tasks with full form validation
- **Delete Tasks**: Remove tasks with confirmation dialogs
- **Task Completion**: Mark tasks as complete/incomplete with visual feedback
- **Priority Levels**: High, Medium, and Low priority with color-coded indicators
- **Task Sorting**: Sort tasks by due date (ascending/descending) or priority (ascending/descending)

### Project Organization
- **Create Projects**: Organize tasks into custom projects
- **Project Management**: Edit and delete projects with automatic task handling
- **Task Assignment**: Assign tasks to specific projects during creation or editing
- **Project Views**: View all tasks within a specific project
- **Project Descriptions**: Add detailed descriptions to projects

### Advanced Filtering
- **All Tasks**: View complete task list
- **Today**: Tasks due today (local time)
- **Overdue**: Past due incomplete tasks
- **This Week**: Tasks due within current week (Sunday to Saturday)
- **Completed**: All finished tasks
- **High Priority**: Tasks marked as high priority

### Search & Navigation
- **Real-time Search**: Search tasks by name and description with instant results
- **Active State Management**: Visual indicators for current view
- **Unified Navigation**: Seamless switching between filters and projects
- **Sort Dropdown**: Interactive dropdown with click-outside-to-close functionality

### Data Persistence
- **IndexedDB Storage**: Modern browser database for structured data storage
- **Asynchronous Operations**: Non-blocking database operations with Promise-based API
- **Relationship Management**: Maintains task-project associations with proper data integrity
- **Error Handling**: Robust database operations with graceful fallback handling
- **Local Time Support**: All date operations use local timezone

## Architecture

### Modular Design
The application follows a clean separation of concerns with dedicated modules:

- **`src/module.js`**: Core data models (Task, Project classes), business logic, and IndexedDB operations
- **`src/events.js`**: Event handling, user interactions, and dropdown management
- **`src/dialog.js`**: Modal dialog management for task/project forms
- **`src/render.js`**: DOM manipulation, UI rendering, and sort dropdown creation
- **`src/utils.js`**: HTML sanitization utilities for XSS prevention
- **`src/styles.css`**: Modern CSS with custom properties, responsive design, and dropdown styling
- **`src/index.js`**: Application initialization and module coordination
- **`src/template.html`**: HTML template for webpack
- **`assets/`**: SVG icons for UI elements

### Key Design Patterns
- **Event Delegation**: Efficient handling of dynamic content with unified event listeners
- **Factory Pattern**: Task and Project class constructors with validation
- **Module Pattern**: Clean imports/exports with ES6 modules
- **Promise-based Storage**: Asynchronous IndexedDB operations with proper error handling
- **State Management**: Centralized sort state tracking and active view rendering
- **Security-First**: XSS prevention through HTML sanitization and safe DOM manipulation

## 🛠️ Technical Stack

- **Frontend**: Vanilla JavaScript (ES6+) with async/await
- **Styling**: Modern CSS with Grid, Flexbox, and CSS Custom Properties
- **Build Tool**: Webpack 5 with development and production configurations
- **Storage**: IndexedDB API for structured client-side storage
- **Icons**: SVG assets (plus.svg, sort.svg)
- **Security**: Input validation and XSS prevention
- **Testing**: Basic test setup with HTML/CSS files

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd todo-list

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Development
```bash
# Start webpack dev server with hot reload
npm start
```

The application will open at `http://localhost:8080`

## Usage

### Creating Tasks
1. Click the "+" button next to "TASK" in the sidebar
2. Fill in task details (name, description, due date, priority)
3. Optionally assign to a project
4. Click "Save Task"
5. Tasks are automatically sorted based on current sort setting

### Managing Projects
1. Click the "+" button next to "PROJECTS"
2. Enter project name and description
3. Use project action buttons to:
   - Add tasks directly to the project
   - Edit project details
   - Delete project (tasks remain but become unassigned)

### Sorting Tasks
1. Click the sort button in the header
2. Select from dropdown options:
   - Due Date Ascending/Descending
   - Priority Ascending/Descending
3. Click outside dropdown to close
4. Sort setting persists across all views

### Filtering & Search
- Use sidebar buttons to filter tasks by criteria
- Use the search bar to find tasks by name or description
- Click project names to view project-specific tasks
- Week filter shows Sunday to Saturday of current week

### Task Operations
- **Complete**: Check the checkbox next to any task
- **Edit**: Click the pencil icon on task cards
- **Delete**: Click the trash icon with confirmation
- **Sort**: Tasks automatically re-sort after creation/editing

## Design Features

### Responsive Layout
- CSS Grid-based layout with flexible columns
- Mobile-friendly responsive design
- Consistent spacing and typography

### Visual Feedback
- Hover effects and smooth transitions
- Active state indicators for filters and projects
- Priority-based color coding (red/orange/green)
- Completion state styling with strikethrough
- Interactive dropdown with hover animations
- Transform effects on sort options

### User Experience
- Intuitive navigation with clear visual hierarchy
- Form validation and error handling
- Confirmation dialogs for destructive actions
- Real-time search with instant results

## 🔧 Configuration

### Webpack Configuration
- **Development**: Hot reload, source maps, dev server on port 8080
- **Production**: Minification, optimization, asset bundling
- **Common**: Shared loaders for HTML, CSS, SVG assets, and file processing
- **Entry Point**: `src/index.js` with automatic HTML template injection

### Browser Support
- Modern browsers with ES6+ support
- IndexedDB API support required
- CSS Grid and Flexbox support
- Promise/async-await support
- Local timezone support for date operations
- Crypto.randomUUID() for unique IDs

## Project Status

**Current Version**: 1.0.0

### Future Enhancements
- Drag & drop task reordering
- Task categories/tags system
- Due date notifications
- Data export/import functionality
- Dark theme toggle
- Keyboard shortcuts
- Task attachments
- Recurring tasks
- Time tracking
- Calendar integration

## License

This project is licensed under the ISC License.

## Contributing

This is a learning project created as part of The Odin Project curriculum. Feel free to fork and experiment!

---

**Built with ❤️ using vanilla JavaScript and modern web technologies**