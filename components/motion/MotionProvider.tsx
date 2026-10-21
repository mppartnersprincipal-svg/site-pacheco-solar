"use client";

import { useReducedMotion } from "@react-spring/web";

/**
 * Liga o `Globals.skipAnimation` do react-spring quando o usuário prefere
 * menos movimento (o hook faz isso por conta própria). Montar uma vez no layout.
 */
export function MotionProvider() {
  useReducedMotion();
  return null;
}
