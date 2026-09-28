# Know-a-Guy

> Find the right person for the job at the right price.

Know-a-Guy is a web-based platform that aggregates publicly accessible local professionals from sources such as TaskRabbit and Thumbtack (and larger agencies) alongside independent contractors who create their own profiles directly on the platform.

**Course:** CSC581 | **Author:** Michael Gubler | **Status:** Milestone 1 (Technical Architecture)

---

## Table of Contents

- [Problem](#problem)
- [Solution](#solution)
- [Features](#features)
- [User Stories](#user-stories)
- [Architecture](#architecture)
- [Kubernetes Design](#kubernetes-design)
- [API Overview](#api-overview)
- [Persistence](#persistence)
- [Risks and Mitigations](#risks-and-mitigations)
- [Test Plan](#test-plan)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Implementation Timeline](#implementation-timeline)

---

## Problem

Household problems show up without warning: appliances stop working, basements flood, plumbing struggles. You wish you knew a guy who could come fix it. Finding one means going through private companies or word of mouth, and then the doubts start: *Is this the best price I can get? Is there someone who can do the same or better work for less?*

## Solution

Know-a-Guy searches approved external sources and first-party contractor profiles in one place, normalizes the results, and returns a comparable, ranked list with clear source attribution. Independent contractors can create their own profiles, set their own rates, and compete directly for jobs.

## Features

- Describe a problem in plain language, optionally attach photos, and provide location and timing requirements.
- Search approved external sources and Know-a-Guy contractor profiles using normalized service category, geography, price signals, ratings, and availability (when available).
- Get a comparable result set with source attribution, so direct profiles can be distinguished from aggregated listings.
- Independent contractors can create direct profiles, so supply isn't limited to large marketplaces.

## User Stories

- **Homeowner:** I want to describe a household problem and optionally upload photos so I can get relevant local professionals with comparable price and profile information.
- **Independent contractor:** I want to create a profile with services, service area, rate guidance, and contact details so I can compete directly for relevant jobs.
- **Platform operator:** I want connector workers to refresh and normalize source listings on a schedule so comparisons use traceable, recently observed data.

## Architecture

### End-to-end workflow

1. **Request intake:** Validate job data; upload photos to object storage using an API-issued upload target.
2. **Orchestration:** Create the job request, identify candidate sources, and enqueue source lookups.
3. **Aggregation:** Source connectors fetch permitted data and map it into a common listing schema with `source` and `observed_at` provenance.
4. **Matching:** Score candidates using job type, geography, price signal, reputation signal, and availability when present.
5. **Retrieval:** Persist normalized results and return a comparison view; cache hot reads where useful.

Source access is connector-based, so providers can be added, disabled, rate-limited, or replaced without changing the public API.

### Matching (v1)

The first version uses straightforward criteria rather than machine learning. Jobs are categorized from user input, then available professionals are filtered and ranked by service category, location, price, ratings, and availability. This leaves room for a more sophisticated recommendation model later.

## Kubernetes Design

Stateless services scale independently; state is durable and isolated. All resources live in the `know-a-guy` namespace.

| Workload | Kind | Pod model | Design choice |
|---|---|---|---|
| web-ui | Deployment | 1 container | Stateless frontend; horizontal scaling is straightforward |
| api | Deployment | 1 app container | Stateless HTTP boundary for validation and orchestration |
| matching | Deployment | app + metrics sidecar | First scaling target (HPA); sidecar isolates telemetry |
| connector-worker | Deployment | 1 worker container | Provider-specific jobs scale independently |
| refresh-scheduler | CronJob | 1 container/run | Periodic refresh without a permanent scheduler service |
| PostgreSQL | Managed DB | n/a | Durable relational state |
| Redis | Managed cache or Deployment | 1 container | Optional TTL cache; never the source of truth |

**Networking:** Internal traffic uses `ClusterIP` Services. Public traffic enters through a LoadBalancer / Ingress that routes HTTPS to the appropriate service and provides a single public endpoint.

## API Overview

| Method | Endpoint | Purpose | Success |
|---|---|---|---|
| `POST` | `/v1/job-requests` | Create service request; start matching | `202` |
| `GET` | `/v1/job-requests/{id}` | Read request status and summary | `200` |
| `GET` | `/v1/job-requests/{id}/matches` | Read ranked candidates and provenance | `200` |
| `POST` | `/v1/contractors` | Create first-party contractor profile | `201` |
| `PATCH` | `/v1/contractors/{id}` | Update profile, services, rates | `200` |
| `GET` | `/v1/contractors?service=&zip=` | Search first-party contractors | `200` |


## Persistence

| Data class | System of record | Notes |
|---|---|---|
| Users / auth profile | PostgreSQL | Minimize personal fields |
| Job requests / statuses | PostgreSQL | Lifecycle + normalized job data |
| Contractor profiles | PostgreSQL | First-party source of truth |
| Listings / observations | PostgreSQL | Source ID + normalized fields + `observed_at` |
| Match scores | PostgreSQL | Versioned formula inputs for reproducibility |
| Photos / documents | Object storage | DB stores object key, MIME type, checksum, size |
| Hot reads | Redis | TTL cache only |
| Connector scratch | `emptyDir` or short-lived PVC | Non-authoritative staging |

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Source access changes / outage | High | Connector abstraction; feature flags; partial-result behavior |
| Price is not directly comparable | High | Label exact vs. estimated; store range, unit, source timestamp |
| Stale / duplicate listings | High | Deduplicate by source listing ID + identity keys; refresh timestamps |
| Rate limits / timeouts | High | Queue, backoff, per-source concurrency limits, circuit breaking |
| Unclear ranking behavior | Medium | Version scoring formula; keep major factors auditable |
| Database loss / corruption | High | Automated backup + restore drill + migration versioning |

## Test Plan

| Scenario | Expected result |
|---|---|
| Happy path: valid request + image | `202`; matching starts; source + timestamp present |
| No matches | Successful empty state, not `500` |
| Source timeout | Partial results; source marked degraded |
| Duplicate listing | Single normalized listing; observation timestamp updated |
| Invalid contractor signup | `422` validation; no partial persistence |
| 10x burst traffic | Graceful degradation; matching replicas/queue grow |

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), served by nginx |
| Backend | Java, Spring Boot (Gradle) |
| Database | PostgreSQL |
| Object storage | S3-compatible storage for photos and documents |
| Cache | Redis |
| Containers | Docker, Docker Compose (local) |
| Orchestration | Kubernetes |

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (with Docker Compose)
- Node.js and JDK 21 (only needed for running services outside containers)

### Project structure

```
know-a-guy/
├── docker-compose.yml
├── frontend/          # React + Vite, Dockerfile, nginx.conf
└── backend/           # Spring Boot API, Dockerfile
```

### Run with Docker Compose

```bash
docker compose up --build
```

- Frontend: http://localhost:8080
- Backend API: http://localhost:8081

### Build and run images individually

```bash
# Frontend
docker build -t know-a-guy-frontend:latest ./frontend
docker run --rm -p 8080:80 know-a-guy-frontend:latest

# Backend
docker build -t know-a-guy-backend:latest ./backend
docker run --rm -p 8081:8080 know-a-guy-backend:latest
```

### Local development (without containers)

```bash
# Frontend (hot reload)
cd frontend && npm install && npm run dev

# Backend
cd backend && ./gradlew bootRun
```


## Implementation Timeline

| Weeks | Phase | Planned work |
|---|---|---|
| 1-2 | Foundation | Repository, dev environment, database schema, application containers, Kubernetes configuration |
| 3-4 | Core Application | User accounts, service-request submission, backend APIs, basic frontend workflow |
| 5-6 | Matching System | Professional profiles, search/filtering, initial matching and ranking logic |
| 7-8 | Data Aggregation | External-source connector and refresh process, normalization of professional data |
| 9-10 | Contractor Profiles | Independent-contractor registration, profile management, pricing, inclusion in search results |
| 11-12 | Testing & Deployment | Integration and load testing, Kubernetes validation, monitoring, final deployment and demo |

## Author

Michael Gubler
