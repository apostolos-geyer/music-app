import type { PageLoad } from "./$types";
import { generateGradient } from "$lib/gradient";

export const ssr = false;

export const load: PageLoad = () => {
  const gradientDataUrl = generateGradient();
  return { gradientDataUrl };
};
