# Welcome to Omniface Vue Boilerplate 🚀

A customizable framework for Vue.js with:

- **Omnigrid**: Dynamic data grids
- **Warp CLI**: Code generator
- **useApi**: Composable API handler

## Quick Links

- [Omnigrid Guide](/omnigrid/)
- [Warp CLI Reference](/warp-cli/)
- [useApi Documentation](/use-api/)

## Getting Started

```bash
npm run dev
```

## Project Structure

```text
omniface/
├── app/                  # Core application logic
├── cypress/              # E2E tests
├── docs/                 # Documentation
├── modules/             # Feature modules
├── storage/             # Public assets (like Laravel's public folder)
├── node_modules/
├── index.html
├── vite.config.js
└── package.json
```

## Core Components

### 1. app/ - Application Core

```text
app/
├── omnicore/            # Framework core
│   ├── config/          # Configuration files
│   ├── helpers/         # Helper functions
│   ├── middleware/      # Request/response middleware
│   ├── plugins/         # Global plugins
│   ├── stores/          # Global state management
│   ├── moduleRoutes.js  # Auto-generated module routes
│   ├── router.js        # Main Vue router
│   └── utils.js         # Core utilities
├── themes/              # UI themes system
│   ├── bundles/         # Asset bundles (like Yii2)
│   ├── hopeui/          # Default theme
│   ├── layout.js        # Theme layout exporter
└── warp/                # CLI code generation logic
```

### 2. modules/ - Feature Modules
```text
modules/
└── {module-name}/       # Example: scheduler
    ├── components/      # Component hierarchy
    │   ├── atoms/      # Basic UI elements
    │   ├── molecules/  # Compound components
    │   └── organisms/  # Complex components
    ├── plugins/        # Module-specific plugins
    ├── utils/          # Module utilities
    ├── stores/         # Pinia stores
    │   └── {module}Store.js
    ├── services/       # API services
    │   └── {module}Service.js
    ├── middleware/     # Module middleware
    ├── views/          # Feature views
    │   ├── appointments/
    │   └── availability/
    └── router/         # Module routes
        ├── appointments.js
        ├── availability.js
        └── index.js
```

## Key Directories Explained

### 1. Omnicore

* The framework's concrete logic center
* Contains global configurations and utilities
* `moduleRoutes.js` auto-discovers and registers module routes

### 2. Themes System

* Supports multiple UI themes simultaneously
* `bundles/` handles asset registration like Yii2
* Easily integrate templates by adding new theme folders

### 3. Modules Architecture

* Self-contained feature units following Atomic Design

### Each module includes:

* Components (atoms → organisms)
* Business logic (stores/services)
* Routing configuration
* View hierarchies

### 4. Warp CLI

* Located in app/warp/
* Generates complete modules with:
```bash
node warp module:create --name=scheduler --all
```

