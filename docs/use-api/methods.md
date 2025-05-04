# useApi Methods Reference

## Core Methods

### `request(payload?, queryParams?)`

The primary method for making API calls.

**Parameters:**

- `payload` (optional): Request body for POST/PUT/PATCH requests
- `queryParams` (optional): Object for URL query parameters

**Example:**

```js
// GET request with query params
const { request } = useApi('/api/users', 'GET')
request(null, { page: 1, limit: 10 })

// POST request with payload
const { request } = useApi('/api/users', 'POST')
request({ name: 'John', email: 'john@example.com' })
```

### Behavior:

- Automatically cancels previous pending requests
- Handles query parameter serialization
- Manages loading/error states
- Implements caching when enabled

## refresh() Method

Forces a fresh request, bypassing cache.

### Example:

```js
const { refresh } = useApi('/api/users', 'GET', {}, true, true)

// User-triggered refresh
<button @click="refresh">Reload Data</button>
```

### Key Points:

- Clears cache for the endpoint before requesting
- Updates **lastFetched** timestamp
- Sets status to 'refreshed' on completion

## clear() Method

Resets all reactive state to initial values.

### Example

```js
const { clear } = useApi('/api/users')
clear() // Resets data, error, and status
```

### When to Use:

- When leaving a view/component
- After successful form submissions
- When manually handling errors

### Reactive Properties

| Property               | Type                   | Description                                                                |
| ---------------------- | ---------------------- | -------------------------------------------------------------------------- |
| `dataRef`              | `<any>`                | Response data from successful requests                                     |
| `errorRef`             | `<any>`                | Error object if request fails                                              |
| `statusRef`            | `<string>`             | Current request state (`idle`, `loading`, `success`, `error`, `refreshed`) |
| `lastFetchedRef`       | `<string>`             | ISO timestamp of last successful fetch                                     |
| `isLoadingComputedRef` | `ComputedRef<boolean>` | Derived loading state                                                      |
| `isErrorComputedRef`   | `ComputedRef<boolean>` | Derived error state                                                        |

## Advanced Features

### Auto-Fetching

GET requests automatically trigger when:

- The baseUrl changes
- The method changes
- The options object changes

### Disable with:

```js
useApi('/api/data', 'GET', {}, false) // autoFetch = false
```

### Caching System

- **Cache Key:** Full URL including query params
- **Default TTL:** 5 minutes
- **Automatic Invalidation:**
  - Cleared on non-GET requests to same base URL
  - Manual clearing via **refresh()**

### Enable Cache:

```js
useApi('/api/data', 'GET', {}, true, true) // enableCache = true
```

### Request Cancellation

- Uses AbortController
- Automatically cancels previous requests
- No race conditions for rapid successive calls

### Complete Example

```js
<script setup>
const {
  data,
  error,
  request,
  refresh,
  isLoading
} = useApi('/api/users', 'GET', {}, true, true)

// Fetch with filters
const applyFilters = (filters) => {
  request(null, filters)
}
</script>

<template>
  <div v-if="isLoading">Loading users...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <div v-else>
    <UserList :users="data" />
    <button @click="refresh">Refresh</button>
  </div>
</template>
```
