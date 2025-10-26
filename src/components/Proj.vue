<template>
  <v-container>
    <v-row align="center" justify="center" class="mb-4">
      <v-chip size="large" elevation="2" style="background-color: black !important; color: white !important;">
        My Projects
      </v-chip>
    </v-row>
    <v-row align="center" justify="center" class="mb-4">
      <h2>Check out my latest works!</h2>
    </v-row>
    <v-row align="center" justify="center" class="mb-4">
      <div class="slide-group-wrapper">
        <v-slide-group
            v-model="selectedProject"
            class="pa-4"
            center-active
        >
          <v-slide-group-item
              v-for="(project, index) in projects"
              :key="index"
              v-slot="{ isSelected, toggle, selectedClass }"
          >
            <v-card
                class="ma-4 project-card"
                elevation="2"
                height="450"
                width="300"
                :class="selectedClass"
                @click="toggle"
                style="display: flex; flex-direction: column;"
            >
              <v-img
                  :src="project.imageSrc"
                  height="200"
                  contain
                  :aspect-ratio="16/9"
                  class="bg-grey-lighten-2"
                  style="object-position: center center;"
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
                <!-- Overlay version (for placeholders) -->
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

              <v-card-title>{{ project.title }}</v-card-title>

              <v-card-subtitle>{{ project.subtitle }}</v-card-subtitle>

              <v-card-text class="text-left" style="flex-grow: 1;">
                <p>{{ project.description }}</p>
              </v-card-text>

              <v-card-actions class="pa-4">
                <v-btn
                    color="primary"
                    variant="outlined"
                    block
                    :disabled="project.disabled"
                    @click.stop="handleProjectClick(project)"
                >
                  {{ project.buttonText }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </div>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

interface Project {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  placeholderIcon: string;
  statusIcon: string;
  status: string;
  buttonText: string;
  disabled: boolean;
  url?: string;
}

const router = useRouter();

// Reactive variable for selected project (for slide group)
const selectedProject = ref<number | null>(null);

// Load projects from JSON file
const projects = ref<Project[]>([]);
const loading = ref(true);

// Fetch projects from public directory
const loadProjects = async (retryCount = 0) => {
  try {
    const url = 'https://lyam-t.github.io/comp4461-personal-portfolio/data/projects.json'
    console.log(`Attempting to fetch projects from: ${url} (attempt ${retryCount + 1})`)

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const projectsData = await response.json();
    console.log('Projects loaded successfully:', projectsData);
    projects.value = projectsData;
    loading.value = false;
  } catch (error) {
    console.error(`Failed to load projects (attempt ${retryCount + 1}):`, error);

    // Retry up to 3 times with exponential backoff
    if (retryCount < 2) {
      const delay = Math.pow(2, retryCount) * 1000 // 1s, 2s delays
      console.log(`Retrying in ${delay}ms...`)
      setTimeout(() => loadProjects(retryCount + 1), delay)
      return
    }

    console.error('All retry attempts failed, using fallback data')
    // Fallback data if fetch fails - ALL 4 projects
    projects.value = [
      {
        title: "HRI for Diaster Management",
        subtitle: "Human Computer Interaction Project",
        description: "An innovative HCI project exploring user experience and interface design principles.",
        imageSrc: "/images/project1-placeholder.jpg",
        placeholderIcon: "mdi-image",
        statusIcon: "⏰",
        status: "Coming Soon...",
        buttonText: "Click Me",
        disabled: true
      },
      {
        title: "XR for Local Community",
        subtitle: "Human Computer Interaction Project",
        description: "A comprehensive study on human-computer interaction methodologies and user research.",
        imageSrc: "/images/project2-placeholder.jpg",
        placeholderIcon: "mdi-video",
        statusIcon: "⏰",
        status: "Coming Soon...",
        buttonText: "Click Me",
        disabled: true
      },
      {
        title: "Project 3",
        subtitle: "Advanced HCI Research",
        description: "Exploring new frontiers in human-computer interaction and accessibility.",
        imageSrc: "/images/project3-placeholder.jpg",
        placeholderIcon: "mdi-laptop",
        statusIcon: "🚀",
        status: "In Progress...",
        buttonText: "View Details",
        disabled: false,
        url: "/project3"
      },
      {
        title: "Project 4",
        subtitle: "UX Design Study",
        description: "User experience research focusing on mobile interface design patterns.",
        imageSrc: "/images/project4-placeholder.jpg",
        placeholderIcon: "mdi-phone",
        statusIcon: "✅",
        status: "Completed",
        buttonText: "View Project",
        disabled: false,
        url: "/project4"
      }
    ];
    loading.value = false;
  }
};

// Load projects when component mounts
onMounted(() => {
  loadProjects();
});

// Function to handle project clicks
const handleProjectClick = (project: Project) => {
  if (!project.disabled) {
    // Create project ID from title
    let projectId = '';
    if (project.title === "HRI for Diaster Management") {
      projectId = 'hri-disaster';
    } else if (project.title === "XR for Local Community") {
      projectId = 'xr-community';
    } else if (project.title === "Project 3") {
      projectId = 'project3';
    } else if (project.title === "Project 4") {
      projectId = 'project4';
    } else {
      // Fallback: create ID from title
      projectId = project.title.toLowerCase().replace(/\s+/g, '-');
    }

    // Navigate to project detail page
    router.push(`/project/${projectId}`);
  }
};

// Helper function to add new projects (for future use)
const addProject = (newProject: Project) => {
  projects.value.push(newProject);
};

// Helper function to remove projects (for future use)
const removeProject = (index: number) => {
  projects.value.splice(index, 1);
};

// Check if project has an actual image (not a placeholder)
const hasActualImage = (project: Project) => {
  return project.imageSrc && !project.imageSrc.includes('placeholder');
};

// Get status chip color based on project status
const getStatusChipColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'success'
    case 'in progress':
    case 'in progress...':
      return 'warning'
    case 'coming soon':
    case 'coming soon...':
      return 'info'
    default:
      return 'grey'
  }
};
</script>

