<template>
  <v-container class="mt-8">
    <!-- Back to Home Button -->
    <v-row class="mb-4">
      <v-col>
        <v-btn
          variant="outlined"
          @click="goBackToHome"
          class="back-to-home-btn"
        >
          <template v-slot:prepend>
            <vue-feather type="arrow-left" size="18"></vue-feather>
          </template>
          Back to Home
        </v-btn>
      </v-col>
    </v-row>

    <!-- Project Header -->
    <v-row v-if="project" class="mb-6">
      <v-col cols="12">
        <v-card elevation="0" class="pa-6">
          <v-row>
            <!-- Project Image -->
            <v-col cols="12" md="6">
              <v-img
                :src="project.imageSrc"
                height="300"
                contain
                class="bg-grey-lighten-2 rounded"
              >
                <!-- Status badge for actual images (top right corner) -->
                <div v-if="hasActualImage(project)" class="position-absolute" style="top: 8px; right: 8px; z-index: 2;">
                  <v-chip
                    :color="getStatusChipColor(project.status)"
                    size="small"
                    variant="flat"
                    class="text-white"
                  >
                    {{ project.statusIcon }} {{ project.status }}
                  </v-chip>
                </div>

                <template v-slot:placeholder>
                  <div class="d-flex align-center justify-center fill-height">
                    <v-icon size="64" color="grey">{{ project.placeholderIcon }}</v-icon>
                    <!-- Show status overlay only when no actual image (using placeholder) -->
                    <div class="d-flex align-center justify-center fill-height position-absolute" style="top: 0; left: 0; right: 0; bottom: 0;">
                      <div class="text-center">
                        <p class="text-h5 text-grey mb-1">{{ project.statusIcon }}</p>
                        <p class="text-h6 text-grey">{{ project.status }}</p>
                      </div>
                    </div>
                  </div>
                </template>
              </v-img>
            </v-col>

            <!-- Project Info -->
            <v-col cols="12" md="6">
              <h1 class="text-h3 mb-2">{{ project.title }}</h1>
              <h2 class="text-h5 text-grey mb-4">{{ project.subtitle }}</h2>
              <p class="text-body-1">{{ project.description }}</p>

              <!-- Action Buttons -->
              <div class="mt-6">
                <v-btn
                  v-if="project.demoUrl"
                  color="primary"
                  variant="flat"
                  class="mr-3 mb-2"
                  :href="project.demoUrl"
                  target="_blank"
                >
                  <template v-slot:prepend>
                    <vue-feather type="external-link" size="16"></vue-feather>
                  </template>
                  View Demo
                </v-btn>

                <v-btn
                  v-if="project.githubUrl"
                  color="secondary"
                  variant="outlined"
                  class="mr-3 mb-2"
                  :href="project.githubUrl"
                  target="_blank"
                >
                  <template v-slot:prepend>
                    <vue-feather type="github" size="16"></vue-feather>
                  </template>
                  View Code
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Introduction Section -->
    <v-row v-if="project" class="mb-6">
      <v-col cols="12">
        <div
          class="intro-section"
          :class="{ 'section-visible': showIntroSection }"
        >
          <v-card elevation="0" class="pa-6">
            <h2 class="text-h4 mb-4 text-primary">Project Introduction</h2>
            <p class="text-body-1 mb-4">{{ project.detailedDescription || project.description }}</p>

            <!-- Technologies Used -->
            <div v-if="project.technologies" class="mb-4">
              <h3 class="text-h6 mb-3">Technologies Used</h3>
              <div class="d-flex justify-center">
                <div class="chips-container">
                  <v-chip-group>
                    <v-chip
                      v-for="tech in project.technologies"
                      :key="tech"
                      variant="outlined"
                      size="small"
                      class="mr-2 mb-2"
                    >
                      {{ tech }}
                    </v-chip>
                  </v-chip-group>
                </div>
              </div>
            </div>

            <!-- Key Features -->
            <div v-if="project.features">
              <h3 class="text-h6 mb-3">Key Features</h3>
              <v-list density="compact" class="bg-transparent features-list">
                <v-list-item
                  v-for="(feature, index) in project.features"
                  :key="index"
                  class="px-0 feature-item"
                >
                  <v-list-item-title class="d-flex justify-center">
                    <div class="d-flex align-center feature-content">
                      <vue-feather type="check" size="16" class="text-success mr-2"></vue-feather>
                      <span>{{ feature }}</span>
                    </div>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <!-- Learning Diary Section -->
    <v-row v-if="project" class="mb-6">
      <v-col cols="12">
        <div
          class="diary-section"
          :class="{ 'section-visible': showDiarySection }"
        >
          <v-card elevation="0" class="pa-6">
            <h2 class="text-h4 mb-4 text-secondary">What Have I Learnt</h2>

            <div v-if="project.learnings && project.learnings.length > 0">
              <div class="learnings-grid">
                <div
                  v-for="(learning, index) in project.learnings"
                  :key="index"
                  class="learning-item"
                >
                  <div class="d-flex align-start">
                    <div class="learning-symbol mr-3">
                      <span class="text-h4">{{ learning.symbol }}</span>
                    </div>
                    <div class="learning-content">
                      <h4 class="text-h6 mb-2 font-weight-bold text-primary">
                        {{ learning.title }}
                      </h4>
                      <p class="text-body-2 text-medium-emphasis text-left">
                        {{ learning.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-4">
              <vue-feather type="lightbulb" size="48" class="text-grey mb-3"></vue-feather>
              <p class="text-grey text-h6">Learning insights will be added as the project progresses...</p>
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <v-row v-if="project && project.contribution" class="mb-6">
      <v-col cols="12">
        <div
          class="contribution-section"
          :class="{ 'section-visible': showContributionSection }"
        >
         <v-card elevation="0" class="pa-6">
            <h2 class="text-h4 mb-4 text-info">My Contributions</h2>
           <v-list dense>
             <v-list-item v-for="project in project.contribution" class="px-0">
               <v-list-item-content class="d-flex align-center justify-center full-width">
                 <vue-feather type="star" size="16" class="text-warning mr-2"></vue-feather>
                 <v-list-item-title class="text-body-1">
                   {{ project }}
                 </v-list-item-title>
               </v-list-item-content>
             </v-list-item>
           </v-list>
         </v-card>
        </div>
      </v-col>
    </v-row>

    <!-- Timeline Section -->
    <v-row v-if="project && project.timeline" class="mb-6">
      <v-col cols="12">
        <div
          class="timeline-section"
          :class="{ 'section-visible': showTimelineSection }"
        >
          <v-card elevation="0" class="pa-6">
            <h2 class="text-h4 mb-4 text-info">Project Timeline</h2>

            <v-timeline direction="horizontal" side="end">
              <v-timeline-item
                v-for="(milestone, index) in project.timeline"
                :key="index"
                dot-color="primary"
                size="small"
                class="mb-4"
              >
                <div>
                  <div class="text-subtitle-2 font-weight-medium text-primary">
                    {{ milestone.date }}
                  </div>
                  <h4 class="text-subtitle-1 mb-2">{{ milestone.title }}</h4>
                  <p class="text-body-2">{{ milestone.description }}</p>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <!-- Loading State -->
    <v-row v-else class="justify-center">
      <v-col cols="auto">
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
        ></v-progress-circular>
        <p class="text-center mt-4">Loading project details...</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  detailedDescription?: string
  imageSrc: string
  placeholderIcon: string
  statusIcon: string
  status: string
  buttonText: string
  disabled: boolean
  url?: string
  demoUrl?: string
  githubUrl?: string
  technologies?: string[]
  features?: string[]
  learnings?: Array<{
    symbol: string
    title: string
    description: string
  }>
  challenges?: Array<{
    title: string
    description: string
  }>
  timeline?: Array<{
    date: string
    title: string
    description: string
  }>
}

const route = useRoute()
const router = useRouter()

const project = ref(null)
const loading = ref(true)

const showIntroSection = ref(false)
const showDiarySection = ref(false)
const showContributionSection = ref(false)
const showTimelineSection = ref(false)

const projectId = computed(() => route.params.id as string)

const loadProject = async () => {
  loading.value = true
  try {
    const response = await fetch('/comp4461-personal-portfolio/data/projects.json')
    const projects = await response.json()
    project.value = projects.find(p => p.id === projectId.value)

    // Initialize scroll state after data is loaded
    nextTick(() => {
      updateScrollButtons()
    })
  } catch (error) {
    console.error('Error loading project:', error)
  } finally {
    loading.value = false
  }
}

const goBackToHome = () => {
  router.push('/')
}

const hasActualImage = (project: Project): boolean => {
  return project.imageSrc && !project.imageSrc.includes('placeholder')
}

const getStatusChipColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'green'
    case 'in progress':
    case 'in progress...':
      return 'orange'
    case 'coming soon':
    case 'coming soon...':
      return 'blue'
    default:
      return 'grey'
  }
}

