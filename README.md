# GeoMine Machinery & Telemetry Management

## Description

GeoMine Machinery & Telemetry Management is a frontend web
application for monitoring heavy mining machinery.

It allows mining supervisors to view inspection records,
monitor telemetry readings, and register new telemetry data.

## Features

- Mining inspection dashboard
- Inspection summary cards
- Telemetry readings visualization
- Machinery model and pit section catalogs
- Dependent machinery selection
- New telemetry registration
- Automatic registration timestamps
- English and Spanish internationalization
- Responsive user interface
- Page-not-found handling

## Technology Stack

- Vue 3
- JavaScript
- Vite
- Composition API
- PrimeVue
- PrimeFlex
- PrimeIcons
- Pinia
- Vue Router
- Vue I18n
- Axios
- JSON Server 0.17.4

## Architecture

The project follows Domain-Driven Design (DDD)
and layered architecture.

### Bounded Contexts

- Shared
- Inspections
- Section

### Layers

- Domain
- Application
- Infrastructure
- Presentation

### Design Patterns

- Entity
- Resource
- Assembler
- API
- Request/Response
- State Management

## Configuration

### Requirements

- Node.js
- npm
- JetBrains WebStorm

### Installation

Install dependencies:

npm install

### Environment Variables

Configure the .env file:

- VITE_API_BASE_URL
- VITE_PIT_SECTIONS_URL
- VITE_MACHINERY_MODELS_URL
- VITE_LOGO_DOMAIN

### Backend

Run:

npm run server

API URL:

http://localhost:3000

### Frontend

Run:

npm run dev

Open the local Vite URL in your browser.

## Routes

- / redirects to /home
- /home displays inspections
- /telemetry/items/new registers telemetry
- Unknown routes display the 404 page

## Authorship

Author: Benjamin Solorzano Sullca

Student Code: u202422816

NRC: 8130

Private GitHub Repository:
https://github.com/benjass2/GeoMine-EP-Web

