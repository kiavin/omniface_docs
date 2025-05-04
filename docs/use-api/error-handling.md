# Error Handling Guide

## Error States

The `useApi` composable provides multiple ways to handle and inspect errors:

```vue
<script setup>
const { error, isError, status } = useApi('/api/data')
</script>

<template>
  <div v-if="isError">
    <!-- Error display -->
  </div>
</template>
```

### Error Object Structure

The **error** ref contains normalized error information:

```ts
{
  message: string,           // Human-readable error
  status?: number,           // HTTP status code
  details?: any,             // Raw error payload
  validationErrors?: {       // Form validation errors
    [field: string]: string[]
  }
}
```

## Common Error Patterns

### 1. API Validation Errors (422 status):

```js
error.value = {
  message: 'Validation failed',
  status: 422,
  validationErrors: {
    email: ['Must be valid email'],
    password: ['Minimum 8 characters'],
  },
}
```

### 2. Server Errors (500 status):

```js
error.value = {
  message: 'Internal Server Error',
  status: 500,
}
```

### 3. Network Errors:

```js
error.value = {
  message: 'Network Error: Failed to fetch',
}
```

## Handling Strategies

### 1. Basic Error Display

```vue
<template>
  <div v-if="isError" class="alert alert-danger">
    {{ error.message }}
  </div>
</template>
```

### 2. Form Validation Handling

```vue
<template>
  <form @submit.prevent="submitForm">
    <input v-model="form.email" />
    <span v-if="error?.validationErrors?.email" class="error">
      {{ error.validationErrors.email[0] }}
    </span>
  </form>
</template>

<script setup>
const { request, error } = useApi('/api/register', 'POST')
const form = ref({ email: '', password: '' })

const submitForm = async () => {
  await request(form.value)
  if (!error.value) {
    // Success logic
  }
}
</script>
```

### 3. Global Error Handling

```js
watch(error, (newError) => {
  if (newError) {
    showToast({
      title: 'Error',
      message: newError.message,
      variant: 'danger',
    })
  }
})
```

## Status States

| Status      | Description         | When Occurs               |
| ----------- | ------------------- | ------------------------- |
| `idle`      | Initial state       | Before first request      |
| `loading`   | Request in progress | During API call           |
| `success`   | Request succeeded   | After successful response |
| `error`     | Request failed      | After error response      |
| `refreshed` | Force-fetched data  | After manual refresh      |

## Best Practices

### 1. Check error existence first:

```js
if (error.value) {
  // Handle error
}
```

### 2. Reset errors before new requests:

```js
const { request, error } = useApi('/api/data')

const fetchData = async () => {
  error.value = null
  await request()
}
```

### 3. Type-specific handling:

```js
if (error.value?.status === 401) {
  // Handle unauthorized
} else if (error.value?.status === 404) {
  // Handle not found
}
```

## Common Solutions

Retry Failed Requests

```js
const { request } = useApi('/api/data')

const fetchWithRetry = async (retries = 3) => {
  for (let i = 0; i < retries; i++) {
    await request()
    if (!error.value) break
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
}
```

Error Recovery


```js
const lastValidData = ref(null)

watch(data, (newData) => {
  if (newData) lastValidData.value = newData
})

// Use when error occurs:
error.value ? lastValidData.value : data.value
```

