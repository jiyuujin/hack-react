<template>
  <div v-if="tags" class="tags">
    <div v-for="tag in tags" :key="tag" class="tag">
      {{ tag }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    tags: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>

<style scoped>
.tags {
  max-width: 100%;
  margin-top: 0.5rem;
  font-size: 0.9em;
}
.tag {
  display: inline-block;
  padding: 0 7px;
  margin-right: 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: #fefefe;
  background-color: #186fc7;
  border: 1px solid #186fc7;
  border-radius: 2em;
}
</style>
