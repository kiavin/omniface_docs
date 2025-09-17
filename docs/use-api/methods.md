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
const { request } = useApi('/api/users', {method: 'GET'})
request(null, { page: 1, limit: 10 })

// POST request with payload
const { request } = useApi('/api/users', {method: 'POST'})
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
const { refresh } = useApi('/api/users', {method: 'GET', options: {}, autoFetch: true, enableCache: true})

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
useApi('/api/data', {method: 'GET', options: {}, autoFetch: false}) // autoFetch = false
```

### Auto-Alert System

When autoAlert: true is enabled, the composable will automatically display alerts from backend responses:


How It Works
```js
const { request } = useApi('/api/update', {
  method: 'PUT',
  autoAlert: true // // Enable automatic alerts
})
```

Backend Response Format:

```js
{
  "data": {...},
  "alertifyPayload": {
    "type": "success",
    "message": "Update successful!",
    "duration": 5000
  }
}
```

The composable automatically extracts the alertifyPayload and passes it to the alert store, which then displays the notification.

### Alert Store Implementation

```js
// stores/alert.js
import { defineStore } from 'pinia'
import { useAlertify } from '~/omnicore/helpers/useAlertify.js'

export const useAlertStore = defineStore('alert', {
  state: () => ({
    suppressAutoAlerts: false,
  }),

  actions: {
    /**
     * Displays an alert notification
     * @param {Object} payload - Alert configuration
     * @param {string} payload.type - Alert type (success, error, warning, info)
     * @param {string} payload.message - Notification message
     * @param {number} [payload.duration=5000] - Display duration in ms
     */
    show(payload = {}) {
      if (this.suppressAutoAlerts) return

      const { showAutoAlert } = useAlertify()

      // Extract nested alertifyPayload if exists
      const finalPayload = payload?.alertifyPayload || payload

      showAutoAlert(finalPayload)
    },

    /**
     * Toggles automatic alert suppression
     * @param {boolean} state - True to suppress alerts
     */
    suppress(state = true) {
      this.suppressAutoAlerts = state
    }
  }
})
```

### Manual Alert Handling

You can directly use the alert store without the useApi composable:

```js
<script setup>
import { useAlertStore } from '~/stores/alert'

const alertStore = useAlertStore()

// Show success alert
const showSuccess = () => {
  alertStore.show({
    type: 'success',
    message: 'Operation completed successfully!',
    duration: 3000
  })
}

// Show error alert
const showError = () => {
  alertStore.show({
    type: 'error',
    message: 'Failed to save changes',
    duration: 5000
  })
}
</script>
```

### Alert Suppression Mechanism

Temporarily disable automatic alerts for specific operations:

```js
const submitForm = async () => {
  const alertStore = useAlertStore()

  try {
    // Suppress auto-alerts during this operation
    alertStore.suppress(true)

    await apiRequest(formData.value)

    // Manually show custom success message
    alertStore.show({
      type: 'success',
      message: 'Custom success message',
      duration: 2000
    })
  } catch (error) {
    // Manually show custom error
    alertStore.show({
      type: 'error',
      message: 'Custom error handling',
      duration: 4000
    })
  } finally {
    // Restore auto-alerts
    alertStore.suppress(false)
  }
}
```

### Complete Alert System Features

#### 1. Alert Payload Options

| Property      | Type            | Default       | Description                                                               |
| ------------- | --------------- | ------------- | ------------------------------------------------------------------------- |
| `type`        | `string`        | —             | **Required.** Alert type (`success`, `error`, `warning`, `info`)          |
| `message`     | `string`        | —             | **Required.** Notification content to display                             |
| `duration`    | `number`        | `5000`        | Display time in milliseconds (`0` = persistent)                           |
| `position`    | `string`        | `'top-right'` | Display position (`top-right`, `top-left`, `bottom-right`, `bottom-left`) |
| `dismissible` | `boolean`       | `true`        | Allow user to manually close the alert                                    |
| `title`       | `string`        | —             | Optional header text for the alert                                        |
| `icon`        | `string`        | —             | Custom icon class (e.g., `'fas fa-check-circle'`)                         |
| `actions`     | `Array<object>` | —             | Interactive buttons (`{ text: 'Undo', handler: () => {...} }`)            |



#### 2.  Alert Types & Styling

```js
// Example of different alert types
alertStore.show({ type: 'success', message: 'Success!' })
alertStore.show({ type: 'error', message: 'Something went wrong' })
alertStore.show({ type: 'warning', message: 'Please check your input' })
alertStore.show({ type: 'info', message: 'New update available' })
```

#### 4. Programmatic Control

```js
const alertStore = useAlertStore()

// Show alert
alertStore.show({...})

// Suppress all alerts
alertStore.suppress(true)

// Restore alert display
alertStore.suppress(false)

```

### Best Practices

#### 1. Use auto-alerts for standard operations:

```js
useApi('/api/update', { autoAlert: true })

