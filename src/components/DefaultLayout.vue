<script setup lang="ts">
// import Sidebar from './Sidebar.vue'
import Header from './HeaderComponent.vue'
</script>

<template>
  <div
    style="background: #f8f8f7"
    class="flex h-screen"
  >
    <!-- <Sidebar /> -->

    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />

      <main class="flex-1 overflow-x-hidden overflow-y-auto">
        <div class="container mx-auto px-6 py-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
