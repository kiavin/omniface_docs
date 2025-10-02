# Warp CLI Module Commands

## Module Generation Overview

Warp CLI provides powerful module scaffolding capabilities with two approaches:

    Automatic CRUD Generation (using --all flag)

    Interactive Selection (choose which components to generate)

## Command Reference

### 1. Full CRUD Module Generation

```bash
node warp module:create --name=<module name> --all
```

### What this does:

    Creates complete CRUD (Create, Read, Update, Delete) operations

    Generates all standard folders and files

    Sets up routing automatically

    Connects to backend API services

### Folder structure created:

```text
src/modules/scheduler/
├── components/
│   ├── atoms/
│   ├── molecules/
│   └── organisms/
├── views/
│   ├── ListView.vue
│   ├── FormView.vue
│   └── DetailView.vue
├── stores/
│   └── schedulerStore.js
├── services/
│   └── schedulerService.js
└── router.js
```

### 2. Interactive Module Generation

```bash
node warp module:create --name=scheduler
```

### Interactive flow:

1. Prompts you to select which components to generate:

```bash
? Which folders should be created?
❯◉ components/atoms
 ◉ components/molecules
 ◉ components/organisms
 ◉ plugins
 ◉ utils
 ◉ stores
 ◉ services
```

2. Press spacebar to select/deselect items
3. Press enter to confirm choices

### 3. Module Command Help

```bash
node warp module
```

Displays usage information:

```text
DEBUG - Loaded ENV Variables: true

warp module
--------------------------------
Usage:
  warp module:create --name=moduleName

Options:
  --name            Name of the module (required)
  --all             Generate complete CRUD module
  -h, --help        Display help for form commands

Example Usage:
  node warp module:create --name=UserForm
```

## Step-by-Step Usage Guide

### Step 1: Initialize a Module

```bash
node warp module:create --name=<modulename>
```

### Step 2: Select Components (Interactive Mode)

You'll see:

```text
🚀 Generating Module: products
? Which components should be created?
(Move up and down to reveal more choices)
❯◉ List View
 ◉ Create Form
 ◉ Detail View
 ◉ Edit Form
 ◉ Store (Pinia)
 ◉ API Service
```

### Step 3: Generation Complete

```text
DEBUG - Loaded ENV Variables: true
🚀 Generating Module with the following options:
- Name: scheduler
✔ Which folders should be created? components/atoms, components/molecules, components/organisms, plugins, utils,
stores, services, middleware, views, router
⠋ Generating module...Fetching Swagger JSON from: http://localhost:9009/v1/docs/openapi-json-resource.json?mod=scheduler
⠹ Generating module...📄 Added default.js to /var/www/html/projects/omniface/modules/scheduler/components/atoms
📂 Created: /var/www/html/projects/omniface/modules/scheduler/components/atoms
📄 Added default.js to /var/www/html/projects/omniface/modules/scheduler/components/molecules
📂 Created: /var/www/html/projects/omniface/modules/scheduler/components/molecules
 .......
✅ form.vue for "SpaceAvailability" has been created/overwritten.
✅ form.vue for "SystemSettings" has been created/overwritten.
✔ ✅ Module successfully generated at: scheduler
📂 Scanning modules in: /var/www/html/projects/omniface/modules
✅ Routes generated successfully at: /var/www/html/projects/omniface/app/omnicore/moduleRoutes.js
```

## Best Practices

1. Naming Conventions

    Use singular form (--name=user not users)

    PascalCase for module names with multiple words (--name=ProductCategory)

2. When to use --all

    For standard CRUD modules

    When you need all default components

    For rapid prototyping

3. When to use interactive mode

    For custom module requirements

    When you only need specific components

    For incremental additions to existing modules
