## Code Snippet Examples

Here's a comprehensive examples.md for your Omnigrid documentation, showcasing practical implementations with clear explanations and visual references:


### 1. Basic Data Table

```vue
<template>
  <OmniGridView
    :columns="[
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Full Name' },
      { key: 'email', label: 'Email' }
    ]"
    :data="{
      data: [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ],
      paginationData: { currentPage: 1, perPage: 10, totalCount: 2 }
    }"
  />
</template>
```

### 2. Inline Editing Example

```vue
<OmniGridView
  :columns="userColumns"
  :data="userData"
  :editable-columns="[
    { 
      key: 'email', 
      type: 'email',
      onSave: async ({value}) => {
        await updateUserEmail(value)
      }
    },
    {
      key: 'department',
      type: 'select',
      options: ['HR', 'Engineering', 'Marketing']
    }
  ]"
/>
```

### 3. Server-Side Pagination

```js
const { data, request } = useApi('/api/users', 'GET')

const handlePageChange = (page) => {
  request(null, { 
    page,
    'per-page': tableData.value.paginationData.perPage
  })
}
```

```vue
<OmniGridView
  :data="data"
  :loading="loading"
  @changePage="handlePageChange"
  :pagination-config="{
    serverSide: true,
    showRange: true
  }"
/>
```

### 4. Custom Column Rendering.
```vue
<template #column-status="{ row }">
  <span :class="`badge bg-${row.status.color}`">
    <font-awesome-icon :icon="row.status.icon" />
    {{ row.status.text }}
  </span>
</template>

<template #column-actions="{ row }">
  <button @click="viewDetails(row)" class="btn btn-sm btn-info">
    View
  </button>
</template>
```

### 5. Expandable Rows

```vue
<OmniGridView
  :expandable-rows="true"
  :columns="productColumns"
  :data="productData"
>
  <template #expandable-row="{ row }">
    <div class="p-3 bg-light">
      <h5>Product Details</h5>
      <p>SKU: {{ row.sku }}</p>
      <p>Inventory: {{ row.stock }} units</p>
    </div>
  </template>
</OmniGridView>
```

### 6. Comprehensive Example (Combining Features)

```vue
<OmniGridView
  :columns="[
    { key: 'id', label: 'ID', pinned: 'left', width: 80 },
    { key: 'name', label: 'Name', filter: { type: 'text' }},
    { key: 'status', label: 'Status', sortable: true },
    { key: 'last_updated', label: 'Updated', type: 'datetime' }
  ]"
  :data="serverData"
  :toolbar="{
    show: true,
    showCreateButton: true,
    showRefresh: true,
    customButtons: ['export-excel', 'export-pdf']
  }"
  :expandable-rows="true"
  :pagination-config="{
    variant: 'circle',
    position: 'right',
    showTotal: true
  }"
  @search="handleGlobalSearch"
  @create="openCreateModal"
>
  <template #left-buttons>
    <BaseButton @click="bulkAction" variant="outline-primary">
      Bulk Action
    </BaseButton>
  </template>
</OmniGridView>
```