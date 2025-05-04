# useApi Composable

## Introduction

The `useApi` composable provides a powerful interface for making HTTP requests in Vue 3 applications, with built-in state management, caching, and automatic request handling.

```js
const { data, error, request } = useApi('/api/users', 'GET')
```

## Key Features

### 1. Automatic Request Handling

- **Auto-fetching:** GET requests trigger automatically when dependencies change
- **Request cancellation:** Automatically cancels pending requests on new calls
- **State tracking:** Tracks loading, error, and success states

### 2. Intelligent Caching\

- **TTL-based caching:** Configurable cache expiration (default: 5 minutes)
- **Smart invalidation:** Auto-clears cached GET requests after mutations
- **Bulk clearing:** Remove all cached variants of a URL

### 3. Advanced Functionality

- **Query parameter handling:** Automatic serialization with qs
- **AbortController:** Built-in request cancellation
- **Refresh mechanism:** Force fresh data fetches
- **Type-safe:** Works with TypeScript

### Basic Usage

```vue
<script setup>
const { data, isLoading, error } = useApi('/api/posts', 'GET')
</script>

<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="error">Error: {{ error }}</div>
  <div v-else>{{ data }}</div>
</template>
```

## Feature Highlights

| Feature        | Description                           | Example                              |
| -------------- | ------------------------------------- | ------------------------------------ |
| Auto-fetch     | GET requests trigger automatically    | `useApi('/api/data')`                |
| Caching        | Reduce server load with smart caching | `useApi(..., { enableCache: true })` |
| Error Handling | Structured error responses            | `error.value` contains API errors    |
| Refresh        | Force data reload                     | `refresh()` method                   |
| Cancellation   | Prevent duplicate requests            | Auto-cancels pending requests        |

## When to Use

✅ Fetching data for display

✅ Forms with API submissions

✅ Complex API interactions with caching needs

✅ Applications requiring request state management
