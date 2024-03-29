import { capitalize } from '../string.js'
export function componentTemplate(name) {
  return `<script setup lang="ts">
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
      ref="${name}"
      class="${name}"
    ></div>
  </template>
  
  <style scoped>
  .${name} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  </style>
`
}

export function composableStyleTemplate(name) {
  name = capitalize(name)
  const interfaceName = `use${name}PropsInterface`
  const propsName = `${name}Props`
  const composableName = `use${name}`

  return `
  import {ref, computed,  onMounted, watch, type StyleValue} from 'vue'
  
  export interface ${interfaceName} {
    prop: string
  }

  export const ${propsName} = {
    prop: {
      type: String,
      defaulr: 'My Prop'
    }
  }
  
  export function ${composableName} (props: ${interfaceName} ){
    const computedProp = computed(() => props.prop)

    const style = computed(() => {
      return {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      } as StyleValue
    })

    onMounted(() => {
      console.log('Mounted')
    })
    
    return {
      computedProp,
      style
    }
  }`
}

export function composableTemplate(name) {
  name = capitalize(name)
  const interfaceName = `use${name}PropsInterface`
  const propsName = `${name}Props`
  const composableName = `use${name}`

  return `
  import {ref, computed,  onMounted, watch} from 'vue'
  
  export interface ${interfaceName} {
    prop: string
  }

  export const ${propsName} = {
    prop: {
      type: String,
      defaulr: 'My Prop'
    }
  }

  
  export function ${composableName} (props: ${interfaceName} ){
    const computedProp = computed(() => props.prop)

    onMounted(() => {
      console.log('Mounted')
    })
    
    return {
      computedProp
    }
  }`
}
