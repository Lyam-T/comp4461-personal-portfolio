<template>
  <v-app>
    <v-main>
      <v-container class="fill-height">
        <v-row class="fill-height" align="center" justify="center">
          <v-col cols="12" sm="10" md="8" lg="6">
            <v-card class="pa-4 mx-auto" elevation="2" max-width="800">
              <v-card-title>COMP4461 Personal Portfolio</v-card-title>
              <v-card-subtitle style="white-space: normal; overflow-wrap: anywhere; word-break: break-word;">
                Welcome to my personal portfolio website! This is a showcase of all my projects done during
                my studies in HKUST COMP4461 Human Computer Interaction course.
              </v-card-subtitle>
              <v-card-text>
                Currently there is no any content here, please check back later.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <FooterCredit author="Lyam Tang" />
  </v-app>
</template>

<script setup>
import FooterCredit from './components/FooterCredit.vue'
</script>
