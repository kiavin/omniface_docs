# use Api Advanced Features

The **useApi** composable provides a robust set of advanced features for handling complex API scenarios. Below are the powerful capabilities beyond basic request handling:

### 1. Response Transformation

**Description:** Transform API responses into a different structure before storing in the data ref
**Use Case:** Normalize inconsistent API structures, rename fields, compute derived values

#### Configuration:

```js
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
  onLoading: () => console.log('Fetching started...'), // onloading custom handler
  onSuccess: (response) => console.log('Success!', response), // onsucess cutom hanlder
  onComplete: ({ status }) => console.log(`Completed with status: ${status}`),
  // retry: 2,
  // loadingDelay: 300
})
```

After Transforming your Api response you can use it like this in template

```js
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
```

### 2 Progress Tracking

**Description:** Monitor upload/download progress percentage in real-time

**Use Case:** File uploads, large data transfers, long-running requests

#### Properties
```js
const { progress } = useApi('/v1/admin/country', {
  method: 'POST',
})
```

#### USage Sample

```js
// initializing useApi

const {
  request: uploadFile,
  isLoading: isUploading,
  progress,
  error: postError,
  status: postStatus,
} = useApi('/v1/file/upload', {
  method: 'POST',
  useAuth: true,
  autoFetch: false,
  autoAlert: true, // Optional: will show alert from server response
}


// Trigger the POST
const handleSubmit = () => {
  uploadFile(filePayload.value)
}
```

#### In template
```js
<template>
<div>
   <h2>Upload file</h2>

   <button @click="handleSubmit" :disabled="isPosting">
     {{ isuploading ? 'Uploading...' : 'upload file' }}
   </button>

   <div v-if="isUploading">
     Uploading: {{ progress }}%
     <progress :value="progress" max="100" style="width: 100%"></progress>
   </div>

   <div v-if="postStatus === 'success'" class="text-success">File Uploaded successfully!</div>
   <div v-if="postStatus === 'error'" class="text-danger">Error: {{ postError }}</div>
 </div>
</template>
```
### 3. Custom Error Handlers

**Description:** Override default error handling with custom logic

**Use Case:** Specialized error reporting, conditional error handling

#### Configuration:

```js
useApi('/api/data', {
  onError: (error) => {
    if (error.response?.status === 429) {
     ....
    }
    return false
  }
})
```

### 4. Event Hooks

**Description:** Lifecycle hooks for different request stages

**Use Case:** Analytics, loading states, side effects

#### Hooks Available:

```js
useApi('/api/data', {
    onLoading: () => console.log('Fetching started...'), // onloading custom handler
    onSuccess: (response) => console.log('Success!', response), // onsucess cutom hanlder
    onComplete: ({ status }) => console.log(`Completed with status: ${status}`),
    onError: (error.response) => console.log(error.response)
})
```

###  6. Mock Mode

**Description:** Simulate API responses during development

**Use Case:** Testing UI without backend, prototyping

#### Configuration:

```js
// Mock API: POST /api/spaces
const {
  request: postMockSpace,
  data: mockSpaceData,
  isLoading: isMockSpaceLoading,
} = useApi('/api/spaces', {
  method: 'POST',
  mock: (payload, queryParams, method) => ({
    id: 999,
    name: payload.name,
    methodUsed: method,
    receivedAt: new Date().toISOString(),
  }),
  autoFetch: false,
})
```

#### Mock API: GET request sample /api/fail-check (simulate error)

```js
const {
  request: getMockError,
  error: mockError,
  isLoading: isMockErrorLoading,
} = useApi('/api/fail-check', {
  method: 'GET',
  mock: {
    simulateError: true,
    delay: 1000,
    error: ['Oops! Something went wrong'],
  },
  autoFetch: false,
})
```

#### Mock API: POST /api/upload (simulate progress)

```js
const {
  request: uploadMock,
  isLoading: isUploadingMock,
  progress: uploadProgress,
  data: uploadData,
} = useApi('/api/upload', {
  method: 'POST',
  mock: {
    simulateProgress: true,
    delay: 2000,
    data: { success: true },
  },
  autoFetch: false,
})
```

#### Mock API: GET /api/space (once only)

```js
const {
  request: getOnceOnlyMock,
  data: onceMockData,
  isLoading: isOnceMockLoading,
} = useApi('/api/space', {
  method: 'GET',
  mock: {
    once: true,
    delay: 500,
    data: { mockData: 'Shown once only' },
  },
  autoFetch: false,
})
```

```js

// Trigger functions
const callPostMockSpace = () => postMockSpace({ name: 'Mock Room' })
const callUploadMock = () => uploadMock()
const callErrorMock = () => getMockError()
const callOnceOnlyMock = () => getOnceOnlyMock()

```

### 7. Request Timeout

**Description:** Abort requests that exceed specified duration

**Use Case:** Preventing hung requests, handling slow APIs

#### Configuration:

```js
const { request } = useApi('/api/process', {
  timeout: 10000 // 10 seconds
})
```

