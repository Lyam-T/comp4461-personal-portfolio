// src/components/FooterCredit.vue
<template>
  <v-footer app elevation="0" border="t" class="bg-surface">
    <v-container class="py-3">
      <div class="w-100 text-center text-body-2 text-medium-emphasis">
        Developed by {{ author }} @{{ year }}
      </div>
    </v-container>
  </v-footer>
</template>

<script setup>
const props = defineProps({
  author: { type: String, default: 'Your Name' },
})
const year = new Date().getFullYear()
</script>