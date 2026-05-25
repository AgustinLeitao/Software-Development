# Todo App with React, Node, SQLite, AKS, Helm, Bicep, and CI/CD

This repository contains a full-stack todo application built with:

- React + Vite + TypeScript frontend
- Node.js + Express + TypeScript backend
- SQLite persistence for todos
- Docker-based container images
- Helm chart for Kubernetes deployment
- Bicep templates for Azure infrastructure
- GitHub Actions and Azure Pipelines for CI/CD

## Architecture

- `client/` — React frontend
- `server/` — Node backend with SQLite
- `charts/todo-app/` — Helm chart for frontend and backend Kubernetes deployment
- `infra/` — Bicep templates and environment parameter files
- `.github/workflows/` — GitHub Actions pipeline
- `azure-pipelines.yml` — Azure Pipelines definition

## Deployment environments

This repository is designed to support three environments:

- `dev`
- `qa`
- `prod`

Infra and Helm values are parameterized so each environment can use different settings.

## Local development

### Backend

```powershell
cd server
npm install
npm run dev
```

The backend listens on `http://localhost:4000`.

### Frontend

```powershell
cd client
npm install
npm run dev
```

Visit `http://localhost:5173` and the frontend will proxy API requests to the backend.

## Infrastructure

The Azure Bicep templates are in `infra/main.bicep` with environment files in `infra/parameters/`.

## CI/CD

- GitHub Actions pipeline: `.github/workflows/ci-cd.yml`
- Azure Pipelines: `azure-pipelines.yml`
