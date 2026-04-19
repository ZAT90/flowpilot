# FlowPilot Plan

## Purpose

FlowPilot is the flagship project for a 90-day transition from senior mobile engineer to strong web full-stack engineer.

This project serves two purposes:

- serious learning vehicle for real full-stack concepts
- portfolio-grade SaaS project for GitHub, LinkedIn, and interviews

## Product

FlowPilot is a modern B2B team workspace and task management SaaS.

Core user actions:

- create a workspace
- invite members
- create projects
- manage tasks
- assign tasks
- comment on tasks
- upload attachments
- view a dashboard

Reference style: lightweight Linear or ClickUp, but simpler.

## MVP Scope

Build only these features:

- signup and login
- current user session
- protected routes
- workspace
- members
- invites
- projects CRUD
- tasks CRUD
- comments
- attachments
- dashboard summary

Do not add:

- AI
- realtime
- chat
- billing
- notifications
- microservices
- PWA
- GraphQL

## Roles

Use exactly 3 roles:

- `OWNER`
- `MANAGER`
- `MEMBER`

RBAC must be implemented properly at the backend level.

## Tech Stack

### Frontend

- Next.js
- TypeScript
- Tailwind
- shadcn/ui
- React Hook Form
- Zod
- TanStack Query

### Backend

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- JWT
- bcrypt

### Architecture

- monorepo
- `frontend/` for Next.js
- `backend/` for Express API
- frontend and backend stay separated

## Design Direction

Visual direction:

- indigo primary
- teal accent
- off-white or slate background
- clean sidebar layout
- rounded cards
- subtle shadows
- premium B2B SaaS look

## How This Project Will Teach

This project is not just about shipping features. It is also designed to teach:

- Node.js and Express architecture
- API design and request lifecycle
- auth and RBAC
- Prisma and relational schema design
- PostgreSQL fundamentals
- Next.js structure and conventions
- React patterns inside Next.js
- CSS and Tailwind syntax with strong layout fundamentals

Teaching rule while building:

- explain what is React vs what is Next.js
- explain Tailwind as real CSS concepts, not just utility strings
- explain backend in layers: routes, middleware, controllers, services, database

## Build Plan

### Phase 1: Foundation

Status: complete

Deliverables:

- monorepo setup
- backend scaffold
- Prisma setup
- PostgreSQL config scaffold
- Prisma schema
- env example
- health route
- migration scaffold
- seed scaffold
- GitHub repo published

Learning focus:

- monorepo structure
- Express app anatomy
- environment configuration
- Prisma basics
- relational modeling foundations

### Phase 2: Auth Foundation

Deliverables:

- signup endpoint
- login endpoint
- password hashing with `bcrypt`
- JWT generation and verification
- current user endpoint
- auth middleware
- protected route pattern
- backend validation with Zod

Learning focus:

- request and response lifecycle
- middleware pipeline
- auth flow
- security basics
- separation of controller, service, and persistence logic

### Phase 3: Workspace and RBAC

Deliverables:

- create workspace
- workspace membership model usage
- workspace access checks
- role enforcement for `OWNER`, `MANAGER`, `MEMBER`
- backend authorization helpers

Learning focus:

- authentication vs authorization
- role-based access control design
- workspace-scoped permissions
- why `WorkspaceMember` is the correct RBAC join model

### Phase 4: Invites and Members

Deliverables:

- invite member flow
- accept invite flow
- list members
- update member role with guard rules
- prevent invalid role transitions where needed

Learning focus:

- business rules in service layer
- token-based invite design
- handling edge cases cleanly
- relational workflows across multiple tables

### Phase 5: Projects and Tasks

Deliverables:

- projects CRUD
- tasks CRUD
- task assignment
- task status and priority handling
- workspace and project scoping
- frontend data fetching and mutation flows

Learning focus:

- REST API structure
- query and mutation design
- form handling with React Hook Form and Zod
- TanStack Query mental model
- integrating frontend and backend cleanly

### Phase 6: Comments, Attachments, and Dashboard

Deliverables:

- comments on tasks
- attachment metadata flow
- attachment upload foundation
- dashboard summary endpoint(s)
- polished dashboard UI
- MVP cleanup and consistency pass

Learning focus:

- aggregate queries
- file-handling concepts
- separation between metadata and storage concerns
- frontend dashboard composition
- final product polish decisions

## Development Rules

- build iteratively, never all at once
- stay inside MVP scope
- teach architecture decisions while implementing
- prefer clean fundamentals over clever abstractions
- keep the project interview-friendly and explainable

## Syntax Learning Goals

### CSS and Tailwind

Each frontend phase should teach:

- layout with `flex` and `grid`
- spacing and sizing
- typography and hierarchy
- alignment and positioning
- responsive design
- how Tailwind maps to real CSS

### Next.js

Each frontend phase should teach:

- what is plain React
- what is Next.js-specific
- app router structure
- server vs client boundaries
- data fetching choices
- route and component organization

### Node.js and Express

Each backend phase should teach:

- how Node.js runs the server
- what Express is responsible for
- how middleware works
- how routes connect to business logic
- how Prisma connects application code to PostgreSQL
- how to structure code so it stays maintainable

## Success Criteria

FlowPilot is successful when it is:

- complete enough to demo confidently
- scoped enough to finish without burnout
- clean enough to discuss in interviews
- polished enough to showcase publicly
- educational enough to strengthen real full-stack instincts
