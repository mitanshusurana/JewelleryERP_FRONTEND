# Gemstone ERP - Frontend (v2.0 Detailed)

This repository contains the source code for the Gemstone ERP web application frontend. It is built with Angular, designed to be a modern, responsive, and user-friendly interface for managing a gemstone business. This document serves as the primary technical guide for frontend developers.

## Table of Contents
1.  [Core Philosophy & UX Principles](#1-core-philosophy--ux-principles)
2.  [Architecture & State Management](#2-architecture--state-management)
3.  [Technology Stack & Rationale](#3-technology-stack--rationale)
4.  [Feature Breakdown & Component Map](#4-feature-breakdown--component-map)
5.  [API Interaction & Auth Flow](#5-api-interaction--auth-flow)
6.  [Styling & Theming](#6-styling--theming)
7.  [Testing Strategy](#7-testing-strategy)
8.  [Project Structure](#8-project-structure)
9.  [Getting Started (Developer Guide)](#9-getting-started-developer-guide)

---

### 1. Core Philosophy & UX Principles

- **User-Centric Design:** Our target users are not developers. The UI must be intuitive, requiring zero training. Workflows should mirror real-world processes.
- **Performance is Key:** The application must feel fast. We will use lazy loading for feature modules, virtual scrolling for long lists, and optimized asset delivery.
- **Mobile First:** The primary use case for inventory digitization is on a tablet or mobile phone. All views must be fully responsive and touch-friendly.
- **Clear Feedback:** The user should never be left wondering what the system is doing. Use loaders, spinners, snackbars, and clear validation messages to provide constant feedback.

---

### 2. Architecture & State Management

- **Component-Based Architecture:** The application is built using modular, reusable Angular components.
- **State Management with NgRx:** We use NgRx as a centralized store for application state. This is crucial for a complex application as it provides a single source of truth and a predictable data flow.
    - **Why NgRx?** It helps us manage complex state interactions (e.g., when a product is updated, multiple components might need to reflect that change). It decouples our components from our services and makes state changes predictable and traceable.
    - **Data Flow:**
        1.  **Component:** A user action (e.g., clicking "Save") dispatches an `Action`. (`[Product Form] Save Product`)
        2.  **Effect:** An NgRx `Effect` listens for this action, calls the relevant `ApiService` to make the backend request.
        3.  **API Service:** The service performs the HTTP call.
        4.  **Effect (cont.):** Upon receiving the API response, the effect dispatches a new `Action`, either for success (`[Product API] Save Product Success`) or failure (`[Product API] Save Product Failure`).
        5.  **Reducer:** A `Reducer` function listens for the success/failure actions and updates the state in the `Store` accordingly.
        6.  **Component (cont.):** The component uses an `async` pipe to subscribe to a `Selector` that reads the updated state from the store, and the UI updates reactively.

---

### 3. Technology Stack & Rationale

- **Framework:** Angular 16+ (A mature, opinionated framework ideal for large, structured applications).
- **Language:** TypeScript (Provides static typing, reducing runtime errors and improving developer experience).
- **UI Component Library:** **Angular Material** (Offers a comprehensive set of high-quality, accessible components that follow Material Design principles, accelerating development).
- **State Management:** NgRx (The de-facto standard for reactive state management in Angular).
- **Styling:** SCSS with a modular approach (component-level styles) to prevent style leakage.
- **QR Scanning:** `ngx-scanner` (A well-supported library for camera-based QR code scanning).

---

### 4. Feature Breakdown & Component Map

#### Feature: Product Digitization
- **User Story:** As a data entry operator, I want to scan a QR code, select a product type, and fill in a simple, guided form to add a new product to the inventory.
- **Component Map:**
    - `ProductCreationPageComponent`: The main smart component that orchestrates the workflow.
    - `QrScannerComponent`: A dumb component responsible for displaying the camera feed and emitting the scanned QR code ID.
    - `ProductTypeSelectorComponent`: Displays the three main product type buttons (Gem, Jewelry, Idol).
    - `DynamicFormComponent`: A highly reusable component that takes a JSON schema and renders the appropriate form fields. This is the core of the data entry UI.
    - `MediaUploaderComponent`: Handles the direct-to-S3 file upload logic with progress feedback.

---

### 5. API Interaction & Auth Flow

- **HTTP Client:** All API calls will be made via Angular's `HttpClient`.
- **Centralized API Service:** A `ApiService` will be created to handle base URL configuration and common headers. Feature-specific services (e.g., `ProductService`) will use this `ApiService`.
- **Authentication Flow:**
    1.  User enters credentials on the `LoginPageComponent`.
    2.  `AuthService` sends credentials to the backend's `/login` endpoint.
    3.  On success, the backend returns a JWT.
    4.  The JWT is saved securely in `localStorage`.
    5.  An **HTTP Interceptor** (`AuthInterceptor`) is configured to attach the JWT (`Authorization: Bearer <token>`) to the header of every subsequent outgoing request.
    6.  The interceptor will also handle 401 (Unauthorized) responses by logging the user out and redirecting them to the login page.

---

### 6. Styling & Theming

- **Global Styles:** A `styles.scss` file will define global styles, CSS variables for the color palette, and theme settings for Angular Material.
- **Component Styles:** Each component will have its own `.scss` file with `ViewEncapsulation.Emulated` (the default) to scope styles to that component.
- **Responsive Design:** We will use a combination of Flexbox, CSS Grid, and Angular Material's `BreakpointObserver` to create a fully responsive layout that works seamlessly on mobile, tablet, and desktop.

---

### 7. Testing Strategy

- **Unit Tests (.spec.ts):** Written with Jasmine and run by Karma. Every component, service, and pipe should have unit tests. We will aim for >80% code coverage.
- **End-to-End (E2E) Tests:** Written with **Cypress**. E2E tests will cover critical user flows, such as logging in, creating a new product from start to finish, and searching for a product.
- **CI Integration:** The CI/CD pipeline (GitHub Actions) will run all unit tests and E2E tests on every pull request to ensure no regressions are introduced.

---

### 8. Project Structure

The project follows the standard Angular CLI structure, with a strong emphasis on feature modules and the SCAM (Single Component Angular Module) pattern for shared components.

```
src/
|-- app/
|   |-- core/                 # Guards, Interceptors, Core Module (singleton services)
|   |-- features/
|   |   |-- product-creation/   # Lazy-loaded feature module
|   |   |   |-- components/
|   |   |   |-- store/          # NgRx store for this feature
|   |   |   |-- product-creation.component.ts
|   |   |   |-- product-creation.module.ts
|   |-- shared/
|   |   |-- components/         # Reusable dumb components (e.g., DynamicFormComponent)
|   |   |-- pipes/
|   |   |-- shared.module.ts
|   |-- app-routing.module.ts
|   |-- app.component.ts
|-- assets/                   # Static assets like images, fonts
|-- environments/             # Environment-specific config (e.g., API base URL)
```

---

### 9. Getting Started (Developer Guide)

1.  **Prerequisites:**
    - Node.js (LTS version)
    - Angular CLI (`npm install -g @angular/cli`)
2.  **Installation:**
    - Clone the repository: `git clone ...`
    - Install dependencies: `npm install`
3.  **Configuration:**
    - In `src/environments/environment.ts`, set the `apiUrl` property to point to the backend gateway's address (e.g., `http://localhost:8080`).
4.  **Running the Development Server:**
    - Run `ng serve`.
    - Navigate to `http://localhost:4200/`.
