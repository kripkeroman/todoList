# TODO List Application

## Description
This project is a TODO list web application that allows users to manage their tasks efficiently. Users can add, delete, and view tasks, as well as filter tasks based on their status and search by name. The application is built using a Java backend with Spring Boot and a JavaScript frontend with jQuery.

## Features
- View all tasks
- Search tasks by name
- Filter tasks by date range and status
- Mark tasks as complete or incomplete
- Responsive design with modal for task details

## Technologies Used
- **Backend:** Java, Spring Boot, REST API
- **Frontend:** HTML, CSS, JavaScript, jQuery

## Setup Instructions

### Prerequisites
- Java 17 or later
- Maven
- Node.js (for frontend dependencies)

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/todo-list.git
   cd todo-list
   ```
2. Build and run the backend:
   ```sh
   mvn clean install
   mvn spring-boot:run
   ```
### Frontend Setup
Navigate to the src/main/resources/static directory:

   ```sh
   cd src/main/resources/static
   ```
Serve the static files using a web server or open index.html directly in a browser.

## Usage
1. Open the application in your web browser (e.g., http://localhost:8080).
2. Use the search bar to find tasks by name.
3. Use the calendar to filter tasks by date.
4. Use the "Today" and "This Week" buttons to quickly view tasks for these timeframes.
5. Mark tasks as complete or incomplete using the checkboxes.
6. Click on a task to open the modal window with detailed information.

## REST API Endpoints
* Get all tasks: GET /api/todos
* Get tasks by date range: GET /api/todos/date?from={timestamp}&to={timestamp}&status={boolean}
* Search tasks by name: GET /api/todos/find?q={query}

## Contributing
1. Fork the repository.
2. Create your feature branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/your-feature).
5. Open a pull request.