<style scoped>
.slide-group-wrapper {
  width: 100%;
  max-width: 800px; /* Default size for medium-large screens */
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.project-card {
  transition: all 0.3s ease;
  width: 300px;
  height: 450px;
}

/* Responsive card sizing using CSS */
@media (max-width: 480px) {
  .project-card {
    width: 280px !important;
    height: 400px !important;
    margin: 6px 8px !important;
  }

  .slide-group-wrapper {
    max-width: 100vw;
    padding: 0 8px;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .project-card {
    width: 280px !important;
    height: 430px !important;
    margin: 8px 10px !important;
  }

  .slide-group-wrapper {
    max-width: 95vw;
    padding: 0 10px;
  }
}

@media (min-width: 769px) and (max-width: 899px) {
  .slide-group-wrapper {
    max-width: 700px; /* Moderate size */
  }

  .project-card {
    width: 300px !important;
    height: 450px !important;
  }
}

@media (min-width: 900px) and (max-width: 1199px) {
  .slide-group-wrapper {
    max-width: 850px; /* Good size for medium-large screens */
  }
}

@media (min-width: 1200px) and (max-width: 1399px) {
  .slide-group-wrapper {
    max-width: 1000px; /* Larger for big screens */
  }
}

/* Extra Large screens (>1400px) */
@media (min-width: 1400px) {
  .slide-group-wrapper {
    max-width: 1200px; /* Much larger for very big screens */
  }
}

/* Force center alignment for v-slide-group content */
.slide-group-wrapper :deep(.v-slide-group__content) {
  justify-content: center !important;
}

/* Mobile - Small screens (≤480px) */
@media (max-width: 480px) {
  /* Adjust v-slide-group padding for mobile */
  .slide-group-wrapper :deep(.v-slide-group) {
    padding: 8px 4px !important;
  }

  /* Make sure cards fit properly on mobile */
  .project-card :deep(.v-card-text) {
    font-size: 0.875rem;
    line-height: 1.3;
  }

  .project-card :deep(.v-card-title) {
    font-size: 1.1rem;
  }

  .project-card :deep(.v-card-subtitle) {
    font-size: 0.8rem;
  }
}

/* Extra small screens (≤360px) */
@media (max-width: 360px) {
  .slide-group-wrapper {
    padding: 0 4px;
  }

  .project-card {
    margin: 4px 6px !important;
  }
}

/* Landscape mobile orientation */
@media (max-height: 500px) and (orientation: landscape) {
  .project-card {
    height: 350px !important;
  }
}
</style>