onMounted(() => {
  loadProject()

  // Set up intersection observers for scroll-based animations
  setupScrollAnimations()
})

// Function to setup scroll-based animations using Intersection Observer
const setupScrollAnimations = () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -15% 0px', // Trigger when section is 20% visible
    threshold: 0.1
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target

        if (target.classList.contains('intro-section')) {
          showIntroSection.value = true
        } else if (target.classList.contains('diary-section')) {
          showDiarySection.value = true
        } else if (target.classList.contains('contribution-section')) {
          showContributionSection.value = true
        } else if (target.classList.contains('timeline-section')) {
          showTimelineSection.value = true
        }

        // Stop observing once animation is triggered
        observer.unobserve(target)
      }
    })
  }, observerOptions)

  // Start observing sections once DOM is ready
  setTimeout(() => {
    const introSection = document.querySelector('.intro-section')
    const diarySection = document.querySelector('.diary-section')
    const contributionSection = document.querySelector('.contribution-section')
    const timelineSection = document.querySelector('.timeline-section')

    if (introSection) observer.observe(introSection)
    if (diarySection) observer.observe(diarySection)
    if (contributionSection) observer.observe(contributionSection)
    if (timelineSection) observer.observe(timelineSection)
  }, 100) // Small delay to ensure DOM is rendered
}

