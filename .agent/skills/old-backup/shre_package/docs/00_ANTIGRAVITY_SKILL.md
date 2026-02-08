# Antigravity Skill Document for "shre"

## 1. Project Overview

"shre" is a platform designed to manage employee data and documents with a focus on security, scalability, and user experience. It serves HR personnel, company administrators, and employees, providing secure access and modification capabilities for sensitive information through a microservices architecture.

## 2. Tech Stack Details

- **Frontend**: Next.js (v12.x) with React (v17.x) and Tailwind CSS for styling.
  - **Rationale**: Next.js provides server-side rendering and static site generation, enhancing performance and SEO. Tailwind CSS offers utility-first styling, ensuring a responsive and modern UI.
  
- **Backend**: NestJS (v8.x) with PostgreSQL (v13.x).
  - **Rationale**: NestJS offers a scalable and maintainable architecture with TypeScript support, while PostgreSQL provides robust relational data management.

- **Security**: JWT for authentication, HTTPS for secure data transmission.
  - **Rationale**: JWT ensures stateless and secure user sessions, while HTTPS encrypts data in transit.

- **Architecture**: Microservices
  - **Rationale**: Facilitates modular development, scalability, and separation of concerns.

## 3. Phase-by-Phase Prompts

### P0: Bootstrapping

- **Prompt**: "Initialize the 'shre' project by setting up the Next.js frontend and NestJS backend. Create a basic microservices architecture with a PostgreSQL database. Refer to docs/P0-Bootstrapping.md for detailed setup instructions."

### P1: Persistence and Security

- **Prompt**: "Enhance 'shre' with secure user authentication using JWT and implement CRUD operations for employee data. Ensure secure storage of documents. Follow the guidelines in docs/P1-Persistence-Security.md."

### P2: Scalability and Performance

- **Prompt**: "Optimize 'shre' for scalability and performance. Implement load balancing and caching strategies. Consult docs/P2-Scalability-Performance.md for specific techniques and configurations."

## 4. Quick Start Prompt

- **Prompt**: "Start the 'shre' project by following the setup instructions in docs/QuickStart.md."

## 5. Resume Prompt

- **Prompt**: "Resume development of 'shre' by reviewing the current progress in docs/ and continuing with the next phase outlined in the respective phase document."

## 6. Approval Gate Prompts

- **P0 to P1**: "Confirm successful bootstrapping by validating the initial setup against docs/P0-Bootstrapping.md before proceeding to implement persistence and security features."
- **P1 to P2**: "Ensure all security and persistence features are correctly implemented as per docs/P1-Persistence-Security.md before optimizing for scalability and performance."

## 7. Testing Prompts

- **Prompt**: "Conduct comprehensive testing of 'shre' by executing unit, integration, and end-to-end tests as specified in docs/Testing.md. Validate all features and security measures."

## 8. Production Deployment Prompts

- **Prompt**: "Deploy 'shre' to the production environment by following the deployment checklist in docs/ProductionDeployment.md. Ensure all services are running smoothly and securely."

## 9. Troubleshooting Prompts

- **Prompt**: "Address common issues in 'shre' by consulting docs/Troubleshooting.md. Follow the recommended solutions for any encountered problems."

## 10. Best Practices

- **Prompt**: "Adhere to best practices for 'shre' by maintaining clean code, implementing security measures, and ensuring scalability. Refer to docs/BestPractices.md for detailed guidelines."

This document provides a structured approach for AI agents to build the "shre" project from scratch, ensuring adherence to the project's architecture, security requirements, and performance goals.