import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Junta classes e resolve conflitos do Tailwind (ex.: `p-6` da base vs `p-0`
 * do call site, `mb-10` do SectionHeading vs `mb-8` passado via className).
 */
export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

/** "Estrutura para Telhado — Linha Titan" → "estrutura-para-telhado-linha-titan" */
export function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
