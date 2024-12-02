<template>
  <svg :height="height" alt="Piyo Tools" fill="none" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
    <!-- Piyo (besar) -->
    <text x="20" y="60" fill="url(#paint0_linear)" font-family="Arial, sans-serif" font-size="48" font-weight="bold">
      Piyo
    </text>
    <!-- Tools (kecil) -->
    <text x="140" y="60" fill="url(#paint0_linear)" font-family="Arial, sans-serif" font-size="24" font-weight="normal">
      Tools
    </text>
    <defs>
      <linearGradient id="paint0_linear" gradientUnits="userSpaceOnUse" x1="0" x2="400" y1="100" y2="100">
        <stop :stop-color="colorsComputed.end" />
        <stop :stop-color="colorsComputed.start" offset="1" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useColors } from 'vuestic-ui'

const { getColor } = useColors()

const props = withDefaults(
  defineProps<{
    height?: number
    start?: string
    end?: string
  }>(),
  {
    height: 60,
    start: 'primary',
    end: undefined,
  },
)

const colorsComputed = computed(() => {
  return {
    start: getColor(props.start),
    end: getColor(props.end || props.start),
  }
})
</script>
