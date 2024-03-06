
  import {ref, computed,  onMounted, watch} from 'vue'
  
  export interface useTestComposablePropsInterface {
    prop: string
  }

  export const TestComposableProps = {
    prop: {
      type: String,
      defaulr: 'My Prop'
    }
  }

  
  export function useTestComposable (props: useTestComposablePropsInterface ){
    const computedProp = computed(() => props.prop)

    onMounted(() => {
      console.log('Mounted')
    })
    
    return {
      computedProp
    }
  }