<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  
  const props = defineProps({
    prop: {
      type: String,
      required: true
    }
  })
  </script>
  <template>
    <div
      ref="TestComponent"
      class="TestComponent"
    ></div>
  </template>
  
  <style scoped>
  .TestComponent {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