```

#### 2. Manual alerts for custom flows:

```js
try {
  await updateRecord()
  alertStore.show({ type: 'success', message: 'Custom success' })
} catch {
  alertStore.show({ type: 'error', message: 'Custom error' })
}
```

#### 3. Combine with backend responses:

```js
const { data } = await request(payload)
if (data.alertifyPayload) {
  alertStore.show(data.alertifyPayload)
}
```

### Error Handling & Redirection

The composable automatically handles common error codes:

```js
// Global configuration (app.config.js)
export default {
  api: {
    redirectErrorPages: true // Enable/disable auto-redirect
  },
  safeRoutes: [
    'login',
    'error-page'
    // Routes that don't require auth
  ]
}
```

When an error occurs:

- Checks if redirect is enabled
- For status codes 401, 403, 404, 500:
    - Redirects to appropriate error page
    - asses error details for display
- Other errors populate the error ref

### Caching System

- **Cache Key:** Full URL including query params
- **Default TTL:** 5 minutes
- **Automatic Invalidation:**
  - Cleared on non-GET requests to same base URL
  - Manual clearing via **refresh()**

### Enable Cache:

```js
useApi('/api/data', {method: 'GET', options: {}, autoFetch: true, enableCache: true}) // enableCache = true
```

### Request Cancellation

- Uses AbortController
- Automatically cancels previous requests
- No race conditions for rapid successive calls

### Authentication Handling

By default, the composable uses the application's authentication system:

```js
// Default behavior (uses app's auth token)
const { request } = useApi('/api/protected')

// Disable auth handling
const { request } = useApi('/api/public', {
  useAuth: false
})

// Manual token override
const { request } = useApi('/api/external', {
  manualToken: 'special_access_token'
})
```

### Complete Example

Data Fetching with Auto-Refresh

```js
<script setup>
const {
  data,
  error,
  request,
  refresh,
  isLoading
} = useApi('/api/users',{ method: 'GET', options: {}, autoFetch: true, enableCache: true})

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

### Form Submission with Alerts

```js
<script setup>
const formData = ref({ name: '', email: '' })

const { request, isLoading, error } = useApi('/api/users', {
  method: 'POST',
  autoAlert: true
})

const submitForm = async () => {
  await request(formData.value)
  if (!error.value) formData.value = { name: '', email: '' }
}
</script>
```

### Cached Data with Manual Refresh

```js
const { data, refresh, isLoading } = useApi('/api/products', {
  enableCache: true,
  autoFetch: false // Wait for user action
})

// User filters products
const applyFilters = (filters) => {
  refresh(null, filters) // Bypasses cache for fresh data
}
```

### Progress Tracking for Large Requests

For large file uploads/downloads, the useApi composable provides progress tracking using Axios' native progress events. This feature gives real-time feedback on upload/download progress, significantly enhancing UX for file-heavy operations.

#### Implementation

Progress tracking is built into the request method and requires no additional configuration. The composable automatically exposes progress properties when making requests.

```js
const {
  request: uploadFile,
  progress,
  progressType,
  isLoading
} = useApi('/api/upload', {
  method: 'POST',
  autoFetch: false
})

const handleFileUpload = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  uploadFile(formData)
}
```

Usage Example

```js
<script setup>
import { ref } from 'vue'

const fileInput = ref(null)
const file = ref(null)

// API composable with progress tracking
const {
  request: uploadFile,
  progress,
  progressType,
  isLoading
} = useApi('/api/upload', {
  method: 'POST',
  autoFetch: false,
  autoAlert: true
})

const handleSubmit = () => {
  if (!file.value) return

  const formData = new FormData()
  formData.append('file', file.value)
  formData.append('metadata', JSON.stringify({
    name: file.value.name,
    type: file.value.type
  }))

  uploadFile(formData)
}

const onFileChange = (e) => {
  file.value = e.target.files[0]
}
</script>

<template>
  <div class="upload-container">
    <input type="file" ref="fileInput" @change="onFileChange" />

    <div v-if="isLoading" class="progress-container">
      <!-- Upload progress -->
      <div v-if="progressType === 'upload'">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
        </div>
        <div class="progress-text">Uploading: {{ progress }}%</div>
      </div>

      <!-- Download progress -->
      <div v-if="progressType === 'download'">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
        </div>
        <div class="progress-text">Downloading: {{ progress }}%</div>
      </div>
    </div>

    <button @click="handleSubmit" :disabled="isLoading || !file">
      {{ isLoading ? 'Processing...' : 'Upload File' }}
    </button>
  </div>
</template>

<style>
.progress-container {
  margin: 20px 0;
  width: 100%;
}

.progress-bar {
  height: 10px;
  background: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #42b983;
  transition: width 0.3s ease;
}

.progress-text {
  margin-top: 5px;
  font-size: 14px;
  text-align: center;
}
</style>
```

### Key Features

Real-time Feedback: Visual progress indicators for UX
Type Differentiation: Separate tracking for uploads vs downloads
Seamless Integration: Works automatically with all requests
UI Agnostic: Implement any progress bar design

#### When to Use Progress Tracking


 - File uploads (documents, images, videos)
 - Large data exports/downloads
 - Bulk data imports
 - Media processing operations
 - Long-running API requests (>5 seconds)
 - Applications with bandwidth constraints

## Best Practices

 - **Use auto-fetch:** for initial data loading
 - **Enable caching:** for frequently accessed, static data
 - **Use auto-alert:** for standard API responses
 - **Disable auth:** for public endpoints
 - **Manual fetch:** for user-triggered actions
 - **Clear cache:** after mutations for data consistency
 - Handle specific errors beyond the automatic redirection


The updated useApi composable provides a robust solution for handling API interactions with minimal boilerplate, while offering flexibility for complex scenarios.
