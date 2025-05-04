# Warp CLI - Vue Automation Toolkit

## Introduction

Warp CLI is a powerful code generation tool that accelerates Vue.js development by automatically creating:
- Complete views and forms
- Ready-to-use components
- Backend-connected modules
- Application routing
- API service layers

By analyzing your backend API documentation/annotations, Warp intelligently generates frontend code that perfectly matches your backend structure.

![Warp CLI Demo](../public/img/warp-cli-demo.gif)

## Key Features

- **Full-stack synchronization** - Automatically keeps frontend in sync with backend changes
- **Consistent architecture** - Enforces best practices across your entire team
- **Time savings** - Reduces boilerplate code by 80%+
- **Customizable templates** - Modify or extend the generated code to fit your needs

## How It Works

1. Reads your backend API documentation (Swagger/OpenAPI or custom annotations)
2. Analyzes endpoints, data structures, and relationships
3. Generates complete Vue components with:
   - Form validation
   - API service layer
   - State management
   - Routing configuration

## Getting Started

### Installation
Warp comes pre-installed with Omniface. To verify:

```bash
node warp --version