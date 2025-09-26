<template>
  <v-container>
    <v-row align="center">
      <v-col cols="8" class="text-left">
        <h1>Hi, I'm Lyam
          <span
            :class="{ wave: isWaving }"
            @click="triggerWave"
            style="cursor: pointer;"
          >👋🏻</span>
        </h1>
        <p class="text-subtitle-1 mt-2">
          I am a final year computer science student
          in Hong Kong University of Science and Technology (HKUST).
          And I am passionate about creating user-friendly and innovative digital experiences.
        </p>
      </v-col>
      <v-col cols="4">
        <v-avatar size="150">
          <img src="/images/avatar.jpeg" alt="Avatar" style="object-fit: contain; width: 100%; height: 100%;" />
        </v-avatar>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col class="text-left">
        <h3>About</h3>
        <p class="text-subtitle-1 mt-2">
          This is a portfolio page for showcase of my works
          in the course of COMP4461, human computer interaction.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isWaving = ref(false);

function triggerWave() {
  if (!isWaving.value) {
    isWaving.value = true;
    setTimeout(() => {
      isWaving.value = false;
    }, 1800);
  }
}

onMounted(() => {
  triggerWave();
});
</script>

<style scoped>
.wave {
  display: inline-block;
  animation: wave-animation 1.8s;
  transform-origin: 70% 70%;
}

@keyframes wave-animation {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}
</style>
