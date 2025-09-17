<template>
  <div class="team" v-if="members?.length">
    <h2>Team</h2>
    <div class="members">
      <div v-for="member in members" :key="member.name" class="member">
        <img :src="member.avatar" :alt="member.name" />
        <div class="info">
          <h3>{{ member.name }}</h3>
          <p>{{ member.title }}</p>
          <div class="social">
            <a v-for="link in member.links" :key="link.icon" :href="link.link">
              <span class="icon" :class="`i-${link.icon}`"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { useData } from 'vitepress'
const { theme } = useData()
const members = theme.value.team
</script>