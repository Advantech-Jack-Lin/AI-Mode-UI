<template>
  <table class="table-component" v-if="rows.length">
    <thead>
      <tr>
        <th v-for="h in headers" :key="h">{{ h }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row,i) in rows" :key="i">
        <td v-for="h in headers" :key="h">{{ row[h] }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
const props = defineProps<{ data: Array<Record<string, any>> }>();
const rows = props.data || [];
const headers = rows.length ? Object.keys(rows[0]) : [];
</script>

<style scoped>
.table-component {
  width: 100%;
  border-collapse: collapse;
}
.table-component th,
.table-component td {
  padding: 8px 12px;
  border: 1px solid var(--app-border);
}
.table-component th {
  background: var(--app-hover);
}
</style>
