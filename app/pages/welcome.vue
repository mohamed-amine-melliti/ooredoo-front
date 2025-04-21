<script setup lang="ts">
import { useRouter } from 'vue-router'
import UiRetroGrid from '../components/Ui/RetroGrid.vue'

const router = useRouter()

const goToDashboard = () => router.push('/examples/dashboard')
const goToSignIn = () => router.push('/login')
</script>

<template>
  <!-- Background Grid -->
  <UiRetroGrid />

  <!-- Wrapper Container for Centering -->
  <div class="relative z-10 min-h-screen flex items-center justify-center px-4">
    <div class="container mx-auto flex flex-col-reverse md:flex-row items-center justify-center gap-12 py-20">
      
      <!-- Left: Title and Buttons -->
      <div class="flex flex-col items-center md:items-start text-center md:text-left gap-8 md:w-1/2">
        <h1 class="text-5xl md:text-6xl font-bold leading-tight bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] text-transparent bg-clip-text">
          OoredoO
        </h1>

        <div class="flex flex-col sm:flex-row gap-4">
          <UiButton size="lg" @click="goToSignIn">Sign In</UiButton>
          <UiButton size="lg" @click="goToDashboard">Go To Dashboard</UiButton>
        </div>
      </div>

      <!-- Right: Image -->
      <div class="w-full md:w-1/2 flex items-center justify-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/f0/Ooredoo_logo_2017.png"
          alt="Company Logo"
          class="w-full max-w-sm object-contain"
        />
      </div>

    </div>
  </div>
</template>
