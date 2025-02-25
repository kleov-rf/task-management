# Vue.js Task Management Application

This is a simple task management application built with Vue.js, following clean architecture principles and test-driven development (TDD).

## Architecture

The project follows a clean architecture approach with the following structure:

- `src/modules`: Contains the core business logic organized by domain
    - `domain`: Contains business entities and repository interfaces
    - `application`: Contains use cases and application services
    - `infrastructure`: Contains implementations of repository interfaces
- `src/sections`: Contains the UI components organized by domain
- `tests/acceptance`: Contains acceptance tests for the application
- `tests`: Contains unit tests for the core business logic

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Run tests:
```bash
npm run test
```

## Design Decisions

- **Clean Architecture**: The application follows a ports and adapters architecture to maintain separation of concerns and make the code more maintainable and testable.
- **TDD**: Development follows the Test-Driven Development cycle (Red, Green, Refactor).
- **Local Storage**: Tasks are persisted in the browser's local storage for simplicity.
- **TypeScript**: Used throughout the project for better type safety and developer experience.
- **TailwindCSS**: Used for styling to maintain consistency and rapid development.

## Features
