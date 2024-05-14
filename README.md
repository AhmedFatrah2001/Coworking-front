# Coworking Frontend

Coworking is a project management application that utilizes the Kanban method for task organization and collaboration. This frontend application is built using React and interacts with a Spring Boot backend.

## Features

- **Process Visualization:** Visualize your tasks and their progress through different stages.
- **Kanban Customization:** Customize your Kanban boards to fit your workflow.
- **Focus on Important Tasks:** Easily identify and prioritize tasks.
- **Efficient Navigation:** Seamlessly navigate between different projects and boards.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 16.3.0)
- npm (version 7.15.1)

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/AhmedFatrah2001/coworking-frontend.git
    cd coworking-frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

## Usage

1. **Start the development server:**

    ```bash
    npm start
    ```

    The application will be available at `http://localhost:3000`.

2. **Build for production:**

    ```bash
    npm run build
    ```

    This will create an optimized build in the `build` directory.

## Project Structure

Here's an overview of the project structure:

.
├── Dockerfile
├── nginx.conf
├── node_modules
├── package.json
├── package-lock.json
├── public
├── src
└── test.json


## Configuration

To connect the frontend with your backend, make sure to update the API endpoints in the service files or environment configuration as needed. The default endpoint for fetching the Kanban board data is:

http://localhost:8080/**
