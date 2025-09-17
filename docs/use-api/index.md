# useApi Composable

A powerful and flexible Vue composable for handling API requests with features like caching, error handling, pagination, retry logic, real-time support, progress tracking, and more.

## Introduction

The `useApi` composable provides a powerful interface for making HTTP requests in Vue 3 applications, with built-in state management, caching, and automatic request handling.The updated version includes enhanced features like automatic alerts, smart caching, and error redirection and **response transformation**.
```js
// Basic usage

const { data, error, request } = useApi('/api/users', {method: 'GET'})

or

// Basic usage 2
const { data, error, request } = useApi('/api/users') // of no http method passed defult to GET
```

## ✅ Overview

`useApi(baseUrl, config)` provides a reactive interface for making API calls with optional caching, pagination, error redirection, and realtime sync.

## Key Features

### 1. Automatic Request Handling

- **Auto-fetching:** GET requests trigger automatically when dependencies change
- **Request cancellation:** Automatically cancels pending requests on new calls
- **State tracking:** Tracks loading, error, and success states
- **Auto-alerts:** Automatically shows alerts from backend responses
- **Authentication:** Built-in auth handling with manual override
- **Response Transformation:** Custom data normalization before storage

### 2. Intelligent Caching

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
| Auto alerts    | id enabled automatically fires alerts | `{ autoFetch: false }`               |


## ⚙️ Options / Config Parameters

| Option                | Type       | Default | Description                                          |                                          |                                                          |
| --------------------- | ---------- | ------- | ---------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------- |
| `method`              | `string`   | `'GET'` | HTTP method to use.                                  |                                          |                                                          |
| `options`             | `object`   | `{}`    | Axios config overrides.                              |                                          |                                                          |
| `autoFetch`           | `boolean`  | `true`  | Automatically fetch on mount or dependencies change. |                                          |                                                          |
| `enableCache`         | `boolean`  | `false` | Enables caching of GET responses.                    |                                          |                                                          |
| `useAuth`             | `boolean`  | `true`  | Uses `axiosInstance` with auth.                      |                                          |                                                          |
| `manualToken`         | \`string   | null\`  | `null`                                               | Manually pass a token if needed.         |                                                          |
| `autoAlert`           | `boolean`  | `false` | Triggers UI alert store from API response.           |                                          |                                                          |
| `transform`           | \`function | null\`  | `null`                                               | Transforms API response data.            |                                                          |
| `onSuccess`           | \`function | null\`  | `null`                                               | Callback after a successful response.    |                                                          |
| `onError`             | \`function | null\`  | `null`                                               | Custom error handler.                    |                                                          |
| `onLoading`           | \`function | null\`  | `null`                                               | Callback when loading begins.            |                                                          |
| `onComplete`          | \`function | null\`  | `null`                                               | Always called after request completes.   |                                                          |
| `onAbort`             | \`function | null\`  | `null`                                               | Called if request is aborted.            |                                                          |
| `retry`               | `number`   | `0`     | Number of retry attempts on failure.                 |                                          |                                                          |
| `retryDelay`          | `number`   | `1000`  | Time (ms) between retries.                           |                                          |                                                          |
| `loadingDelay`        | `number`   | `0`     | Delay before setting loading state.                  |                                          |                                                          |
| `timeout`             | `number`   | `30000` | Timeout for requests (in ms).                        |                                          |                                                          |
| `mock`                | \`boolean  | object  | function\`                                           | `null`                                   | Enables mock mode (can simulate delay, error, progress). |
| `pagination`          | `boolean`  | `false` | Enables pagination helpers.                          |                                          |                                                          |
| `transformPagination` | `function` | `null`  | Custom handler for parsing pagination meta.          |                                          |                                                          |
| `realtimeOptions`     | \`object   | null\`  | `null`                                               | Enables websocket/live sync integration. |                                                          |


## 📦 Returned Properties

| Property      | Type                | Description                                                           |                                           |
| ------------- | ------------------- | --------------------------------------------------------------------- | ----------------------------------------- |
| `data`        | `Ref<any>`          | API response data.                                                    |                                           |
| `error`       | `Ref<any>`          | API error payload.                                                    |                                           |
| `status`      | `Ref<string>`       | One of `idle`, `loading`, `success`, `error`, `refreshed`, `aborted`. |                                           |
| `lastFetched` | \`Ref\<string       | null>\`                                                               | ISO timestamp of last fetch.              |
| `progress`    | `Ref<number>`       | 0-100, indicates upload/download progress.                            |                                           |
| `isOnline`    | `Ref<boolean>`      | Current network status.                                               |                                           |
| `isLoading`   | `Computed<boolean>` | `true` if status is `'loading'`.                                      |                                           |
| `isError`     | `Computed<boolean>` | `true` if status is `'error'`.                                        |                                           |
| `realtime`    | \`Object            | null\`                                                                | WebSocket live-sync interface if enabled. |


## 🛠️ Methods

| Method                                           | Description                                                                         |
| ------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `request(payload?, queryParams?, overridePage?)` | Sends the actual API request.                                                       |
| `refresh()`                                      | Forces a refetch (and clears cache for the base URL).                               |
| `clear()`                                        | Resets all internal state (data, error, status).                                    |
| `abort()`                                        | Aborts the in-progress request.                                                     |
| `batchRequest(requests, config)`                 | Runs multiple requests concurrently with cache, auth, alert, and transform support. |

## 🧹 Cache Helpers

| Method                        | Description                                        |
| ----------------------------- | -------------------------------------------------- |
| `clearAllCache()`             | Clears all stored cache.                           |
| `clearCacheForKey(key)`       | Clears cache entry by full key.                    |
| `clearCacheForUrl(baseUrl)`   | Clears cache entries by base URL.                  |
| `clearCacheMatching(pattern)` | Deletes cache entries matching a string or RegExp. |
| `listCacheKeys()`             | Returns all current cache keys.                    |

#### 💡 Tip:
`clearCacheMatching(pattern)` is useful when you want to clear all related cache keys:

```js
clearCacheMatching(/^\/api\/users/)

