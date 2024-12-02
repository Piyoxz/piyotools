<template>
    <section v-if="downloaders.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 p-4">
      <template v-for="downloader in downloaders" :key="downloader.no">
        <!-- Card Aktif -->
        <router-link
          v-if="downloader.status === 'ACTIVE'"
          :to="`/downloaders/detail/${downloader.no}`"
          class="min-h-[160px] shadow-lg transition-transform transform hover:scale-105 rounded-lg border border-gray-200 block"
        >
          <VaCardContent class="p-5">
            <!-- Name -->
            <h2 class="text-lg font-semibold text-gray-800 truncate">{{ downloader.name }}</h2>
            <!-- Description -->
            <p class="text-gray-600 mt-2 text-sm truncate">{{ downloader.description }}</p>
            <!-- Status Badge -->
            <div class="mt-4">
              <span class="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full bg-green-500">
                {{ downloader.status }}
              </span>
            </div>
          </VaCardContent>
        </router-link>
  
        <!-- Card Tidak Aktif -->
        <VaCard
          v-else
          class="min-h-[160px] shadow rounded-lg border border-gray-300 bg-gray-100 relative"
        >
          <VaCardContent class="p-5">
            <!-- Name -->
            <h2 class="text-lg font-semibold text-gray-500 truncate">{{ downloader.name }}</h2>
            <!-- Description -->
            <p class="text-gray-500 mt-2 text-sm truncate">{{ downloader.description }}</p>
            <!-- Status Badge -->
            <div class="mt-4">
              <span class="inline-block px-3 py-1 text-xs font-semibold text-gray-700 rounded-full bg-gray-300">
                {{ downloader.status }}
              </span>
            </div>
          </VaCardContent>
          <!-- Disabled Overlay -->
          <div class="absolute inset-0 bg-gray-300 opacity-75 flex justify-center items-center">
            <span class="text-red-500 text-2xl font-bold">X</span>
          </div>
        </VaCard>
      </template>
    </section>
  </template>
  
  <script lang="ts" setup>
  import downloaders from './data/downloaders.json'
  </script>
  
  <style scoped>
  .shadow-lg {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  
  .rounded-lg {
    border-radius: 8px;
  }
  
  .text-gray-800 {
    color: #2d3748; /* Dark gray */
  }
  
  .text-gray-600 {
    color: #718096; /* Medium gray */
  }
  
  .text-gray-500 {
    color: #a0aec0; /* Lighter gray */
  }
  
  .bg-green-500 {
    background-color: #48bb78; /* Green for active status */
  }
  
  .bg-gray-100 {
    background-color: #f7fafc; /* Light gray background for inactive cards */
  }
  
  .bg-gray-300 {
    background-color: #e2e8f0; /* Slightly darker gray overlay for inactive cards */
  }
  
  .cursor-not-allowed {
    cursor: not-allowed;
  }
  
  .opacity-75 {
    opacity: 0.75;
  }
  
  .relative {
    position: relative;
  }
  
  .absolute {
    position: absolute;
  }
  
  .inset-0 {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  
  .flex {
    display: flex;
  }
  
  .justify-center {
    justify-content: center;
  }
  
  .items-center {
    align-items: center;
  }
  
  .hover\:scale-105:hover {
    transform: scale(1.05);
  }
  </style>
  