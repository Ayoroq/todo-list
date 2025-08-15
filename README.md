# Doings - Todo List Application

A modern, feature-rich todo list application built with vanilla JavaScript, featuring project management, task filtering, and persistent local storage.

## Features

### Task Management
- **Create Tasks**: Add tasks with name, description, due date, and priority levels
- **Edit Tasks**: Modify existing tasks with full form validation
- **Delete Tasks**: Remove tasks with confirmation dialogs
- **Task Completion**: Mark tasks as complete/incomplete with visual feedback
- **Priority Levels**: High, Medium, and Low priority with color-coded indicators

### Project Organization
- **Create Projects**: Organize tasks into custom projects
- **Project Management**: Edit and delete projects with automatic task handling
- **Task Assignment**: Assign tasks to specific projects during creation or editing
- **Project Views**: View all tasks within a specific project

### Advanced Filtering
- **All Tasks**: View complete task list
- **Today**: Tasks due today
- **Overdue**: Past due incomplete tasks
- **This Week**: Tasks due within the next 7 days
- **Completed**: All finished tasks
- **High Priority**: Tasks marked as high priority

### Search & Navigation
- **Real-time Search**: Search tasks by name and description
- **Active State Management**: Visual indicators for current view
- **Unified Navigation**: Seamless switching between filters and projects

### Data Persistence
- **IndexedDB Storage**: Modern browser database for structured data storage
- **Asynchronous Operations**: Non-blocking database operations with Promise-based API
- **Relationship Management**: Maintains task-project associations with proper data integrity
- **Error Handling**: Robust database operations with graceful fallback handling

## Architecture

### Modular Design
The application follows a clean separation of concerns with dedicated modules:

- **`module.js`**: Core data models (Task, Project classes) and business logic
- **`events.js`**: Event handling and user interactions
- **`dialog.js`**: Modal dialog management for forms
- **`render.js`**: DOM manipulation and UI rendering
- **`styles.css`**: Modern CSS with custom properties and responsive design

### Key Design Patterns
- **Event Delegation**: Efficient handling of dynamic content
- **Factory Pattern**: Task and Project class constructors
- **Observer Pattern**: Automatic UI updates on data changes
- **Module Pattern**: Clean imports/exports with ES6 modules
- **Promise-based Storage**: Asynchronous IndexedDB operations with proper error handling

## 🛠️ Technical Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: Modern CSS with Grid and Flexbox
- **Build Tool**: Webpack 5 with development and production configs
- **Storage**: IndexedDB API for structured client-side storage
- **Icons**: SVG assets

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

### Managing Projects
1. Click the "+" button next to "PROJECTS"
2. Enter project name and description
3. Use project action buttons to:
   - Add tasks directly to the project
   - Edit project details
   - Delete project (tasks remain but become unassigned)

### Filtering & Search
- Use sidebar buttons to filter tasks by criteria
- Use the search bar to find tasks by name or description
- Click project names to view project-specific tasks

### Task Operations
- **Complete**: Check the checkbox next to any task
- **Edit**: Click the pencil icon on task cards
- **Delete**: Click the trash icon with confirmation

## Design Features

### Responsive Layout
- CSS Grid-based layout with flexible columns
- Mobile-friendly responsive design
- Consistent spacing and typography

### Visual Feedback
- Hover effects and smooth transitions
- Active state indicators
- Priority-based color coding
- Completion state styling

### User Experience
- Intuitive navigation with clear visual hierarchy
- Form validation and error handling
- Confirmation dialogs for destructive actions
- Real-time search with instant results

## 🔧 Configuration

### Webpack Configuration
- **Development**: Hot reload, source maps, dev server
- **Production**: Minification, optimization, asset bundling
- **Common**: Shared loaders for HTML, CSS, and assets

### Browser Support
- Modern browsers with ES6+ support
- IndexedDB API support required
- CSS Grid and Flexbox support
- Promise/async-await support

## Project Status

**Current Version**: 1.0.0

### Completed Features
✅ Task CRUD operations  
✅ Project management  
✅ Advanced filtering system  
✅ Real-time search  
✅ IndexedDB persistence with async operations
✅ Responsive design  
✅ Form validation  
✅ Comprehensive error handling
✅ Database initialization and migration  

### Future Enhancements
- Drag & drop task reordering
- Task categories/tags
- Due date notifications
- Data export/import
- Dark theme toggle
- Keyboard shortcuts

## License

This project is licensed under the ISC License.

## Contributing

This is a learning project created as part of The Odin Project curriculum. Feel free to fork and experiment!

---

**Built with ❤️ using vanilla JavaScript and modern web technologies**