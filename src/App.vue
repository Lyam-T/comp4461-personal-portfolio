<template>
  <v-app>
    <v-main>
      <!-- Show home content when on root route, otherwise show router-view -->
      <div v-if="$route.path === '/'">
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
      </div>
      <router-view v-else />
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
  }, 400)
})
</script>

<style scoped>
/* Intro component animation */
.intro-wrapper {
  opacity: 0;
  transform: translateY(-30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.intro-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Projects component animation */
.proj-wrapper {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.proj-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
