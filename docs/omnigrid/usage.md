# Omnigrid Usage Guide

## Introduction

Omnigrid is a globally available component in Omniface that provides powerful data grid functionality with minimal setup. No import needed - just use `<OmniGridView>` in your templates.

![Omnigrid Preview](../public/img/Screenshot_2025-05-03_12-26-16.png)

## Basic Implementation

### 1. Minimal Setup

```vue
<template>
  <OmniGridView :columns="tableColumns" :data="tableData" />
</template>

<script setup>
const tableData = ref({
  data: [],
  paginationData: {
    countOnPage: 0,
    currentPage: 1,
    perPage: 20,
    totalCount: 0,
    totalPages: 0,
    paginationLinks: {},
  },
})

const tableColumns = ref([
  { key: 'userName', label: 'Name' },
  { key: 'email', label: 'Email' },
])
</script>
```

```js
const tableData = ref({
  data: [
    { userName: 'John Doe', email: 'john@example.com' },
    { userName: 'Jane Smith', email: 'jane@example.com' },
  ],
  paginationData: {
    currentPage: 1,
    perPage: 10,
    totalCount: 2,
  },
})
```

## Core Features

### 1. Pagination

```vue
<OmniGridView
  :pagination-config="{
    variant: 'circle',
    position: 'right',
    bgColor: '#4f46e5',
    showTotal: true,
  }"
/>
```

### 2. Toolbar

```vue
<OmniGridView
  :toolbar="{
    show: true,
    showCreateButton: true,
    customButtons: ['export'],
  }"
/>
```

### 3. Row Actions

Handle view/edit/delete events:

```vue
<OmniGridView @view="handleView" @edit="handleEdit" @delete="handleDelete" />
```

```js
const handleView = (row) => {
  console.log('Viewing:', row.id)
}

const handleEdit = (row) => {
  // Your edit logic
}

const handleDelete = async (row) => {
  const confirm = await showConfirmationDialog()
  if (confirm) {
    // Delete logic
  }
}
```

## Advanced Features

### 1. Inline Editing

```vue
<OmniGridView :editable-columns="[{ key: 'email', onSave: handleEmailUpdate }]" />
```

```js
const handleEmailUpdate = async ({ row, value }) => {
  // Save to backend
  await updateRecord(row.id, { email: value })
}
```

### 2. Custom Columns

```vue
<template #column-status="{ row }">
  <span :class="getStatusClass(row.status)">
    {{ row.statusLabel }}
  </span>
</template>
```

### 3. Server-Side Operations

```js
const { data, request } = useApi('/api/records', 'GET')

const handleSearch = (query) => {
  request(null, {
    page: currentPage.value,
    'per-page': itemsPerPage.value,
    _search: query,
  })
}

const changePage = (page) => {
  request(null, { page })
}
```

## Complete Example

````vue
<OmniGridView
  :columns="tableColumns"
  :editable-columns="editableColumns"
  :data="tableData"
  :loading="isLoading"
  action-layout="inline"
  :pagination-config="{
    variant: 'circle',
    position: 'right',
    bgColor: '#4f46e5',
    hoverBgColor: '#6366f1',
    textColor: '#374151',
    activeTextColor: '#ffffff',
    showFirstLast: true,
    showNumbers: true,
    showTotal: true,
    showRange: true,
  }"
  :toolbar="{
    show: true,
    showCreateButton: true,
  }"
  :expandable-rows="true"
  :filtering="true"
  :multi-select="false"
  :radio-select="false"
  :break-extra-columns="false"
  :search-in-backend="true"
  @view="handleView2"
  @edit="handleEdit"
  @delete="handleDelete"
  @search="handleSearch"
  @changePage="changePage"
  @update:perPage="updatePerPage"
  @refresh="request"
>
      // demo slot component
      <template #left-buttons>
        <BaseButton class="btn btn-success btn-sm" @click="showModal" style="font-size: 1.2rem">
          <template #icon>
            <font-awesome-icon :icon="['fas', 'plus']" />
          </template>
          Custom Left
        </BaseButton>
      </template>
      <template #column-status="{ row }">
        <span :class="getStatusClass(row.recordStatus?.theme)">
          {{ row.recordStatus.label }}
        </span>
      </template>
    </OmniGridView>
```
````