### 8. Retry Mechanism

**Description:** Automatically retry failed requests

**Use Case:** Unstable networks, transient server errors

#### Configuration:

```js
const {
  request: createCountry,
  isLoading: isPosting,
  progress,
  error: postError,
  status: postStatus,
} = useApi('/v1/admin/country', {
  method: 'POST',
  useAuth: true,
  autoFetch: false,
  autoAlert: true, // Optional: will show alert from server response
  retry = 0, // number of retry attempts
  retryDelay = 1000,// time between retries in ms
})
```

### 9. Pagination Support

**Description:** Built-in handling for paginated APIs

**Use Case:** Data tables, infinite scrolling

#### Implementation:

```js
const {
  data: paginatedPermissions,
  request: fetchPermissions,
  nextPage,
  prevPage,
  goToPage,
  currentPage,
  totalPages,
  pages,
  isLoading: isPaginating,
  error: paginationError,
} = useApi('/v1/iam/rbac/permission', {
  method: 'GET',
  pagination: true,
  perPage: 5,
  autoFetch: true,

  // Extract pagination meta from custom structure
  transformPagination: (res) => {
    const meta = res?.dataPayload || {}
    return {
      totalItems: meta.totalCount,
      currentPage: meta.currentPage,
      perPage: meta.perPage,
      totalPages: meta.totalPages,
    }
  },

  // Extract data array
  transform: (res) => res?.dataPayload?.data ?? [],
})

const goToPageInput = ref(currentPage.value)
watch(currentPage, (val) => (goToPageInput.value = val))

console.log('PAGINATIN DATA', paginatedPermissions)

```

### 11. Cache Management Utilities

**Description:** Manual control over cached data

**Use Case:** Force cache invalidation, manual updates

#### Methods:

**clearAllCache()** - deletes all cached data

**clearCacheForKey(key)** – deletes a specific cache entry.

**listCacheKeys()** – returns a list of all currently cached keys.

**clearCacheMatching(pattern)***  – clear multiple cache entries based on a substring or RegExp pattern

```js
const { request } = useApi('/api/products', {
  enableCache: true
})

// clear cache manually
const { clearAllCache } = useApi('/api/some-resource')
clearAllCache()


//

const api = useApi('/api/posts', { enableCache: true })
api.listCacheKeys() // ['GET /api/posts?page=1']
api.clearCacheForKey('/api/posts?page=1')


// Remove all cache keys that contain "/api/posts"
api.clearCacheMatching('/api/posts')

// Remove cache keys that match a pattern (e.g., all `page=1` queries)
api.clearCacheMatching(/page=1/)

```

### 12. Concurrent Request Management

**Description:** Coordinate multiple simultaneous requests

**Use Case:** Dashboard widgets, dependent data loading

#### Implementation:

```js
const {
  request: useApi,
  isLoading: isLoading,
  progress: uploadProgress,
  data: uploadData,
} = useApi('/api/user/123', {method: "PUT"})

const {
  request: postApi,
  isLoading: isLoading,
  progress: uploadProgress,
  data: uploadData,
} = useApi('/api/posts?user=123')

// Combined loading state
const isLoading = computed(() =>
  userApi.isLoading.value || postsApi.isLoading.value
)
```

### 13. Request Cancellation

**Description:** Programmatically abort in-progress requests

**Use Case:** Component unmounting, user cancellation

#### Implementation:

```js
const { request, abort, status } = useApi('/api/search', {
    method: 'GET',
    autoFetch: false,
    onAbort: () => {
        console.log('Request was manually aborted')
    }
})

// Later in your component:
abort() // Manually cancel in-flight request

```
#### Why/When You Should Add a Manual Abort

Adding manual abort makes sense in these scenarios:

#### 1. User-Navigated Away
- You're on a page with a loading spinner (or autocomplete), and the user navigates
     away — you don’t want the request to finish if the page is no longer relevant.

#### 2. Rapid User Input (Autocomplete, Search)
- Typing in a search box triggers API calls.
     You want to cancel previous requests when the next one starts to
     prevent race conditions or stale data.

#### 3. Refresh Buttons
- A user clicks "Refresh", and you want to cancel any in-flight request before issuing a new one.

#### 4. Component Unmounting
- A component using useApi() gets unmounted before the request completes.
    You may want to abort it to prevent memory leaks or console warnings.


### 14. Automatic Token Refresh

**Description:** Handle expired authentication tokens through interceptors

**Use Case:** JWT-based authentication systems

#### Configuration:

```js
// Request Interceptor
axiosInstance.interceptors.request.use(async (config) => {
    // console.log('[AXIOS INTERCEPTOR] Executing...', config)
    if (config.skipAuth) return config

    const encryptedToken = localStorage.getItem('user.token')
    const token = decryptToken(encryptedToken)

    if (token && !config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
})
```


## Best Practices for Advanced Usage

#### 1. Combine Features Judiciously:

These advanced features transform **useApi** into a comprehensive API handling solution capable of addressing complex application requirements while maintaining clean and maintainable code architecture.