// Scroll functionality for learning cards section
const learningsGrid = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

const updateScrollButtons = () => {
  if (!learningsGrid.value) return

  const { scrollLeft, scrollWidth, clientWidth } = learningsGrid.value
  canScrollLeft.value = scrollLeft > 0
  canScrollRight.value = scrollLeft < scrollWidth - clientWidth
}

onMounted(() => {
  updateScrollButtons()
  if (learningsGrid.value) {
    learningsGrid.value.addEventListener('scroll', updateScrollButtons)
    // Update on window resize as well
    window.addEventListener('resize', updateScrollButtons)
  }
})

onBeforeUnmount(() => {
  if (learningsGrid.value) {
    learningsGrid.value.removeEventListener('scroll', updateScrollButtons)
    window.removeEventListener('resize', updateScrollButtons)
  }
})
</script>

<style scoped>
.back-to-home-btn {
  text-transform: none;
}

.intro-section,
.diary-section,
.contribution-section,
.timeline-section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.section-visible {
  opacity: 1;
  transform: translateY(0);
}

.chips-container {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: fit-content;
  margin: 0 auto;
}

.chips-container .v-chip-group {
  justify-content: center;
}

.features-list {
  padding: 0;
}

.feature-item {
  padding: 0;
}

.feature-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.learnings-grid {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none; /* Hide scrollbar Firefox */
  -ms-overflow-style: none; /* Hide scrollbar IE and Edge */
  scroll-behavior: smooth;
}

.learnings-grid::-webkit-scrollbar {
  display: none; /* Hide scrollbar Chrome, Safari, Opera */
}

.learning-item {
  flex: 0 0 calc(33.333% - 16px); /* Responsive width for each card (3 per row) */
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  transition: transform 0.2s;
}

.learning-item:hover {
  transform: translateY(-2px);
}

.v-list-item.px-0 .v-list-item-title {
  padding: 4px 0;
}

.v-list-item.px-0 .v-list-item-title .d-flex {
  gap: 8px;
}

.v-list-item-title.d-flex.justify-center {
  justify-content: center;
}
</style>
