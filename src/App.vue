<template>
  <v-app>
    <v-main>
      <v-container class="pa-4">
        <div
          class="intro-wrapper"
          :class="{ 'intro-visible': showIntro }"
        >
          <Intro />
        </div>
        <div
          class="proj-wrapper"
          :class="{ 'proj-visible': showProj }"
        >
          <Proj />
        </div>
      </v-container>
    </v-main>
    <FooterCredit author="Lyam Tang" />
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FooterCredit from './components/FooterCredit.vue'
import Intro from './components/Intro.vue'
import Proj from './components/Proj.vue'

// Animation states
const showIntro = ref(false)
const showProj = ref(false)

// Sequential animation on mount
onMounted(() => {
  // Show intro immediately
  setTimeout(() => {
    showIntro.value = true
  }, 200)

  // Show projects after intro animation completes
  setTimeout(() => {
    showProj.value = true
  }, 400) // 1200ms = 200ms delay + 1000ms for intro to settle
})
</script>

<style scoped>
/* Intro component animation */
.intro-wrapper {
  opacity: 0;
  transform: translateY(-30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.intro-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Project component animation */
.proj-wrapper {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.proj-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