```

## 🔄 Pagination Helpers (if pagination: true)

| Method / Property | Description                                         |
| ----------------- | --------------------------------------------------- |
| `currentPage`     | Ref to current page number.                         |
| `perPage`         | Ref to number of items per page.                    |
| `totalItems`      | Ref to total number of items.                       |
| `totalPages`      | Computed number of pages.                           |
| `pages`           | Computed array of page numbers (for pagination UI). |
| `nextPage()`      | Fetches the next page.                              |
| `prevPage()`      | Fetches the previous page.                          |
| `goToPage(page)`  | Jumps to a specific page.                           |
| `setPerPage(n)`   | Changes number of items per page and refetches.     |

## 📡 Realtime Support (WebSocket)

| Method             | Description                         |
| ------------------ | ----------------------------------- |
| `connect()`        | Establish the WebSocket connection. |
| `disconnect()`     | Manually close the WebSocket.       |
| `onMessage()`      | Handle incoming data messages.      |
| `onNotification()` | Handle other push messages.         |

## 🎯 Events / Lifecycle Callbacks

| Event                                 | Triggered When                                    |
| ------------------------------------- | ------------------------------------------------- |
| `onLoading()`                         | Just before request starts.                       |
| `onSuccess(data)`                     | After request succeeds.                           |
| `onError(err)`                        | After request fails. Can override error handling. |
| `onComplete({ status, data, error })` | After every request, regardless of outcome.       |
| `onAbort()`                           | If request is manually aborted.                   |

## 📦 Mock Mode

Use mock for local testing or prototyping:

```js
const api = useApi('/api/example', {
  method: 'GET',
  mock: {
    delay: 1000,
    simulateProgress: true,
    simulateError: false,
    once: true,
  }
})

```


## Basic Usage

### 1. GET Request (Auto-fetch)

```js
// Simplest form - auto-fetches immediately
const { data, isLoading, error } = useApi('/api/posts')

// With query parameters (auto-fetches when params change)
const { data } = useApi('/api/users', {
  queryParams: { role: 'admin' }
})
```

### 2 GET Request (Manual Fetch)

```js
// Disable auto-fetch
const { data, request } = useApi('/api/products', {
  autoFetch: false
})

// Fetch manually later
const loadProducts = async () => {
  await request(null, { category: 'electronics' })
}
```

### 3 POST/PUT Request

```js
const { request } = useApi('/api/users', {
  method: 'POST',
  autoFetch: false
})

const createUser = async (userData) => {
  await request(userData)
}
```

### 4 GET Request with Response Transformation

```js
// sample countries endpoint

const { data, status, error, isLoading, request } = useApi('/v1/admin/countries', {
  transform: (response) => {
    const payload = response?.dataPayload?.data || []
    return payload.map((country) => ({
      id: country.id,
      code: country.code,
      name: country.name,
      citizenship: country.citizenship,
      status: country.status?.label || 'Unknown',
    }))
  },
})

onMounted(() => {
  request()
})

// Resulting data structure:
// [
//   { id: 1, code: "KE", name: "Kenya" },
//   { id: 2, code: "Tz", name: "Tanzania" },
// ]


// in template

<template>
  <div>
    <h2>Country List</h2>

    <div v-if="isLoading">Loading...</div>
    <div v-else-if="error">Error: {{ error }}</div>

    <ul v-else>
      <li v-for="country in data" :key="country.id">
        {{ country.name }} ({{ country.code }}) - {{ country.citizenship }} | Status:
        {{ country.status }}
      </li>
    </ul>
  </div>
</template>
```

#### Best Practices For Transformations:

- **Keep transformations pure:** Avoid side effects
- **Handle errors:** Ensure transformation won't crash on unexpected data
- **Memoize expensive operations:** For large datasets
- **Reuse transformations:** Create shared helper functions

## Advanced Configuration Options

```js
const { request } = useApi('/api/protected', {
  // Request method
  method: 'GET',

  // Auto-fetch on component mount
  autoFetch: true,

  // Enable caching (GET only)
  enableCache: true,

  // Automatic alert display
  autoAlert: true,

  // Disable automatic auth handling
  useAuth: false,

  // Manual auth token
  manualToken: 'your_token_here',

  // Additional axios options
  options: {
    headers: { 'X-Custom-Header': 'value' },
    timeout: 10000
  }
})
```

## When to Use

✅ Fetching data for display

✅ Forms with API submissions

✅ Complex API interactions with caching needs

✅ Applications requiring request state management
