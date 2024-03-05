
  import {ref, computed,  onMounted, watch, type StyleValue} from 'vue'
  
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
  }