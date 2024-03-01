import { computed } from "vue";
import type { ExtraProps } from "@/types";

export interface PositionInterface {
  x: number;
  y: number;
}

export const PositionProps = {
  x: {
    type: [Number, String],
    default: 0,
  },
  y: {
    type: [Number, String],
    default: 0,
  },
};

export function usePosition(props: PositionInterface & ExtraProps) {
  const x = computed(() => Number(props.x));
  const y = computed(() => Number(props.y));

  const cssX = computed(() => `${x.value}px`);
  const cssY = computed(() => `${y.value}px`);

  return {
    x,
    y,
    cssX,
    cssY,
  };
}
